'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useTranslations } from 'next-intl';
import ProtectedRoute from '@/components/ProtectedRoute';

interface Report {
  id: string;
  module: string;
  product_name: string;
  payment_status: string;
  created_at: string;
}

function ReportsContent() {
  const t = useTranslations('Dashboard');
  const { token } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch('/api/reports/list', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setReports(data.reports || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-[#1B365D] mb-8">{t('myReports')}</h1>

      {loading && (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      )}

      {!loading && reports.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-lg border p-8">
          <p className="text-lg mb-2">No reports yet</p>
          <p className="text-sm">Complete a compliance check to see your reports here.</p>
        </div>
      )}

      {reports.length > 0 && (
        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#1B365D]">{r.module}</p>
                <p className="text-sm text-gray-500">{r.product_name}</p>
                <p className="text-xs text-gray-400">{r.created_at}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                r.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {r.payment_status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <ReportsContent />
    </ProtectedRoute>
  );
}
