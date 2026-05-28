// @ts-nocheck
/**
 * 模块专有区块调度器
 * 根据 module 类型渲染对应的专属区块
 * 数据来源：各模块 checkXxx() 返回的实际字段
 */
import type { BaseReportData, ReportLabels } from '../types';

// ─── 模块调度入口 ──────────────────────────────────────────────────────

export function ModuleSections({ module: mod, result }: { module: string; result: any }) {
  switch (mod) {
    case 'GACC Food Registration':
      return <GaccSections result={result} />;
    case 'CCC Certification':
      return <CccSections result={result} />;
    case 'Chinese Label Compliance':
      return <LabelSections result={result} />;
    case 'Cosmetics Filing (NMPA)':
      return <NmpaSections result={result} />;
    case 'Cross-Border E-commerce':
      return <CrossborderSections result={result} />;
    case 'Brand Protection':
      return <TrademarkSections result={result} />;
    default:
      return <CommonSections result={result} />;
  }
}

// ─── 通用专有区块（所有模块都用） ────────────────────────────────────

export function CommonSections({ result }: { result: any }) {
  return (
    <>
      {renderMarketIntel(result)}
      {renderChannels(result)}
      {renderDocumentGuide(result)}
      {renderPostApproval(result)}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 通用子区块（各模块共享相同的展示逻辑）
// ═══════════════════════════════════════════════════════════════════════

function renderMarketIntel(result: any) {
  if (!result.marketIntel?.chinaImportTrend) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>📈</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Market Intelligence</h2>
      </div>
      <p className="text-sm text-gray-700 mb-4">{result.marketIntel.chinaImportTrend}</p>
      {result.marketIntel.keyDrivers?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Key Drivers</p>
          <div className="flex flex-wrap gap-2">
            {result.marketIntel.keyDrivers.map((d, i) => (
              <span key={i} className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">📈 {d}</span>
            ))}
          </div>
        </div>
      )}
      {result.marketIntel.barriers?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Barriers</p>
          <div className="flex flex-wrap gap-2">
            {result.marketIntel.barriers.map((b, i) => (
              <span key={i} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-100">⚠️ {b}</span>
            ))}
          </div>
        </div>
      )}
      {result.marketIntel.recommendation && (
        <div className="mt-4 bg-gold/5 rounded-lg p-3 border border-gold/20">
          <p className="text-xs text-gray-500 mb-1">Recommendation</p>
          <p className="text-sm font-semibold text-primary-navy">{result.marketIntel.recommendation}</p>
        </div>
      )}
    </div>
  );
}

