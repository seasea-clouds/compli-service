/** NMPA 化妆品 — 深度规则引擎 */

export type CosmeticsCategory =
  | "skincare" | "makeup" | "sunscreen" | "haircare" | "fragrance"
  | "oral_care" | "body_care" | "baby" | "other";

export interface CosmeticsInput {
  category: CosmeticsCategory;
  productName: string;
  brandCountry: string;
  hasNewIngredient: boolean;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<CosmeticsCategory, string> = {
  skincare: "Skincare (HS 33.04)",
  makeup: "Makeup (HS 33.04)",
  sunscreen: "Sunscreen (HS 33.04) — SPECIAL",
  haircare: "Hair Care (HS 33.05)",
  fragrance: "Fragrance / Perfume (HS 33.03)",
  oral_care: "Oral Care (HS 33.06)",
  body_care: "Body Care (HS 33.04)",
  baby: "Baby Products (HS 33.04)",
  other: "Other Cosmetics",
};

const PROFILES: Record<string, any> = {
  "skincare": {"label": "Skincare (HS 33.04)", "isSpecial": false, "riskReason": "Ordinary cosmetics. NMPA filing required.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals", "Stability"], "testCost": "$1,000-3,000", "rejections": [{"problem": "Ingredient not in ICSC", "cause": "Novel ingredient", "solution": "Check INCI against ICSC"}], "timeline": "2-4 months"},
  "makeup": {"label": "Makeup (HS 33.04)", "isSpecial": false, "riskReason": "Ordinary cosmetics. Color additives monitored.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals", "Colorants"], "testCost": "$1,500-4,000", "rejections": [{"problem": "Color additive not approved", "cause": "Not on China positive list", "solution": "Verify colorant against CosIng China list"}], "timeline": "2-4 months"},
  "sunscreen": {"label": "Sunscreen (HS 33.04) — SPECIAL", "isSpecial": true, "riskReason": "SPECIAL cosmetics. Full NMPA registration required.", "mfnRate": "1-5%", "testing": ["Safety assessment", "Efficacy (SPF)", "Microbiological", "Heavy metals", "Stability"], "testCost": "$3,000-10,000", "rejections": [{"problem": "SPF test method not per GB/T", "cause": "Different test protocol", "solution": "Use CNAS lab per GB/T 35954"}], "timeline": "6-12 months"},
  "haircare": {"label": "Hair Care (HS 33.05)", "isSpecial": false, "riskReason": "Ordinary cosmetics.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals"], "testCost": "$800-2,500", "rejections": [], "timeline": "2-4 months"},
  "fragrance": {"label": "Fragrance / Perfume (HS 33.03)", "isSpecial": false, "riskReason": "Ordinary cosmetics. Alcohol content monitored.", "mfnRate": "3-6.5%", "testing": ["Microbiological", "Heavy metals", "Alcohol content"], "testCost": "$1,000-3,000", "rejections": [{"problem": "Allergen declaration", "cause": "EU allergens vs China list differ", "solution": "Check China fragrance allergen list"}], "timeline": "2-4 months"},
  "oral_care": {"label": "Oral Care (HS 33.06)", "isSpecial": false, "riskReason": "Ordinary cosmetics.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals", "Fluoride"], "testCost": "$800-2,000", "rejections": [], "timeline": "2-4 months"},
  "body_care": {"label": "Body Care (HS 33.04)", "isSpecial": false, "riskReason": "Ordinary cosmetics.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals"], "testCost": "$800-2,000", "rejections": [], "timeline": "2-4 months"},
  "baby": {"label": "Baby Products (HS 33.04)", "isSpecial": false, "riskReason": "Ordinary cosmetics. Stricter safety requirements.", "mfnRate": "1-5%", "testing": ["Microbiological", "Heavy metals", "Skin irritation", "PH"], "testCost": "$1,000-3,000", "rejections": [], "timeline": "2-4 months"},
  "other": {"label": "Other Cosmetics", "isSpecial": false, "riskReason": "Varies by type.", "mfnRate": "1-6.5%", "testing": ["Microbiological", "Heavy metals"], "testCost": "$800-2,000", "rejections": [], "timeline": "2-4 months"}
};

