'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReportViewer from '@/components/ReportViewer';
import { API_BASE } from '@/lib/constants';
import useSubsiteHref from '@/lib/useSubsiteHref';
import type { ComplianceReport } from '../../../modules/gacc/report';
import { checkGacc } from '../../../modules/gacc/rules';
import { checkCcc } from '../../../modules/ccc/rules';
import { checkCosmetics } from '../../../modules/nmpa/rules';
import { checkLabel } from '../../../modules/label/rules';
import { checkCrossborder } from '../../../modules/crossborder/rules';
import { checkTrademark } from '../../../modules/trademark/rules';




const MAX_RETRIES = 15;
const RETRY_DELAY = 2000;

function ReportContent() {
  const searchParams = useSearchParams();
  const subsiteHref = useSubsiteHref();
  const id = searchParams.get('id');
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const retries = useRef(0);

  useEffect(() => {
    if (!id) {
      setError('No report ID provided');
      setLoading(false);
      return;
    }

    // Try to load from localStorage first (stored before Creem redirect)
    try {
      const stored = localStorage.getItem('compli…ort');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.id === id) {
          setReport(parsed);
          setLoading(false);
          localStorage.removeItem('compli…ort');
          return;
        }
      }
    } catch {}

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
          {/* Payment success badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium mb-8">
            <span className="text-lg">✅</span>
            Payment successful
          </div>

          {/* Generating card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="animate-spin h-8 w-8 text-gold" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>

            <h1 className="text-xl font-bold text-primary-navy mb-2">
              Generating Your Report
            </h1>
            <p className="text-gray-500 text-sm mb-6">
              Your payment was confirmed. We are now generating your compliance report.
              This usually takes a few seconds.
            </p>

            {/* Progress steps */}
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                <span className="text-sm text-green-700">Payment received</span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`w-6 h-6 ${attempt > 0 ? 'bg-gold text-primary-navy animate-pulse' : 'bg-gray-100 text-gray-400'} rounded-full flex items-center justify-center text-xs font-bold`}>
                  {attempt > 0 ? '⟳' : '…'}
                </span>
                <span className={`text-sm ${attempt > 0 ? 'text-gold' : 'text-gray-400'}`}>
                  Generating report document
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span className="text-sm text-gray-400">Ready to view</span>
              </div>
            </div>

            {attempt > 0 && (
              <p className="text-xs text-gray-400 mt-6">
                Attempt {attempt + 1} of {MAX_RETRIES}…
              </p>
            )}
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
            <p className="text-gray-500 text-sm mb-6">
              {error || 'This report may have expired or does not exist.'}
            </p>
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


const CHECK_FUNCTIONS: Record<string, (input: any) => any> = {
  'GACC Food Registration': checkGacc,
  'CCC Certification': checkCcc,
  'Cosmetics Filing (NMPA)': checkCosmetics,
  'Chinese Label Compliance': checkLabel,
  'Cross-Border E-commerce': checkCrossborder,
  'Brand Protection': checkTrademark,
};

function getCheckFn(moduleName: string) {
  return CHECK_FUNCTIONS[moduleName] || CHECK_FUNCTIONS[
    Object.entries(CHECK_FUNCTIONS).find(([k]) => k.toLowerCase().includes(moduleName.toLowerCase()))?.[0] || ''
  ] || null;
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
