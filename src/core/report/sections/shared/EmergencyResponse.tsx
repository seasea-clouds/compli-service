import SectionTitle from '../../components/SectionTitle'
export default function EmergencyResponse({ result }: { result: any }) {
  const scenarios = [
    { icon: '{U+1F6AB}', title: 'Shipment Detained at Customs', color: 'red', cause: 'Label non-compliance, missing document, or random sampling failure', response: 'Engage customs broker -> Identify issue -> Submit corrections -> Re-inspection', basis: 'GACC Decree 249, Article 16' },
    { icon: '{U+274C}', title: 'Registration Denied / Rejected', color: 'red', cause: 'Incomplete documentation, misclassified product, or testing failure', response: 'Review rejection reason -> Address deficiencies -> Re-submit with supplementary materials', basis: 'GACC Decree 248, Article 9' },
    { icon: '{U+26A0}', title: 'Label Non-Compliance at Retail', color: 'amber', cause: 'Missing Chinese label elements or incorrect format', response: 'Stop shipment -> Re-label at bonded warehouse -> Submit corrected labels for approval', basis: 'GB 7718 / GB 28050' },
  ]
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="{U+1F6A8}" label="Emergency Response & Contingency Plan" />
      <div className="space-y-3">
        {scenarios.map((s, i) => (
          <div key={i} className={`bg-${s.color}-50 border border-${s.color}-200 rounded-lg p-3`}>
            <div className="flex items-start gap-2">
              <span className="text-lg">{s.icon}</span>
              <div>
                <h3 className="text-xs font-bold text-${s.color}-800">{s.title}</h3>
                <p className="text-[10px] text-${s.color}-700 mt-0.5"><strong>Cause:</strong> {s.cause}</p>
                <p className="text-[10px] text-green-700 mt-0.5"><strong>Response:</strong> {s.response}</p>
                <p className="text-[9px] text-gray-500 mt-0.5">{'📋'} {s.basis}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}