'use client';

import { ReportTemplate } from '@/core/report/template';

const SAMPLE_RESULT = {
  requiresRegistration: true,
  isHighRisk: false,
  riskCategory: 'low',
  riskScore: 6.5,
  riskDimensions: [
    { dimension: 'Product Category', score: 7, color: '🟡', note: 'Consumer Electronics (HS 85) — CCC mandatory' },
    { dimension: 'Regulatory Complexity', score: 6, color: '🟡', note: 'Safety + EMC + possible SRRC for wireless' },
    { dimension: 'Testing Requirements', score: 5, color: '🟡', note: '4 tests: Safety GB 4943.1, EMC GB 9254, Harmonics, Energy' },
    { dimension: 'Timeline to Market', score: 6, color: '🟡', note: 'Estimated: 4-6 months' },
    { dimension: 'Origin Country', score: 4, color: '🟢', note: 'USA: CB report accepted, standard pathway' },
  ],
  executiveSummary: 'This assessment evaluates Wireless Bluetooth Speaker (Consumer Electronics / HS 8518.22) against CCC certification requirements. The product falls under CCC mandatory scope. CB report may reduce testing scope. Overall risk: 6.5/10. 🟡 Standard CCC pathway applies.',
  oneLineDecision: '🟢 Proceed: CCC certification required. Estimated 4-6 months with CB report leverage.',
  viability: 'Viable with compliance investment — CCC certification opens full Chinese market access',
  marketIntel: {
    chinaImportTrend: 'Growing demand — consumer electronics imports growing 10-15% YoY. Premium audio segment particularly strong.',
    topOrigins: [{ country: 'China domestic', share: '55%' }, { country: 'USA', share: '15%' }, { country: 'Japan', share: '12%' }, { country: 'Germany', share: '8%' }],
    consumerPerception: 'International audio brands (JBL, Bose, Sony) enjoy strong brand recognition. Chinese consumers willing to pay premium for verified quality.',
    keyDrivers: ['Rising middle class demand for premium audio', 'Smart home ecosystem adoption', 'Young consumers brand-conscious', 'E-commerce enabling direct sales'],
    barriers: ['Competition from established brands', 'CCC certification cost and timeline', 'Price sensitivity in mid-range segment', 'Wireless connectivity standards differences'],
    recommendation: 'General trade recommended for full market access. Leverage CB report for faster testing.',
  },
  channels: [
    { name: 'Standard Import (一般贸易)', suitability: 'high', description: 'Full CCC compliance channel for retail and wholesale.', pros: ['Full market access (online + offline)', 'Build brand presence in China', 'Higher margins at scale'], cons: ['CCC certification required (4-6 months)', 'Factory audit required', 'Annual surveillance inspections'], timeline: '4-6 months', costRange: '$5,000-15,000' },
    { name: 'Cross-Border E-commerce (CBEC)', suitability: 'medium', description: 'Sell via Tmall Global / JD Worldwide without CCC.', pros: ['Faster market entry (1-2 months)', 'No CCC required online', 'Test market before full commitment'], cons: ['Online channels only', 'Per-order limits (RMB 5,000)', 'Cannot sell in physical retail'], timeline: '1-2 months', costRange: '$500-2,000' },
  ],
  tariffInfo: { mfnRate: '5-15% (MFN)', vatRate: '13%', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: '5-15% + 13% VAT' },
  regulations: [
    { name: 'CNCA-CCC Implementation Rules', number: 'CNCA 00C-001:2023', effectiveDate: '2023', authority: 'CNCA/SAMR', relevance: 'primary', description: 'CCC certification procedures: application, testing, factory inspection, and maintenance.' },
    { name: 'CCC Product Catalogue', number: 'CNCA 2023 Announcement', effectiveDate: '2023', authority: 'CNCA', relevance: 'primary', description: 'Products subject to mandatory CCC certification. 17 categories including electronics.' },
    { name: 'GB 4943.1-2022', number: 'GB 4943.1-2022', effectiveDate: '2022', authority: 'SAMR', relevance: 'primary', description: 'Safety of audio/video and IT equipment. Primary safety standard for CCC testing.' },
    { name: 'GB 9254-2021', number: 'GB 9254-2021', effectiveDate: '2021', authority: 'SAMR', relevance: 'primary', description: 'EMC emission limits for multimedia equipment.' },
    { name: 'GB 17625.1-2022', number: 'GB 17625.1-2022', effectiveDate: '2022', authority: 'SAMR', relevance: 'secondary', description: 'EMC harmonic current emissions limits.' },
    { name: 'China Energy Label', number: 'NDRC/MOFCOM 2020', effectiveDate: '2020', authority: 'NDRC', relevance: 'secondary', description: 'Mandatory energy efficiency labeling for specified electronic products.' },
    { name: 'China RoHS 2', number: 'MIIT Order 32:2016', effectiveDate: '2016', authority: 'MIIT', relevance: 'secondary', description: 'Hazardous substance limits in electronic products.' },
  ],
  classification: { assignedHsChapter: '8518', ciqCode: 'Check with customs', isHighRisk: false, riskReason: 'CCC mandatory — standard pathway', alternativeClassificationNote: '' },
  riskMatrix: [
    { dimension: 'Category Risk', rating: '🟡', explanation: 'CCC mandatory for consumer audio equipment' },
    { dimension: 'Electronics Testing', rating: '🟡', explanation: 'Safety + EMC — CB report may reduce testing scope' },
    { dimension: 'Timeline', rating: '🟡', explanation: '4-6 months with CB report' },
    { dimension: 'Cost Impact', rating: '🟡', explanation: '$5,000-15,000 initial investment' },
    { dimension: 'Compliance History', rating: '🟢', explanation: 'First-time CCC applicant — standard process' },
  ],
  documentGuide: [
    { name: 'CCC Application Form', format: 'CNCA format', notarization: 'Not required', validity: 'Per application', commonError: 'Incomplete applicant information' },
    { name: 'Product Specification & Photos', format: 'PDF, bilingual', notarization: 'Not required', validity: 'Per application', commonError: 'Missing key parameters' },
    { name: 'User Manual (Chinese)', format: 'PDF, full translation', notarization: 'Not required', validity: 'Per application', commonError: 'Safety warnings not translated' },
    { name: 'Factory Quality Manual', format: 'PDF, ISO 9001/QSO', notarization: 'Certified translation', validity: 'Current', commonError: 'Address mismatch with registration' },
    { name: 'Key Component List', format: 'Excel/PDF', notarization: 'Not required', validity: 'Per application', commonError: 'Component certifications missing' },
    { name: 'Circuit Diagram & PCB Layout', format: 'PDF/DXF', notarization: 'Not required', validity: 'Per application', commonError: 'Not labeled in Chinese' },
    { name: 'CB Test Report (if available)', format: 'IECEE lab PDF', notarization: 'Certified copy', validity: 'Within 3 years', commonError: 'Scope does not cover China deviations' },
  ],
  requiredDocuments: [
    'CCC Application Form', 'Product Specification & Photos', 'User Manual (Chinese)',
    'Factory Quality Manual', 'Key Component List', 'Circuit Diagram & PCB Layout',
    'CB Test Report (if available)',
  ],
  labTests: ['Safety GB 4943.1-2022', 'EMC GB 9254-2021', 'Harmonics GB 17625.1-2022', 'Energy efficiency testing'],
  testCostRange: '$3,000-8,000',
  labGuide: 'Testing must be at CNCA-accredited laboratory. CB report (IEC 62368-1) may reduce testing scope. Estimated turnaround: 6-12 weeks.',
  labelGuide: {
    requiredItems: [
      { field: 'Product Name', requirement: 'Chinese name matching CCC filing', commonMistake: 'Different name on product vs certificate' },
      { field: 'Manufacturer Info', requirement: 'Name and address of manufacturer', commonMistake: 'Missing Chinese entity information' },
      { field: 'CCC Mark', requirement: 'CCC mark with correct dimensions and format', commonMistake: 'Wrong size ratio or color' },
      { field: 'Certificate Number', requirement: 'CCC certificate number on product or packaging', commonMistake: 'Missing or incorrect number' },
      { field: 'Safety Warnings', requirement: 'All safety warnings in Simplified Chinese', commonMistake: 'English-only warnings' },
      { field: 'Power Rating', requirement: 'Voltage (220V), frequency (50Hz), power consumption', commonMistake: 'Showing EU/US specifications' },
    ],
    gb7718Highlights: [],
    gb28050Highlights: [],
  },
  timelinePhases: [
    { phase: 'Pre-assessment & Application', duration: '2-4 weeks', description: 'Determine applicable GB standards, select CNCA-accredited lab, prepare application.', responsible: 'Both', dependencies: [] },
    { phase: 'Type Testing (Safety + EMC)', duration: '6-12 weeks', description: 'Product testing at designated lab against GB 4943.1, GB 9254, GB 17625.1.', responsible: 'SinoTrade', dependencies: ['Sample submission'] },
    { phase: 'Factory Inspection', duration: '2-4 weeks', description: 'On-site QMS audit by certification body per CCC requirements.', responsible: 'SinoTrade', dependencies: ['Type testing passed'] },
    { phase: 'Certification Review', duration: '4-6 weeks', description: 'CNCA reviews test reports, inspection results, and documentation for final approval.', responsible: 'CNCA', dependencies: ['Factory inspection passed'] },
    { phase: 'Certificate & Market Entry', duration: '1-2 weeks', description: 'CCC certificate issued. CCC mark printing approval. Product ready for market.', responsible: 'Both', dependencies: ['Certification approved'] },
  ],
  costBreakdown: [
    { item: 'Type Testing (Safety + EMC)', range: '$3,000-8,000', note: 'CNCA-accredited lab. CB report may reduce scope.' },
    { item: 'Factory Inspection (Initial)', range: '$2,000-5,000', note: 'Auditor visit. Travel cost extra if outside China.' },
    { item: 'CCC Certification Fee', range: '$1,000-3,000', note: 'CNCA/CCIC certification body fee.' },
    { item: 'CB Report Conversion', range: '$1,000-3,000', note: 'If existing IEC CB test report is available.' },
    { item: 'Chinese Manual Translation', range: '$500-2,000', note: 'CCC requires complete Chinese user manual.' },
    { item: 'Professional Service Fee', range: '$4,000-12,000', note: 'End-to-end: lab coordination, factory inspection, document handling.' },
    { item: 'Annual Factory Follow-up', range: '$1,500-3,000/yr', note: 'Required annually to maintain CCC certification.' },
  ],
  totalCostRange: '$5,000-15,000',
  estimatedTimeline: '4-6 months',
  countryProfile: { region: 'North America', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'moderate', languageNote: 'English documentation accepted with Chinese translation', commonIssues: [], importVolumeNote: 'Major electronics exporter to China' },
  commonRejections: [
    { problem: 'EMC exceeds GB 9254 limits', cause: 'Design optimized for FCC/CE but not Chinese grid', solution: 'EMC pre-scan before formal testing at CNCA lab' },
    { problem: 'Wireless device shipped without SRRC', cause: 'SRRC and CCC are separate approvals', solution: 'File SRRC application in parallel with CCC' },
    { problem: 'User manual not fully translated', cause: 'Only key sections translated instead of full manual', solution: 'Complete Chinese manual translation before submission' },
  ],
  postApprovalObligations: [
    { item: 'Annual Factory Inspection', freq: 'Yearly', desc: 'CNCA inspector verifies production consistency.' },
    { item: 'Product Change Notice', freq: 'When applicable', desc: 'Design/component changes require re-evaluation.' },
    { item: 'CCC Certificate Renewal', freq: 'Every 5 years', desc: 'Full re-evaluation. Begin 6 months before expiry.' },
    { item: 'Market Surveillance', freq: 'Ongoing', desc: 'SAMR random product testing. Respond within 30 days.' },
  ],
  horizonScan: [
    { topic: 'CCC Catalog Expansion (IoT/Smart Home)', impact: 'high', timeframe: '2025-2026', description: 'New product categories expected to enter CCC mandatory scope.', actionRequired: true },
    { topic: 'GB Standard Revisions', impact: 'high', timeframe: '2025-2027', description: 'Multiple GB safety standards under revision — may require re-testing.', actionRequired: true },
    { topic: 'Wireless SRRC Alignment', impact: 'medium', timeframe: '2025', description: 'SRRC testing requirements being updated for Wi-Fi 7/BT 6.0', actionRequired: true },
    { topic: 'CB Report Digitalization', impact: 'medium', timeframe: '2025+', description: 'IECEE digital CB reports may reduce paper handling and accelerate testing.', actionRequired: false },
  ],
  summary: 'Wireless Bluetooth Speaker requires CCC certification. Standard pathway via CNCA-accredited lab. CB report recommended to reduce testing scope.',
};

