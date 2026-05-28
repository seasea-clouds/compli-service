import SectionTitle from '../../components/SectionTitle'
import RiskBadge from '../../components/RiskBadge'
export default function DecisionSummary({ result }: { result: any }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="📋" label="Assessment Result" />
      <div className="flex flex-wrap gap-4 mb-4">
        <RiskBadge level={result.isHighRisk ? 'high' : 'low'} />
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">🎯 Risk Score: {result.riskScore}/10</span>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100">
        <p className="text-lg font-semibold text-primary-navy">{result.oneLineDecision}</p>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{result.executiveSummary}</p>
      {result.viability && <div className="mt-4 flex items-center gap-2 text-sm text-gray-600"><span>📊 Viability:</span><span className="font-semibold text-primary-navy">{result.viability}</span></div>}
    </div>
  )
}