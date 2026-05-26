/** TRADEMARK — 深度规则引擎 */

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

export const CATEGORY_LABELS: Record<string, string> = {
  "food": "Food Products",
  "cosmetics": "Cosmetics / Personal Care",
  "electronics": "Electronics / Technology",
  "apparel": "Apparel / Fashion",
  "luxury": "Luxury Goods",
};

const PROFILES: Record<string, any> = {"food": {"label": "Food Products", "niceClass": "29-31", "riskLevel": "🔴 High", "riskReason": "Food brands frequently targeted by squatters.", "timeline": "8-14 months", "rejections": [{"problem": "Similar mark exists", "cause": "Prior registration in class 29/30", "solution": "Pre-filing search + class selection strategy"}], "cost": "$600-1,200/class"}, "cosmetics": {"label": "Cosmetics / Personal Care", "niceClass": "3", "riskLevel": "🔴 High", "riskReason": "Hotly contested class. Squatter risk high.", "timeline": "8-14 months", "rejections": [], "cost": "$600-1,200/class"}, "electronics": {"label": "Electronics / Technology", "niceClass": "9, 42", "riskLevel": "🟡 Medium", "riskReason": "Broad class 9 — careful with specification.", "timeline": "8-14 months", "rejections": [{"problem": "Class 9 too broad", "cause": "Generic specifications rejected", "solution": "Specific product descriptions"}], "cost": "$600-1,200/class"}, "apparel": {"label": "Apparel / Fashion", "niceClass": "25, 18", "riskLevel": "🔴 High", "riskReason": "Class 25 most frequently squatted.", "timeline": "8-14 months", "rejections": [{"problem": "Squatter registration", "cause": "Third party filed first", "solution": "File opposition + use evidence"}], "cost": "$600-1,200/class"}, "luxury": {"label": "Luxury Goods", "niceClass": "14, 18, 25", "riskLevel": "🔴 High", "riskReason": "Premium brands attract squatters.", "timeline": "8-14 months", "rejections": [], "cost": "$1,000-2,000/class"}};

export function checkTrademark(input: any): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const isHighRisk = cat.riskLevel === "🔴 High";
  const riskScore = isHighRisk ? 7.0 : 3.5;
  return {
    isHighRisk,
    riskCategory: isHighRisk ? "high" : "low",
    riskScore,
    estimatedTimeline: cat.timeline || "Contact us",
    totalCostRange: cat.cost || "$500-5,000",
    riskDimensions: [
      { dimension: "Category", score: isHighRisk ? 7 : 3, color: isHighRisk ? "🔴" : "🟢", note: cat.label },
      { dimension: "Complexity", score: isHighRisk ? 6 : 3, color: isHighRisk ? "🟡" : "🟢", note: cat.riskReason },
      { dimension: "Timeline", score: isHighRisk ? 6 : 3, color: isHighRisk ? "🟡" : "🟢", note: cat.timeline },
    ],
    executiveSummary: `Assessment for ${input.productName}. Risk: ${riskScore}/10.`,
    oneLineDecision: isHighRisk ? "⚠️ Action required" : "✅ Proceed",
    channels: [],
    tariffInfo: { mfnRate: cat.mfnRate || "Varies", vatRate: "13%", consumptionTax: "N/A", ftaRate: null, totalTaxBurden: "Varies" },
    regulations: [],
    classification: { assignedHsChapter: "—", ciqCode: "—", isHighRisk, riskReason: cat.riskReason, alternativeClassificationNote: "" },
    riskMatrix: [{ dimension: "Category Risk", rating: isHighRisk ? "🔴" : "🟢", explanation: cat.riskReason }],
    documentGuide: [],
    requiredDocuments: [],
    testRequirements: [],
    testCostRange: "Contact us",
    labGuide: "",
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [],
    costBreakdown: [],
    countryProfile: { region: "", ftaWithChina: false, ftaDetails: "", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: "moderate", languageNote: "", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "", keyDrivers: [], barriers: [], consumerPerception: "", topOrigins: [], recommendation: "" },
    competitiveAnalysis: "",
    commonRejections: [{"problem": "Similar mark exists", "cause": "Prior registration in class 29/30", "solution": "Pre-filing search + class selection strategy"}],
    postApprovalObligations: [],
    horizonScan: [],
    summary: isHighRisk ? "Action required" : "No action needed",
  };
}