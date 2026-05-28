'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReportViewer from '@/components/ReportViewer';
import { API_BASE } from '@/lib/constants';
import useSubsiteHref from '@/lib/useSubsiteHref';
import { checkGacc } from '../../../modules/gacc/rules';
import { checkCcc } from '../../../modules/ccc/rules';
import { checkCosmetics } from '../../../modules/nmpa/rules';
import { checkLabel } from '../../../modules/label/rules';
import { checkCrossborder } from '../../../modules/crossborder/rules';
import { checkTrademark } from '../../../modules/trademark/rules';
import { CATEGORY_LABELS as GACC_LABELS } from '../../../modules/gacc/rules';
import { CATEGORY_LABELS as CCC_LABELS } from '../../../modules/ccc/rules';
import { CATEGORY_LABELS as COSMETICS_LABELS } from '../../../modules/nmpa/rules';
import { CATEGORY_LABELS as LABEL_LABELS } from '../../../modules/label/rules';
import { CATEGORY_LABELS as CB_LABELS } from '../../../modules/crossborder/rules';
import { CATEGORY_LABELS as TM_LABELS } from '../../../modules/trademark/rules';

const CHECK_MAP: Record<string, (input: any) => any> = {
  'GACC Food Registration': checkGacc,
  'CCC Certification': checkCcc,
  'Cosmetics Filing (NMPA)': checkCosmetics,
  'Chinese Label Compliance': checkLabel,
  'Cross-Border E-commerce': checkCrossborder,
  'Brand Protection': checkTrademark,
};

const CATEGORY_LABELS_MAP: Record<string, Record<string, string>> = {
  GACC: GACC_LABELS,
  CCC: CCC_LABELS,
  COSMETICS: COSMETICS_LABELS,
  LABEL: LABEL_LABELS,
  CROSSBORDER: CB_LABELS,
  TRADEMARK: TM_LABELS,
};

function rebuildResult(stored: any): any {
  const fn = CHECK_MAP[stored.module];
  if (!fn) return stored.result || {};
  try {
    const input = {
      ...(stored.savedInput || {}),
      productName: stored.productInfo?.name || '',
      originCountry: stored.productInfo?.originCountry || '',
    };
    try { return fn(input); } catch { return stored.result || {}; }
  } catch (e) {
    console.error('Rebuild failed:', e);
    return stored.result || {};
  }
}

const MAX_RETRIES = 15;
const RETRY_DELAY = 2000;

