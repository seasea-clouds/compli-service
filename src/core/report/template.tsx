/**
 * 报告模板 — 专业版（18 模块完整报告）
 * 价值定位：$10,000 级中国市场准入可行性报告
 */

import type { GaccResult, Regulation, TimelinePhase, CostBreakdown, HorizonItem } from "../../../modules/gacc/rules";

interface ReportLabels {
  title: string;
  sectionProduct: string;
  sectionResult: string;
  sectionDocuments: string;
  sectionNextSteps: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  footerName: string;
  footerAddress: string;
  footerEmail: string;
  labelProduct: string;
  labelCategory: string;
  labelHsCode: string;
  labelOrigin: string;
  gaccRequired: string;
  gaccNotRequired: string;
}

interface ReportTemplateProps {
  reportId: string;
  module: string;
  locale?: string;
  labels: ReportLabels;
  productInfo: {
    name: string;
    category: string;
    hsCode?: string;
    originCountry: string;
  };
  result: GaccResult;
  nextSteps: string[];
  generatedAt: string;
}

// ─── SVG Icons ─────────────────────────────────────────────────────────

function Icon({ svg, w = 4, h = 4, color = "text-gold" }: { svg: string; w?: number; h?: number; color?: string }) {
  return (
    <svg className={`w-${w} h-${h} ${color} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={svg} />
    </svg>
  );
}

const I = {
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  doc: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  alert: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  check: "M5 13l4 4L19 7",
  x: "M6 18L18 6M6 6l12 12",
  globe: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  trendUp: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  dollar: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  lightbulb: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  flag: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
};

// ─── 子组件 ────────────────────────────────────────────────────────────

function SectionTitle({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
      {icon}
      <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">{label}</h2>
    </div>
  );
}

function RiskBadge({ level }: { level: 'high' | 'low' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
      level === 'high' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
    }`}>
      {level === 'high' ? '🔴 High Risk' : '🟢 Low Risk'}
    </span>
  );
}

