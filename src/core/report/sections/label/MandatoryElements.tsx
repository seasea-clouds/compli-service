import SectionTitle from '../../components/SectionTitle'
import DataTable from '../../components/DataTable'
export default function MandatoryElements({ result }: { result: any }) {
  if (!result.labelMandatoryElements?.length) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="🏷️" label="Mandatory Label Elements (GB 7718)" />
      <p className="text-xs text-gray-500 mb-3">All 9 elements below are mandatory for imported prepackaged food.</p>
      <ul className="space-y-2">
        {result.labelMandatoryElements.map((e: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-gold mt-0.5 font-bold">{i+1}.</span>{e}</li>
        ))}
      </ul>
    </div>
  )
}