function renderChannels(result: any) {
  if (!result.channels?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🛒</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Channel Strategy</h2>
      </div>
      <div className="space-y-4">
        {result.channels.map((ch, i) => (
          <div key={i} className={`rounded-lg p-4 border ${
            ch.suitability === 'high' ? 'bg-green-50 border-green-200' :
            ch.suitability === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold text-primary-navy">{ch.channel}</p>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                ch.suitability === 'high' ? 'bg-green-200 text-green-800' :
                ch.suitability === 'medium' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-600'
              }`}>{ch.suitability?.toUpperCase()}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{ch.description}</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-green-600 font-medium">✅ Advantages</p>
                <ul className="list-disc list-inside text-gray-500">{ch.advantages?.map((a, j) => <li key={j}>{a}</li>)}</ul>
              </div>
              <div>
                <p className="text-red-500 font-medium">⚠️ Disadvantages</p>
                <ul className="list-disc list-inside text-gray-500">{ch.disadvantages?.map((d, j) => <li key={j}>{d}</li>)}</ul>
              </div>
            </div>
            <div className="mt-2 flex gap-4 text-xs text-gray-500">
              <span>⏱️ {ch.timeline}</span>
              <span>💰 {ch.costRange}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderDocumentGuide(result: any) {
  if (!result.documentGuide?.length) return null;
  return (
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
                <td className="py-2 pr-2 text-xs text-gray-500">{d.format || d.notarization || ''}</td>
                <td className="py-2 text-xs text-red-500">{d.commonError}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function renderPostApproval(result: any) {
  if (!result.postApprovalObligations?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🔄</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Post-Approval Obligations</h2>
      </div>
      <div className="space-y-3">
        {result.postApprovalObligations.map((o, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="mt-0.5 w-2 h-2 rounded-full bg-gold flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{o.item}</p>
              <p className="text-xs text-amber-600 font-medium">{o.frequency}</p>
              <p className="text-sm text-gray-600 mt-0.5">{o.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// GACC 专有区块（渠道/关税/分类/风险矩阵/检验/标签/国家档案）
// ═══════════════════════════════════════════════════════════════════════

function GaccSections({ result }: { result: any }) {
  return (
    <>
      {renderChannels(result)}
      {renderTariff(result)}
      {renderClassification(result)}
      {renderRiskMatrix(result)}
      {renderLabTesting(result)}
      {renderLabelGuide(result)}
      {renderCountryProfile(result)}
    </>
  );
}

function renderTariff(result: any) {
  if (!result.tariffInfo?.mfnRate && result.tariffInfo?.mfnRate !== 'N/A') return null;
  if (result.tariffInfo?.mfnRate === 'N/A' && result.tariffInfo?.vatRate === 'N/A') return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🏷️</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Tariff & Tax Summary</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[['HS Code', result.tariffInfo.hsCode], ['MFN Rate', result.tariffInfo.mfnRate], ['VAT', result.tariffInfo.vatRate],
          ['Consumption Tax', result.tariffInfo.consumptionTax], ['Total Tax Burden', result.tariffInfo.totalTaxBurden],
          ['FTA Rate', result.tariffInfo.ftaRate || 'None'],].filter(([_, v]) => v).map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderClassification(result: any) {
  if (!result.classification?.assignedHsChapter) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🔖</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Product Classification</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['HS Chapter', result.classification.assignedHsChapter], ['CIQ Code', result.classification.ciqCode],
          ['Classification', result.classification.isHighRisk ? '🔴 High Risk' : '🟢 Low Risk'],
          ['Risk Reason', result.classification.riskReason],].filter(([_, v]) => v).map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderRiskMatrix(result: any) {
  if (!result.riskMatrix?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>📊</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Risk Assessment Matrix</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-500 font-medium">Dimension</th>
            <th className="text-center py-2 text-gray-500 font-medium">Rating</th>
            <th className="text-right py-2 text-gray-500 font-medium">Explanation</th>
          </tr></thead>
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
  );
}

function renderLabTesting(result: any) {
  if (!result.labTests?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🔬</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Testing Requirements</h2>
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {result.labTests.map((t, i) => (
          <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{t}</span>
        ))}
      </div>
      {result.testCostRange && <p className="text-sm text-gray-500">💰 Cost range: <strong className="text-gray-900">{result.testCostRange}</strong></p>}
      {result.labGuide && <p className="text-sm text-gray-600 mt-2">{result.labGuide}</p>}
    </div>
  );
}

function renderLabelGuide(result: any) {
  if (!result.labelGuide?.requiredItems?.length) return null;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🏷️</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Label Compliance (GB 7718)</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200">
            <th className="text-left py-2 pr-2 text-gray-500 font-medium">Field</th>
            <th className="text-left py-2 text-gray-500 font-medium">Common Mistake</th>
          </tr></thead>
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
  );
}

function renderCountryProfile(result: any) {
  if (!result.countryProfile?.region) return null;
  const cp = result.countryProfile;
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
        <span>🌍</span>
        <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">Country Profile</h2>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['Region', cp.region], ['FTA with China', cp.ftaWithChina ? '✅ Yes' : '❌ No'], ['GACC Difficulty', cp.gaccDifficulty],
          ['Language Note', cp.languageNote],].filter(([_, v]) => v).map(([label, val]) => (
          <div key={label} className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500">{label}</p>
            <p className="text-sm font-semibold text-gray-900">{val}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// 非 GACC 模块 — 使用通用区块（每个模块有自己的数据组合）
// 这些模块的数据通过 CommonSections 展示，不需要额外代码
// ═══════════════════════════════════════════════════════════════════════

function CccSections({ result }: { result: any }) {
  return <>{renderChannels(result)}{renderLabTesting(result)}</>;
}

function LabelSections({ result }: { result: any }) {
  return <>{renderChannels(result)}{renderLabelGuide(result)}</>;
}

function NmpaSections({ result }: { result: any }) {
  return <>{renderChannels(result)}{renderLabTesting(result)}</>;
}

function CrossborderSections({ result }: { result: any }) {
  return <>{renderChannels(result)}</>;
}

function TrademarkSections({ result }: { result: any }) {
  return <>{renderChannels(result)}{renderRiskMatrix(result)}{renderDocumentGuide(result)}</>;
}
