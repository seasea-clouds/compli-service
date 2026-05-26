/** LABEL — 深度规则引擎 */

export type LabelCategory =
  | "prepackaged" | "dairy" | "beverage" | "confectionery" | "alcohol"
  | "health_food" | "infant" | "oil" | "seasoning" | "other";

export interface LabelInput {
  category: LabelCategory;
  productName: string;
  packagingType: string;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "prepackaged": "Prepackaged Foods (GB 7718)",
  "dairy": "Dairy Products",
  "beverage": "Beverages",
  "alcohol": "Alcoholic Beverages",
  "confectionery": "Confectionery",
};

const PROFILES: Record<string, any> = {"prepackaged": {"label": "Prepackaged Foods (GB 7718)", "riskLevel": "🟡 Medium", "riskReason": "Standard GB 7718/28050 requirements.", "mfnRate": "5-20%", "rejections": [{"problem": "Nutrition table uses kcal without kJ", "cause": "GB 28050 mandates kJ", "solution": "Show kJ first, kcal optional"}], "timeline": "2-3 weeks"}, "dairy": {"label": "Dairy Products", "riskLevel": "🔴 High", "riskReason": "Strict labeling. Infant formula has additional rules.", "mfnRate": "5-20%", "rejections": [{"problem": "Infant formula label needs GB 10765", "cause": "Separate standard applies", "solution": "Follow GB 10765 for infant labels"}], "timeline": "3-4 weeks"}, "beverage": {"label": "Beverages", "riskLevel": "🟡 Medium", "riskReason": "GB 7718 + juice concentrate labeling rules.", "mfnRate": "5-20%", "rejections": [], "timeline": "2-3 weeks"}, "alcohol": {"label": "Alcoholic Beverages", "riskLevel": "🟡 Medium", "riskReason": "GB 7718 + alcohol-specific labeling. GI protection for wine.", "mfnRate": "5-10%", "rejections": [{"problem": "Alcohol % discrepancy", "cause": "Lab result vs label mismatch", "solution": "Verify alcohol content before printing"}], "timeline": "2-3 weeks"}, "confectionery": {"label": "Confectionery", "riskLevel": "🟡 Medium", "riskReason": "GB 7718. Additives strictly monitored.", "mfnRate": "8-15%", "rejections": [], "timeline": "2-3 weeks"}};

export function checkLabel(input: any): any {
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
    commonRejections: [{"problem": "Nutrition table uses kcal without kJ", "cause": "GB 28050 mandates kJ", "solution": "Show kJ first, kcal optional"}],
    postApprovalObligations: [],
    horizonScan: [],
    summary: isHighRisk ? "Action required" : "No action needed",
  };
}