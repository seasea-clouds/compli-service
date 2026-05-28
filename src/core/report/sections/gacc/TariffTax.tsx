import SectionTitle from '../../components/SectionTitle'
import ValueCard from '../../components/ValueCard'
export default function TariffTax({ result }: { result: any }) {
  const t = result.tariffInfo
  if (!t || t.mfnRate === 'N/A') return null
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={'🏷️'} label="Tariff & Tax Summary" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <ValueCard label="HS Code" value={t.hsCode || '—'} />
        <ValueCard label="MFN Rate" value={t.mfnRate || '—'} />
        <ValueCard label="VAT" value={t.vatRate || '—'} />
        <ValueCard label="Consumption Tax" value={t.consumptionTax || 'N/A'} />
        <ValueCard label="Total Tax Burden" value={t.totalTaxBurden || '—'} />
        <ValueCard label="FTA Rate" value={t.ftaRate || 'None'} />
      </div>
    </div>
  )
}