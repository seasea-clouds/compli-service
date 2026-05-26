/**
 * 跨境电商合规 — 深度规则引擎
 * 覆盖：Tmall Global, JD Worldwide, Koala, Douyin Global 等平台
 */

export type CrossborderCategory =
  | "food" | "cosmetics" | "electronics" | "apparel"
  | "health_supplement" | "baby_product" | "home_goods" | "other";

export interface CrossborderInput {
  category: CrossborderCategory;
  productName: string;
  targetPlatform: string;
  hasBondedWarehouse: boolean;
  originCountry?: string;
}

export interface CrossborderResult {
  requiresCompliance: boolean;
  riskCategory: "high" | "medium" | "low";
  riskScore: number;
  executiveSummary: string;
  oneLineDecision: string;
  channels: { platform: string; eligibility: string; requirements: string; timeline: string }[];
  regulatoryFramework: { item: string; detail: string }[];
  documentGuide: { name: string; format: string; note: string }[];
  requiredDocuments: string[];
  estimatedTimeline: string;
  costBreakdown: { item: string; range: string; note: string }[];
  totalCostRange: string;
  positiveListCheck: { onPositiveList: boolean; category: string; note: string };
  taxInfo: { comprehensiveTax: string; annualLimit: string; perOrderLimit: string };
  bondedWarehouseGuide: string;
  platformSpecifics: { platform: string; pros: string[]; cons: string[]; requirements: string }[];
  commonIssues: { problem: string; cause: string; solution: string }[];
  summary: string;
  riskDimensions: { dimension: string; score: number; color: string; note: string }[];
  regulations: { name: string; number: string; authority: string; relevance: string; description: string }[];
  riskMatrix: { dimension: string; rating: string; explanation: string }[];
  testRequirements: string[];
  testCostRange: string;
  timelinePhases: { phase: string; duration: string; description: string; responsible: string }[];
  countryNotes: string[];
  commonRejections: { problem: string; cause: string; solution: string }[];
  postApproval: { item: string; freq: string; desc: string }[];
  horizonScan: { topic: string; impact: string; timeframe: string; description: string; actionRequired: string }[];
}

export const CATEGORY_LABELS: Record<CrossborderCategory, string> = {
  food: "Food & Beverages",
  cosmetics: "Cosmetics / Personal Care",
  electronics: "Electronics / Small Appliances",
  apparel: "Apparel / Fashion Accessories",
  health_supplement: "Health Supplements / Vitamins",
  baby_product: "Baby / Maternity Products",
  home_goods: "Home / Kitchen Goods",
  other: "Other Products",
};

// Cross-border E-commerce Positive List eligibility
const POSITIVE_LIST: Record<CrossborderCategory, boolean> = {
  food: true,
  cosmetics: true,
  electronics: true,
  apparel: true,
  health_supplement: true,
  baby_product: true,
  home_goods: true,
  other: false,
};

