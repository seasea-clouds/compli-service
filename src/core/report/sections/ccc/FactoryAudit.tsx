import SectionTitle from '../../components/SectionTitle'
export default function FactoryAudit({ result }: { result: any }) {
  const a = result.factoryAudit
  if (!a) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="🏭" label="Factory Audit Requirements" />
      <p className="text-sm text-gray-700 mb-2">{a.requirement}</p>
      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Audit Scope</p>
      <ul className="space-y-1 mb-3">
        {a.scope?.map((s: string, i: number) => <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5"><span className="text-gray-400">•</span>{s}</li>)}
      </ul>
      <p className="text-xs text-gray-500"><strong>Frequency:</strong> {a.frequency}</p>
    </div>
  )
}