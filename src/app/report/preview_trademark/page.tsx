'use client';

import { ReportTemplate } from '@/core/report/template';

const SAMPLE_RESULT = {
  needsRegistration: true, requiresRegistration: true, isHighRisk: true, riskCategory: 'high', riskScore: 7.5,
  riskDimensions: [
    { dimension: 'Registration Status', score: 9, color: '🔴', note: 'NOT registered in China — high risk of squatting' },
    { dimension: 'Squatter Risk', score: 8, color: '🔴', note: 'China first-to-file system: anyone can register your brand' },
    { dimension: 'Timeline to Protection', score: 6, color: '🟡', note: '8-14 months if filing now' },
    { dimension: 'Cost to Register', score: 3, color: '🟢', note: '$600-2,000 per class' },
    { dimension: 'Enforcement Ability', score: 8, color: '🔴', note: 'Cannot enforce without Chinese registration' },
  ],
  executiveSummary: 'Trademark assessment for brand "GreenHarvest Organics" (Food Products). BRAND NOT REGISTERED IN CHINA. Risk: 7.5/10. Under China\'s first-to-file system, a third party (distributor, competitor, or squatter) can register your brand before you do, potentially blocking your market entry. Urgent filing recommended.',
  oneLineDecision: '🔴 CRITICAL: File trademark immediately. Brand not registered in China.',
  viability: 'At risk without registration — file before market entry activities',
  marketIntel: {
    chinaImportTrend: 'Over 20% of international brands entering China face trademark squatting issues. Early filing is the single most important brand protection measure.',
    topOrigins: [],
    consumerPerception: 'Brand authenticity is critical for Chinese consumers. Counterfeit concerns mean registered trademarks are essential for platform enforcement.',
    keyDrivers: ['China first-to-file system', 'Growing e-commerce platform enforcement', 'Counterfeit goods border control', 'Brand value protection'],
    barriers: ['Registration takes 8-14 months', 'Opposition risk from squatters', 'Multi-class filing complexity'],
    recommendation: 'File direct CNIPA trademark application immediately. Recommended classes: 29 (fruit spreads), 30 (honey, preserves), 32 (non-alcoholic beverages), 35 (retail services).',
  },
  channels: [
    { name: 'CNIPA Direct Filing', suitability: 'high', description: 'File trademark application directly with CNIPA for strongest protection.', pros: ['Fastest processing for China-only', 'Best scope of protection', 'Lower cost for single country'], cons: ['8-14 month timeline', 'Requires Chinese agent'], timeline: '8-14 months', costRange: '$600-2,000/class' },
    { name: 'Madrid System Designation', suitability: 'medium', description: 'Extend existing home-country registration to China via WIPO Madrid System.', pros: ['Single application for multiple countries', 'Simplified renewal management', 'No local agent initially'], cons: ['Longer processing time', 'Translation issues possible', 'May face same examination standards'], timeline: '12-18 months', costRange: '$800-2,500/class' },
  ],
  tariffInfo: { mfnRate: 'N/A', vatRate: 'N/A', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: 'N/A (legal service, not import)' },
  regulations: [
    { name: 'Trademark Law of China', number: '4th Revision 2019', effectiveDate: 'November 1, 2019', authority: 'CNIPA/NPC', relevance: 'primary', description: 'First-to-file system. Art.32 prevents bad-faith filings. Art.57 defines infringement.' },
    { name: 'Trademark Examination Guidelines', number: 'CNIPA 2021 Edition', effectiveDate: '2021', authority: 'CNIPA', relevance: 'primary', description: 'Examination standards for distinctiveness, similarity, and refusal grounds.' },
    { name: 'Customs IP Protection Regulations', number: 'State Council Decree 395', effectiveDate: 'March 1, 2004', authority: 'GACC', relevance: 'primary', description: 'Border enforcement — customs can detain suspected counterfeits.' },
    { name: 'E-Commerce Law (IP Chapter)', number: 'E-Commerce Law 2019', effectiveDate: 'January 1, 2019', authority: 'NPC', relevance: 'secondary', description: 'Platform liability for IP infringement. E-commerce platforms must remove infringing listings.' },
  ],
  classification: { assignedHsChapter: 'N/A', ciqCode: 'N/A', isHighRisk: true, riskReason: 'Brand not registered. First-to-file risk. Immediate action required.', alternativeClassificationNote: '' },
  riskMatrix: [
    { dimension: 'Registration Status', rating: '🔴', explanation: 'Not registered in China' },
    { dimension: 'Squatter Risk', rating: '🔴', explanation: 'Anyone can file your brand first' },
    { dimension: 'Timeline', rating: '🟡', explanation: '8-14 months from filing to certificate' },
    { dimension: 'Enforcement', rating: '🔴', explanation: 'No legal protection without registration' },
    { dimension: 'Platform Protection', rating: '🔴', explanation: 'Cannot file takedown requests on Tmall/JD' },
  ],
  documentGuide: [
    { name: 'Trademark Application Form', format: 'CNIPA format', notarization: 'Not required', validity: 'Per application', commonError: 'Goods description too vague' },
    { name: 'Brand Specimen / Logo', format: 'JPEG, 5-10cm', notarization: 'Not required', validity: 'Per application', commonError: 'Low resolution' },
    { name: 'Goods/Services List', format: 'Excel per Nice Class', notarization: 'Not required', validity: 'Per application', commonError: 'Not specific enough for CNIPA' },
    { name: 'Power of Attorney', format: 'PDF notarized', notarization: 'Certified copy', validity: 'Per application', commonError: 'Missing signature/seal' },
    { name: 'Priority Document (if claiming priority)', format: 'PDF', notarization: 'Certified copy', validity: 'Within 6 months', commonError: 'Priority not claimed within 6-month window' },
  ],
  requiredDocuments: ['Trademark Application Form', 'Brand Specimen/Logo', 'Goods/Services List', 'Power of Attorney'],
  labTests: [],
  testCostRange: 'N/A',
  labGuide: '',
  labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
  timelinePhases: [
    { phase: 'Trademark Search', duration: '1-2 weeks', description: 'Comprehensive CNIPA database search for conflicts.', responsible: 'SinoTrade', dependencies: [] },
    { phase: 'Application Filing', duration: '1 week', description: 'File application with CNIPA in recommended classes.', responsible: 'Both', dependencies: ['Search completed'] },
    { phase: 'Formal Examination', duration: '2-4 weeks', description: 'CNIPA reviews application formalities.', responsible: 'CNIPA', dependencies: ['Application filed'] },
    { phase: 'Substantive Examination', duration: '6-9 months', description: 'CNIPA examines distinctiveness and similarity.', responsible: 'CNIPA', dependencies: ['Formal exam passed'] },
    { phase: 'Publication & Certificate', duration: '3-4 months', description: '3-month opposition period, then certificate issuance.', responsible: 'Both', dependencies: ['Substantive exam passed'] },
  ],
  costBreakdown: [
    { item: 'Trademark Search', range: '$100-300/class', note: 'Professional search across CNIPA database' },
    { item: 'CNIPA Filing Fee', range: '$300-500/class', note: 'Official CNIPA application fee' },
    { item: 'CNIPA Agent Fee', range: '$200-400/class', note: 'Licensed Chinese trademark agent' },
    { item: 'Customs IP Recordal', range: '$200-400', note: 'Register with China Customs for border enforcement' },
    { item: 'Monitoring Service', range: '$300-600/yr', note: 'CNIPA gazette monitoring + e-commerce surveillance' },
  ],
  totalCostRange: '$600-2,000/class',
  estimatedTimeline: '8-14 months',
  countryProfile: { region: 'Western Europe', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'easy', languageNote: 'English + German documentation accepted', commonIssues: [], importVolumeNote: '' },
  commonRejections: [
    { problem: 'Likelihood of confusion with existing mark', cause: 'Similar mark already registered in China', solution: 'Comprehensive search before filing + consider coexistence agreement' },
    { problem: 'Lack of distinctiveness', cause: 'Descriptive or generic brand name', solution: 'Add distinctive element or use stylized logo' },
    { problem: 'Bad-faith opposition by squatter', cause: 'Squatter filed your mark during examination', solution: 'File opposition with evidence of prior use/bad faith' },
  ],
  postApprovalObligations: [
    { item: 'Trademark Renewal', freq: 'Every 10 years', desc: 'Renew before expiry to maintain protection.' },
    { item: 'Use Evidence', freq: 'Every 3-5 years', desc: 'CNIPA may request use evidence. Non-use for 3 years risks cancellation.' },
    { item: 'Customs Recordal Renewal', freq: 'Every 10 years', desc: 'Renew customs recordal alongside trademark renewal.' },
    { item: 'Market Monitoring', freq: 'Ongoing', desc: 'Monitor e-commerce platforms for infringement.' },
  ],
  horizonScan: [
    { topic: 'Trademark Law 5th Revision', impact: 'high', timeframe: '2025-2026', description: 'Expected reforms to bad-faith filing penalties and evidence requirements.', actionRequired: false },
    { topic: 'CNIPA Digital Transformation', impact: 'medium', timeframe: '2025', description: 'Fully digital filing and e-certificate system being implemented.', actionRequired: false },
  ],
  summary: 'GreenHarvest Organics is NOT registered in China. Immediate filing is critical to prevent trademark squatting. Recommended classes: 29, 30, 32, 35.',
};

