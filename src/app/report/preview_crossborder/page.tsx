'use client';

import { ReportTemplate } from '@/core/report/template';

const SAMPLE_RESULT = {
  requiresRegistration: true, isHighRisk: false, riskCategory: 'low', riskScore: 3.0,
  riskDimensions: [
    { dimension: 'Positive List Eligibility', score: 2, color: '🟢', note: 'Category on CBEC positive list' },
    { dimension: 'Platform Setup', score: 4, color: '🟢', note: 'Tmall Global onboarding 4-8 weeks' },
    { dimension: 'Compliance Requirements', score: 2, color: '🟢', note: 'No GACC/NMPA required for CBEC imports' },
    { dimension: 'Timeline to Launch', score: 3, color: '🟢', note: 'Estimated: 4-10 weeks' },
    { dimension: 'Initial Investment', score: 5, color: '🟡', note: '$10,000-40,000 including deposit' },
  ],
  executiveSummary: 'This assessment evaluates Italian Premium Extra Virgin Olive Oil (Food & Beverages / HS 1509.10) for cross-border e-commerce entry to China via Tmall Global bonded warehouse model. Product is on CBEC positive list. No GACC registration required for CBEC channel. Strong market potential with Italy-origin premium positioning. Overall risk: 3.0/10.',
  oneLineDecision: '✅ CBEC eligible. Bonded warehouse (1210) model recommended. Estimated 4-8 weeks to launch.',
  viability: 'Viable — CBEC is the fastest channel for food products entering China',
  marketIntel: {
    chinaImportTrend: 'Italy food products highly regarded in China. Olive oil imports growing 15-20% YoY as Chinese consumers adopt Mediterranean diet. Premium EVOO segment growing fastest.',
    topOrigins: [{ country: 'Spain', share: '40%' }, { country: 'Italy', share: '25%' }, { country: 'Greece', share: '12%' }, { country: 'Tunisia', share: '8%' }],
    consumerPerception: 'Italian olive oil is perceived as the highest quality. "Made in Italy" commands premium pricing. Chinese consumers actively search for authentic Italian food products.',
    keyDrivers: ['Mediterranean diet trend in urban China', 'Health and wellness movement driving olive oil adoption', 'Social commerce enabling impulse purchases', 'Cross-border trust in imported food quality'],
    barriers: ['Price competition from Spanish and domestic brands', 'Brand awareness building requires investment', 'Logistics: olive oil requires temperature-controlled storage', 'Counterfeit concerns in imported olive oil category'],
    recommendation: 'Bonded warehouse (1210) model recommended for faster delivery. KOL marketing on Douyin/Xiaohongshu ideal for brand awareness.',
  },
  channels: [
    { channel: 'Tmall Global (Bonded Warehouse)', suitability: 'high', gaccRequired: true, description: 'Largest CBEC platform. Bonded warehouse 1210 model.', advantages: ['Massive traffic 700M+ active users', 'Cainiao integrated logistics', 'Bonded warehouse 2-3 day delivery'], disadvantages: ['Higher deposit $15,000-25,000', 'Competitive marketplace'], timeline: '4-8 weeks', costRange: '$15,000-40,000' },
    { channel: 'JD Worldwide (Bonded)', suitability: 'high', gaccRequired: true, description: 'Strong for food products. Own logistics.', advantages: ['JD Logistics cold chain capabilities', 'Trusted for authentic imported goods', 'Lower commission rates'], disadvantages: ['Smaller user base than Tmall', 'Stricter quality controls'], timeline: '4-8 weeks', costRange: '$12,000-35,000' },
    { channel: 'Douyin Global', suitability: 'medium', gaccRequired: true, description: 'Short-video/social commerce CBEC.', advantages: ['Viral potential', 'KOL marketing native', 'Younger demographic'], disadvantages: ['Content investment required', 'Less established CBEC infrastructure'], timeline: '3-6 weeks', costRange: '$8,000-25,000' },
  ],
  tariffInfo: { mfnRate: '9.1% comprehensive rate', vatRate: '70% of standard (CBEC rate)', consumptionTax: 'N/A', ftaRate: 'CBEC tax applies', totalTaxBurden: '~9.1% CBEC comprehensive rate (70% discount on tariff + VAT)' },
  regulations: [
    { name: 'CBEC Retail Import Policy', number: 'MOFCOM 2018 Notice', effectiveDate: 'January 2019', authority: 'MOFCOM', relevance: 'primary', description: 'Framework for cross-border e-commerce retail import. Enables simplified customs clearance.' },
    { name: 'CBEC Positive List', number: 'MOFCOM/GACC Joint List', effectiveDate: 'Updated annually', authority: 'MOFCOM/GACC', relevance: 'primary', description: 'Products eligible for CBEC import. Olive oil (HS 1509) on positive list.' },
    { name: 'Three-Document Matching', number: 'GACC Decree 249 Art.5', effectiveDate: 'January 1, 2022', authority: 'GACC', relevance: 'primary', description: 'Order + payment + logistics document matching for customs clearance.' },
    { name: 'Personal Import Limit', number: 'CBEC Policy Art.3', effectiveDate: '2019', authority: 'MOFCOM', relevance: 'primary', description: 'RMB 5,000/transaction, RMB 26,000/year per consumer.' },
    { name: 'PIPL (Data Privacy)', number: 'Personal Information Protection Law', effectiveDate: 'November 1, 2021', authority: 'NPC', relevance: 'secondary', description: 'Cross-border data transfer requirements for consumer order data.' },
  ],
  classification: { assignedHsChapter: '1509', ciqCode: 'Check with customs', isHighRisk: false, riskReason: 'On CBEC positive list. Simplified compliance.', alternativeClassificationNote: '' },
  riskMatrix: [
    { dimension: 'Positive List', rating: '🟢', explanation: 'HS 1509 on CBEC positive list' },
    { dimension: 'Platform Risk', rating: '🟢', explanation: 'Tmall Global established CBEC infrastructure' },
    { dimension: 'Compliance', rating: '🟢', explanation: 'No GACC/NMPA for CBEC food imports' },
    { dimension: 'Logistics', rating: '🟡', explanation: 'Glass bottles + olive oil requires careful handling' },
    { dimension: 'Competition', rating: '🟡', explanation: 'Spanish brands dominate with price advantage' },
  ],
  documentGuide: [
    { name: 'Business Registration', format: 'PDF', notarization: 'Certified copy', validity: 'Current', commonError: 'Not apostilled for China' },
    { name: 'Brand Authorization Letter', format: 'PDF', notarization: 'Certified translation', validity: 'Per application', commonError: 'Authorisation chain not complete' },
    { name: 'Product Listings (Chinese)', format: 'HTML/JPEG', notarization: 'Not required', validity: 'Per application', commonError: 'Advertising Law claims non-compliant' },
    { name: 'Product Images & Descriptions', format: 'JPEG/MP4', notarization: 'Not required', validity: 'Per application', commonError: 'Labels not in Chinese' },
    { name: 'Certificate of Free Sale', format: 'PDF', notarization: 'Certified copy', validity: '6-12 months', commonError: 'Wrong issuing authority' },
  ],
  requiredDocuments: ['Business Registration', 'Brand Authorization Letter', 'Product Listings (Chinese)', 'Product Images', 'Certificate of Free Sale'],
  labTests: ['No CCC/GACC testing required for CBEC channel'],
  testCostRange: 'N/A for CBEC',
  labGuide: 'CBEC products do not require GACC registration, CCC certification, or NMPA filing. Simplified compliance pathway is a key advantage of cross-border e-commerce.',
  labelGuide: {
    requiredItems: [
      { field: 'Platform Product Name', requirement: 'Chinese product name on listing page', commonMistake: 'English-only listing' },
      { field: 'Ingredients List', requirement: 'Chinese ingredient list on product page', commonMistake: 'Not translated from Italian' },
      { field: 'Nutrition Info', requirement: 'Basic nutrition in Chinese on listing', commonMistake: 'Only origin language available' },
      { field: 'Product Images', requirement: 'Clear product images showing packaging', commonMistake: 'Labels not readable in images' },
      { field: 'Shipping & Returns', requirement: 'Chinese shipping and return policy', commonMistake: 'China-specific policy missing' },
    ],
    gb7718Highlights: ['CBEC products are exempt from physical Chinese label requirements as personal imports'],
    gb28050Highlights: [],
  },
  timelinePhases: [
    { phase: 'Platform Selection & Strategy', duration: '1-2 weeks', description: 'Select platforms, determine bonded vs direct shipping model.', responsible: 'Both', dependencies: [] },
    { phase: 'Merchant Registration', duration: '2-4 weeks', description: 'Complete Tmall Global merchant registration and compliance review.', responsible: 'SinoTrade', dependencies: ['Platform selected'] },
    { phase: 'Logistics Setup', duration: '2-3 weeks', description: 'Bonded warehouse arrangement + three-document matching integration.', responsible: 'SinoTrade', dependencies: ['Registration approved'] },
    { phase: 'Store Configuration', duration: '1-2 weeks', description: 'Store design, product listing creation, pricing configuration.', responsible: 'Both', dependencies: ['Logistics ready'] },
    { phase: 'Launch & Optimization', duration: '1-2 weeks', description: 'Go live, initial marketing setup, performance monitoring.', responsible: 'Both', dependencies: ['Store configured'] },
  ],
  costBreakdown: [
    { item: 'Platform Deposit (Tmall Global)', estimatedRange: '$15,000-25,000', notes: 'Refundable deposit. Varies by product category.' },
    { item: 'Platform Annual Fee', estimatedRange: '$5,000-10,000/yr', notes: 'Annual platform subscription fee.' },
    { item: 'Bonded Warehouse Setup', estimatedRange: '$2,000-5,000', notes: 'Initial logistics configuration + customs registration' },
    { item: 'Product Listing & Translation', estimatedRange: '$1,000-3,000', notes: 'Professional Chinese listing content + images' },
    { item: 'Initial Inventory (Bonded)', estimatedRange: '$10,000-30,000', notes: 'First batch to bonded warehouse (depends on MOQ)' },
    { item: 'Professional Service', estimatedRange: '$5,000-12,000', notes: 'End-to-end: onboarding, compliance, logistics, launch' },
  ],
  totalCostRange: '$10,000-40,000',
  estimatedTimeline: '4-10 weeks',
  countryProfile: { region: 'Southern Europe', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'easy', languageNote: 'Italian + English documentation with Chinese translation', commonIssues: [], importVolumeNote: 'Italy is a major food exporter to China' },
  commonRejections: [
    { problem: 'Advertising Law violation', cause: 'Superlative claims (best, #1, premium) in product titles', solution: 'Pre-review all listing copy against China Advertising Law' },
    { problem: 'Brand auth chain incomplete', cause: 'Missing intermediary distributor authorization', solution: 'Verify full authorization chain from brand owner to CBEC operator' },
    { problem: 'Bonded warehouse customs delay', cause: 'Incorrect HS code classification at import to warehouse', solution: 'Professional tariff classification before first shipment' },
  ],
  postApprovalObligations: [
    { item: 'Three-Document Compliance', frequency: 'Per order', desc: 'Order + payment + logistics document matching for customs clearance.' },
    { item: 'Platform Fee Renewal', frequency: 'Yearly', desc: 'Annual platform fee payment to maintain store.' },
    { item: 'Product Listing Updates', frequency: 'Quarterly', desc: 'Refresh listings per seasonality and platform policy changes.' },
    { item: 'Tax Filing', frequency: 'Monthly/Quarterly', desc: 'CBEC tax remittance via platform integrated system.' },
  ],
  horizonScan: [
    { topic: 'CBEC Positive List Expansion', impact: 'high', timeframe: '2025', description: 'Expected expansion enabling more food products via simplified CBEC channel.', actionRequired: false },
    { topic: 'PIPL Data Transfer Rules', impact: 'medium', timeframe: '2025', description: 'Cross-border data transfer security assessment requirements may affect order processing.', actionRequired: true },
    { topic: 'Bonded Warehouse 2.0', impact: 'medium', timeframe: '2025+', description: 'New bonded warehouse pilot zones offering faster clearance and lower costs.', actionRequired: false },
  ],
  summary: 'Italian Premium Extra Virgin Olive Oil is eligible for CBEC import via Tmall Global bonded warehouse. No GACC/CCC/NMPA required. Fastest route to Chinese market.',
};

