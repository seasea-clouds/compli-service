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

const CHECK_MAP: Record<string, (input: any) => any> = {
  'GACC Food Registration': checkGacc,
  'CCC Certification': checkCcc,
  'Cosmetics Filing (NMPA)': checkCosmetics,
  'Chinese Label Compliance': checkLabel,
  'Cross-Border E-commerce': checkCrossborder,
  'Brand Protection': checkTrademark,
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
    return fn(input);
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
      const stored = localStorage.getItem('compli…ort');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id === id) {
          // Regenerate full result from stored input
          const fullResult = rebuildResult(parsed);
          localStorage.removeItem('compli…ort');
          setReport({ ...parsed, result: fullResult });
          setLoading(false);
          return;
        }
      }
    } catch (e) {
      console.error('localStorage error:', e);
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
