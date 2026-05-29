import SectionTitle from '../../components/SectionTitle'
export default function AnimalTestingExempt({ result }: { result: any }) {
  const a = result.animalTestingExempt
  if (!a) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="🐰" label="Animal Testing Exemption" />
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-lg p-3 border border-green-200"><p className="text-xs font-bold text-green-800">Eligible</p><p className="text-[10px] text-green-700 mt-1">{a.eligible}</p></div>
        <div className="bg-red-50 rounded-lg p-3 border border-red-200"><p className="text-xs font-bold text-red-800">Not Eligible</p><p className="text-[10px] text-red-700 mt-1">{a.ineligible}</p></div>
      </div>
      {a.alternative && <p className="text-xs text-gray-600 mt-2"><strong>Alternative methods:</strong> {a.alternative}</p>}
      {a.timeline && <p className="text-xs text-gray-500 mt-1"><strong>Timeline:</strong> {a.timeline}</p>}
    </div>
  )
}
