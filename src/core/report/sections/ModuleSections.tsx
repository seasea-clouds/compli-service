// @ts-nocheck
/**
 * 模块专有区块调度器
 * 根据 module 类型渲染对应的专属区块
 */
import type { BaseReportData, ModuleType } from '../types';
import type { GaccExtra, CccExtra, NmpaExtra, LabelExtra, CrossborderExtra, TrademarkExtra } from '../types';

// ─── GACC 专属区块 ─────────────────────────────────────────────────────

export function GaccSections({ result }: { result: any }) {
  return (
    <>
      {/* 渠道策略 */}
      {result.channels?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>🛒</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Channel Strategy</h2>
          </div>
          <div className="space-y-4">
            {result.channels.map((ch, i) => (
              <div key={i} className={`rounded-lg p-4 border ${
                ch.suitability === 'high' ? 'bg-green-50 border-green-200' :
                ch.suitability === 'medium' ? 'bg-amber-50 border-amber-200' :
                'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-bold text-primary-navy">{ch.channel}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    ch.suitability === 'high' ? 'bg-green-200 text-green-800' :
                    ch.suitability === 'medium' ? 'bg-amber-200 text-amber-800' :
                    'bg-gray-200 text-gray-600'
                  }`}>{ch.suitability.toUpperCase()}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{ch.description}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-green-600 font-medium">✅ Advantages</p>
                    <ul className="list-disc list-inside text-gray-500">
                      {ch.advantages.map((a, j) => <li key={j}>{a}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p className="text-red-500 font-medium">⚠️ Disadvantages</p>
                    <ul className="list-disc list-inside text-gray-500">
                      {ch.disadvantages.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                  </div>
                </div>
                <div className="mt-2 flex gap-4 text-xs text-gray-500">
                  <span>⏱️ {ch.timeline}</span>
                  <span>💰 {ch.costRange}</span>
                  {ch.gaccRequired && <span className="text-amber-600 font-medium">📋 GACC required</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 关税与税收 */}
      {result.tariffInfo && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>🏷️</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Tariff & Tax Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              ['HS Code', result.tariffInfo.hsCode],
              ['MFN Rate', result.tariffInfo.mfnRate],
              ['VAT', result.tariffInfo.vatRate],
              ['Consumption Tax', result.tariffInfo.consumptionTax],
              ['Total Tax Burden', result.tariffInfo.totalTaxBurden],
            ].map(([label, val]) => (
              <div key={label} className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{val || '—'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 风险矩阵 */}
      {result.riskMatrix?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>📊</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Risk Assessment Matrix</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-gray-500 font-medium">Dimension</th>
                  <th className="text-center py-2 text-gray-500 font-medium">Rating</th>
                  <th className="text-right py-2 text-gray-500 font-medium">Explanation</th>
                </tr>
              </thead>
              <tbody>
                {result.riskMatrix.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-4 text-gray-700">{r.dimension}</td>
                    <td className="text-center py-2">{r.rating}</td>
                    <td className="text-right py-2 text-gray-500">{r.explanation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 文档指南 */}
      {result.documentGuide?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>📋</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Document Guide</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-2 text-gray-500 font-medium">Document</th>
                  <th className="text-left py-2 pr-2 text-gray-500 font-medium">Format</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Common Error</th>
                </tr>
              </thead>
              <tbody>
                {result.documentGuide.map((d, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-2 text-sm font-medium text-gray-700">{d.name}</td>
                    <td className="py-2 pr-2 text-xs text-gray-500">{d.format}</td>
                    <td className="py-2 text-xs text-red-500">{d.commonError}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 实验室检测 */}
      {result.labTests?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>🔬</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Lab Testing Requirements</h2>
          </div>
          <div className="flex flex-wrap gap-2 mb-3">
            {result.labTests.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{t}</span>
            ))}
          </div>
          {result.testCostRange && <p className="text-sm text-gray-500">💰 Cost range: <strong className="text-gray-900">{result.testCostRange}</strong></p>}
          {result.labGuide && <p className="text-sm text-gray-600 mt-2">{result.labGuide}</p>}
        </div>
      )}

      {/* 标签合规 */}
      {result.labelGuide?.requiredItems?.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
            <span>🏷️</span>
            <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Label Compliance (GB 7718)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 pr-2 text-gray-500 font-medium">Field</th>
                  <th className="text-left py-2 text-gray-500 font-medium">Common Mistake</th>
                </tr>
              </thead>
              <tbody>
                {result.labelGuide.requiredItems.map((item, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-2 pr-2 font-medium text-gray-700">{item.field}</td>
                    <td className="py-2 text-xs text-red-500">{item.commonMistake}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

// ─── 非 GACC 模块调度 ──────────────────────────────────────────────────

export function ModuleSections({ module: mod, result }: { module: string; result: BaseReportData }) {
  switch (mod) {
    case 'GACC Food Registration':
      return <GaccSections result={result as any} />;
    case 'CCC Certification':
      return <CccSpecificSections result={result as any} />;
    case 'Chinese Label Compliance':
      return <LabelSpecificSections result={result as any} />;
    case 'Cosmetics Filing (NMPA)':
      return <NmpaSpecificSections result={result as any} />;
    case 'Cross-Border E-commerce':
      return <CrossborderSpecificSections result={result as any} />;
    case 'Brand Protection':
      return <TrademarkSpecificSections result={result as any} />;
    default:
      return null;
  }
}

// ─── 各模块专属区块 ────────────────────────────────────────────────────

function CccSpecificSections({ result }: { result: any }) {
  if (!result.certificationBody && !result.testingStandards?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🔒</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">CCC Certification Details</h2>
      </div>
      {result.certificationBody && (
        <div className="mb-3">
          <p className="text-xs text-gray-500">Recommended Certification Body</p>
          <p className="text-sm font-semibold text-gray-900">{result.certificationBody}</p>
        </div>
      )}
      {result.testingStandards?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Testing Standards</p>
          <div className="flex flex-wrap gap-2">
            {result.testingStandards.map((s, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{s}</span>
            ))}
          </div>
        </div>
      )}
      {result.factoryAuditRequirements?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Factory Audit Requirements</p>
          <ul className="space-y-1">
            {result.factoryAuditRequirements.map((r, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-400 mt-1">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function LabelSpecificSections({ result }: { result: any }) {
  if (!result.gb7718Details?.length && !result.gb28050Details?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🏷️</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Label Compliance</h2>
      </div>
      {result.gb7718Details?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">GB 7718 — Mandatory Elements</p>
          <ul className="space-y-1">
            {result.gb7718Details.map((d, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gold mt-0.5">▸</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
      {result.gb28050Details?.length > 0 && (
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">GB 28050 — Nutrition Labeling</p>
          <ul className="space-y-1">
            {result.gb28050Details.map((d, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gold mt-0.5">▸</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function NmpaSpecificSections({ result }: { result: any }) {
  if (!result.filingType && !result.testingRequirements?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>💄</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">NMPA Cosmetics Filing</h2>
      </div>
      {result.filingType && (
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${
            result.filingType === 'registration' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'
          }`}>
            {result.filingType === 'registration' ? '🔴 Full Registration Required' : '🟢 Notification Filing'}
          </span>
        </div>
      )}
      {result.testingRequirements?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Testing Requirements</p>
          <div className="flex flex-wrap gap-2">
            {result.testingRequirements.map((t, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{t}</span>
            ))}
          </div>
        </div>
      )}
      {result.chineseRPActionItems?.length > 0 && (
        <div className="mt-3">
          <p className="text-xs text-gray-500 mb-1">Chinese Responsible Person — Action Items</p>
          <ul className="space-y-1">
            {result.chineseRPActionItems.map((a, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-400 mt-1">•</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function CrossborderSpecificSections({ result }: { result: any }) {
  if (!result.platformRequirements?.length && !result.logisticsModels?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>📦</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Cross-Border E-commerce</h2>
      </div>
      {result.platformRequirements?.length > 0 && (
        <div className="space-y-3 mb-4">
          <p className="text-xs text-gray-500 font-medium uppercase">Platform Requirements</p>
          {result.platformRequirements.map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm font-bold text-primary-navy mb-1">{p.platform}</p>
              <ul className="space-y-0.5">
                {p.requirements.map((r, j) => (
                  <li key={j} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-gray-400">•</span>
                    {r}
                  </li>
                ))}
              </ul>
              {p.fees && <p className="text-xs text-gray-500 mt-1">💰 {p.fees}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TrademarkSpecificSections({ result }: { result: any }) {
  if (!result.niceClasses?.length && !result.registrationPath) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>®️</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Trademark Registration</h2>
      </div>
      {result.registrationPath && (
        <div className="mb-3">
          <p className="text-xs text-gray-500">Registration Path</p>
          <p className="text-sm font-semibold text-gray-900">{result.registrationPath}</p>
        </div>
      )}
      {result.niceClasses?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">Recommended Nice Classes</p>
          <div className="flex flex-wrap gap-2">
            {result.niceClasses.map((c, i) => (
              <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                Class {c.class}: {c.description}
              </span>
            ))}
          </div>
        </div>
      )}
      {result.customsRecordalSteps?.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-1">Customs Recordal Steps</p>
          <ul className="space-y-1">
            {result.customsRecordalSteps.map((s, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-gray-400 mt-1">{i+1}.</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
