'use client';

import { ReportTemplate } from '@/core/report/template';

const SAMPLE_RESULT = {
  requiresRegistration: true, isHighRisk: false, riskCategory: 'low', riskScore: 3.5,
  riskDimensions: [
    { dimension: 'Product Category', score: 3, color: '🟢', note: 'Ordinary cosmetics — notification filing' },
    { dimension: 'Regulatory Complexity', score: 4, color: '🟢', note: 'Standard NMPA filing pathway' },
    { dimension: 'Testing Requirements', score: 3, color: '🟢', note: '3 tests: microbiological, heavy metals, stability' },
    { dimension: 'Timeline to Market', score: 4, color: '🟢', note: 'Estimated: 2-4 months' },
    { dimension: 'Origin Country', score: 3, color: '🟢', note: 'France: strong reputation, standard processing' },
  ],
  executiveSummary: 'This assessment evaluates Vitamin C Brightening Serum (Skincare / HS 3304.99) against NMPA cosmetics requirements. Product is classified as ordinary (general) cosmetics requiring notification filing (备案). France origin is favorable. No animal testing required under GMP exemption. Overall risk: 3.5/10.',
  oneLineDecision: '🟢 Proceed: NMPA notification filing required. Estimated 2-4 months. Animal testing exempt.',
  viability: 'Viable — standard NMPA filing pathway with strong market potential',
  marketIntel: {
    chinaImportTrend: 'China cosmetic market growing 8-12% annually. French skincare brands particularly strong in premium segment. Vitamin C serums trending on social commerce platforms.',
    topOrigins: [{ country: 'France', share: '28%' }, { country: 'Japan', share: '18%' }, { country: 'South Korea', share: '22%' }, { country: 'USA', share: '15%' }],
    consumerPerception: 'French cosmetics highly regarded for quality and safety. "Made in France" carries significant premium positioning. Chinese consumers actively search for French skincare brands.',
    keyDrivers: ['Clean beauty trend acceleration', 'Social commerce (Douyin/Xiaohongshu) driving awareness', 'Premium skincare demand growing 15%+', 'Anti-aging serums fastest growing sub-category'],
    barriers: ['Intense competition from Korean and domestic brands', 'NMPA filing timeline delays market entry', 'Claims substantiation required for efficacy marketing'],
    recommendation: 'NMPA notification filing is the standard route. Consider CBEC as interim sales channel while filing is in process.',
  },
  channels: [
    { channel: 'Standard Import (一般贸易)', suitability: 'high', gaccRequired: true, description: 'Full NMPA filing + retail distribution.', advantages: ['Full market access (online + offline)', 'Brand building in retail stores', 'Higher margins with retail distribution'], disadvantages: ['2-4 month NMPA filing timeline', 'Chinese responsible person required'], timeline: '2-4 months', costRange: '$3,000-8,000' },
    { channel: 'CBEC (跨境电商)', suitability: 'medium', gaccRequired: true, description: 'Sell via Tmall Global / JD Worldwide without NMPA filing.', advantages: ['Faster entry (1-2 months)', 'No NMPA filing needed online', 'Test market demand before filing'], disadvantages: ['Online only', 'Cannot access physical retail', 'Per-order limits apply'], timeline: '1-2 months', costRange: '$500-2,000' },
  ],
  tariffInfo: { mfnRate: '1-5% (MFN)', vatRate: '13%', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: '1-5% + 13% VAT' },
  regulations: [
    { name: 'Cosmetics Supervision & Administration Regulation (CSAR)', number: 'State Council Decree 727 (2021)', effectiveDate: '2021', issuingAuthority: 'NMPA', relevance: 'primary', description: 'Primary cosmetics regulation. Reformed the entire cosmetics regulatory system.' },
    { name: 'Cosmetics Registration & Filing Measures', number: 'NMPA 2021 No.1-3', effectiveDate: '2021', issuingAuthority: 'NMPA', relevance: 'primary', description: 'Detailed procedures for registration (special) vs filing (ordinary).' },
    { name: 'Cosmetics Safety Assessment Guidelines', number: 'NMPA 2021 Tech Specs', effectiveDate: '2021', issuingAuthority: 'NMPA', relevance: 'primary', description: 'Required safety assessment report format and content.' },
    { name: 'INCI Name Translation Standard', number: 'NMPA ICSC Database', effectiveDate: 'Current', issuingAuthority: 'NMPA', relevance: 'primary', description: 'Official Chinese translation of INCI ingredient names.' },
    { name: 'GB/T 35914-2018', number: 'GB/T 35914-2018', effectiveDate: '2018', issuingAuthority: 'NHC', relevance: 'secondary', description: 'Hygienic standard for cosmetics — microbiological limits.' },
  ],
  classification: { assignedHsChapter: '3304', ciqCode: 'Check with customs', isHighRisk: false, riskReason: 'Ordinary cosmetics — notification filing', alternativeClassificationNote: '' },
  riskMatrix: [
    { dimension: 'Product Category', rating: '🟢', explanation: 'Ordinary cosmetics — standard NMPA filing' },
    { dimension: 'Animal Testing', rating: '🟢', explanation: 'Exempt — GMP manufacturing + no new ingredients' },
    { dimension: 'Testing Requirements', rating: '🟢', explanation: 'Standard microbiological + heavy metals + stability' },
    { dimension: 'Timeline', rating: '🟢', explanation: '2-4 months — standard timeline' },
    { dimension: 'Market Potential', rating: '🟢', explanation: 'French skincare strong in China' },
  ],
  documentGuide: [
    { name: 'Product Formulation (full)', format: 'Excel/PDF with INCI', notarization: 'Not required', validity: 'Per application', commonError: 'INCI names not matching ICSC database' },
    { name: 'Safety Assessment Report', format: 'NMPA template PDF', notarization: 'Certified translation', validity: 'Per application', commonError: 'Not per 2021 guidelines' },
    { name: 'GMP Certificate', format: 'PDF', notarization: 'Certified copy + translation', validity: 'Current', commonError: 'Expired or wrong scope' },
    { name: 'Stability Test Report', format: 'CNAS lab PDF', notarization: 'Certified translation', validity: 'Per application', commonError: 'Insufficient testing period' },
    { name: 'Microbiological Test Report', format: 'CNAS lab PDF', notarization: 'Certified translation', validity: 'Within 6 months', commonError: 'Non-accredited lab' },
    { name: 'Responsible Person Agreement', format: 'PDF', notarization: 'Not required', validity: 'Per application', commonError: 'Missing Chinese entity details' },
  ],
  requiredDocuments: ['Product Formulation', 'Safety Assessment Report', 'GMP Certificate', 'Stability Test Report', 'Microbiological Test Report', 'Responsible Person Agreement'],
  labTests: ['Microbiological (GB 7918)', 'Heavy metals (Pb/As/Hg/Cd)', 'Stability testing (accelerated + long-term)', 'Skin irritation test'],
  testCostRange: '$1,000-3,000',
  labGuide: 'Testing must be at CNAS-accredited laboratory. Standard tests: microbiological (GB 7918), heavy metals, stability. GMP-manufactured products may qualify for animal testing exemption.',
  labelGuide: {
    requiredItems: [
      { field: 'Product Name', requirement: 'Chinese name consistent with NMPA filing', commonMistake: 'Different name on product vs filing' },
      { field: 'Ingredient List', requirement: 'Full INCI ingredient list in Chinese', commonMistake: 'Missing Chinese INCI translation' },
      { field: 'Net Content', requirement: 'Metric units (g/mL)', commonMistake: 'Incorrect unit format' },
      { field: 'Manufacturer Info', requirement: 'Manufacturer + Chinese responsible person details', commonMistake: 'Missing Chinese agent info' },
      { field: 'Country of Origin', requirement: '"Made in France" or similar', commonMistake: 'Vague origin description' },
      { field: 'Date of Manufacture & Shelf Life', requirement: 'Production date + 3-year shelf life typical', commonMistake: 'Date format not Chinese standard' },
      { field: 'Storage Conditions', requirement: 'Storage instructions in Chinese', commonMistake: 'English only' },
      { field: 'Usage Instructions', requirement: 'Usage directions and precautions in Chinese', commonMistake: 'Safety warnings not translated' },
      { field: 'Ingredients Allergens', requirement: 'Fragrance allergens if >0.001% (leave-on)', commonMistake: 'Not declaring EU fragrance allergens' },
    ],
    gb7718Highlights: [],
    gb28050Highlights: [],
  },
  timelinePhases: [
    { phase: 'Product Classification', duration: '1 week', description: 'Determine ordinary vs special-use classification under CSAR.', responsible: 'SinoTrade', dependencies: [] },
    { phase: 'Document Preparation', duration: '4-6 weeks', description: 'Compile formulation, safety assessment, GMP cert, test reports.', responsible: 'Both', dependencies: ['Classification done'] },
    { phase: 'Laboratory Testing', duration: '4-6 weeks', description: 'Safety testing at NMPA-designated laboratory.', responsible: 'SinoTrade', dependencies: ['Samples received'] },
    { phase: 'NMPA Submission', duration: '1-2 weeks', description: 'Submit notification filing through NMPA online system.', responsible: 'Both', dependencies: ['All docs ready'] },
    { phase: 'Approval & Launch', duration: '2-4 weeks', description: 'NMPA review and notification number issuance. Product ready for market.', responsible: 'NMPA', dependencies: ['Submission accepted'] },
  ],
  costBreakdown: [
    { item: 'Safety Testing', estimatedRange: '$1,000-3,000', notes: 'Microbiological, heavy metals, stability at CNAS lab' },
    { item: 'Safety Assessment Report', estimatedRange: '$500-1,500', notes: 'NMPA-compliant safety assessment by qualified toxicologist' },
    { item: 'Chinese Responsible Person', estimatedRange: '$500-1,000/yr', notes: 'Domestic agent (境内责任人) designation service' },
    { item: 'Document Translation', estimatedRange: '$300-800', notes: 'Professional Chinese translation of all submission documents' },
    { item: 'NMPA Filing Management', estimatedRange: '$2,000-5,000', notes: 'End-to-end filing coordination and submission' },
  ],
  totalCostRange: '$3,000-8,000',
  estimatedTimeline: '2-4 months',
  countryProfile: { region: 'Western Europe', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'easy', languageNote: 'French documentation + Chinese translation', commonIssues: [], importVolumeNote: 'France is the #1 cosmetic exporter to China' },
  commonRejections: [
    { problem: 'INCI name not matching ICSC database', cause: 'Using EU/US INCI names not approved in China', solution: 'Pre-check all INCI names against NMPA ICSC database' },
    { problem: 'Safety assessment not per 2021 guidelines', cause: 'Using old format safety assessment template', solution: 'Update to NMPA 2021 Cosmetic Safety Assessment Guidelines' },
    { problem: 'Preservative not on approved list', cause: 'China preservative list differs from EU/US', solution: 'Cross-check all preservatives against China CosIng' },
  ],
  postApprovalObligations: [
    { item: 'Adverse Event Monitoring', frequency: 'Ongoing', description: 'Monitor and report any adverse reactions within legal timeframe.' },
    { item: 'Annual Report Submission', frequency: 'Yearly', description: 'Submit annual safety report to NMPA for registered products.' },
    { item: 'Formula Change Notification', frequency: 'When applicable', description: 'Any formulation change requires re-filing or notification update.' },
  ],
  horizonScan: [
    { topic: 'CSAR Implementing Rules Update', impact: 'medium', timeframe: '2025', description: 'Expected updates to filing procedures and documentation requirements.', actionRequired: true },
    { topic: 'Animal Testing Exemption Expansion', impact: 'medium', timeframe: '2025+', description: 'More categories expected to qualify for animal testing exemption.', actionRequired: false },
  ],
  summary: 'Vitamin C Brightening Serum is classified as ordinary cosmetics requiring NMPA notification filing. French origin, GMP manufactured. Standard pathway with animal testing exemption.',
};

