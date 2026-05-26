'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReportViewer from '@/components/ReportViewer';
import { API_BASE } from '@/lib/constants';
import useSubsiteHref from '@/lib/useSubsiteHref';
import type { ComplianceReport } from '../../../modules/gacc/report';

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

      // Not found yet — retry (webhook may still be processing)
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
      <main className="min-h-screen bg-bg-ice flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4" />
          <p className="text-gray-500">Loading report…</p>
          {attempt > 0 && (
            <p className="text-xs text-gray-400 mt-2">
              Waiting for payment confirmation ({attempt}/{MAX_RETRIES})
            </p>
          )}
        </div>
      </main>
    );
  }

  if (error || !report) {
    return (
      <main className="min-h-screen bg-bg-ice flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary-navy mb-2">Report Not Found</h1>
          <p className="text-gray-500">{error || 'This report may have expired or does not exist.'}</p>
          <a href={subsiteHref('/')} className="text-gold hover:underline mt-4 inline-block">
            &larr; Back to Home
          </a>
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
