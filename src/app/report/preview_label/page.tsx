'use client';

import { ReportTemplate } from '@/core/report/template';

const SAMPLE_RESULT = {
  requiresRegistration: true, isHighRisk: false, riskCategory: 'low', riskScore: 4.5,
  riskDimensions: [
    { dimension: 'Label Fields', score: 5, color: '🟡', note: '9 mandatory fields per GB 7718 + nutrition panel' },
    { dimension: 'Nutrition Panel', score: 5, color: '🟡', note: 'GB 28050 — kJ format + NRV% mandatory' },
    { dimension: 'Additive Review', score: 6, color: '🟡', note: 'All additives must be on GB 2760 positive list' },
    { dimension: 'Timeline', score: 3, color: '🟢', note: '2-4 weeks typical' },
    { dimension: 'Cost', score: 2, color: '🟢', note: '$500-2,000 investment' },
  ],
  executiveSummary: 'Label compliance assessment for Organic Honey Almond Granola (Prepackaged Foods / HS 1904.10). All imported prepackaged food products require Chinese labels per GB 7718-2025 and GB 28050-2025. Product is standard risk. Estimated 2-4 weeks for full compliance. Risk: 4.5/10.',
  oneLineDecision: '⚠️ Chinese label compliance required. 12 mandatory fields to verify. Timeline: 2-4 weeks.',
  viability: 'Viable — label compliance is straightforward with professional support',
  marketIntel: {
    chinaImportTrend: 'Imported breakfast cereal and granola market growing 12-18% YoY as Chinese consumers adopt Western breakfast habits.',
    topOrigins: [{ country: 'Australia', share: '30%' }, { country: 'USA', share: '22%' }, { country: 'Thailand', share: '15%' }, { country: 'Germany', share: '10%' }],
    consumerPerception: 'Imported granola products perceived as healthier and higher quality. "Organic" and "natural" claims resonate with health-conscious urban consumers.',
    keyDrivers: ['Western breakfast trend among millennials', 'Health and wellness movement', 'E-commerce enabling niche imported foods', 'Premium packaging appeal'],
    barriers: ['Shelf-life limitations for natural products', 'Higher price point vs domestic alternatives', 'Flavor preferences differ from Western market'],
    recommendation: 'Label compliance is the first step. Consider GACC registration and CBEC channel for rapid market entry.',
  },
  channels: [
    { channel: 'Professional Label Review', suitability: 'high', gaccRequired: true, description: 'Full label compliance audit + Chinese label design.', advantages: ['Guaranteed customs approval', 'Professional Chinese design', 'Nutrition panel calculation'], disadvantages: ['Professional fee applies', 'Label revision if formula changes'], timeline: '2-4 weeks', costRange: '$500-2,000' },
  ],
  tariffInfo: { mfnRate: '5-20% (MFN)', vatRate: '9-13%', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: 'Varies by product category' },
  regulations: [
    { name: 'GB 7718-2025', number: 'GB 7718-2025', effectiveDate: '2025', authority: 'NHC', relevance: 'primary', description: 'Labeling of Prepackaged Foods — mandatory standard for all imported food labels.' },
    { name: 'GB 28050-2025', number: 'GB 28050-2025', effectiveDate: '2025', authority: 'NHC', relevance: 'primary', description: 'Nutrition labeling — energy in kJ, NRV% mandatory format.' },
    { name: 'GB 2760-2024', number: 'GB 2760-2024', effectiveDate: 'February 8, 2025', authority: 'NHC', relevance: 'primary', description: 'Food additives positive list — only listed additives permitted in China.' },
    { name: 'Food Safety Law (Label Articles)', number: 'Ch.3 Arts.42-47, Ch.9 Arts.148-149', effectiveDate: 'October 1, 2015', authority: 'NPC', relevance: 'primary', description: 'Legal basis for label requirements. Fines up to 3x product value for violations.' },
    { name: 'GB/T 23779-2023', number: 'GB/T 23779-2023', effectiveDate: '2023', authority: 'NHC', relevance: 'secondary', description: 'Allergen labeling guidelines for prepackaged foods.' },
  ],
  classification: { assignedHsChapter: '1904', ciqCode: 'Check with customs', isHighRisk: false, riskReason: 'Standard GB 7718/28050 compliance', alternativeClassificationNote: '' },
  riskMatrix: [
    { dimension: 'Mandatory Fields', rating: '🟡', explanation: '9 mandatory fields + nutrition panel — all must be in Simplified Chinese' },
    { dimension: 'Nutrition Panel', rating: '🟡', explanation: 'kJ format required. NRV% calculation must be accurate' },
    { dimension: 'Additive Check', rating: '🟡', explanation: 'All ingredients on GB 2760 positive list' },
    { dimension: 'Allergen Declaration', rating: '🟢', explanation: 'Tree nuts must be declared as allergen' },
    { dimension: 'Font & Formatting', rating: '🟢', explanation: 'Font size ≥1.8mm, clear contrast' },
  ],
  documentGuide: [
    { name: 'Original Label Artwork', format: 'JPEG/PDF all sides', notarization: 'Not required', validity: 'Per application', commonError: 'Low resolution or illegible text' },
    { name: 'Chinese Label Design', format: 'PDF/AI with embedded fonts', notarization: 'Not required', validity: 'Per application', commonError: 'Fonts not embedded' },
    { name: 'Nutrition Test Report', format: 'CNAS lab report', notarization: 'Certified translation recommended', validity: 'Within 6 months', commonError: 'Energy shown in kcal not kJ' },
    { name: 'Certificate of Free Sale', format: 'Government authority PDF', notarization: 'Certified copy + translation', validity: '6-12 months', commonError: 'Wrong issuing authority' },
    { name: 'Ingredients & Additives Declaration', format: 'Excel/PDF', notarization: 'Not required', validity: 'Per application', commonError: 'GB 2760 codes not listed' },
  ],
  requiredDocuments: ['Original Label Artwork', 'Chinese Label Design', 'Nutrition Test Report', 'Certificate of Free Sale', 'Ingredients & Additives Declaration'],
  labTests: ['Nutrition analysis', 'Microbiological testing', 'Heavy metals'],
  testCostRange: '$400-1,200',
  labGuide: 'Testing must be at CNAS/ISO 17025 accredited lab. Nutrition analysis required for GB 28050 panel. Turnaround: 1-3 weeks.',
  labelGuide: {
    requiredItems: [
      { field: 'Product Name', requirement: 'Accurate reflection of product nature. Standardized name per GB if exists.', commonMistake: 'Fanciful names without descriptive standard name' },
      { field: 'Ingredients List', requirement: 'Descending order by weight. All additives with GB 2760 code numbers.', commonMistake: 'Missing additive code numbers' },
      { field: 'Net Content', requirement: 'Metric units (g/mL). Draining weight for solid-in-liquid.', commonMistake: 'Using imperial units' },
      { field: 'Manufacturer/Distributor', requirement: 'Name and address of manufacturer AND Chinese responsible party.', commonMistake: 'Missing Chinese agent info' },
      { field: 'Country of Origin', requirement: 'Clearly marked "Made in [Country]".', commonMistake: 'Vague origin descriptions' },
      { field: 'Date Marking', requirement: 'Production date + shelf life in DD/MM/YYYY format.', commonMistake: 'Using MM/DD/YYYY format' },
      { field: 'Storage Conditions', requirement: 'Clearly stated storage requirements in Chinese.', commonMistake: 'Generic statement' },
      { field: 'Nutrition Facts Panel', requirement: 'Per GB 28050 format. Energy (kJ), protein, fat, carbs, sodium.', commonMistake: 'Using kcal instead of kJ' },
      { field: 'Food Additives', requirement: 'Listed with GB 2760 codes (e.g., E330, INS 330).', commonMistake: 'Trade names instead of codes' },
      { field: 'Allergen Info', requirement: 'Mandatory: milk, eggs, fish, crustacea, peanuts, soy, wheat, tree nuts.', commonMistake: 'Not declaring regulated allergens' },
    ],
    gb7718Highlights: [
      'All text must be in Chinese. Foreign language supplementary only.',
      'Font size no less than 1.8mm for most mandatory items.',
      'Products containing GMO ingredients must be labeled as per regulations.',
      'Irradiated ingredients must be declared.',
    ],
    gb28050Highlights: [
      'Energy must ALWAYS be shown in kJ (kilojoules) — not kcal alone.',
      'Mandatory fields: Energy, Protein, Fat, Carbohydrate, Sodium.',
    ],
  },
  timelinePhases: [
    { phase: 'Label Audit', duration: '3-5 days', description: 'Review current labels against GB 7718-2025 and GB 28050-2025 requirements.', responsible: 'SinoTrade', dependencies: [] },
    { phase: 'Translation & Design', duration: '5-7 days', description: 'Professional Chinese translation + compliant label layout design.', responsible: 'SinoTrade', dependencies: ['Label audit completed'] },
    { phase: 'Verification', duration: '2-3 days', description: 'Cross-check label content against product registration and ingredient specs.', responsible: 'Both', dependencies: ['Design completed'] },
    { phase: 'Nutrition Panel Calculation', duration: '3-5 days', description: 'Calculate NRV% values and format per GB 28050 requirements.', responsible: 'SinoTrade', dependencies: ['Lab test report received'] },
    { phase: 'Production Files', duration: '2-3 days', description: 'Deliver print-ready label files with correct dimensions and color specs.', responsible: 'SinoTrade', dependencies: ['Verification passed'] },
  ],
  costBreakdown: [
    { item: 'Label Compliance Audit', estimatedRange: '$200-500', notes: 'Review existing labels against all applicable GB standards' },
    { item: 'Chinese Translation & Design', estimatedRange: '$300-800', notes: 'Professional translation + compliant label layout' },
    { item: 'Nutrition Panel Calculation', estimatedRange: '$100-300', notes: 'NRV% calculation and GB 28050 formatting' },
    { item: 'Lab Test (Nutrition Analysis)', estimatedRange: '$150-400', notes: 'If current test report is not available' },
    { item: 'Production-Ready Files', estimatedRange: '$100-200', notes: 'Print-ready AI/PDF/EPS files' },
  ],
  totalCostRange: '$500-2,000',
  estimatedTimeline: '2-4 weeks',
  countryProfile: { region: 'North America', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'moderate', languageNote: 'English documentation accepted', commonIssues: [], importVolumeNote: 'USA is a major food exporter to China' },
  commonRejections: [
    { problem: 'Energy shown in kcal not kJ', cause: 'GB 28050 requires kJ (kilojoules) as primary unit', solution: 'Convert all energy values to kJ format before printing' },
    { problem: 'Missing Chinese agent info', cause: 'Importer details often omitted on overseas-designed labels', solution: 'Add Chinese responsible party name and address' },
    { problem: 'Additive code not per GB 2760', cause: 'Using trade names instead of INS/E numbers', solution: 'Cross-reference all additives against GB 2760 positive list' },
  ],
  postApprovalObligations: [
    { item: 'Label Compliance Monitoring', frequency: 'Ongoing', desc: 'Monitor GB standard revisions that may affect label requirements.' },
    { item: 'Formula Change Update', frequency: 'When applicable', desc: 'Any ingredient change requires label revision and re-filing.' },
    { item: 'Customs Clearance Per Shipment', frequency: 'Per import', desc: 'Each shipment requires CIQ label inspection.' },
  ],
  horizonScan: [
    { topic: 'GB 7718 Revision', impact: 'high', timeframe: '2025-2026', description: 'Expected to introduce new allergen declaration format and e-labeling options.', actionRequired: true },
    { topic: 'Digital Label Pilot', impact: 'medium', timeframe: '2025+', description: 'China exploring digital QR code labels as supplement to physical labels.', actionRequired: false },
  ],
  summary: 'Organic Honey Almond Granola requires full Chinese label compliance per GB 7718-2025 and GB 28050-2025. Standard process: 2-4 weeks.',
};

