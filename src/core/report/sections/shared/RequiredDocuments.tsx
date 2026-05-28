import SectionTitle from '../../components/SectionTitle'
export default function RequiredDocuments({ result }: { result: any }) {
  if (!result.requiredDocuments?.length) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="📄" label="Required Documents" />
      <ul className="space-y-2">
        {result.requiredDocuments.map((doc: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700"><span className="text-gold mt-0.5">▸</span>{doc}</li>
        ))}
      </ul>
    </div>
  )
}