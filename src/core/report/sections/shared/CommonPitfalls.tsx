import SectionTitle from '../../components/SectionTitle'
export default function CommonPitfalls({ result }: { result: any }) {
  if (!result.commonRejections?.length) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="⚠️" label="Common Pitfalls & Rejection Analysis" />
      <div className="space-y-3">
        {result.commonRejections.map((r: any, i: number) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <span className="mt-0.5 text-lg">❌</span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900">{r.problem}</p>
              <p className="text-xs text-amber-700 mt-0.5"><strong>Cause:</strong> {r.cause}</p>
              <p className="text-xs text-green-700 mt-0.5"><strong>Solution:</strong> {r.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