const labels = {
  title: 'China Market Entry Compliance Report',
  sectionProduct: 'Product Information', sectionResult: 'Assessment Result',
  sectionDocuments: 'Required Documents', sectionNextSteps: 'Next Steps',
  ctaTitle: 'Get a Custom Quote', ctaDesc: 'Our compliance experts will provide a tailored plan and pricing for your specific product.',
  ctaBtn: 'Contact Us', footerName: 'SinoTrade Compliance', footerAddress: 'Shanghai, China',
  footerEmail: 'david@sinotradecompliance.com', labelProduct: 'Product', labelCategory: 'Category',
  labelHsCode: 'HS Code', labelOrigin: 'Origin',
  gaccRequired: 'Chinese Label Required', gaccNotRequired: 'No Chinese Label Required',
};

export default function LabelPreviewPage() {
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview Mode — Label Compliance: Organic Honey Almond Granola (USA)</p>
          <p className="text-xs text-amber-600">Sample report with realistic label compliance data.</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-LABEL" module="Chinese Label Compliance" locale="en" labels={labels}
        productInfo={{ name: 'Organic Honey Almond Granola', category: 'Prepackaged Foods (GB 7718)', hsCode: '1904.10', originCountry: 'USA' }}
        result={SAMPLE_RESULT}
        nextSteps={['Contact SinoTrade Compliance for a detailed compliance assessment', 'Submit current label artwork for compliance audit', 'Receive compliant Chinese label design', 'Production-ready label files for printing', 'Arrange customs clearance support']}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
