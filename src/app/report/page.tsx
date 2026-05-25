'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ReportViewer from '@/components/ReportViewer';
import { API_BASE } from '@/lib/constants';
import type { ComplianceReport } from '../../../modules/gacc/report';

function ReportContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [report, setReport] = useState<ComplianceReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('No report ID provided');
      setLoading(false);
      return;
    }

    fetch(`${API_BASE}/report/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Report not found');
        return res.json();
      })
      .then((data: ComplianceReport) => {
        setReport(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-ice flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto mb-4" />
          <p className="text-gray-500">Loading report…</p>
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
          <a href="/compli-service/" className="text-gold hover:underline mt-4 inline-block">
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
