"use client";

import { useState } from "react";
import { checkCcc, CATEGORY_LABELS } from "../../../../modules/ccc/rules";
import { API_BASE } from "@/lib/constants";
import useClientLocale from '@/lib/useClientLocale';

type Step = "form" | "free-result";

export default function CccCheckPage() {
  const [step, setStep] = useState<Step>("form");
  const [input, setInput] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [freeData, setFreeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const locale = useClientLocale();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.category || !input.productName) return;
    const result = checkCcc(input as any);
    setFreeData(result);
    setStep("free-result");
  };

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    try {
      const reportId = `CCC-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      // Store report data in localStorage
      if (freeData) {
        const reportData = {
          id: reportId,
          module: 'CCC Certification',
          productInfo: {
            name: input.productName || '',
            category: CATEGORY_LABELS[input.category as keyof typeof CATEGORY_LABELS] || input.category || '',
            hsCode: input.hsCode || '',
            originCountry: input.originCountry || '',
          },
          result: freeData,
          nextSteps: [
            'Submit completed application form',
            'Engage compliance professional for review',
            'Await regulatory approval',
            'Arrange customs clearance',
            'Schedule annual compliance review',
          ],
          generatedAt: new Date().toISOString(),
        };
        try { localStorage.setItem('compli…ort', JSON.stringify(reportData)); } catch {}
      }

      const res = await fetch(`${API_BASE}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId,
          email: email || undefined,
          locale,
          productId: undefined,
          metadata: { ...input, module: "ccc" },
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Payment failed');
      const data = await res.json();
      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      setError(String(err));
      setLoading(false);
    }
  };

  // Helper to set input values
  const setVal = (name: string, val: string) => setInput(v => ({ ...v, [name]: val }));

  // Get category options
  const catOptions = Object.entries(CATEGORY_LABELS) as [string, string][];

  return (
    <main className="min-h-screen bg-[#F4F6F9]">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8 text-sm text-gray-400">
          <span className={step === "form" ? "text-[#D4AF37] font-semibold" : ""}>1. Product Info</span>
          <span>&rarr;</span>
          <span className={step === "free-result" ? "text-[#D4AF37] font-semibold" : ""}>2. Free Result</span>
        </div>

        {step === "form" && (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 space-y-5">
            <h1 className="text-2xl font-bold text-[#1B365D]">CCC Certification Check</h1>
            <p className="text-sm text-gray-500">Find out if your product requires China Compulsory Certification (CCC) for import.</p>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Category</label>
              <select
                value={input.category || ""}
                onChange={e => setVal("category", e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              >
                <option value="">Select category...</option>
                {catOptions.map(([v, l]) => (<option key={v} value={v}>{l}</option>))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Product Name</label>
              <input
                type="text"
                value={input["productName"] || ""}
                onChange={e => setVal("productName", e.target.value)}
                placeholder={"e.g., Wireless Bluetooth Speaker"}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">HS Code</label>
              <input
                type="text"
                value={input["hsCode"] || ""}
                onChange={e => setVal("hsCode", e.target.value)}
                placeholder={"e.g., 8518.22 (optional)"}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Intended Use</label>
              <input
                type="text"
                value={input["intendedUse"] || ""}
                onChange={e => setVal("intendedUse", e.target.value)}
                placeholder={"e.g., Home use, industrial, medical"}
                className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-[#D4AF37] focus:border-transparent"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1B365D] font-bold py-3 px-6 rounded-lg transition-all text-lg"
            >
              Check My Product
            </button>
          </form>
        )}

        {step === "free-result" && freeData && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#1B365D] mb-4">Free Assessment Result</h2>
              <p className="text-sm text-gray-700 mb-4">{freeData.summary}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Product</p><p className="text-sm font-semibold mt-0.5">{input["productName"]}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Category</p><p className="text-sm font-semibold mt-0.5">{CATEGORY_LABELS[input["category"] as keyof typeof CATEGORY_LABELS] || input["category"]}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">CCC Required</p><p className="text-sm font-semibold mt-0.5">{freeData.requiresCcc ? '✅ Yes' : '❌ May not be required'}</p></div>
              </div>

              {freeData.requiredDocuments && freeData.requiredDocuments.length > 0 && (
                <div>
                  <h3 className="font-semibold text-sm mb-2 text-[#1B365D]">Documents Required</h3>
                  <ul className="space-y-1">
                    {freeData.requiredDocuments.map((d: string, i: number) => (<li key={i} className="flex items-center gap-2 text-sm text-gray-600"><span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"></span>{d}</li>))}
                  </ul>
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 text-center space-y-4">
              <p className="text-lg font-semibold text-[#1B365D]">Get the Full Compliance Report</p>
              <p className="text-sm text-gray-500">Complete report with all required documents, timeline, and next steps.</p>

              <div className="max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder="Email (optional)"
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
                  {loading ? "Redirecting..." : "Full Report — $1"}
                </button>
                <p className="text-xs text-gray-400">One-time payment. Report delivered via web + email.</p>
              </div>
            </div>

            {/* Expert CTA */}
            <div className="bg-[#1B365D] text-white rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-2">💼 Need Professional Help?</h3>
              <p className="text-white/80 mb-6 max-w-lg mx-auto">Our compliance experts can handle the entire process for you.</p>
              <a
                href="https://wa.me/message/HPPZ5X6XZSMLM1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-[#1B365D] font-semibold px-6 py-3 rounded-md transition-all"
              >
                Get a Quote from Our Experts →
              </a>
              <p className="text-white/60 text-sm mt-3">Professional services starting from $500</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}