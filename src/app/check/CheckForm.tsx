"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { API_BASE } from '@/lib/constants';

interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "select" | "boolean";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

interface FreeCheckResult {
  summary: string;
  details: { label: string; value: string }[];
  documents: string[];
  isActionNeeded: boolean;
}

interface CheckFormConfig {
  title: string;
  description: string;
  fields: FieldConfig[];
  checkProduct: (values: Record<string, string>) => FreeCheckResult;
  moduleKey: string;
  moduleLabel: string;
}

export default function CheckForm({ config }: { config: CheckFormConfig }) {
  const t = useTranslations('Check');
  const [step, setStep] = useState<"form" | "free-result">("form");
  const [values, setValues] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<FreeCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = config.checkProduct(values);
    setResult(res);
    setStep("free-result");
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const reportId = `${config.moduleKey.toUpperCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const res = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          email: email || undefined,
          productId: undefined,
          metadata: { ...values, module: config.moduleKey },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? "Payment failed");
      const data = await res.json();
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  };

  const setVal = (name: string, val: string) => setValues((v) => ({ ...v, [name]: val }));

  return (
    <main className="min-h-screen bg-[#F4F6F9]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-400">
          <span className={step === "form" ? "text-[#D4AF37] font-semibold" : ""}>1. {t('step1')}</span>
          <span>&rarr;</span>
          <span className={step === "free-result" ? "text-[#D4AF37] font-semibold" : ""}>2. {t('step2')}</span>
        </div>

        {/* Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8 space-y-6">
            <h1 className="text-2xl font-bold text-[#1B365D]">{config.title}</h1>
            <p className="text-gray-500 text-sm">{config.description}</p>

            {config.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                {field.type === "select" ? (
                  <select
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                    value={values[field.name] ?? ""}
                    onChange={(e) => setVal(field.name, e.target.value)}
                    required={field.required}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === "boolean" ? (
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={field.name}
                        value="yes"
                        checked={values[field.name] === "yes"}
                        onChange={(e) => setVal(field.name, e.target.value)}
                      /> Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        type="radio"
                        name={field.name}
                        value="no"
                        checked={values[field.name] === "no"}
                        onChange={(e) => setVal(field.name, e.target.value)}
                      /> No
                    </label>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                    placeholder={field.placeholder}
                    value={values[field.name] ?? ""}
                    onChange={(e) => setVal(field.name, e.target.value)}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1B365D] font-semibold py-3 px-6 rounded-md transition-all"
            >
              {t('checkBtn')}
            </button>
          </form>
        )}

        {/* Free Result */}
        {step === "free-result" && result && (
          <div className="bg-white rounded-lg shadow-sm border p-8 space-y-6">
            <h2 className="text-xl font-bold text-[#1B365D]">{t('freeResult')}</h2>

            <div className={`rounded-lg p-4 ${result.isActionNeeded ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
              <p className="font-semibold">{result.summary}</p>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              {result.details.map((d, i) => (
                <p key={i}><strong>{d.label}:</strong> {d.value}</p>
              ))}
            </div>

            {result.documents.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-sm mb-2">{t('documentsTitle')}</h3>
                <ul className="space-y-1">
                  {result.documents.slice(0, 5).map((doc, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400">&#x2610;</span>
                      {doc}
                    </li>
                  ))}
                  {result.documents.length > 5 && (
                    <p className="text-xs text-gray-400 mt-2">+ {result.documents.length - 5} more in full report</p>
                  )}
                </ul>
              </div>
            )}

            <div className="border-t pt-6 text-center space-y-4">
              <p className="text-lg font-semibold text-[#1B365D]">{t('getFullReport')}</p>
              <p className="text-sm text-gray-500">{t('getFullReportDesc')}</p>

              <div className="max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder={t('emailForPdf')}
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-center"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full max-w-xs bg-[#D4AF37] hover:bg-[#D4AF37]/90 disabled:bg-gray-300 text-[#1B365D] font-semibold py-3 px-6 rounded-md transition-all text-lg"
                >
                  {loading ? t('redirecting') : t('fullReport')}
                </button>
                <p className="text-xs text-gray-400">{t('oneTimePayment')}</p>
              </div>
            </div>

            {/* Expert CTA */}
            <div className="bg-[#1B365D]/5 rounded-lg border border-[#D4AF37]/30 p-6 text-center">
              <p className="text-lg font-semibold text-[#1B365D] mb-2">{t('expertCtaTitle')}</p>
              <p className="text-sm text-gray-600 mb-4">{t('expertCtaDesc')}</p>
              <a
                href="https://sinotradecompliance.com/en/quote/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1B365D] font-semibold py-2.5 px-6 rounded-md transition-all"
              >
                {t('expertCtaBtn')}
              </a>
              <p className="text-xs text-gray-400 mt-2">{t('expertCtaPrice')}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
