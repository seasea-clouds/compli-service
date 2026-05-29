import SectionTitle from '../../components/SectionTitle'
export default function NiceClassification({ result }: { result: any }) {
  const nc = result.niceClasses
  if (!nc) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="📋" label="Nice Classification" />
      <p className="text-xs text-gray-500 mb-3">Recommended Nice classes by product category:</p>
      <div className="space-y-2">
        {Object.entries(nc).map(([key, val]: any) => (
          <div key={key} className="flex gap-2 p-2 bg-gray-50 rounded">
            <span className="text-xs font-bold text-primary-navy w-28 flex-shrink-0">{key.replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())}</span>
            <span className="text-xs text-gray-600">{val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
