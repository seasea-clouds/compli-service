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
  };
}