export function checkCrossborder(input: CrossborderInput): CrossborderResult {
  const onPositiveList = POSITIVE_LIST[input.category] ?? false;
  const riskScore = onPositiveList ? 3.5 : 7.0;

  return {
    requiresCompliance: true,
    riskCategory: onPositiveList ? "low" : "high",
    riskScore,
    executiveSummary: `Cross-border e-commerce assessment for ${input.productName}. Category: ${CATEGORY_LABELS[input.category]}. ${onPositiveList ? "✅ On CBEC positive list — eligible." : "❌ May not be on positive list — general trade required."}`,
    oneLineDecision: onPositiveList ? "✅ CBEC eligible. Quick market entry via bonded warehouse." : "⚠️ General trade route recommended. Check positive list.",
    channels: [
      { platform: "Tmall Global", eligibility: onPositiveList ? "✅ Eligible" : "❌ Check", requirements: "Brand owner or authorized distributor", timeline: "4-8 weeks" },
      { platform: "JD Worldwide", eligibility: onPositiveList ? "✅ Eligible" : "❌ Check", requirements: "Company registration + product info", timeline: "4-8 weeks" },
      { platform: "Douyin Global", eligibility: onPositiveList ? "✅ Eligible" : "❌ Check", requirements: "Store opening + content capability", timeline: "2-4 weeks" },
    ],
    regulatoryFramework: [
      { item: "CBEC Retail Import Policy", detail: "Ministry of Commerce (MOFCOM) — pilot program extended nationally" },
      { item: "Positive List Management", detail: "Only products on Positive List can be sold via CBEC" },
      { item: "Personal Use Declaration", detail: "Products imported as 'personal use' — not subject to full GACC/CCC" },
      { item: "Bonded Warehouse Filing", detail: "Products stored in GACC-supervised bonded warehouse" },
      { item: "Taxation Policy", detail: "Comprehensive tax rate: 70% of MFN tariff + 70% of VAT" },
    ],
    documentGuide: [
      { name: "Platform Admission Agreement", format: "Signed with platform", note: "Read terms carefully" },
      { name: "Product Listing Pages", format: "JPEG/HTML", note: "Chinese + compliant claims" },
      { name: "Overseas Purchase Proof", format: "Invoice or logistics proof", note: "Required for bonded warehouse" },
      { name: "Brand Authorization Letter", format: "PDF", note: "Chain of authorization" },
      { name: "Product Origin Certificate", format: "PDF", note: "Proof of country of origin" },
      { name: "Label Compliance (Chinese)", format: "PDF/JPEG", note: "GB 7718 for food (still needed for CBEC)" },
    ],
    requiredDocuments: ["Platform Agreement", "Product Listings", "Purchase Proof", "Brand Auth Letter", "Origin Cert", "Label Artwork"],
    estimatedTimeline: "4-10 weeks (platform onboarding)",
    costBreakdown: [
      { item: "Platform Deposit", range: "$5,000-25,000", note: "Refundable deposit (varies by platform)" },
      { item: "Platform Annual Fee", range: "$5,000-15,000", note: "Yearly platform service fee" },
      { item: "Bonded Warehouse & Logistics", range: "$3-8/order", note: "Per-order fulfillment cost" },
      { item: "Compliance Service", range: "$1,000-5,000", note: "Listing + label + registration support" },
    ],
    totalCostRange: "$10,000-40,000 initial + variable per order",
    positiveListCheck: { onPositiveList, category: CATEGORY_LABELS[input.category], note: onPositiveList ? "✅ Product category is on the CBEC Positive List. Cross-border e-commerce is feasible." : "⚠️ Verify your specific HS code against the latest Positive List. Some sub-categories may be restricted." },
    taxInfo: { comprehensiveTax: "9.1% avg (70% discount on tariff + VAT)", annualLimit: "RMB 26,000 per person/year", perOrderLimit: "RMB 5,000 per order" },
    bondedWarehouseGuide: "Bonded warehouse (e.g., Ningbo, Shanghai, Guangzhou) allows: (1) Bulk import to warehouse, (2) Customs clearance deferred, (3) Ship directly to consumers from warehouse. Benefits: lower duty, faster delivery, easier returns. Setup: 2-4 weeks to register warehouse + file products.",
    platformSpecifics: [
      { platform: "Tmall Global", pros: ["Largest CBEC platform", "Strong brand recognition", "Integrated logistics (Cainiao)"], cons: ["Higher deposit required", "Extensive documentation", "Competitive marketplace"], requirements: "Brand owner, TM registration, overseas entity" },
      { platform: "JD Worldwide", pros: ["Own logistics (JD Logistics)", "Trusted for authentic products", "Strong electronics/health audience"], cons: ["Strict quality control", "Higher commission rates"], requirements: "Company registration, product certificates, brand auth" },
      { platform: "Douyin Global (TikTok)", pros: ["Fast-growing", "Content-driven sales", "Lower entry barrier"], cons: ["Content production required", "Algorithm-dependent reach"], requirements: "Store setup, content creators, live-stream capability" },
    ],
    commonIssues: [
      { problem: "Product not on Positive List", cause: "Specific HS code not in approved CBEC list", solution: "Verify HS code. Consider general trade if not listed." },
      { problem: "Brand authorization chain broken", cause: "Platform requires full brand authorization from manufacturer to seller", solution: "Establish complete authorization chain before applying" },
      { problem: "Label still needs compliance", cause: "CBEC products still require Chinese labels (less strict but must comply)", solution: "Prepare compliant Chinese labels even for CBEC" },
    ],
    summary: `CBEC assessment: ${CATEGORY_LABELS[input.category]}. ${onPositiveList ? "✅ Eligible for cross-border e-commerce." : "⚠️ Verify positive list status."} Estimated initial investment: $10,000-40,000.`,
    riskDimensions: [
      { dimension: "Market Competition Risk", score: onPositiveList ? 3 : 8, color: onPositiveList ? "green" : "red", note: "Platform competition intensity and differentiation challenge" },
      { dimension: "Regulatory Compliance Risk", score: onPositiveList ? 2 : 9, color: onPositiveList ? "green" : "red", note: "CBEC regulatory framework alignment" },
      { dimension: "Supply Chain Risk", score: 4, color: "yellow", note: "Bonded warehouse and cross-border logistics stability" },
      { dimension: "Brand Authenticity Risk", score: 5, color: "yellow", note: "Brand authorization chain completeness" },
      { dimension: "Product Liability Risk", score: 3, color: "green", note: "Consumer protection requirements in Chinese market" },
    ],
    regulations: [
      { name: "CBEC Retail Import Tax Policy", number: "Caishui [2016] No.18", authority: "Ministry of Finance / GAC / SAT", relevance: "Tax calculation framework for CBEC imports", description: "Sets comprehensive tax rate at 70% of MFN tariff + 70% of VAT; annual limit RMB 26,000, per-order limit RMB 5,000" },
      { name: "CBEC Retail Import Supervision Notice", number: "Shangcaifa [2018] No.486", authority: "Ministry of Commerce", relevance: "Core regulatory framework for CBEC pilot zones", description: "Defines responsible entities, product scope, consumer identity verification, and after-sales requirements" },
      { name: "Customs Supervision of CBEC Goods", number: "GAC Announcement No.194/2018", authority: "General Administration of Customs", relevance: "Customs clearance procedures for CBEC shipments", description: "Covers declaration, inspection, release, and returns procedures for bonded warehouse and direct mail models" },
      { name: "CBEC Returns Management", number: "GAC Announcement No.219/2018", authority: "General Administration of Customs", relevance: "Return policy for CBEC imports", description: "Allows return within 30 days with refund of duties; returned goods can re-enter bonded warehouse" },
      { name: "Food Safety Law Implementation", number: "Food Safety Law (2015 Rev.)", authority: "NHCC / SAMR", relevance: "Food/baby product labeling requirements for CBEC", description: "CBEC food imports still require Chinese labels meeting GB 7718 and applicable GB standards" },
    ],
    riskMatrix: [
      { dimension: "Market Access", rating: onPositiveList ? "Low" : "High", explanation: "Positive List eligibility determines primary market access route" },
      { dimension: "Regulatory Alignment", rating: onPositiveList ? "Low" : "High", explanation: "Degree of alignment with current CBEC regulatory framework" },
      { dimension: "Documentation Burden", rating: onPositiveList ? "Medium" : "High", explanation: "Platform and customs documentation requirements" },
      { dimension: "Tax & Duty Impact", rating: "Low", explanation: "CBEC comprehensive tax rate is typically 9.1%, significantly lower than general trade" },
      { dimension: "Logistics Complexity", rating: "Medium", explanation: "Bonded warehouse setup requires coordination with GACC-licensed warehousing providers" },
      { dimension: "IP & Brand Protection", rating: onPositiveList ? "Medium" : "High", explanation: "Platforms require complete brand authorization chain; counterfeiting risk in market" },
    ],
    testRequirements: onPositiveList
      ? ["Product label compliance (Chinese text, GB standards)", "Category-specific testing if required (e.g., food micro test for supplements)", "Platform listing review — product imagery, descriptions, claims"]
      : ["Full GACC entry inspection if via general trade route", "CCC certification for applicable electronics", "Food safety testing (GB 2762, GB 29921) for food items", "Cosmetics safety assessment (Technical Standard for Cosmetics)", "Label compliance review with official Chinese registration"],
    testCostRange: onPositiveList ? "$200-1,000 per product" : "$3,000-15,000 per product",
    timelinePhases: [
      { phase: "Platform Onboarding & Agreement", duration: "2-4 weeks", description: "Sign platform agreement, submit company docs, prepare store setup", responsible: "Platform Operations" },
      { phase: "Bonded Warehouse Filing", duration: "2-4 weeks", description: "Register warehouse location, file product catalog, get customs filing approval", responsible: "Logistics / Customs Broker" },
      { phase: "Product Listing Preparation", duration: "1-3 weeks", description: "Create product listings, upload images, prepare marketing copy in Chinese", responsible: "Marketing / Content Team" },
      { phase: "Compliance Documentation", duration: "2-4 weeks", description: "Compile required documents: brand auth, origin cert, label compliance, test reports", responsible: "Compliance Team" },
      { phase: "Go-Live & Launch", duration: "1-2 weeks", description: "Platform review, listing approval, initial inventory arrangement", responsible: "Cross-Functional Team" },
    ],
    countryNotes: [
      input.originCountry === "Japan" ? "🇯🇵 Japanese products benefit from RCEP tariff reductions; ensure Fukushima-affected prefecture food restrictions observed." : "",
      input.originCountry === "USA" ? "🇺🇸 US-China tariff rates may affect general trade route; CBEC route helps mitigate tariff exposure." : "",
      input.originCountry === "Korea" ? "🇰🇷 Korean cosmetics popular in CBEC; K-beauty certification widely accepted." : "",
      input.originCountry === "Australia" || input.originCountry === "New Zealand" ? "🇦🇺🇳🇿 FTA benefits apply; dairy and health supplement origins well-regarded by Chinese consumers." : "",
      input.originCountry === "EU" ? "🇪🇺 EU products generally well-regarded; ensure CE marking transferred to CCC where applicable." : "",
      "📌 General: Ensure all origin-related claims (made in X) are verifiable by customs and platform alike.",
    ].filter(Boolean),
    commonRejections: [
      { problem: "Missing Brand Authorization Chain", cause: "Platform requires full chain from brand owner to seller", solution: "Collect all intermediary authorization letters in sequence before applying" },
      { problem: "Product HS Code Mismatch", cause: "Declared HS code does not match CBEC positive list or product characteristics", solution: "Engage customs broker for proper HS classification early in the process" },
      { problem: "Insufficient Label Compliance", cause: "Product labels lack required Chinese content (product name, ingredients, net content, distributor info)", solution: "Commission professional label translation and GB-compliant design" },
      { problem: "Consumer Identity Verification Failure", cause: "Platform cannot verify buyer is real individual within annual quota", solution: "Ensure platform has proper NFC/e-ID or real-name verification flow" },
      { problem: "Cross-Border Logistics Incompatibility", cause: "Product dimensions/type not supported by bonded warehouse logistics", solution: "Pre-check logistics provider's SKU compatibility matrix" },
    ],
    postApproval: [
      { item: "Annual Quota Management", freq: "Continuous", desc: "Monitor per-consumer annual limit (RMB 26,000); platform auto-tracks but seller should flag high-value orders" },
      { item: "Label Compliance Audit", freq: "Quarterly", desc: "Review product labels for regulatory updates — SAMR may issue new GB standards affecting existing listings" },
      { item: "Platform Policy Updates", freq: "Monthly", desc: "Platforms (Tmall, JD, Douyin) update compliance policies regularly; review for new document or listing requirements" },
      { item: "Tax Calculation Verification", freq: "Quarterly", desc: "Verify comprehensive tax rate applied correctly; cross-check with customs broker" },
      { item: "Returns & Refund Compliance", freq: "Monthly", desc: "Ensure returned goods process compliant with GAC Announcement No.219/2018 — 30-day window, proof of return required" },
    ],
    horizonScan: [
      { topic: "CBEC Tax Policy Reform", impact: "High", timeframe: "12-18 months", description: "Possible adjustment to annual/per-order limits and comprehensive tax rate; may affect pricing strategy", actionRequired: "Monitor MOFCOM and GAC policy announcements; model financial impact of limit reductions" },
      { topic: "Cross-Border Data Security", impact: "High", timeframe: "6-12 months", description: "New data export restrictions under PIPL/CSSL may affect cross-border consumer data processing", actionRequired: "Review data flows between offshore entity and platform; ensure data localization readiness" },
      { topic: "Expanded Positive List", impact: "Medium", timeframe: "12-24 months", description: "Government considering expanding CBEC positive list to include more categories", actionRequired: "Track policy updates if current product is near-positive-list; prepare application in advance" },
      { topic: "Green Channel for Fast-Moving Goods", impact: "Medium", timeframe: "18-24 months", description: "Pilot programs for expedited customs clearance for certified high-compliance sellers", actionRequired: "Build compliance track record to qualify when program expands" },
      { topic: "AI-Powered Customs Declaration", impact: "Low-Medium", timeframe: "24-36 months", description: "GAC piloting AI-assisted declaration systems in select bonded zones", actionRequired: "Invest in API-integrated customs declaration systems for future compatibility" },
    ],
  };
}
