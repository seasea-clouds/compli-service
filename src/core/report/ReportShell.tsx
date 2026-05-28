/**
 * ReportShell — 模块感知报告外壳
 * 组合：Header + 23 个区块 + CTA + Footer
 * 各区块按顺序渲染，无数据时自动隐藏
 */
import type { ReportLabels } from './types';
import { getGlossary } from './template';
import SectionTitle from './components/SectionTitle';

// Shared sections
import DecisionSummary from './sections/shared/DecisionSummary';
import Regulations from './sections/shared/Regulations';
import RequiredDocuments from './sections/shared/RequiredDocuments';
import DocumentGuide from './sections/shared/DocumentGuide';
import CommonPitfalls from './sections/shared/CommonPitfalls';
import ComplianceChecklist from './sections/shared/ComplianceChecklist';
import Timeline from './sections/shared/Timeline';
import CustomsClearance from './sections/shared/CustomsClearance';
import Channels from './sections/shared/Channels';
import RiskMatrix from './sections/shared/RiskMatrix';
import MarketIntel from './sections/shared/MarketIntel';
import IpBrandRisk from './sections/shared/IpBrandRisk';
import PostApproval from './sections/shared/PostApproval';
import EmergencyResponse from './sections/shared/EmergencyResponse';
import CostEstimation from './sections/shared/CostEstimation';
import HorizonScan from './sections/shared/HorizonScan';
import Glossary from './sections/shared/Glossary';
import NextSteps from './sections/shared/NextSteps';

// GACC-only sections
import TariffTax from './sections/gacc/TariffTax';
import Classification from './sections/gacc/Classification';
import LabTesting from './sections/gacc/LabTesting';
import LabelCompliance from './sections/gacc/LabelCompliance';
import CountryProfile from './sections/gacc/CountryProfile';

interface ReportShellProps {
  reportId: string;
  module: string;
  locale?: string;
  labels: ReportLabels;
  productInfo: {
    name: string;
    category: string;
    hsCode?: string;
    originCountry: string;
  };
  result: any;
  nextSteps?: string[];
  generatedAt: string;
}

function Section({ children }: { children: React.ReactNode }) {
  return <div className="px-8 py-6 border-b border-gray-100 last:border-b-0">{children}</div>;
}

export default function ReportShell(props: ReportShellProps) {
  const { reportId, module, locale, labels, productInfo, result, nextSteps, generatedAt } = props;
  const href = (path: string) => `/${locale || 'en'}${path}`;
  const glossary = result.glossary || getGlossary(module);
  const formattedDate = generatedAt ? new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : '—';

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-none">
      {/* ═══ HEADER ═══ */}
      <div className="bg-primary-navy text-white px-8 pt-8 pb-6 print:bg-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.03]">
          <svg viewBox="0 0 200 200"><path d="M100 0L200 100L100 200L0 100Z" fill="white"/></svg>
        </div>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-gold rounded-full"></span>
                <p className="text-gold text-sm font-semibold uppercase tracking-widest">{module}</p>
              </div>
              <h1 className="text-2xl font-bold">{labels.title}</h1>
            </div>
            <div className="text-right text-xs">
              <p className="text-white/60">Report #{reportId}</p>
              <p className="text-white/60">{formattedDate}</p>
              <p className="text-white/40 mt-1 uppercase tracking-wider">CONFIDENTIAL</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/70">
            <span>Prepared for: <strong className="text-white">{productInfo.name || 'Client'}</strong></span>
            <span>Category: <strong className="text-white">{productInfo.category}</strong></span>
            <span>Origin: <strong className="text-white">{productInfo.originCountry || '—'}</strong></span>
            {productInfo.hsCode && <span>HS Code: <strong className="text-white">{productInfo.hsCode}</strong></span>}
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className={`text-4xl font-bold mb-1 ${
                (result.riskScore || 0) >= 7 ? 'text-red-400' : (result.riskScore || 0) >= 4 ? 'text-amber-400' : 'text-green-400'
              }`}>{result.riskScore || 0}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Risk Score</p>
              <div className="mt-2 w-full bg-white/10 rounded-full h-1.5">
                <div className={`h-1.5 rounded-full ${
                  (result.riskScore || 0) >= 7 ? 'bg-red-400 w-3/4' : (result.riskScore || 0) >= 4 ? 'bg-amber-400 w-1/2' : 'bg-green-400 w-1/4'
                }`}></div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className={`text-lg font-bold mb-1 ${
                (result.riskScore || 0) >= 7 ? 'text-red-400' : (result.riskScore || 0) >= 4 ? 'text-amber-400' : 'text-green-400'
              }`}>{(result.riskScore || 0) >= 7 ? '🔴' : (result.riskScore || 0) >= 4 ? '🟡' : '🟢'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Verdict</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className="text-lg font-bold text-white mb-1">{result.estimatedTimeline || '—'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Timeline</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10">
              <p className="text-lg font-bold text-white mb-1">{result.totalCostRange || '—'}</p>
              <p className="text-[10px] text-white/50 uppercase tracking-wider">Total Cost</p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BODY ═══ */}
      <div className="space-y-0">
        <Section><DecisionSummary result={result} /></Section>
        <Section><Regulations result={result} /></Section>
        <Section><RequiredDocuments result={result} /></Section>
        <Section><DocumentGuide result={result} /></Section>
        <Section><CommonPitfalls result={result} /></Section>
        <Section><ComplianceChecklist result={result} /></Section>
        <Section><Timeline result={result} /></Section>
        <Section><CustomsClearance result={result} /></Section>
        <Section><Channels result={result} /></Section>
        <Section><TariffTax result={result} /></Section>
        <Section><Classification result={result} /></Section>
        <Section><RiskMatrix result={result} /></Section>
        <Section><LabTesting result={result} /></Section>
        <Section><LabelCompliance result={result} /></Section>
        <Section><CountryProfile result={result} /></Section>
        <Section><MarketIntel result={result} /></Section>
        <Section><IpBrandRisk result={result} /></Section>
        <Section><PostApproval result={result} /></Section>
        <Section><EmergencyResponse result={result} /></Section>
        <Section><CostEstimation result={result} /></Section>
        <Section><HorizonScan result={result} /></Section>
        <Section><Glossary glossary={glossary} /></Section>
        <Section><NextSteps steps={nextSteps || []} /></Section>
      </div>

      {/* ═══ CTA ═══ */}
      <div className="bg-gradient-to-r from-primary-navy to-primary-navy/90 rounded-xl m-8 p-8 text-center">
        <h3 className="text-xl font-bold text-gold mb-2">{labels.ctaTitle}</h3>
        <p className="text-white/80 text-sm mb-6 max-w-lg mx-auto">{labels.ctaDesc}</p>
        <a href={href('/quote')} className="inline-block bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-8 py-3 rounded-md transition-all shadow-lg">
          {labels.ctaBtn}
        </a>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div className="bg-gray-900 text-white/60 px-8 py-6 text-xs flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-white">{labels.footerName}</span>
          <span>{labels.footerAddress}</span>
          <span>{labels.footerEmail}</span>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span>CONFIDENTIAL</span>
          <span>Report #{reportId}</span>
        </div>
      </div>
    </div>
  );
}