const labels = {
  title: 'China Market Entry Compliance Report',
  sectionProduct: 'Product Information', sectionResult: 'Assessment Result',
  sectionDocuments: 'Required Documents', sectionNextSteps: 'Next Steps',
  ctaTitle: 'Get a Custom Quote', ctaDesc: 'Our compliance experts will provide a tailored plan and pricing.',
  ctaBtn: 'Contact Us', footerName: 'SinoTrade Compliance', footerAddress: 'Shanghai, China',
  footerEmail: 'david@sinotradecompliance.com', labelProduct: 'Product', labelCategory: 'Category',
  labelHsCode: 'HS Code', labelOrigin: 'Origin',
  gaccRequired: 'Trademark Registration Required', gaccNotRequired: 'Trademark Already Registered',
};

export default function TrademarkPreviewPage() {
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview Mode — Brand Protection: GreenHarvest Organics</p>
          <p className="text-xs text-amber-600">Sample report with realistic trademark compliance data. Brand not registered.</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-TRADEMARK" module="Brand Protection" locale="en" labels={labels}
        productInfo={{ name: 'GreenHarvest Organic Fruit Spreads', category: 'Food Products', hsCode: '2007.91', originCountry: 'Germany' }}
        result={SAMPLE_RESULT}
        nextSteps={['Contact SinoTrade Compliance for detailed assessment', 'Conduct CNIPA trademark search in classes 29, 30, 32, 35', 'File trademark via direct CNIPA filing (recommended)', 'Monitor 3-month opposition period after publication', 'Register Customs IP recordal after certificate']}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
