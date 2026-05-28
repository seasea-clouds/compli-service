/**
 * 所有模块共用的报告区块
 * 从 template.tsx 提取，保持视觉风格一致
 */
import type { BaseReportData, ReportLabels, RiskDimension } from '../types';

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

// ─── 1. 决策摘要 ───────────────────────────────────────────────────────

export function DecisionSummary({ result }: { result: BaseReportData }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>📋</span>} label="Assessment Result" />
      <div className="flex flex-wrap gap-4 mb-4">
        <RiskBadge level={result.isHighRisk ? 'high' : 'low'} />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
          🎯 Risk Score: {result.riskScore}/10
        </span>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
        <p className="text-lg font-semibold text-primary-navy">{result.oneLineDecision}</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{result.executiveSummary}</p>
      {result.viability && (
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <span>📊 Viability:</span>
          <span className="font-semibold text-primary-navy">{result.viability}</span>
        </div>
      )}
    </div>
  );
}

// ─── 2. 法规框架 ──────────────────────────────────────────────────────

export function RegulationsSection({ result }: { result: BaseReportData }) {
  if (!result.regulations?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>⚖️</span>} label="Regulatory Framework" />
      <div className="space-y-3">
        {result.regulations.map((reg, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${reg.relevance === 'primary' ? 'bg-red-500' : 'bg-amber-400'}`} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{reg.name}</p>
              <p className="text-xs text-gray-500">{reg.number} | {reg.issuingAuthority} | Effective: {reg.effectiveDate}</p>
              <p className="text-sm text-gray-600 mt-1">{reg.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 3. 所需文件 ──────────────────────────────────────────────────────

export function DocumentsSection({ result }: { result: BaseReportData }) {
  if (!result.requiredDocuments?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>📄</span>} label="Required Documents" />
      <ul className="space-y-2">
        {result.requiredDocuments.map((doc, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-gold mt-0.5">▸</span>
            {doc}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── 4. 实施路线图 ─────────────────────────────────────────────────────

export function TimelineSection({ result }: { result: BaseReportData }) {
  if (!result.timelinePhases?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>🗓️</span>} label="Implementation Roadmap" />
      <div className="space-y-4">
        {result.timelinePhases.map((phase, i) => (
          <div key={i} className="relative pl-6 border-l-2 border-gold/40">
            <div className="absolute left-[-5px] top-1 w-2 h-2 rounded-full bg-gold" />
            <p className="text-sm font-semibold text-primary-navy">{phase.phase}</p>
            <p className="text-xs text-gold font-medium mb-1">{phase.duration}</p>
            <ul className="space-y-1">
              {phase.activities.map((act, j) => (
                <li key={j} className="text-sm text-gray-600 flex items-start gap-1.5">
                  <span className="text-gray-400 mt-1">•</span>
                  {act}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 5. 费用估算 ──────────────────────────────────────────────────────

export function CostSection({ result }: { result: BaseReportData }) {
  if (!result.costBreakdown?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>💰</span>} label="Cost Estimation" />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 pr-4 text-gray-500 font-medium">Item</th>
              <th className="text-right py-2 pr-4 text-gray-500 font-medium">Est. Cost</th>
              <th className="text-right py-2 text-gray-500 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {result.costBreakdown.map((c, i) => (
              <tr key={i} className="border-b border-gray-100">
                <td className="py-2 pr-4 text-gray-700">{c.item}</td>
                <td className="text-right py-2 pr-4 text-gray-900 font-medium">{c.estimatedCost}</td>
                <td className="text-right py-2 text-gray-500">{c.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {result.totalCostRange && (
        <div className="mt-4 bg-gold/5 rounded-lg p-3 text-center border border-gold/20">
          <p className="text-sm text-gray-500">Estimated Total Cost</p>
          <p className="text-xl font-bold text-primary-navy">{result.totalCostRange}</p>
        </div>
      )}
    </div>
  );
}

// ─── 6. 前瞻 ──────────────────────────────────────────────────────────

export function HorizonSection({ result }: { result: BaseReportData }) {
  if (!result.horizonScan?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>🔭</span>} label="Horizon Scan" />
      <div className="space-y-3">
        {result.horizonScan.map((h, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className={`mt-0.5 text-lg ${
              h.impact === 'high' ? '🔴' : h.impact === 'medium' ? '🟡' : '🟢'
            }`} />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{h.topic}</p>
              <p className="text-xs text-gray-500 mb-1">{h.timeframe} | {h.impact.toUpperCase()} impact{h.actionRequired ? ' | ⚠️ Action required' : ''}</p>
              <p className="text-sm text-gray-600">{h.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 7. 术语表 ─────────────────────────────────────────────────────────

export function GlossarySection({ glossary }: { glossary: { term: string; def: string }[] }) {
  if (!glossary?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>📖</span>} label="Glossary" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {glossary.map((g, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm font-bold text-primary-navy mb-1">{g.term}</p>
            <p className="text-xs text-gray-600">{g.def}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
