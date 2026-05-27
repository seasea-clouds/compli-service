/**
 * 中文标签合规 — 深度规则引擎
 */
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
  "prepackaged": "Prepackaged Foods (GB 7718)", "dairy": "Dairy Products",
  "beverage": "Beverages / Juices", "confectionery": "Confectionery / Snacks",
  "alcohol": "Alcoholic Beverages", "health_food": "Health / Dietary Supplements",
  "infant": "Infant / Baby Foods", "oil": "Edible Oils / Fats",
  "seasoning": "Seasonings / Condiments", "other": "Other Food Products",
};

export function checkLabel(input: any): any {
  const isHighRisk = false;
  const riskScore = 4.5;
  return {
    requiresRegistration: true, riskCategory: "medium", isHighRisk, riskScore,
    estimatedTimeline: "2-4 weeks", totalCostRange: "$500-2,000",
    executiveSummary: `Label compliance assessment for ${input.productName}. All imported food requires Chinese label. Risk: ${riskScore}/10.`,
    oneLineDecision: "⚠️ Chinese label compliance required. Timeline: 2-4 weeks.",
    summary: "All prepackaged food imports require Chinese labels per GB 7718 and GB 28050.",
    riskDimensions: [
      { dimension: "Label Fields", score: 5, color: "🟡", note: "12 mandatory fields per GB 7718" },
      { dimension: "Nutrition Panel", score: 5, color: "🟡", note: "GB 28050 — kJ + NRV% required" },
      { dimension: "Additive Review", score: 6, color: "🟡", note: "GB 2760 positive list compliance" },
      { dimension: "Timeline", score: 3, color: "🟢", note: "2-4 weeks" },
      { dimension: "Cost", score: 2, color: "🟢", note: "$500-2,000" },
    ],
    channels: [
      { name: "Professional Label Review", suitability: "high", gaccRequired: false, description: "Full label compliance audit + design", advantages: ["Guaranteed customs approval"], disadvantages: ["Professional fee applies"], timeline: "2-4 weeks", costRange: "$500-2,000" },
    ],
    tariffInfo: { mfnRate: "5-20%", vatRate: "9-13%", consumptionTax: "N/A", ftaRate: null, totalTaxBurden: "Varies by product" },
    regulations: [
      { name: "GB 7718-2011", number: "GB 7718-2011 (rev. 2025)", effectiveDate: "April 20, 2012", authority: "NHC", relevance: "primary", description: "Labeling of Prepackaged Foods — mandatory for all food imports." },
      { name: "GB 28050-2011", number: "GB 28050-2011", effectiveDate: "January 1, 2013", authority: "NHC", relevance: "primary", description: "Nutrition labeling — kJ format + NRV% mandatory." },
      { name: "GB 2760-2024", number: "GB 2760-2024", effectiveDate: "February 8, 2025", authority: "NHC", relevance: "primary", description: "Food additives positive list — only listed additives permitted." },
      { name: "Food Safety Law (Label Articles)", number: "Ch.3 Arts.42-47, Ch.9 Arts.148-149", effectiveDate: "October 1, 2015", authority: "NPC", relevance: "primary", description: "Legal basis for all food label requirements. Fines up to 3× product value for violations." },
    ],
    classification: { assignedHsChapter: "Varies", ciqCode: "Varies", isHighRisk: false, riskReason: "Standard GB 7718/28050 compliance. 12 mandatory fields.", alternativeClassificationNote: "" },
    riskMatrix: [
      { dimension: "Label Fields", rating: "🟡", explanation: "12 mandatory fields — all must be in Chinese" },
      { dimension: "Nutrition Panel", rating: "🟡", explanation: "kJ format + NRV% calculation required" },
      { dimension: "Additive Check", rating: "🟡", explanation: "All additives must be on GB 2760 positive list" },
    ],
    documentGuide: [
      { name: "Original Label Artwork", format: "JPEG/PDF all sides", notarization: "Not required", validity: "Per application", commonError: "Low resolution or illegible text" },
      { name: "Chinese Label Design", format: "PDF/AI with embedded fonts", notarization: "Not required", validity: "Per application", commonError: "Fonts not embedded" },
      { name: "Nutrition Test Report", format: "CNAS lab report", notarization: "Certified translation recommended", validity: "Within 6 months", commonError: "Energy shown in kcal not kJ" },
      { name: "Certificate of Free Sale", format: "Government authority PDF", notarization: "Certified copy + translation", validity: "6-12 months", commonError: "Wrong issuing authority" },
      { name: "Ingredients & Additives Declaration", format: "Excel/PDF", notarization: "Not required", validity: "Per application", commonError: "GB 2760 codes not listed" },
    ],
    requiredDocuments: ["Original Label Artwork", "Chinese Label Design", "Nutrition Test Report", "Certificate of Free Sale", "Ingredients Declaration"],
    testRequirements: ["Nutritional analysis (Energy kJ/kcal)", "Additive verification (GB 2760)", "Microbiological (where required)"],
    testCostRange: "$300-1,500",
    labGuide: "Nutritional analysis must be at CNAS-accredited lab. Key point: energy must be in kJ (kilojoules) — kcal alone is insufficient.",
    labTests: ["Nutritional analysis", "Additive verification", "Microbiological"],
    viability: "High — label compliance is mandatory and cannot be bypassed",
    detailedTimeline: "Label review (3-5 working days) → Design (5-7 working days) → Nutrition calc (2-3 days) → Final check (2-3 days). Total: 2-3 weeks.",
    labelGuide: {
      requiredItems: [
        { field: "Product Name", requirement: "Accurate reflection of product nature. Standardized name if GB exists.", commonMistake: "Fanciful names without standard name" },
        { field: "Ingredients List", requirement: "Descending order by weight. Additives with GB 2760 codes.", commonMistake: "Missing additive codes or wrong order" },
        { field: "Net Content", requirement: "Metric units (g/mL). Draining weight if needed.", commonMistake: "Imperial units" },
        { field: "Manufacturer Info", requirement: "Overseas manufacturer + Chinese responsible party.", commonMistake: "Missing Chinese agent info" },
        { field: "Country of Origin", requirement: "Clearly marked.", commonMistake: "Vague description" },
        { field: "Date & Best Before", requirement: "DD/MM/YYYY or YYYY/MM/DD", commonMistake: "MM/DD/YYYY format" },
        { field: "Storage Conditions", requirement: "Clear storage instructions.", commonMistake: "Generic statements" },
        { field: "Nutrition Panel", requirement: "Energy kJ + protein + fat + carbs + sodium + NRV%", commonMistake: "Using kcal, missing NRV%" },
        { field: "Additive Codes", requirement: "GB 2760 codes (E330, INS 330)", commonMistake: "Trade names" },
        { field: "Allergens", requirement: "Milk, eggs, fish, crustacea, peanuts, soy, wheat, tree nuts", commonMistake: "Not declared" },
        { field: "Import Record #", requirement: "CIQ number after clearance.", commonMistake: "Blank" },
      ],
      gb7718Highlights: ["All text must be Chinese. Foreign supplementary only.", "Font ≥ 1.8mm.", "GMO must be labeled.", "Irradiated declared.", "Trans-fat if >0.3g/100g."],
      gb28050Highlights: ["Energy in kJ primary.", "Protein, Fat, Carbs, Sodium mandatory.", "NRV% per Appendix A.", "Format must match standard.", "Tolerance ≤120% energy."],
    },
    timelinePhases: [
      { phase: "Label Review", duration: "3-5 working days", description: "Audit current label against GB 7718/28050/2760", responsible: "SinoTrade", dependencies: [] },
      { phase: "Chinese Label Design", duration: "5-7 working days", description: "Create compliant Chinese label artwork", responsible: "SinoTrade", dependencies: ["Label review complete"] },
      { phase: "Nutrition Calculation", duration: "2-3 working days", description: "NRV% calculation per GB 28050", responsible: "SinoTrade", dependencies: ["Nutrition test results"] },
      { phase: "Final Verification", duration: "2-3 working days", description: "Pre-printing compliance check", responsible: "Both", dependencies: ["Chinese design complete"] },
    ],
    costBreakdown: [
      { item: "Label Compliance Review", estimatedRange: "$200-500", notes: "Full audit against GB 7718/28050/2760" },
      { item: "Chinese Label Design", estimatedRange: "$300-1,000", notes: "Includes 2 revision rounds" },
      { item: "Nutrition Testing", estimatedRange: "$200-600", notes: "CNAS lab — mandatory NRV% data" },
      { item: "Translation Certification", estimatedRange: "$100-300", notes: "English → Chinese" },
    ],
    countryProfile: { region: "", ftaWithChina: false, ftaDetails: "", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: "moderate", languageNote: "All text must be in Chinese. English may be supplementary.", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "All imported prepackaged food requires Chinese labels. Market size: mandatory for every food importer.", keyDrivers: ["Regulatory requirement", "Market access"], barriers: ["Complex standards", "Professional review needed"], consumerPerception: "Chinese labels build consumer trust.", topOrigins: [], recommendation: "Engage professional label compliance service." },
    competitiveAnalysis: "Label compliance is regulatory — not competitive. All importers face the same requirements.",
    commonRejections: [
      { problem: "Nutrition panel uses kcal without kJ", cause: "GB 28050 mandates kJ as primary", solution: "Always show kJ first, kcal optional" },
      { problem: "Additive not on GB 2760 list", cause: "Ingredient approved in origin but not China", solution: "Pre-submission additive audit against GB 2760" },
    ],
    postApprovalObligations: [
      { item: "Label Update Monitoring", frequency: "Ongoing", description: "Track GB 7718/28050 revisions" },
      { item: "Formula Change Re-label", frequency: "When applicable", description: "New formula = new label compliance check" },
    ],
    horizonScan: [
      { topic: "GB 7718 Major Revision", impact: "high", timeframe: "2025-2026", description: "New allergen + digital labeling rules expected.", actionRequired: true },
    ],
  };
}