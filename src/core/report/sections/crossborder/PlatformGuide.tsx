import SectionTitle from '../../components/SectionTitle'
export default function PlatformGuide({ result }: { result: any }) {
  if (!result.platformGuide?.length) return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon="🛒" label="Platform Comparison" />
      <div className="space-y-3">
        {result.platformGuide.map((p: any, i: number) => (
          <div key={i} className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-start mb-1"><h3 className="text-sm font-bold text-primary-navy">{p.platform}</h3><span className="text-xs text-gold font-medium">{p.fee}</span></div>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600"><span><strong>Req:</strong> {p.req}</span><span><strong>Traffic:</strong> {p.traffic}</span></div>
            <p className="text-xs text-gray-500 mt-1"><strong>Timeline:</strong> {p.timeline}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