const labels = {
  title: 'China Market Entry Compliance Report',
  sectionProduct: 'Product Information', sectionResult: 'Assessment Result',
  sectionDocuments: 'Required Documents', sectionNextSteps: 'Next Steps',
  ctaTitle: 'Get a Custom Quote', ctaDesc: 'Our compliance experts will provide a tailored plan and pricing for your specific product.',
  ctaBtn: 'Contact Us', footerName: 'SinoTrade Compliance', footerAddress: 'Shanghai, China',
  footerEmail: 'david@sinotradecompliance.com', labelProduct: 'Product', labelCategory: 'Category',
  labelHsCode: 'HS Code', labelOrigin: 'Origin',
  gaccRequired: 'NMPA Filing Required', gaccNotRequired: 'No NMPA Filing Required',
};

export default function NmpaPreviewPage() {
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview Mode — NMPA Cosmetics: Vitamin C Brightening Serum (France)</p>
          <p className="text-xs text-amber-600">Sample report with realistic cosmetics compliance data.</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-NMPA" module="Cosmetics Filing (NMPA)" locale="en" labels={labels}
        productInfo={{ name: 'Vitamin C Brightening Serum', category: 'Skincare (HS 33.04)', hsCode: '3304.99', originCountry: 'France' }}
        result={SAMPLE_RESULT}
        nextSteps={['Contact SinoTrade Compliance for a detailed compliance assessment', 'Designate Chinese responsible person (境内责任人)', 'Complete safety assessment per NMPA guidelines', 'Coordinate testing at NMPA-designated laboratory', 'File NMPA notification (备案) application']}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
