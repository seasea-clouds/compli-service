"use client";

import { useState } from "react";
import { checkGacc, CATEGORY_LABELS, type GaccCategory, type GaccInput } from "../../../../modules/gacc/rules";
import { API_BASE } from "@/lib/constants";
import useClientLocale from '@/lib/useClientLocale';

type Step = "form" | "free-result";

export default function GaccCheckPage() {
  const [step, setStep] = useState<Step>("form");
  const [input, setInput] = useState<Partial<GaccInput>>({});
  const [email, setEmail] = useState("");
  const [freeData, setFreeData] = useState<ReturnType<typeof checkGacc> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const locale = useClientLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.category || !input.productName || !input.originCountry) return;
    const result = checkGacc(input as GaccInput);
    setFreeData(result);
    setStep("free-result");
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");

    try {
      const reportId = `GACC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      // Store report data in localStorage before redirecting to payment
      if (freeData) {
        const docItems = (freeData.requiredDocuments || []).map((d: string) => ({ label: d, value: 'Required' }));
        const reportData = {
          id: reportId,
          savedInput: input,
          module: 'GACC Food Registration',
          productInfo: {
            name: input.productName || '',
            category: CATEGORY_LABELS[input.category as GaccCategory] || input.category || '',
            hsCode: input.hsCode || '',
            originCountry: input.originCountry || '',
          },
          result: freeData,
          nextSteps: [
            'Submit completed application form with all supporting documents',
            'Engage a certified Chinese label review agency for label compliance',
            'Await GACC review and registration certificate (typically 3-6 months)',
            'Arrange customs clearance documentation for first shipment',
            'Schedule annual compliance review and renewal',
          ],
          generatedAt: new Date().toISOString(),
        };
        try { localStorage.setItem('compli…ort', JSON.stringify(reportData)); console.log('Stored report to localStorage, id:', reportId); } catch(e) { console.error('GACC localStorage failed:', e); }
      }

      const res = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          email: email || undefined,
          locale,
          productId: undefined, // uses default Single Report product
          metadata: {
            module: "gacc",
            productName: input.productName,
            category: input.category,
            originCountry: input.originCountry,
            hsCode: input.hsCode,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Payment failed");
      }

      const data = await res.json();
      // Redirect to Creem checkout
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(String(err));
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-ice">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-400">
          <span className={`${step === "form" ? "text-gold font-semibold" : ""}`}>1. Product Info</span>
          <span>&rarr;</span>
          <span className={`${step === "free-result" ? "text-gold font-semibold" : ""}`}>2. Free Result</span>
        </div>

        {/* Form */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-8 space-y-6">
            <h1 className="text-2xl font-bold text-primary-navy">GACC Food Registration Check</h1>
            <p className="text-gray-500 text-sm">Find out if your product needs GACC registration for export to China.</p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
              <select
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                value={input.category ?? ""}
                onChange={(e) => setInput({ ...input, category: e.target.value as GaccCategory })}
                required
              >
                <option value="">Select product category</option>
                {(Object.entries(CATEGORY_LABELS) as [GaccCategory, string][]).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                placeholder="e.g., Cabernet Sauvignon Red Wine"
                value={input.productName ?? ""}
                onChange={(e) => setInput({ ...input, productName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                  placeholder="e.g., France"
                  value={input.originCountry ?? ""}
                  onChange={(e) => setInput({ ...input, originCountry: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HS Code (optional)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm"
                  placeholder="e.g., 2204.10"
                  value={input.hsCode ?? ""}
                  onChange={(e) => setInput({ ...input, hsCode: e.target.value })}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-primary-navy font-semibold py-3 px-6 rounded-md transition-all"
            >
              Check My Product
            </button>
          </form>
        )}

        {/* Free Result */}
        {step === "free-result" && freeData && (
          <div className="bg-white rounded-lg shadow-sm border p-8 space-y-6">
            <h2 className="text-xl font-bold text-primary-navy">Free Assessment Result</h2>

            <div className={`rounded-lg p-4 ${freeData.requiresRegistration ? "bg-amber-50 border border-amber-200" : "bg-green-50 border border-green-200"}`}>
              <p className="font-semibold">
                {freeData.requiresRegistration
                  ? "✅ Your product requires GACC registration"
                  : "✅ No GACC registration needed"}
              </p>
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <p><strong>Product:</strong> {input.productName}</p>
              <p><strong>Category:</strong> {CATEGORY_LABELS[input.category!]}</p>
              <p><strong>Risk Level:</strong> {freeData.riskCategory === "high" ? "🔴 High" : "🟢 Low"}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-sm mb-2">Documents Required</h3>
              <ul className="space-y-1">
                {freeData.requiredDocuments.slice(0, 5).map((doc, i) => (
                  <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-gray-400">&#x2610;</span>
                    {doc}
                  </li>
                ))}
              </ul>
              {freeData.requiredDocuments.length > 5 && (
                <p className="text-xs text-gray-400 mt-2">+ {freeData.requiredDocuments.length - 5} more in full report</p>
              )}
            </div>

            <div className="border-t pt-6 text-center space-y-4">
              <p className="text-lg font-semibold text-primary-navy">Get the Full Compliance Report</p>
              <p className="text-sm text-gray-500">Complete report with all required documents, timeline, and next steps.</p>

              {/* Email input */}
              <div className="max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder="Email (optional — to receive PDF)"
                  className="w-full border border-gray-300 rounded-md p-2.5 text-sm text-center"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}

              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full max-w-xs bg-gold hover:bg-gold/90 disabled:bg-gray-300 text-primary-navy font-semibold py-3 px-6 rounded-md transition-all text-lg"
                >
                  {loading ? "Redirecting to payment..." : "Full Report — $1"}
                </button>
                <p className="text-xs text-gray-400">
                  One-time payment. Report delivered via web + email.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
