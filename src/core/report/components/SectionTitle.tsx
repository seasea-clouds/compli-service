/** 统一区块标题 */
interface Props { icon: string; label: string }
export default function SectionTitle({ icon, label }: Props) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
      <span>{icon}</span>
      <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">{label}</h2>
    </div>
  )
}