export function checkCosmetics(input: CosmeticsInput): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const isSpecial = cat.isSpecial;
  const riskScore = isSpecial ? 7.5 : 4.0;
  return {
    requiresFiling: true, isSpecialCosmetics: isSpecial,
    riskCategory: isSpecial ? "high" : "low", isHighRisk: isSpecial,
    riskScore, estimatedTimeline: cat.timeline,
    totalCostRange: isSpecial ? "$8,000-25,000" : "$3,000-8,000",
    executiveSummary: `NMPA assessment for ${input.productName}. Risk: ${riskScore}/10. ${isSpecial ? "🔴 Special cosmetics" : "🟢 Ordinary cosmetics"}.`,
    oneLineDecision: isSpecial ? "🔴 Special — full registration" : "🟢 Ordinary — filing",
    riskDimensions: [
      { dimension: "Product Category", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: cat.label },
      { dimension: "Registration Type", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: isSpecial ? "Full registration" : "Simplified filing" },
      { dimension: "Testing", score: isSpecial ? 7 : 4, color: isSpecial ? "🟡" : "🟢", note: `${cat.testing.length} required` },
      { dimension: "Timeline", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: cat.timeline },
      { dimension: "Ingredient Risk", score: input.hasNewIngredient ? 8 : 3, color: input.hasNewIngredient ? "🔴" : "🟢", note: input.hasNewIngredient ? "Novel ingredient" : "Standard" },
    ],
    channels: [
      { name: "General Trade", suitability: "high", description: isSpecial ? "Full NMPA registration" : "NMPA filing", advantages: ["Full market access"], disadvantages: [cat.timeline + " timeline"], timeline: cat.timeline, costRange: isSpecial ? "$8,000-25,000" : "$3,000-8,000" },
      { name: "CBEC", suitability: "high", description: "Cross-border e-commerce alternative", advantages: ["Faster entry"], disadvantages: ["Online only"], timeline: "1-2 months", costRange: "$500-2,000" },
    ],
    tariffInfo: { mfnRate: cat.mfnRate, vatRate: "13%", consumptionTax: "N/A", ftaRate: null, totalTaxBurden: cat.mfnRate + " + 13%" },
    regulations: [{"name": "Cosmetics Supervision Regulation", "number": "State Council Decree 727", "authority": "NMPA", "relevance": "primary", "description": "Primary cosmetics regulation. Effective 2021."}, {"name": "Cosmetics Registration & Filing Measures", "number": "NMPA 2021", "authority": "NMPA", "relevance": "primary", "description": "Detailed procedures for registration/filing."}, {"name": "Safety Assessment Guidelines", "number": "NMPA 2021 Tech Specs", "authority": "NMPA", "relevance": "primary", "description": "Required safety assessment format."}, {"name": "GB/T 35914-2018", "number": "GB/T 35914", "authority": "NHC", "relevance": "secondary", "description": "Cosmetics hygiene standard."}],
    classification: { assignedHsChapter: "3303-3307", ciqCode: "Varies", isHighRisk: isSpecial, riskReason: cat.riskReason, alternativeClassificationNote: "" },
    riskMatrix: [
      { dimension: "Category Risk", rating: isSpecial ? "🔴" : "🟢", explanation: cat.riskReason },
      { dimension: "Registration", rating: isSpecial ? "🔴" : "🟢", explanation: isSpecial ? "Full registration" : "Filing" },
      { dimension: "Testing", rating: isSpecial ? "🟡" : "🟢", explanation: `${cat.testing.length} tests. Cost: ${cat.testCost}` },
      { dimension: "Timeline", rating: isSpecial ? "🔴" : "🟢", explanation: cat.timeline },
      { dimension: "Ingredient", rating: input.hasNewIngredient ? "🔴" : "🟢", explanation: input.hasNewIngredient ? "Novel ingredient" : "Standard" },
    ],
    documentGuide: [{"name": "Product Formula", "format": "Excel/PDF", "notarization": "No", "commonError": "INCI not matching ICSC"}, {"name": "Safety Assessment", "format": "PDF", "notarization": "Yes", "commonError": "Assessor not NMPA-recognized"}, {"name": "Microbiological Test", "format": "CNAS report", "notarization": "Yes", "commonError": "Items not per GB 7918"}, {"name": "Heavy Metals Test", "format": "CNAS report", "notarization": "Yes", "commonError": "Incomplete scope"}, {"name": "Label Artwork", "format": "JPEG/PDF", "notarization": "No", "commonError": "Missing Chinese INCI"}, {"name": "GMP Certificate", "format": "PDF", "notarization": "Yes", "commonError": "Expired"}],
    requiredDocuments: ["Formula", "Safety Assessment", "Micro Test", "Heavy Metals", "Label Artwork", "GMP Cert"],
    testRequirements: cat.testing,
    testCostRange: cat.testCost,
    labGuide: `Testing must be at CNAS-accredited lab. Scope: ${cat.testing.join(", ")}.`,
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [{"phase": "Formula Review", "duration": "1-3 weeks", "description": "Check ingredients against ICSC database.", "responsible": "Both", "dependencies": []}, {"phase": "Testing", "duration": "3-8 weeks", "description": "Microbiological, heavy metals, stability.", "responsible": "SinoTrade", "dependencies": []}, {"phase": "Document Compilation", "duration": "2-4 weeks", "description": "Safety assessment + dossier preparation.", "responsible": "SinoTrade", "dependencies": []}, {"phase": "NMPA Submission", "duration": "4-16 weeks", "description": "Submit filing or registration.", "responsible": "SinoTrade", "dependencies": []}],
    costBreakdown: [{"item": "Safety Assessment Report", "estimatedRange": "$2,000-5,000", "notes": "Qualified assessor per NMPA."}, {"item": "Testing", "estimatedRange": "$1,000-10,000", "notes": "Micro + heavy metals + efficacy if special."}, {"item": "Translation & Notarization", "estimatedRange": "$300-1,500", "notes": "Chinese translation of all docs."}, {"item": "Professional Service", "estimatedRange": "$3,000-12,000", "notes": "End-to-end filing/registration."}],
    countryProfile: { region: "—", ftaWithChina: false, ftaDetails: "", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: "moderate", languageNote: "", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "China cosmetics market growing 10%+ annually.", keyDrivers: ["Beauty consciousness", "Premium demand"], barriers: ["Brand competition", "NMPA timeline"], consumerPerception: "International brands preferred for quality.", topOrigins: [], recommendation: isSpecial ? "Start NMPA registration process." : "Begin filing." },
    competitiveAnalysis: "French, Japanese, Korean brands lead premium segment.",
    commonRejections: [{"problem": "Ingredient not in ICSC", "cause": "Novel ingredient", "solution": "Check INCI against ICSC"}],
    postApprovalObligations: [{"item": "Annual Reporting", "freq": "Yearly", "desc": "Production data to NMPA"}, {"item": "Formula Change Notice", "freq": "When applicable", "desc": "Re-filing required"}, {"item": "Renewal", "freq": "Every 5 years", "desc": "Re-submit safety assessment"}],
    horizonScan: [{"topic": "GB 7718 Cosmetics Label Update", "impact": "high", "timeframe": "2025-2026", "description": "New labeling requirements expected.", "actionRequired": true}],
    summary: isSpecial ? "Special cosmetics. Full NMPA registration required." : "Ordinary cosmetics. NMPA filing.",
  };
}