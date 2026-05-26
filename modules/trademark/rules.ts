/**
 * 品牌保护 / 商标注册 — 深度规则引擎
 * 覆盖：45 类商标注册、驰名商标保护、侵权应对
 */

export type TrademarkCategory =
  | "food" | "cosmetics" | "electronics" | "apparel"
  | "beverage" | "health_supplement" | "luxury" | "other";

export interface TrademarkInput {
  category: TrademarkCategory;
  brandName: string;
  registeredInChina: boolean;
  productName: string;
  originCountry?: string;
}

export interface TrademarkResult {
  needsRegistration: boolean;
  riskCategory: "high" | "medium" | "low";
  riskScore: number;
  riskDimensions: { dimension: string; score: number; color: string; note: string }[];
  executiveSummary: string;
  oneLineDecision: string;
  channels: { name: string; suitability: string; description: string; timeline: string; costRange: string }[];
  niceClassification: { classNo: number; description: string; relevance: string }[];
  registrationProcess: { step: string; duration: string; description: string }[];
  documentGuide: { name: string; format: string; commonError: string }[];
  requiredDocuments: string[];
  estimatedTimeline: string;
  timelinePhases: { phase: string; duration: string; description: string; responsible: string }[];
  costBreakdown: { item: string; range: string; note: string }[];
  totalCostRange: string;
  testRequirements: string[];
  testCostRange: string;
  priorArtSearch: { type: string; database: string; recommendation: string }[];
  commonRejections: { problem: string; cause: string; solution: string }[];
  tariffInfo: { mfnRate: string; vatRate: string; ftaRate: string };
  regulations: { name: string; number: string; authority: string; relevance: string; description: string }[];
  enforcementOptions: { option: string; description: string; timeline: string; costRange: string }[];
  riskFactors: { factor: string; level: string; note: string }[];
  riskMatrix: { dimension: string; rating: string; explanation: string }[];
  countryNotes: string[];
  postApproval: { item: string; freq: string; desc: string }[];
  horizonScan: { topic: string; impact: string; timeframe: string; description: string; actionRequired: string }[];
  summary: string;
}

export const CATEGORY_LABELS: Record<TrademarkCategory, string> = {
  food: "Food Products",
  cosmetics: "Cosmetics / Personal Care",
  electronics: "Electronics / Technology",
  apparel: "Apparel / Fashion / Accessories",
  beverage: "Beverages / Teas / Waters",
  health_supplement: "Health Supplements / Nutraceuticals",
  luxury: "Luxury Goods / Jewelry / Watches",
  other: "Other Products / Services",
};

const NICE_CLASS_MAP: Record<TrademarkCategory, { classNo: number; description: string }[]> = {
  food: [{ classNo: 29, description: "Meat, fish, poultry, preserved foods" }, { classNo: 30, description: "Coffee, tea, confectionery, bread, spices" }, { classNo: 31, description: "Fresh produce, grains, agricultural products" }, { classNo: 5, description: "Nutritional supplements, dietetic foods" }],
  cosmetics: [{ classNo: 3, description: "Cosmetics, skincare, haircare, perfumery" }, { classNo: 44, description: "Beauty salon services" }],
  electronics: [{ classNo: 9, description: "Electronics, software, apps, devices" }, { classNo: 42, description: "Technology services, software development" }],
  apparel: [{ classNo: 25, description: "Clothing, footwear, headgear" }, { classNo: 18, description: "Leather goods, bags, wallets" }, { classNo: 35, description: "Retail services" }],
  beverage: [{ classNo: 32, description: "Beers, mineral waters, non-alcoholic beverages" }, { classNo: 33, description: "Alcoholic beverages (except beer)" }],
  health_supplement: [{ classNo: 5, description: "Pharmaceuticals, supplements, vitamins" }, { classNo: 30, description: "Health teas, functional foods" }],
  luxury: [{ classNo: 14, description: "Jewelry, precious metals, watches" }, { classNo: 18, description: "Leather goods" }, { classNo: 25, description: "Clothing, fashion accessories" }],
  other: [{ classNo: 35, description: "Advertising, business management" }, { classNo: 41, description: "Education, entertainment" }],
};

