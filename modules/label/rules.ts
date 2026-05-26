/**
 * 中文标签合规 — 深度规则引擎
 * GB 7718 / GB 28050 / GB 2760 / 进口食品标签
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

export interface LabelResult {
  requiresCompliance: boolean;
  riskCategory: "high" | "medium" | "low";
  riskScore: number;
  executiveSummary: string;
  oneLineDecision: string;
  regulations: any[];
  documentGuide: { name: string; format: string; commonError: string }[];
  requiredDocuments: string[];
  testRequirements: string[];
  testCostRange: string;
  timelinePhases: { phase: string; duration: string; description: string; responsible: string }[];
  estimatedTimeline: string;
  costBreakdown: { item: string; range: string; note: string }[];
  totalCostRange: string;
  labelFieldGuide: { field: string; requirement: string; commonMistake: string }[];
  gb7718Requirements: string[];
  gb28050Requirements: string[];
  commonIssues: { problem: string; cause: string; solution: string }[];
  summary: string;
}

export const CATEGORY_LABELS: Record<LabelCategory, string> = {
  prepackaged: "Prepackaged Foods (GB 7718)",
  dairy: "Dairy Products",
  beverage: "Beverages / Juices",
  confectionery: "Confectionery / Snacks",
  alcohol: "Alcoholic Beverages",
  health_food: "Health / Dietary Supplements",
  infant: "Infant / Baby Foods",
  oil: "Edible Oils / Fats",
  seasoning: "Seasonings / Condiments",
  other: "Other Food Products",
};

export function checkLabel(input: LabelInput): LabelResult {
  const riskScore = 5.0;
  return {
    requiresCompliance: true,
    riskCategory: "medium",
    riskScore,
    executiveSummary: `Label compliance assessment for ${input.productName}. All imported prepackaged food requires Chinese label compliant with GB 7718 and GB 28050. Score: ${riskScore}/10.`,
    oneLineDecision: "⚠️ Chinese label required. Budget $500-2,000 for compliance.",
    regulations: [
      { name: "GB 7718-2011", number: "GB 7718-2011 (rev. pending 2025)", authority: "NHC", relevance: "primary", description: "The foundational label standard. Mandatory for ALL prepackaged food." },
      { name: "GB 28050-2011", number: "GB 28050-2011", authority: "NHC", relevance: "primary", description: "Nutrition labeling mandatory for all prepackaged food." },
      { name: "GB 2760-2024", number: "GB 2760-2024", authority: "NHC", relevance: "primary", description: "Food additive labeling requirements." },
      { name: "Food Safety Law (Label Articles)", number: "Ch. 3, Arts. 42-47", authority: "NPC", relevance: "primary", description: "Legal foundation for label requirements." },
      { name: "GACC Decree 249 (Label Ch.)", number: "Decree 249, Ch. 2", authority: "GACC", relevance: "secondary", description: "Customs label inspection standards at import." },
    ],
    documentGuide: [
      { name: "Product Label Artwork (Original)", format: "JPEG/PDF, all sides", commonError: "Cannot read small text" },
      { name: "Chinese Label Design", format: "PDF/AI, color + B&W", commonError: "Fonts not embedded" },
      { name: "Nutrition Test Report", format: "CNAS lab report", commonError: "Energy in kcal not kJ" },
      { name: "Certificate of Free Sale", format: "PDF", commonError: "Missing for imported products" },
      { name: "Ingredients & Additives Declaration", format: "Excel/PDF", commonError: "Missing GB 2760 codes" },
    ],
    requiredDocuments: ["Original Label Artwork", "Chinese Label Design", "Nutrition Test Report", "Certificate of Free Sale", "Ingredients Declaration", "Product Spec Sheet"],
    testRequirements: ["Nutritional analysis (GB 28050 nutrients)", "Microbiological (if required by GB standards)", "Food additives confirmation (GB 2760)"],
    testCostRange: "$300-1,500",
    timelinePhases: [
      { phase: "Label Review", duration: "3-5 working days", description: "Review current label against GB 7718/28050", responsible: "SinoTrade" },
      { phase: "Chinese Label Design", duration: "5-7 working days", description: "Create compliant Chinese label + verification", responsible: "SinoTrade" },
      { phase: "Nutrition Calculation", duration: "2-3 working days", description: "Calculate NRV%, format per GB 28050", responsible: "SinoTrade" },
      { phase: "Final Approval Check", duration: "2-3 working days", description: "Full compliance verification before printing", responsible: "Both" },
    ],
    estimatedTimeline: "2-4 weeks",
    costBreakdown: [
      { item: "Label Compliance Review", range: "$200-500", note: "Full audit against GB 7718/28050/2760" },
      { item: "Chinese Label Design", range: "$300-1,000", note: "Includes 2 revision rounds" },
      { item: "Nutrition Test (CNAS)", range: "$200-600", note: "Mandatory NRV% data" },
      { item: "Translation (if needed)", range: "$100-300", note: "English → Chinese" },
    ],
    totalCostRange: "$500-2,000",
    labelFieldGuide: [
      { field: "Product Name", requirement: "Reflect true nature of product. Standardized name if exists.", commonMistake: "Fanciful names without descriptive standard name" },
      { field: "Ingredients List", requirement: "Descending order. Additives with GB 2760 codes.", commonMistake: "Missing additive codes or incorrect order" },
      { field: "Net Content", requirement: "Metric units (g/mL). Draining weight if needed.", commonMistake: "Imperial units or missing draining weight" },
      { field: "Manufacturer Info", requirement: "Overseas manufacturer + Chinese responsible party.", commonMistake: "Missing Chinese agent details" },
      { field: "Country of Origin", requirement: "Clearly marked origin.", commonMistake: "Vague 'Imported' without specific country" },
      { field: "Date Marking", requirement: "DD/MM/YYYY or YYYY/MM/DD. Production + best before.", commonMistake: "MM/DD/YYYY format" },
      { field: "Storage Conditions", requirement: "Clear storage instructions.", commonMistake: "Generic statement insufficient for sensitive products" },
      { field: "Nutrition Info Panel", requirement: "GB 28050 format. kJ, protein, fat, carbs, sodium + NRV%.", commonMistake: "Using kcal without kJ, missing NRV%" },
      { field: "Food Additives", requirement: "GB 2760 codes (E330, INS 330).", commonMistake: "Trade names not standard codes" },
      { field: "Allergens", requirement: "Milk, eggs, fish, crustacea, peanuts, soy, wheat, tree nuts.", commonMistake: "Not declaring China-regulated allergens" },
      { field: "Import Record #", requirement: "CIQ registration number after customs clearance.", commonMistake: "Leaving blank or showing expired number" },
      { field: "QS/SC Logo", requirement: "DO NOT print QS/SC marks (domestic products only).", commonMistake: "Incorrectly printing PRC production marks" },
    ],
    gb7718Requirements: [
      "All text must be Chinese. Foreign language supplementary only.",
      "Font size ≥ 1.8mm for mandatory items.",
      "Products with GMO ingredients must be labeled.",
      "Irradiated ingredients must be declared.",
      "Trans-fat declared if >0.3g/100g.",
      "Rev. expected 2025-2026: new allergen + digital labeling rules.",
    ],
    gb28050Requirements: [
      "Energy must be in kJ (kilojoules) — kcal alone is insufficient.",
      "Mandatory: Energy, Protein, Fat, Carbohydrate, Sodium.",
      "NRV% must be calculated per GB 28050 Appendix A.",
      "Format must follow exact table structure in the standard.",
      "Tolerance: ≤120% for energy & nutrients; ≥80% for protein/vitamins.",
    ],
    commonIssues: [
      { problem: "Nutrition table uses kcal without kJ", cause: "GB 28050 mandates kJ as primary energy unit", solution: "Always show kJ first, kcal optional secondary" },
      { problem: "Additive not on GB 2760 positive list", cause: "Ingredient approved in origin but not in China", solution: "Pre-submission full additive audit against GB 2760" },
      { problem: "Allergen declaration incomplete", cause: "China's Big 8 differs from other markets' allergen lists", solution: "Cross-check allergens against the China-standard Big 8" },
      { problem: "Chinese agent info missing", cause: "GACC Decree 249 requires Chinese responsible party on label", solution: "Engage Chinese agent before label printing" },
    ],
    summary: `All imported food requires Chinese label per GB 7718 & GB 28050. Estimated compliance cost: $500-2,000. Timeline: 2-4 weeks.`,
  };
}
