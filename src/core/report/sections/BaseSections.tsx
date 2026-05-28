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
  
  const barWidths = [16, 20, 16, 12, 18, 12, 6];
  const offsets = [2, 20, 42, 58, 72, 84, 92];
  const colorGroups = ['bg-blue-400', 'bg-blue-400', 'bg-gold', 'bg-gold', 'bg-green-400', 'bg-green-400', 'bg-primary-navy'];
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={<span>🗓️</span>} label="Implementation Roadmap" />
      
      {/* Phase list with badges */}
      <div className="space-y-3 mb-6">
        {result.timelinePhases.map((phase: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className={"w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 " + (i === result.timelinePhases.length - 1 ? 'bg-gold text-primary-navy' : 'bg-primary-navy text-white')}>
              {i + 1}
            </div>
            <div className="flex-1 bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm text-gray-900">{phase.phase}</h3>
                <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{phase.duration}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{(phase.activities || (phase.description ? [phase.description] : [])).join(', ')}</p>
              <div className="flex gap-2 mt-1.5">
                <span className={"text-[10px] px-1.5 py-0.5 rounded " + (phase.responsible === 'SinoTrade' ? 'bg-blue-100 text-blue-700' : phase.responsible === 'Both' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700')}>
                  {phase.responsible === 'SinoTrade' ? '🤝 We handle' : phase.responsible === 'Both' ? '🔄 Joint' : '📋 Client'}
                </span>
                {(phase.dependencies || []).map((dep: string, j: number) => (
                  <span key={j} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">← {dep}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline Summary */}
      {result.estimatedTimeline && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-lg font-bold text-blue-800">Estimated Total: {result.estimatedTimeline}</p>
          {result.detailedTimeline && <p className="text-sm text-gray-700 mt-1">{result.detailedTimeline}</p>}
        </div>
      )}

      {/* Gantt-style timeline chart */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse" style={{ minWidth: '650px' }}>
          <thead>
            <tr>
              <th className="text-left p-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider w-[30%]">Phase</th>
              <th className="text-left p-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider">Timeline</th>
              <th className="text-center p-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider w-[12%]">Duration</th>
              <th className="text-center p-1.5 text-[9px] font-bold text-gray-500 uppercase tracking-wider w-[10%]">Owner</th>
            </tr>
          </thead>
          <tbody>
            {result.timelinePhases.map((phase: any, i: number) => {
              const w = barWidths[i % barWidths.length];
              const off = offsets[i % offsets.length];
              const cg = colorGroups[i % colorGroups.length];
              return (
                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                  <td className="p-1.5">
                    <div className="flex items-center gap-1.5">
                      <div className={"w-1.5 h-1.5 rounded-full " + cg}></div>
                      <span className="text-[10px] font-medium text-gray-800">{phase.phase}</span>
                    </div>
                    <p className="text-[8px] text-gray-400 ml-3 truncate max-w-[180px]">{(phase.activities || (phase.description ? [phase.description] : []))[0] || ''}</p>
                  </td>
                  <td className="p-1.5 relative">
                    <div className="h-6 bg-gray-100 rounded relative overflow-hidden w-full">
                      <div className={"absolute top-1 h-4 rounded-sm " + cg + " opacity-80"} style={{ left: off + '%', width: w + '%', minWidth: '20px' }}>
                        <div className="h-full w-full rounded-sm opacity-20 bg-white"></div>
                      </div>
                      <div className={"absolute top-0.5 w-5 h-5 border-2 bg-white rounded-sm rotate-45 flex items-center justify-center " + cg.replace('bg-', 'border-')} style={{ left: Math.min(off + w + 2, 94) + '%', marginLeft: '-10px' }}>
                        <div className={"w-2 h-2 rounded-sm " + cg}></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-1.5 text-center">
                    <span className="text-[9px] font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">{phase.duration}</span>
                  </td>
                  <td className="p-1.5 text-center">
                    <span className={"text-[8px] px-1 py-0.5 rounded font-medium " + (phase.responsible === 'SinoTrade' ? 'bg-blue-100 text-blue-700' : phase.responsible === 'Both' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700')}>
                      {phase.responsible === 'SinoTrade' ? '🤝' : phase.responsible === 'Both' ? '🔄' : '📋'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="mt-2 flex justify-end gap-4 text-[9px] text-gray-400">
          <span className="flex items-center gap-1">◈ Milestone</span>
          <span className="flex items-center gap-1">▬ Phase duration</span>
        </div>
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