const labels = {
  title: 'China Market Entry Compliance Report',
  sectionProduct: 'Product Information',
  sectionResult: 'Assessment Result',
  sectionDocuments: 'Required Documents',
  sectionNextSteps: 'Next Steps',
  ctaTitle: 'Get a Custom Quote',
  ctaDesc: 'Our compliance experts will provide a tailored plan and pricing for your specific product.',
  ctaBtn: 'Contact Us',
  footerName: 'SinoTrade Compliance',
  footerAddress: 'Shanghai, China',
  footerEmail: 'david@sinotradecompliance.com',
  labelProduct: 'Product',
  labelCategory: 'Category',
  labelHsCode: 'HS Code',
  labelOrigin: 'Origin',
  gaccRequired: 'CCC Certification Required',
  gaccNotRequired: 'No CCC Certification Required',
};

export default function CccPreviewPage() {
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview Mode — CCC Certification: Wireless Bluetooth Speaker (USA)</p>
          <p className="text-xs text-amber-600">Sample report with realistic electronics compliance data.</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-CCC"
        module="CCC Certification"
        locale="en"
        labels={labels}
        productInfo={{ name: 'Wireless Bluetooth Speaker', category: 'Consumer Electronics (HS 85)', hsCode: '8518.22', originCountry: 'USA' }}
        result={SAMPLE_RESULT}
        nextSteps={[
          'Contact SinoTrade Compliance for a detailed compliance assessment',
          'Submit product samples to CNCA-accredited testing laboratory',
          'Prepare factory inspection documentation and quality manuals',
          'Complete CCC application with designated certification body',
          'Arrange ongoing compliance and annual surveillance',
        ]}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
