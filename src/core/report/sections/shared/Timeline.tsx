import SectionTitle from '../../components/SectionTitle'
export default function Timeline({ result }: { result: any }) {
  if (!result.timelinePhases?.length) return null
  const bw = [16, 20, 16, 12, 18, 12, 6]
  const off = [2, 20, 42, 58, 72, 84, 92]
  const clr = ['bg-blue-400', 'bg-blue-400', 'bg-gold', 'bg-gold', 'bg-green-400', 'bg-green-400', 'bg-primary-navy']
  const bdr = ['border-blue-400', 'border-blue-400', 'border-gold', 'border-gold', 'border-green-400', 'border-green-400', 'border-primary-navy']
  const last = result.timelinePhases.length - 1
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <SectionTitle icon={'\uD83D\uDDD3\uFE0F'} label="Implementation Roadmap" />
      <div className="space-y-3 mb-6">
        {result.timelinePhases.map((p: any, i: number) => (
          <div key={i} className="flex items-start gap-3">
            <div className={'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ' + (i === last ? 'bg-gold text-primary-navy' : 'bg-primary-navy text-white')}>{i + 1}</div>
            <div className="flex-1 bg-white rounded-lg p-3 border border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm text-gray-900">{p.phase}</h3>
                <span className="text-xs font-bold text-gold bg-gold/10 px-2 py-0.5 rounded">{p.duration}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{(p.activities || (p.description ? [p.description] : [])).join(', ')}</p>
              <div className="flex gap-2 mt-1.5">
                {p.responsible && <span className={'text-[10px] px-1.5 py-0.5 rounded ' + (p.responsible === 'SinoTrade' ? 'bg-blue-100 text-blue-700' : p.responsible === 'Both' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700')}>{p.responsible === 'SinoTrade' ? '🤝 We handle' : p.responsible === 'Both' ? '🔄 Joint' : '📋 Client'}</span>}
                {(p.dependencies || []).map((dep: string, j: number) => <span key={j} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">{'\u2190'} {dep}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
      {result.estimatedTimeline && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-lg font-bold text-blue-800">Estimated Total: {result.estimatedTimeline}</p>
          {result.detailedTimeline && <p className="text-sm text-gray-700 mt-1">{result.detailedTimeline}</p>}
        </div>
      )}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-xs border-collapse" style={{ minWidth: '650px' }}>
          <thead><tr>
            <th className="text-left p-1.5 text-[9px] font-bold text-gray-500 uppercase w-[30%]">Phase</th>
            <th className="text-left p-1.5 text-[9px] font-bold text-gray-500 uppercase">Timeline</th>
            <th className="text-center p-1.5 text-[9px] font-bold text-gray-500 uppercase w-[12%]">Duration</th>
            <th className="text-center p-1.5 text-[9px] font-bold text-gray-500 uppercase w-[10%]">Owner</th>
          </tr></thead>
          <tbody>
            {result.timelinePhases.map((p: any, i: number) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                <td className="p-1.5">
                  <div className="flex items-center gap-1.5"><div className={'w-1.5 h-1.5 rounded-full ' + clr[i % clr.length]} /><span className="text-[10px] font-medium text-gray-800">{p.phase}</span></div>
                  <p className="text-[8px] text-gray-400 ml-3 truncate max-w-[180px]">{(p.activities || (p.description ? [p.description] : []))[0] || ''}</p>
                </td>
                <td className="p-1.5 relative">
                  <div className="h-6 bg-gray-100 rounded relative overflow-hidden w-full">
                    <div className={'absolute top-1 h-4 rounded-sm ' + clr[i % clr.length] + ' opacity-80'} style={{ left: off[i % off.length] + '%', width: bw[i % bw.length] + '%', minWidth: '20px' }} />
                    <div className={'absolute top-0.5 w-5 h-5 border-2 bg-white rounded-sm rotate-45 flex items-center justify-center ' + bdr[i % bdr.length]} style={{ left: Math.min(off[i % off.length] + bw[i % bw.length] + 2, 94) + '%', marginLeft: '-10px' }}>
                      <div className={'w-2 h-2 rounded-sm ' + clr[i % clr.length]} />
                    </div>
                  </div>
                </td>
                <td className="p-1.5 text-center"><span className="text-[9px] font-semibold text-gray-700 bg-gray-100 px-1.5 py-0.5 rounded">{p.duration}</span></td>
                <td className="p-1.5 text-center">
                  <span className={'text-[8px] px-1 py-0.5 rounded font-medium ' + (p.responsible === 'SinoTrade' ? 'bg-blue-100 text-blue-700' : p.responsible === 'Both' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700')}>
                    {p.responsible === 'SinoTrade' ? '🤝' : p.responsible === 'Both' ? '\uD83D\uDD04' : '\uD83D\uDCCB'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-2 flex justify-end gap-4 text-[9px] text-gray-400">
          <span className="flex items-center gap-1">{'\u25C8'} Milestone</span>
          <span className="flex items-center gap-1">{'\u25AC'} Phase duration</span>
        </div>
      </div>
    </div>
  )
}