const labels = {
  title: 'China Market Entry Compliance Report',
  sectionProduct: 'Product Information', sectionResult: 'Assessment Result',
  sectionDocuments: 'Required Documents', sectionNextSteps: 'Next Steps',
  ctaTitle: 'Get a Custom Quote', ctaDesc: 'Our compliance experts will provide a tailored plan and pricing.',
  ctaBtn: 'Contact Us', footerName: 'SinoTrade Compliance', footerAddress: 'Shanghai, China',
  footerEmail: 'david@sinotradecompliance.com', labelProduct: 'Product', labelCategory: 'Category',
  labelHsCode: 'HS Code', labelOrigin: 'Origin',
  gaccRequired: 'CBEC Compliance Required', gaccNotRequired: 'CBEC Compliance Not Required',
};

export default function CrossborderPreviewPage() {
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview Mode — CBEC: Italian Extra Virgin Olive Oil (Italy)</p>
          <p className="text-xs text-amber-600">Sample report with realistic cross-border e-commerce data.</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-CROSSBORDER" module="Cross-Border E-commerce" locale="en" labels={labels}
        productInfo={{ name: 'Italian Premium Extra Virgin Olive Oil', category: 'Food & Beverages', hsCode: '1509.10', originCountry: 'Italy' }}
        result={SAMPLE_RESULT}
        nextSteps={['Contact SinoTrade Compliance for a detailed assessment', 'Complete Tmall Global merchant registration', 'Set up bonded warehouse logistics', 'Configure three-document matching for customs', 'Launch with compliant product listings']}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