function ReportContent() {
  const searchParams = useSearchParams();
  const subsiteHref = useSubsiteHref();
  const id = searchParams.get('id');
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const retries = useRef(0);

  useEffect(() => {
    if (!id) {
      setError('No report ID provided');
      setLoading(false);
      return;
    }

    // Try to load from localStorage first
    try {
      const stored = localStorage.getItem('compli-report-data');
      console.log('Report: reading localStorage, url id:', id, 'data found:', !!stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log('Report: stored id:', parsed.id, 'url id:', id, 'match:', parsed.id === id);
        if (parsed.id === id) {
          // Keep savedInput in a separate key for fallback use (survives page refresh)
          if (parsed.savedInput) {
            localStorage.setItem('compli-report-input', JSON.stringify(parsed.savedInput));
          }
          localStorage.removeItem('compli-report-data');
          setReport(parsed);
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('localStorage error:', e);
    }

    // Fallback: generate report from ID prefix (uses persisted savedInput)
    try {
      if (id) {
        const prefix = id.split('-')[0].toUpperCase();
        const map: Record<string, {label:string;fn:(i:any)=>any;nextSteps:string[]}> = {
          GACC: {label:'GACC Food Registration',fn:checkGacc,nextSteps:['Determine product category among 18 GACC-regulated categories','Register in CIFER system with CRA assignment','Prepare all required documentation with Chinese translation','Complete label compliance review (GB 7718/GB 28050)','Submit GACC application and track 3-6 month review']},
          CCC: {label:'CCC Certification',fn:checkCcc,nextSteps:['Select a CNCA-accredited certification body for your product category','Submit product samples for type testing (Safety + EMC)','Prepare factory inspection documentation and QMS','Receive CCC certificate and mark authorization (4-6 months)','Maintain annual factory surveillance inspections']},
          COSMETICS: {label:'Cosmetics Filing (NMPA)',fn:checkCosmetics,nextSteps:['Designate Chinese responsible person (境内责任人)','Complete safety assessment per NMPA 2021 guidelines','Coordinate testing at NMPA-designated laboratory','File NMPA notification (备案) for ordinary cosmetics','Set up post-market adverse event monitoring']},
          LABEL: {label:'Chinese Label Compliance',fn:checkLabel,nextSteps:['Submit label artwork for GB 7718-2025 compliance audit','Receive compliant Chinese label design','Verify all 9 mandatory elements and nutrition panel','Obtain print-ready label files','Arrange customs clearance label support']},
          CROSSBORDER: {label:'Cross-Border E-commerce',fn:checkCrossborder,nextSteps:['Select target platform (Tmall Global/JD/Douyin)','Complete overseas merchant registration','Set up bonded warehouse (1210) or direct shipping (9610)','Configure three-document matching for customs','Launch store with compliant Chinese listings']},
          TRADEMARK: {label:'Brand Protection',fn:checkTrademark,nextSteps:['Conduct CNIPA trademark search in relevant Nice classes','File trademark via direct CNIPA filing (8-14 months)','Monitor 3-month opposition period','Register Customs IP recordal for border enforcement','Set up ongoing trademark monitoring']},
        };
        const m = map[prefix];
        if (m) {
          const storedInput = localStorage.getItem('compli-report-input');
          const savedInput = storedInput ? JSON.parse(storedInput) : {};
          // Provide safe defaults for fallback generation
          if (!savedInput.category) savedInput.category = 'other';
          if (!savedInput.productName) savedInput.productName = 'Your Product';
          if (!savedInput.brandName) savedInput.brandName = savedInput.productName;
          if (!savedInput.originCountry) savedInput.originCountry = 'China';
          const sr = m.fn(savedInput);
          const productName = savedInput.productName || savedInput.brandName || 'Your Product';
          const category = savedInput.category ? (CATEGORY_LABELS_MAP[prefix]?.[savedInput.category] || '') : '';
          setReport({id,module:m.label,
            productInfo:{name:productName,category,originCountry:''},
            result:sr,nextSteps:m.nextSteps,
            generatedAt:new Date().toISOString()});
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('Fallback error:', e);
    }

    const fetchReport = async (): Promise<void> => {
      try {
        const res = await fetch(`${API_BASE}/report/${id}`);
        if (res.ok) {
          const data = await res.json();
          setReport(data);
          setLoading(false);
          return;
        }
      } catch {
        // Network error — retry
      }
      retries.current += 1;
      if (retries.current < MAX_RETRIES) {
        setTimeout(fetchReport, RETRY_DELAY);
      } else {
        setError('Report not found. The payment may still be processing.');
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);

  if (loading) {
    const attempt = retries.current;
    return (
      <main className="min-h-screen bg-bg-ice py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <span className="text-lg">✅</span>
            Payment successful
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin h-8 w-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-primary-navy mb-2">Generating Your Report</h1>
            <p className="text-gray-500 text-sm mb-6">Generating your compliance report...</p>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm text-green-700">Payment received</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gold text-primary-navy animate-pulse rounded-full flex items-center justify-center text-xs font-bold">⟳</span>
                <span className="text-sm text-gold">Loading report...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="min-h-screen bg-bg-ice py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h1 className="text-xl font-bold text-primary-navy mb-2">Report Not Found</h1>
            <p className="text-gray-500 text-sm mb-6">{error || 'Report not found.'}</p>
            <a href={subsiteHref('/')} className="inline-block bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-6 py-2.5 rounded-md transition-all">
              &larr; Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return <ReportViewer report={report} />;
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-bg-ice flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4" />
      </main>
    }>
      <ReportContent />
    </Suspense>
  );
}
