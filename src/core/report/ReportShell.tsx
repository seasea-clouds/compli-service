/**
 * ReportShell — 模块感知报告外壳
 * 
 * 组合：Header + 产品信息 + 共享区块 + 模块专有区块 + CTA + Footer
 * 向后兼容 template.tsx
 */
import type { BaseReportData, ReportLabels, ReportData } from './types';
import {
  DecisionSummary, RegulationsSection, DocumentsSection,
  TimelineSection, CostSection, HorizonSection, GlossarySection,
} from './sections/BaseSections';
import { ModuleSections, CommonSections } from './sections/ModuleSections';
import { getPhase1Items, getGlossary } from './template';

interface ReportShellProps {
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
  result: BaseReportData & Record<string, any>;
  nextSteps?: string[];
  generatedAt: string;
}

export default function ReportShell(props: ReportShellProps) {
  const { reportId, module, locale, labels, productInfo, result, nextSteps, generatedAt } = props;
  const href = (path: string) => `/${locale || 'en'}${path}`;

  // 使用 template.tsx 的工具函数获取模块数据
  const phase1 = getPhase1Items(module);
  const glossary = result.glossary || getGlossary(module);

  const formattedDate = generatedAt ? new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : '—';

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-none">
      {/* ═══ HEADER ═══ */}
      <div className="bg-primary-navy text-white px-8 pt-8 pb-6 print:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
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
              <p className="text-white/40 mt-1 uppercase tracking-wider">CONFIDENTIAL</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/70">
            <span>Prepared for: <strong className="text-white">{productInfo.name || 'Client'}</strong></span>
            <span>Category: <strong className="text-white">{productInfo.category}</strong></span>
            <span>Origin: <strong className="text-white">{productInfo.originCountry || '—'}</strong></span>
            {productInfo.hsCode && <span>HS Code: <strong className="text-white">{productInfo.hsCode}</strong></span>}
          </div>

          {/* Executive Dashboard */}
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className={`text-4xl font-bold mb-1 ${result.riskScore >= 7 ? 'text-red-400' : result.riskScore >= 4 ? 'text-amber-400' : 'text-green-400'}`}>{result.riskScore || 0}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Risk Score</p>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${result.riskScore >= 7 ? 'bg-red-400 w-3/4' : result.riskScore >= 4 ? 'bg-amber-400 w-1/2' : 'bg-green-400 w-1/4'}`}></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className={`text-lg font-bold mb-1 ${result.riskScore >= 7 ? 'text-red-400' : result.riskScore >= 4 ? 'text-amber-400' : 'text-green-400'}`}>{result.riskScore >= 7 ? '🔴' : result.riskScore >= 4 ? '🟡' : '🟢'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Verdict</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className="text-lg font-bold text-white mb-1">{result.estimatedTimeline || '—'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Timeline</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className="text-lg font-bold text-white mb-1">{result.totalCostRange || '—'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Total Cost</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BODY — 产品信息 ═══ */}
      <div className="px-8 py-6 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>📦</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">{labels.sectionProduct}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              [labels.labelProduct, productInfo.name],
              [labels.labelCategory, productInfo.category],
              [labels.labelOrigin, productInfo.originCountry],
              [productInfo.hsCode ? labels.labelHsCode : null, productInfo.hsCode],
            ].filter(([k]) => k).map(([label, val]) => (
              <div key={label as string} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{val || '—'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ 共享区块 ═══ */}
        <DecisionSummary result={result as BaseReportData} />
        <RegulationsSection result={result as BaseReportData} />
        <DocumentsSection result={result as BaseReportData} />
        <TimelineSection result={result as BaseReportData} />

        {/* ═══ 模块专有区块 ═══ */}
        <ModuleSections module={module} result={result as BaseReportData} />

        {/* ═══ 通用市场/渠道区块 ═══ */}
        <CommonSections result={result as BaseReportData} />

        {/* ═══ 费用 + 前瞻 + 术语 ═══ */}
        <CostSection result={result as BaseReportData} />
        <HorizonSection result={result as BaseReportData} />
        <GlossarySection glossary={glossary} />

        {/* ═══ 下一步 ═══ */}
        {(nextSteps || []).length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
              <span>🚀</span>
              <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">{labels.sectionNextSteps}</h2>
            </div>
            <ol className="space-y-3">
              {(nextSteps || []).map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-gold/20 text-primary-navy rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-sm text-gray-700 pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* ═══ CTA ═══ */}
        <div className="bg-gradient-to-r from-primary-navy to-primary-navy/90 rounded-xl p-8 text-center">
          <h3 className="text-xl font-bold text-gold mb-2">{labels.ctaTitle}</h3>
          <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">{labels.ctaDesc}</p>
          <a href={href('/quote')} className="inline-block bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-8 py-3 rounded-md transition-all shadow-lg">
            {labels.ctaBtn}
          </a>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="bg-gray-900 text-white/60 px-8 py-6 text-xs flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white">{labels.footerName}</span>
          <span>{labels.footerAddress}</span>
          <span>{labels.footerEmail}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span>CONFIDENTIAL</span>
          <span>Report #{reportId}</span>
        </div>
      </div>
    </div>
  );
}
