/** CROSSBORDER — 深度规则引擎 */

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

export const CATEGORY_LABELS: Record<string, string> = {
  "food": "Food & Beverages",
  "cosmetics": "Cosmetics",
  "electronics": "Electronics",
  "health_supplement": "Health Supplements",
};

const PROFILES: Record<string, any> = {"food": {"label": "Food & Beverages", "eligible": true, "riskLevel": "🟢 Low", "riskReason": "Majority of food on CBEC positive list.", "taxRate": "9.1%", "rejections": [{"problem": "Product not on positive list", "cause": "Specific HS code restricted", "solution": "Verify HS code against latest positive list"}], "timeline": "4-8 weeks"}, "cosmetics": {"label": "Cosmetics", "eligible": true, "riskLevel": "🟢 Low", "riskReason": "Most cosmetics on positive list.", "taxRate": "9.1%", "rejections": [{"problem": "First import permit needed", "cause": "New brand requires filing", "solution": "Obtain first import permit before listing"}], "timeline": "4-8 weeks"}, "electronics": {"label": "Electronics", "eligible": true, "riskLevel": "🟡 Medium", "riskReason": "Some electronics restricted. Check battery regulations.", "taxRate": "9.1%", "rejections": [], "timeline": "4-8 weeks"}, "health_supplement": {"label": "Health Supplements", "eligible": true, "riskLevel": "🟡 Medium", "riskReason": "On positive list but stricter labeling.", "taxRate": "9.1%", "rejections": [{"problem": "Health claims restricted", "cause": "CBEC products limited in claims", "solution": "Pre-approve all claims with platform"}], "timeline": "4-10 weeks"}};

export function checkCrossborder(input: any): any {
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
    commonRejections: [{"problem": "Product not on positive list", "cause": "Specific HS code restricted", "solution": "Verify HS code against latest positive list"}],
    postApprovalObligations: [],
    horizonScan: [],
    summary: isHighRisk ? "Action required" : "No action needed",
  };
}