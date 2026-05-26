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
  executiveSummary: string;
  oneLineDecision: string;
  niceClassification: { classNo: number; description: string; relevance: string }[];
  registrationProcess: { step: string; duration: string; description: string }[];
  documentGuide: { name: string; format: string; note: string }[];
  requiredDocuments: string[];
  estimatedTimeline: string;
  costBreakdown: { item: string; range: string; note: string }[];
  totalCostRange: string;
  priorArtSearch: { type: string; database: string; recommendation: string }[];
  commonRejectionReasons: { ground: string; explanation: string; howToAvoid: string }[];
  enforcementOptions: { option: string; description: string; timeline: string; costRange: string }[];
  riskFactors: { factor: string; level: string; note: string }[];
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
    executiveSummary: `Brand protection assessment for "${input.brandName}" (${CATEGORY_LABELS[input.category]}). ${input.registeredInChina ? "✅ Registered in China — covered." : "🔴 NOT registered in China — at risk of bad-faith registration."}`,
    oneLineDecision: input.registeredInChina ? "✅ Protected. Monitor renewal timeline." : "🔴 Register urgently. China is first-to-file system.",
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
      { name: "Trademark Application Form", format: "CNIPA form", note: "Filing basis: use/intent-to-use" },
      { name: "Brand Specimen / Logo", format: "JPEG/PDF, clear reproduction", note: "Black & white for broad protection" },
      { name: "Goods/Services List", format: "Excel, per Nice Classification", note: "Must be precise" },
      { name: "Power of Attorney", format: "Notarized PDF (if agent filing)", note: "Signed by authorized representative" },
      { name: "Priority Document (if claiming)", format: "PDF from home office", note: "6-month priority window" },
    ],
    requiredDocuments: ["Application Form", "Brand Specimen", "Goods/Services List", "Power of Attorney", "Applicant ID/Business License"],
    estimatedTimeline: "8-14 months (smooth registration)",
    costBreakdown: [
      { item: "Trademark Search", range: "$200-500", note: "Comprehensive CNIPA + international search" },
      { item: "Filing Fee (per class)", range: "$300-600", note: "CNIPA official fee per class" },
      { item: "Registration & Certificate", range: "$100-200", note: "CNIPA issuance fee" },
      { item: "Professional Service", range: "$800-2,000", note: "Search + filing + monitoring" },
    ],
    totalCostRange: "$1,000-3,000 per class",
    priorArtSearch: [
      { type: "CNIPA Database Search", database: "China National IP Administration (cnipa.gov.cn)", recommendation: "Essential — search identical + similar marks" },
      { type: "WIPO Global Brand DB", database: "wipo.int/branddb", recommendation: "Check Madrid System filings covering China" },
      { type: "Common Law Search", database: "Tmall/JD active brands", recommendation: "Check actual marketplace use (not just registered)" },
    ],
    commonRejectionReasons: [
      { ground: "Identical / Similar Prior Mark (Art. 30)", explanation: "Same/similar mark registered for same/similar goods", howToAvoid: "Comprehensive pre-filing search + consent from prior registrant if possible" },
      { ground: "Lack of Distinctiveness (Art. 11)", explanation: "Descriptive words, generic terms, common surnames", howToAvoid: "Avoid descriptive terms; build secondary meaning evidence" },
      { ground: "Bad Faith Filing (Art. 32)", explanation: "Filing with knowledge of prior use", howToAvoid: "File early, keep use evidence, consider opposition" },
    ],
    enforcementOptions: [
      { option: "Opposition (异议)", description: "Oppose pending application during 3-month publication", timeline: "3-6 months", costRange: "$2,000-5,000" },
      { option: "Invalidation (无效宣告)", description: "Request CNIPA to invalidate a registered mark", timeline: "6-12 months", costRange: "$3,000-8,000" },
      { option: "Infringement Complaint (侵权投诉)", description: "File complaint with SAMR/local AIC", timeline: "1-3 months", costRange: "$2,000-10,000" },
      { option: "Customs Recordal (海关备案)", description: "Record TM with China Customs to block infringing imports/exports", timeline: "1-2 weeks", costRange: "$500-1,000" },
    ],
    riskFactors: [
      { factor: "First-to-File System", level: "🔴 High", note: "China operates first-to-file. Late filer loses rights even if they used mark first overseas." },
      { factor: "Bad Faith Squatting", level: "🔴 High", note: "Third parties may register your brand before you enter China. Common for well-known foreign brands." },
      { factor: "Translation Risk", level: "🟡 Medium", note: "Chinese translation of brand name may unintentionally create similar mark." },
      { factor: "Renewal Management", level: "🟢 Low", note: "10-year validity. Set renewal reminder 6 months before expiry." },
    ],
    summary: `"${input.brandName}" — ${input.registeredInChina ? "✅ Registered in China. Classes: ${niceClasses.map(n => n.classNo).join(', ')}. Renewal reminder: 10 years." : "🔴 NOT registered. High risk of bad-faith squatting. File within 1-2 months."}`,
  };
}