function ValueCard({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`bg-gray-50 rounded-lg p-3 ${className}`}>
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 主组件
// ═══════════════════════════════════════════════════════════════════════

export function ReportTemplate(props: ReportTemplateProps) {
  const {
    reportId, module, locale, labels,
    productInfo, result, generatedAt,
  } = props;
  const href = (path: string) => `/${locale || 'en'}${path}`;
  const riskLevel = result.isHighRisk ? 'high' : 'low';
  const formattedDate = generatedAt ? new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : '—';

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-none">
      
      {/* ═══════════════════════════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="bg-primary-navy text-white px-8 py-8 print:bg-gray-900 relative overflow-hidden">
        {/* Premium background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
          <svg viewBox="0 0 200 200"><path d="M100 0L200 100L100 200L0 100Z" fill="white"/></svg>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                <p className="text-gold text-sm font-semibold uppercase tracking-widest">{module}</p>
              </div>
              <h1 className="text-2xl font-bold">{labels.title}</h1>
            </div>
            <div className="text-right text-xs">
              <p className="text-white/60">Report #{reportId}</p>
              <p className="text-white/60">{formattedDate}</p>
              <p className="text-white/40 mt-1">CONFIDENTIAL</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/70">
            <span>Prepared for: <strong className="text-white">{productInfo.name || 'Client'}</strong></span>
            <span>Category: <strong className="text-white">{productInfo.category}</strong></span>
            <span>Origin: <strong className="text-white">{productInfo.originCountry}</strong></span>
            {productInfo.hsCode && <span>HS Code: <strong className="text-white">{productInfo.hsCode}</strong></span>}
          </div>
          
          {/* Risk Score Banner — Executive Dashboard */}
          <div className="mt-5 grid grid-cols-4 gap-3">
            <div className="col-span-1 bg-white/10 rounded-lg p-4 text-center border border-white/10">
              <p className={`text-3xl font-bold mb-1 ${result.riskScore >= 7 ? 'text-red-400' : result.riskScore >= 4 ? 'text-amber-400' : 'text-green-400'}`}>{result.riskScore}</p>
              <p className="text-[10px] text-white/60 uppercase tracking-wider">Risk Score</p>
            </div>
            <div className="col-span-3 bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-sm font-semibold mb-1">{result.oneLineDecision}</p>
              <p className="text-xs text-white/70">{result.riskDimensions.map(d => d.color + ' ' + d.dimension).join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 1: EXECUTIVE RISK SCORECARD
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 bg-gradient-to-r from-gold/5 to-transparent border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.shield} w={5} h={5} />} label="EXECUTIVE RISK SCORECARD" />
        
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{result.executiveSummary}</p>
        
        {/* Radar-style dimensions */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
          {result.riskDimensions.map((d, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
              <p className="text-2xl mb-1">{d.color}</p>
              <p className="text-xs font-bold text-primary-navy">{d.dimension}</p>
              <p className="text-lg font-bold mt-1">{d.score}/10</p>
              <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{d.note}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm font-semibold text-amber-800">Decision: {result.oneLineDecision}</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 2: MARKET ENTRY VIABILITY
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.trendUp} w={5} h={5} />} label="MARKET ENTRY VIABILITY" />
        
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-5 border border-green-100 mb-4">
          <p className="text-lg font-bold text-green-800">🟢 {result.viability}</p>
          <p className="text-sm text-gray-700 mt-2">{result.marketIntel.chinaImportTrend}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Key Drivers</p>
            <ul className="space-y-1">
              {result.marketIntel.keyDrivers.map((d, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-green-500 mt-0.5">✓</span> {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Barriers</p>
            <ul className="space-y-1">
              {result.marketIntel.barriers.map((b, i) => (
                <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-amber-500 mt-0.5">!</span> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-sm text-primary-navy font-semibold bg-primary-navy/5 rounded-lg p-3">
          💡 Recommendation: {result.marketIntel.recommendation}
        </p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 3: CHANNEL STRATEGY
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.flag} w={5} h={5} />} label="CHANNEL STRATEGY COMPARISON" />
        
        <div className="space-y-3">
          {result.channels.map((ch, i) => (
            <div key={i} className={`rounded-lg border p-4 ${
              ch.suitability === 'high' ? 'border-green-300 bg-green-50' :
              ch.suitability === 'medium' ? 'border-amber-300 bg-amber-50' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-sm text-gray-900">
                    {ch.suitability === 'high' ? '✅ ' : ch.suitability === 'medium' ? '⚠️ ' : 'ℹ️ '}
                    {ch.channel}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{ch.description}</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  ch.suitability === 'high' ? 'bg-green-200 text-green-800' :
                  ch.suitability === 'medium' ? 'bg-amber-200 text-amber-800' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {ch.suitability === 'high' ? 'RECOMMENDED' : ch.suitability === 'medium' ? 'ALTERNATIVE' : 'LIMITED'}
                </span>
              </div>
              
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <span className="text-gray-500">GACC Required: <strong>{ch.gaccRequired ? '✅ Yes' : '❌ No'}</strong></span>
                <span className="text-gray-500">Timeline: <strong>{ch.timeline}</strong></span>
                <span className="text-gray-500">Cost: <strong>{ch.costRange}</strong></span>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {ch.advantages.slice(0, 2).map((a, j) => (
                  <span key={j} className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded">+ {a}</span>
                ))}
                {ch.disadvantages.slice(0, 1).map((d, j) => (
                  <span key={j} className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded">− {d}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 4: TARIFF & TAX
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.dollar} w={5} h={5} />} label="TARIFF & TAX IMPACT ANALYSIS" />
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          <ValueCard label="MFN Tariff Rate" value={result.tariffInfo.mfnRate} className="bg-red-50" />
          <ValueCard label="VAT" value={result.tariffInfo.vatRate} />
          <ValueCard label="Consumption Tax" value={result.tariffInfo.consumptionTax} />
          <ValueCard label="FTA Rate" value={result.tariffInfo.ftaRate || 'N/A'} className="bg-green-50" />
          <ValueCard label="Comprehensive Tax Burden" value={result.tariffInfo.totalTaxBurden} className="bg-amber-50" />
        </div>
        
        <p className="text-xs text-gray-500 mb-3">
          Note: Actual landed cost depends on FOB price, shipping, insurance, and applicable duty preferences.
          {result.tariffInfo.ftaRate?.includes('Eligible') && ' Your country has an FTA with China — reduced tariff rates may apply.'}
        </p>
        
        {result.countryProfile.ftaWithChina && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-xs font-semibold text-green-800">🌍 FTA Benefit Available</p>
            <p className="text-xs text-green-700 mt-0.5">{result.countryProfile.ftaDetails}</p>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 5: REGULATORY FRAMEWORK
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.flag} w={5} h={5} />} label="REGULATORY FRAMEWORK DEEP DIVE" />
        
        <div className="space-y-2">
          {result.regulations.filter(r => r.relevance === 'primary').map((reg, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-primary-navy">{reg.name}</h3>
                  <p className="text-xs text-gray-500">{reg.number} · {reg.effectiveDate} · {reg.issuingAuthority}</p>
                </div>
                <span className="text-[10px] bg-primary-navy text-white px-1.5 py-0.5 rounded font-bold">PRIMARY</span>
              </div>
              <p className="text-xs text-gray-700 mt-1">{reg.description}</p>
            </div>
          ))}
        </div>
        
        <details className="mt-3">
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary-navy font-semibold">
            + View secondary regulations ({result.regulations.filter(r => r.relevance !== 'primary').length})
          </summary>
          <div className="mt-2 space-y-2">
            {result.regulations.filter(r => r.relevance !== 'primary').map((reg, i) => (
              <div key={i} className="bg-gray-50/50 rounded-lg p-2 border border-gray-100">
                <p className="text-xs font-semibold text-gray-700">{reg.name}</p>
                <p className="text-[10px] text-gray-500">{reg.number}</p>
              </div>
            ))}
          </div>
        </details>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 6: CLASSIFICATION ANALYSIS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.doc} w={5} h={5} />} label="PRODUCT CLASSIFICATION & HS CODE ANALYSIS" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <ValueCard label={labels.labelProduct} value={productInfo.name} />
          <ValueCard label={labels.labelCategory} value={productInfo.category} />
          {productInfo.hsCode && <ValueCard label={labels.labelHsCode} value={productInfo.hsCode} />}
          <ValueCard label={labels.labelOrigin} value={productInfo.originCountry} />
          <ValueCard label="HS Chapter Range" value={result.classification.assignedHsChapter} />
          <ValueCard label="CIQ Code" value={result.classification.ciqCode} />
          <ValueCard label="Risk Classification" value={result.isHighRisk ? '🔴 High Risk (Cat 18)' : '🟢 Standard Risk'} />
        </div>
        
        <div className={`rounded-lg p-3 text-sm ${result.isHighRisk ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
          <p className="font-semibold">{result.isHighRisk ? '⚠️ High Risk Classification' : '✅ Standard Risk Classification'}</p>
          <p className="text-xs text-gray-700 mt-1">{result.classification.riskReason}</p>
        </div>
        
        <p className="text-xs text-gray-500 mt-2">{result.classification.alternativeClassificationNote}</p>
        
        {/* Product info row */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <ValueCard label={labels.labelProduct} value={productInfo.name} />
          <ValueCard label={labels.labelCategory} value={productInfo.category} />
          {productInfo.hsCode && <ValueCard label={labels.labelHsCode} value={productInfo.hsCode} />}
          <ValueCard label={labels.labelOrigin} value={productInfo.originCountry} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 7: RISK ASSESSMENT MATRIX
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.chart} w={5} h={5} />} label="RISK ASSESSMENT HEAT MAP (5×5)" />
        
        {/* Visual heat map */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          {result.riskMatrix.map((item, i) => (
            <div key={i} className={`rounded-lg p-3 border-2 text-center ${
              item.rating === '🔴' ? 'bg-red-50 border-red-300' :
              item.rating === '🟡' ? 'bg-amber-50 border-amber-300' :
              'bg-green-50 border-green-300'
            }`}>
              <p className="text-2xl mb-1">{item.rating}</p>
              <p className="text-xs font-bold text-gray-800 leading-tight">{item.dimension.split(' ').slice(0,3).join(' ')}</p>
              <p className="text-[10px] text-gray-500 mt-1">{item.explanation}</p>
            </div>
          ))}
        </div>
        
        <details>
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary-navy font-semibold">
            + View risk mitigation strategies
          </summary>
          <div className="mt-2 space-y-1.5">
            {result.riskMatrix.filter(r => r.rating !== '🟢').map((item, i) => (
              <div key={i} className="bg-primary-navy/5 rounded p-2 text-xs">
                <span className="font-bold text-primary-navy">{item.rating} {item.dimension}:</span>{' '}
                <span className="text-gray-600">Mitigation recommended. {item.explanation}</span>
              </div>
            ))}
            {result.riskMatrix.filter(r => r.rating === '🟢').length === result.riskMatrix.length && (
              <p className="text-xs text-green-700">✅ All dimensions at low risk. Standard compliance pathway is sufficient.</p>
            )}
          </div>
        </details>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 8: DOCUMENT REQUIREMENTS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.doc} w={5} h={5} />} label="DOCUMENT REQUIREMENTS & PREPARATION GUIDE" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-primary-navy text-white">
                <th className="text-left p-2 font-semibold">#</th>
                <th className="text-left p-2 font-semibold">Document Name</th>
                <th className="text-left p-2 font-semibold">Format</th>
                <th className="text-left p-2 font-semibold">Notarization</th>
                <th className="text-left p-2 font-semibold">Validity</th>
                <th className="text-left p-2 font-semibold">Common Error</th>
              </tr>
            </thead>
            <tbody>
              {result.documentGuide.map((doc, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 text-gray-500 font-bold">{i + 1}</td>
                  <td className="p-2 font-semibold text-gray-800">{doc.name}</td>
                  <td className="p-2 text-gray-600">{doc.format}</td>
                  <td className="p-2 text-gray-600">{doc.notarization}</td>
                  <td className="p-2 text-gray-600">{doc.validity}</td>
                  <td className="p-2 text-red-600 text-[10px]">{doc.commonError}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 9: LAB TESTING
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.doc} w={5} h={5} />} label="TESTING & LABORATORY REQUIREMENTS" />
        
        <p className="text-sm text-gray-700 mb-3">{result.labGuide}</p>
        
        <div className="grid grid-cols-2 gap-2">
          {result.labTests.map((test, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2 border border-gray-100">
              <span className="w-5 h-5 bg-gold/10 text-gold rounded flex items-center justify-center text-xs font-bold flex-shrink-0">🔬</span>
              <span className="text-xs text-gray-700">{test}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 10: LABEL COMPLIANCE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.doc} w={5} h={5} />} label="LABEL & PACKAGING COMPLIANCE (GB 7718 / GB 28050)" />
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-primary-navy text-white">
                <th className="text-left p-2 font-semibold">Field</th>
                <th className="text-left p-2 font-semibold">Requirement</th>
                <th className="text-left p-2 font-semibold text-red-300">⚠️ Common Mistake</th>
              </tr>
            </thead>
            <tbody>
              {result.labelGuide.requiredItems.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold text-gray-800 whitespace-nowrap">{item.field}</td>
                  <td className="p-2 text-gray-600">{item.requirement}</td>
                  <td className="p-2 text-red-600 text-[10px]">{item.commonMistake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <details>
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary-navy font-semibold">
            + GB 7718 Key Requirements
          </summary>
          <div className="mt-2 space-y-1">
            {result.labelGuide.gb7718Highlights.map((h, i) => (
              <p key={i} className="text-[11px] text-gray-600 flex items-start gap-1">
                <span className="text-gold mt-0.5">•</span> {h}
              </p>
            ))}
          </div>
        </details>

        <details className="mt-2">
          <summary className="text-xs text-gray-500 cursor-pointer hover:text-primary-navy font-semibold">
            + GB 28050 Nutrition Label Requirements
          </summary>
          <div className="mt-2 space-y-1">
            {result.labelGuide.gb28050Highlights.map((h, i) => (
              <p key={i} className="text-[11px] text-gray-600 flex items-start gap-1">
                <span className="text-gold mt-0.5">•</span> {h}
              </p>
            ))}
          </div>
        </details>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 11: IMPLEMENTATION ROADMAP
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.clock} w={5} h={5} />} label="IMPLEMENTATION ROADMAP" />
        
        <div className="space-y-3">
          {result.timelinePhases.map((phase, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                i === result.timelinePhases.length - 1 ? 'bg-gold text-primary-navy' : 'bg-primary-navy text-white'
              }`}>
                {i + 1}
              </div>
              <div className="flex-1 bg-white rounded-lg p-3 border border-gray-100">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-sm text-gray-900">{phase.phase}</h3>
                  <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{phase.duration}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{phase.description}</p>
                <div className="flex gap-2 mt-1.5">
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                    phase.responsible === 'SinoTrade' ? 'bg-blue-100 text-blue-700' :
                    phase.responsible === 'Both' ? 'bg-purple-100 text-purple-700' :
                    'bg-amber-100 text-amber-700'
                  }`}>
                    {phase.responsible === 'SinoTrade' ? '🤝 We handle' : phase.responsible === 'Both' ? '🔄 Joint' : '📋 Client'}
                  </span>
                  {phase.dependencies.map((dep, j) => (
                    <span key={j} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">← {dep}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 12: COST ESTIMATION
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.dollar} w={5} h={5} />} label="TOTAL COST OF COMPLIANCE" />
        
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-primary-navy text-white">
                <th className="text-left p-2 font-semibold">Item</th>
                <th className="text-right p-2 font-semibold">Estimated Cost</th>
                <th className="text-left p-2 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {result.costBreakdown.map((item, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold text-gray-800">{item.item}</td>
                  <td className="p-2 text-right font-bold text-gray-900 whitespace-nowrap">{item.estimatedRange}</td>
                  <td className="p-2 text-gray-500 text-[10px]">{item.notes}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gold/10">
                <td className="p-2 font-bold text-primary-navy">Total Estimated Compliance Cost</td>
                <td className="p-2 text-right font-bold text-primary-navy text-sm">{result.totalCostRange}</td>
                <td className="p-2 text-[10px] text-gray-500">Excludes per-shipment costs (customs brokerage, warehousing, logistics)</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="bg-primary-navy/5 border border-primary-navy/20 rounded-lg p-3">
          <p className="text-xs text-primary-navy">
            💡 Our team provides comprehensive pricing assessment after reviewing your specific product, volume, and requirements. 
            The ranges above are indicative. Contact us for a detailed, no-obligation quote.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 13: TIMELINE ANALYSIS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.clock} w={5} h={5} />} label="TIMELINE ANALYSIS" />
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-lg font-bold text-blue-800">
            Estimated Total: {result.estimatedTimeline}
          </p>
          <p className="text-sm text-gray-700 mt-1">{result.detailedTimeline}</p>
        </div>
        
        {/* Visual timeline bar */}
        <div className="relative pt-2 pb-4">
          <div className="flex items-center">
            {result.timelinePhases.map((phase, i) => (
              <div key={i} className="flex-1 text-center">
                <div className={`h-2 rounded-full mx-0.5 ${
                  i < 2 ? 'bg-blue-300' : i < 4 ? 'bg-gold' : i < 5 ? 'bg-green-400' : 'bg-primary-navy'
                }`} />
                <p className="text-[9px] text-gray-500 mt-1 truncate px-0.5">{phase.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 14: COUNTRY-SPECIFIC ANALYSIS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.globe} w={5} h={5} />} label={`COUNTRY-SPECIFIC ANALYSIS: ${productInfo.originCountry}`} />
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <ValueCard label="Region" value={result.countryProfile.region} />
          <ValueCard label="FTA with China" value={result.countryProfile.ftaWithChina ? '✅ Yes' : '❌ No'} />
          <ValueCard label="Meat Access" value={`${result.countryProfile.bilateralMeatAccess ? '✅ Approved' : '❌ Not approved'}`} />
          <ValueCard label="Aquatic Access" value={`${result.countryProfile.bilateralAquaticAccess ? '✅ Approved' : '❌ Not approved'}`} />
          <ValueCard label="Dairy Approved" value={result.countryProfile.dairyApproved ? '✅ Yes' : '❌ No'} />
          <ValueCard label="Compliance Difficulty" value={result.countryProfile.gaccDifficulty.toUpperCase()} />
          <ValueCard label="Language Note" value={result.countryProfile.languageNote} />
        </div>

        {result.countryProfile.specialRestrictions.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <p className="text-xs font-bold text-red-800 mb-1">🚨 Country-Specific Restrictions</p>
            <ul className="space-y-0.5">
              {result.countryProfile.specialRestrictions.map((r, i) => (
                <li key={i} className="text-xs text-red-700">• {r}</li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-xs text-gray-600">{result.countryProfile.importVolumeNote}</p>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 15: MARKET INTELLIGENCE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.trendUp} w={5} h={5} />} label="COMPETITIVE & MARKET INTELLIGENCE" />
        
        <p className="text-sm text-gray-700 mb-3">{result.competitiveAnalysis}</p>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Consumer Perception</p>
            <p className="text-xs text-gray-700">{result.marketIntel.consumerPerception}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Top Competing Origins</p>
            <ul className="space-y-0.5">
              {result.marketIntel.topOrigins.map((o, i) => (
                <li key={i} className="text-xs text-gray-700">{o.country}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 16: COMMON PITFALLS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.alert} w={5} h={5} />} label="COMMON PITFALLS & REJECTION ANALYSIS" />
        
        <div className="space-y-3">
          {result.commonRejections.map((item, i) => (
            <div key={i} className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <span className="text-lg">🚫</span>
                <div>
                  <h3 className="text-sm font-bold text-red-800">{item.problem}</h3>
                  <p className="text-xs text-red-700 mt-0.5"><strong>Root Cause:</strong> {item.cause}</p>
                  <p className="text-xs text-green-700 mt-1"><strong>Solution:</strong> {item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs text-amber-800">
            💡 Pro Tip: Engaging a compliance consultant before shipment can prevent 90% of these issues. 
            Our pre-submission review process identifies and resolves potential problems before they reach customs.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 17: POST-APPROVAL COMPLIANCE
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.clock} w={5} h={5} />} label="POST-APPROVAL COMPLIANCE & RENEWAL" />
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-primary-navy text-white">
                <th className="text-left p-2 font-semibold">Obligation</th>
                <th className="text-left p-2 font-semibold">Frequency</th>
                <th className="text-left p-2 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody>
              {result.postApprovalObligations.map((ob, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-2 font-semibold text-gray-800">{ob.item}</td>
                  <td className="p-2 whitespace-nowrap">
                    <span className="bg-primary-navy/10 text-primary-navy px-1.5 py-0.5 rounded text-[10px] font-bold">{ob.frequency}</span>
                  </td>
                  <td className="p-2 text-gray-600 text-[10px]">{ob.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MODULE 18: HORIZON SCAN
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.lightbulb} w={5} h={5} />} label="REGULATORY HORIZON SCAN" />
        
        <p className="text-xs text-gray-500 mb-3">Upcoming regulatory changes that may affect your product category in the next 12-24 months:</p>
        
        <div className="space-y-2">
          {result.horizonScan.map((item, i) => (
            <div key={i} className={`rounded-lg border p-3 ${
              item.impact === 'high' ? 'border-red-200 bg-red-50' :
              item.impact === 'medium' ? 'border-amber-200 bg-amber-50' :
              'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xs font-bold text-gray-900">{item.topic}</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Expected: {item.timeframe}</p>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  item.impact === 'high' ? 'bg-red-200 text-red-800' :
                  item.impact === 'medium' ? 'bg-amber-200 text-amber-800' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {item.impact.toUpperCase()} IMPACT
                </span>
              </div>
              <p className="text-[11px] text-gray-700 mt-1">{item.description}</p>
              {item.actionRequired && (
                <p className="text-[10px] text-red-600 mt-1">
                  ⚠️ Action recommended — prepare for this change.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          PREMIUM: VALUE SUMMARY
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-gold/[0.03] to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">FULL COMPLIANCE PACKAGE — WHAT'S INCLUDED</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">📋</p>
            <p className="text-[10px] font-bold text-primary-navy">Regulatory Gap Analysis</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Full HS code & regulation mapping</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">📄</p>
            <p className="text-[10px] font-bold text-primary-navy">Document Preparation</p>
            <p className="text-[9px] text-gray-400 mt-0.5">All forms & translations</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">🔬</p>
            <p className="text-[10px] font-bold text-primary-navy">Lab Test Management</p>
            <p className="text-[9px] text-gray-400 mt-0.5">CNAS accredited lab coordination</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">🏛️</p>
            <p className="text-[10px] font-bold text-primary-navy">Submission & Follow-up</p>
            <p className="text-[9px] text-gray-400 mt-0.5">End-to-end authority liaison</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">🏷️</p>
            <p className="text-[10px] font-bold text-primary-navy">Label Design & Compliance</p>
            <p className="text-[9px] text-gray-400 mt-0.5">GB 7718/28050 compliant</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">🚢</p>
            <p className="text-[10px] font-bold text-primary-navy">Customs Clearance</p>
            <p className="text-[9px] text-gray-400 mt-0.5">First shipment handling</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">📊</p>
            <p className="text-[10px] font-bold text-primary-navy">Compliance Monitoring</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Annual reporting & alerts</p>
          </div>
          <div className="bg-white rounded-lg border border-gray-100 p-3 text-center shadow-sm">
            <p className="text-2xl mb-1">🛡️</p>
            <p className="text-[10px] font-bold text-primary-navy">Post-Approval Support</p>
            <p className="text-[9px] text-gray-400 mt-0.5">Renewal & compliance updates</p>
          </div>
        </div>
        
        <div className="mt-3 bg-primary-navy text-white rounded-lg p-3 text-center">
          <p className="text-sm font-bold">Professional services from <span className="text-gold">{result.totalCostRange || '$3,500-9,500'}</span></p>
          <p className="text-xs text-white/60 mt-0.5">Exact pricing depends on product complexity, origin country, and service scope</p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          RECOMMENDED ACTION PLAN
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<Icon svg={I.flag} w={5} h={5} />} label="RECOMMENDED ACTION PLAN" />
        
        <div className="space-y-3">
          {props.nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-gold/30 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                i === 0 ? 'bg-gold text-primary-navy' : 'bg-gray-100 text-gray-500'
              }`}>
                {i + 1}
              </div>
              <p className="text-sm text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-8 bg-gradient-to-br from-primary-navy to-primary-navy/95 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{labels.ctaTitle}</h3>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">{labels.ctaDesc}</p>
          
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm font-bold text-gold mb-2">🎯 Your Compliance Package Includes:</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-white/80">
              <span>✅ Full GACC registration management</span>
              <span>✅ Chinese label design & compliance</span>
              <span>✅ CNAS lab testing coordination</span>
              <span>✅ Document translation & notarization</span>
              <span>✅ Customs clearance support</span>
              <span>✅ Post-approval compliance monitoring</span>
            </div>
            <p className="text-gold text-sm font-bold mt-3">Limited-time: Full package from {result.totalCostRange}</p>
          </div>

          <a
            href={href('/compli-service/quote')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-primary-navy font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm"
          >
            {labels.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════════════════════════ */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <p className="text-sm font-semibold text-gray-900">{labels.footerName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{labels.footerAddress}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">{labels.footerEmail}</p>
            <p className="text-xs text-gray-500">sinotradecompliance.com</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Report #{reportId}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            This report is prepared for informational purposes only. Regulatory requirements may change without notice.
            Please consult with a qualified compliance professional before taking action.
          </p>
        </div>
      </div>
    </div>
  );
}

export type { ReportTemplateProps, ReportLabels };