export function checkTrademark(input: TrademarkInput): TrademarkResult {
  const needsRegistration = !input.registeredInChina;
  const riskScore = input.registeredInChina ? 2.0 : 7.5;
  const niceClasses = NICE_CLASS_MAP[input.category] || NICE_CLASS_MAP.other;

  return {
    needsRegistration,
    riskCategory: input.registeredInChina ? "low" : "high",
    riskScore,
    riskDimensions: [
      { dimension: "Prior Art Conflict", score: input.registeredInChina ? 2 : 8, color: input.registeredInChina ? "green" : "red", note: "Existing identical/similar marks in CNIPA database may block registration" },
      { dimension: "Distinctiveness", score: 5, color: "yellow", note: "Descriptive or generic terms weaken protection scope" },
      { dimension: "Bad-Faith Squatting Risk", score: input.registeredInChina ? 1 : 9, color: input.registeredInChina ? "green" : "red", note: "Unregistered foreign brands are prime targets for squatters" },
      { dimension: "Translation / Transliteration", score: 4, color: "yellow", note: "Chinese equivalent may conflict with existing local marks" },
      { dimension: "Enforcement Feasibility", score: input.registeredInChina ? 3 : 9, color: input.registeredInChina ? "yellow" : "red", note: "Registered marks are significantly easier and cheaper to enforce" },
    ],
    executiveSummary: `Brand protection assessment for "${input.brandName}" (${CATEGORY_LABELS[input.category]}). ${input.registeredInChina ? "✅ Registered in China — covered." : "🔴 NOT registered in China — at risk of bad-faith registration."}`,
    oneLineDecision: input.registeredInChina ? "✅ Protected. Monitor renewal timeline." : "🔴 Register urgently. China is first-to-file system.",
    channels: [
      { name: "Direct CNIPA Filing (National Route)", suitability: input.registeredInChina ? "N/A — already registered" : "Recommended for China-only protection", description: "File directly with CNIPA, best for brands entering China market exclusively", timeline: "8-14 months", costRange: "$1,000-3,000" },
      { name: "Madrid International System", suitability: "Best for multi-country coverage", description: "Single international application designating China + other territories via WIPO", timeline: "12-18 months", costRange: "$2,000-5,000" },
      { name: "Paris Convention Priority Route", suitability: "For existing home-country filers within 6-month priority window", description: "Claim priority from first filing in home country to secure earlier filing date", timeline: "8-14 months", costRange: "$1,200-3,500" },
      { name: "CTMO Monitoring / Third-Party Opposition", suitability: "Defensive only — not a registration route", description: "Monitor CNIPA Trademark Gazette for conflicting applications and oppose if needed", timeline: "Ongoing", costRange: "$500-2,000/yr" },
    ],
    niceClassification: niceClasses.map(nc => ({
      classNo: nc.classNo,
      description: nc.description,
      relevance: "high",
    })),
    registrationProcess: [
      { step: "Trademark Search & Analysis", duration: "1-2 weeks", description: "Search CNIPA database + common law for conflicts" },
      { step: "Application Filing (CNIPA)", duration: "1-3 working days", description: "Submit application to CNIPA with classification" },
      { step: "Formal Examination", duration: "1-2 months", description: "CNIPA reviews formalities (approx. 1 month)" },
      { step: "Substantive Examination", duration: "6-9 months", description: "CNIPA examines distinctiveness, conflicts (6-9 months)" },
      { step: "Publication / Opposition", duration: "3 months", description: "3-month opposition window for third parties" },
      { step: "Registration & Certificate", duration: "1-2 months", description: "Certificate issued. Valid 10 years from filing." },
    ],
    documentGuide: [
      { name: "Trademark Application Form", format: "CNIPA standard form", commonError: "Incorrect or incomplete filing basis selection" },
      { name: "Brand Specimen / Logo", format: "JPEG/PDF, clear reproduction", commonError: "Uploading low-resolution or color-specific image when black & white is preferred" },
      { name: "Goods/Services List", format: "Excel, per Nice Classification", commonError: "Overly broad or vague descriptions not conforming to CNIPA accepted terms" },
      { name: "Power of Attorney", format: "Notarized PDF (if filing through agent)", commonError: "Missing notarization, outdated POA, or wrong signatory" },
      { name: "Priority Document (if claiming)", format: "PDF certified copy from home office", commonError: "Filing after the 6-month priority deadline" },
    ],
    requiredDocuments: ["Application Form", "Brand Specimen", "Goods/Services List", "Power of Attorney", "Applicant ID/Business License"],
    estimatedTimeline: "8-14 months (smooth registration)",
    timelinePhases: [
      { phase: "Pre-filing Search & Strategy", duration: "1-2 weeks", description: "Comprehensive prior art search, class selection, and filing strategy consultation", responsible: "IP Attorney / Agent" },
      { phase: "Application Preparation & Filing", duration: "1-3 days", description: "Draft application, prepare specimens, submit to CNIPA", responsible: "IP Agent" },
      { phase: "Formal Examination", duration: "1-2 months", description: "CNIPA reviews formal requirements and issues filing receipt", responsible: "CNIPA Examiner" },
      { phase: "Substantive Examination", duration: "6-9 months", description: "CNIPA examines distinctiveness and prior conflict", responsible: "CNIPA Examiner" },
      { phase: "Publication & Opposition Period", duration: "3 months", description: "Trademark published in CNIPA Gazette for third-party opposition", responsible: "Third Parties / CNIPA" },
      { phase: "Registration & Certificate Issuance", duration: "1-2 months", description: "Certificate granted, 10-year protection period begins from filing date", responsible: "CNIPA" },
      { phase: "Post-Registration Monitoring", duration: "Ongoing", description: "Monitor for squatting, manage renewals, enforce against infringement", responsible: "Brand Owner / IP Agent" },
    ],
    costBreakdown: [
      { item: "Trademark Search", range: "$200-500", note: "Comprehensive CNIPA + international database search" },
      { item: "Filing Fee (per class)", range: "$300-600", note: "CNIPA official fee per class" },
      { item: "Registration & Certificate", range: "$100-200", note: "CNIPA issuance fee" },
      { item: "Professional Service", range: "$800-2,000", note: "Search + filing + monitoring package" },
    ],
    totalCostRange: "$1,000-3,000 per class",
    testRequirements: [
      "Distinctiveness test — mark must not be purely descriptive, generic, or functional",
      "Similarity search — phonetic, visual, and conceptual comparison with prior marks in same class",
      "Class-specific conflict check — per Nice Classification class(es) applied for",
      "Well-known mark cross-check — cannot conflict with well-known marks even in different classes",
      "Absolute grounds check — excludes state symbols, official hallmarks, false geographical indications",
    ],
    testCostRange: "$300-800 (professional search and analysis report)",
    priorArtSearch: [
      { type: "CNIPA Database Search", database: "China National IP Administration (cnipa.gov.cn)", recommendation: "Essential — search identical + similar marks across relevant classes" },
      { type: "WIPO Global Brand DB", database: "wipo.int/branddb", recommendation: "Check Madrid System filings covering China" },
      { type: "Common Law Search", database: "Tmall/JD active brands", recommendation: "Check actual marketplace use (not just registered marks)" },
    ],
    commonRejections: [
      { problem: "Identical / Similar Prior Mark", cause: "Same or similar mark already registered for same or similar goods/services (Art. 30)", solution: "Conduct comprehensive pre-filing search; seek consent from prior registrant or file coexistence agreement" },
      { problem: "Lack of Distinctiveness", cause: "Descriptive words, generic terms, common surnames, or functional shapes (Art. 11)", solution: "Avoid purely descriptive terms; build and submit evidence of acquired distinctiveness through use" },
      { problem: "Bad Faith Filing", cause: "Applicant knew or should have known of prior user's mark (Art. 32, 2019 Amendment)", solution: "File trademark early in China; maintain strong evidence of prior use; consider opposition" },
    ],
    tariffInfo: {
      mfnRate: "0% (Most Favored Nation — general tariff rate for trademark service fees under WTO commitments)",
      vatRate: "6% (VAT applicable on professional IP service fees in China)",
      ftaRate: "0% (preferential rate under applicable bilateral/regional free trade agreements)",
    },
    regulations: [
      { name: "Trademark Law of the People's Republic of China", number: "2019 Amendment (4th Revision)", authority: "Standing Committee of the National People's Congress", relevance: "Primary statute governing trademark registration, use, opposition, invalidation, and infringement", description: "Sets out registration eligibility, absolute/relative refusal grounds, opposition procedure, infringement remedies, and enhanced damages for bad-faith filings" },
      { name: "Implementing Regulations of the Trademark Law", number: "State Council Order No. 651, 2014 (revised 2019)", authority: "State Council / CNIPA", relevance: "Detailed procedural rules supplementing the Trademark Law", description: "Covers application formalities, examination procedures, classification rules, opposition timelines, and renewal process" },
      { name: "Nice Agreement on International Classification", number: "11th Edition (2024)", authority: "WIPO, adopted by CNIPA", relevance: "Determines class assignment for trademark examination", description: "International classification system for goods and services adopted by CNIPA as the official classification standard" },
      { name: "Anti-Unfair Competition Law of the PRC", number: "2019 Revision", authority: "Standing Committee of the National People's Congress", relevance: "Supplementary protection for unregistered well-known marks and trade dress", description: "Covers passing off, misleading indications, trade dress infringement, and protection of unregistered marks with certain reputation" },
      { name: "Customs Protection of Intellectual Property Rights", number: "State Council Order No. 572, 2010 (revised)", authority: "General Administration of Customs", relevance: "Border enforcement against infringing imports/exports", description: "Allows trademark owners to record registered marks with customs; empowers customs to detain and seize suspected infringing goods" },
    ],
    enforcementOptions: [
      { option: "Opposition (异议)", description: "Oppose a pending application during the 3-month publication window", timeline: "3-6 months", costRange: "$2,000-5,000" },
      { option: "Invalidation (无效宣告)", description: "Request CNIPA to declare a registered mark invalid on absolute or relative grounds", timeline: "6-12 months", costRange: "$3,000-8,000" },
      { option: "Infringement Complaint (侵权投诉)", description: "File an administrative complaint with SAMR or local AIC for trademark infringement", timeline: "1-3 months", costRange: "$2,000-10,000" },
      { option: "Customs Recordal (海关备案)", description: "Record the trademark with China Customs to block infringing imports and exports at the border", timeline: "1-2 weeks", costRange: "$500-1,000" },
    ],
    riskFactors: [
      { factor: "First-to-File System", level: "🔴 High", note: "China operates a strict first-to-file system. Late filer loses rights even if they used the mark first overseas." },
      { factor: "Bad Faith Squatting", level: "🔴 High", note: "Third parties actively monitor and register foreign brands before market entry. Particularly common for well-known foreign brands." },
      { factor: "Translation Risk", level: "🟡 Medium", note: "Chinese translation or transliteration of brand name may unintentionally create a confusingly similar mark." },
      { factor: "Renewal Management", level: "🟢 Low", note: "10-year validity. Set renewal reminder 6-12 months before expiry to avoid lapse." },
    ],
    riskMatrix: [
      { dimension: "Prior Art Conflict", rating: input.registeredInChina ? "Low" : "High", explanation: "Existing identical or similar marks in same Nice class may block registration or create enforcement difficulties" },
      { dimension: "Bad-Faith Squatting", rating: input.registeredInChina ? "Low" : "Critical", explanation: "Unregistered foreign brand names used overseas are commonly registered by squatters in China" },
      { dimension: "Distinctiveness", rating: "Medium", explanation: "Descriptive, generic, or non-distinctive marks face significantly higher rejection rates during substantive examination" },
      { dimension: "Translation Risk", rating: "Medium", explanation: "Chinese transliteration of brand name may unintentionally match or create similarity with existing local marks" },
      { dimension: "Enforcement Readiness", rating: input.registeredInChina ? "Low" : "High", explanation: "Without registration, enforcement relies solely on Anti-Unfair Competition Law, which is more difficult and costly" },
    ],
    countryNotes: [
      "China is a strict first-to-file jurisdiction — priority date is determined by filing date, not first use or first-to-invent.",
      "Madrid System international registrations designating China are treated as national CNIPA applications for examination purposes.",
      "CNIPA does not examine for relative grounds (prior rights) ex officio — oppositions and invalidations are initiated by third parties.",
      "Registered trademarks must be put to genuine use within 3 consecutive years of registration or risk cancellation for non-use (Art. 49).",
      "Trademark validity is 10 years from the filing date (not registration date), renewable indefinitely for successive 10-year periods.",
      "Well-known marks (驰名商标) receive cross-class protection and protection against dilution, but must be declared on a case-by-case basis.",
    ],
    postApproval: [
      { item: "Use Evidence Collection", freq: "Annually", desc: "Systematically collect sales invoices, advertising materials, product packaging, and online listings showing mark in use to defend against non-use cancellation" },
      { item: "Renewal Filing", freq: "Every 10 years", desc: "File renewal application 6-12 months before expiry. Grace period of 6 months after expiry with surcharge." },
      { item: "Monitoring New Filings", freq: "Quarterly", desc: "Monitor CNIPA Trademark Gazette for newly published applications that may conflict with your registered marks" },
      { item: "License / Franchise Recordal", freq: "As needed", desc: "Record trademark licenses and franchise agreements with CNIPA to ensure enforceability against third parties" },
      { item: "Customs Recordal Update", freq: "Annually", desc: "Keep customs recordal current with updated product listings and authorized importers/exporters" },
    ],
    horizonScan: [
      { topic: "CNIPA Accelerated Examination Pilot", impact: "Positive", timeframe: "2025-2027", description: "CNIPA is piloting accelerated examination for certain technology and green economy categories, potentially reducing grant time to 4-6 months", actionRequired: "Monitor eligible categories; consider fast-track applications for time-sensitive priority marks" },
      { topic: "AI-Generated Trademark Examination Standards", impact: "Moderate", timeframe: "2026-2028", description: "CNIPA developing guidelines for examining AI-generated trademarks and non-traditional marks (sound, motion, hologram)", actionRequired: "Stay updated on evolving examination standards; prepare for non-traditional mark applications" },
      { topic: "Madrid System Digital Integration", impact: "Positive", timeframe: "2025-2026", description: "Deepening digital integration between CNIPA and WIPO Madrid system for fully electronic international filing workflow", actionRequired: "Evaluate Madrid route for multi-country coverage; prepare for fully digital filing process" },
      { topic: "Enhanced Bad-Faith Penalties & Damages", impact: "Positive", timeframe: "2025-2027", description: "Supreme People's Court issuing stricter guidelines on bad-faith trademark squatting with punitive damages up to 5x actual loss", actionRequired: "Document evidence of bad-faith filings systematically; leverage enhanced damages in invalidation actions" },
      { topic: "Blockchain-Based Trademark Evidence Registry", impact: "Moderate", timeframe: "2027-2030", description: "CNIPA exploring blockchain-based registry for timestamped evidence of trademark use, priority, and chain of title", actionRequired: "Prepare for blockchain-based evidence submission; consider early adoption for use evidence recording" },
    ],
    summary: `"${input.brandName}" — ${input.registeredInChina ? "✅ Registered in China. Classes: " + niceClasses.map(n => n.classNo).join(', ') + ". Renewal reminder: 10 years." : "🔴 NOT registered. High risk of bad-faith squatting. File within 1-2 months."}`,
  };
}
