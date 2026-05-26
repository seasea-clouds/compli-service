/**
 * NMPA 化妆品备案 — 深度报告规则引擎
 * 覆盖：护肤品、彩妆、洗护、香水、防晒、口腔护理等
 */

export type CosmeticsCategory =
  | "skincare" | "makeup" | "haircare" | "fragrance"
  | "sunscreen" | "oral_care" | "body_care" | "baby" | "other";

export interface CosmeticsInput {
  category: CosmeticsCategory;
  productName: string;
  brandCountry: string;
  hasNewIngredient: boolean;
  originCountry?: string;
}

export interface CosmeticsResult {
  requiresFiling: boolean;
  isSpecialCosmetics: boolean;
  riskCategory: "high" | "medium" | "low";
  riskScore: number;
  riskDimensions: { dimension: string; score: number; color: string; note: string }[];
  executiveSummary: string;
  oneLineDecision: string;
  channels: any[];
  tariffInfo: { mfnRate: string; vatRate: string; ftaRate: string | null };
  regulations: any[];
  classification: { code: string; riskLevel: string; description: string };
  documentGuide: { name: string; format: string; commonError: string }[];
  requiredDocuments: string[];
  testRequirements: string[];
  testCostRange: string;
  timelinePhases: { phase: string; duration: string; description: string; responsible: string }[];
  estimatedTimeline: string;
  costBreakdown: { item: string; range: string; note: string }[];
  totalCostRange: string;
  countryNotes: string[];
  commonIssues: { problem: string; cause: string; solution: string }[];
  postApproval: { item: string; freq: string; desc: string }[];
  summary: string;
}

export const CATEGORY_LABELS: Record<CosmeticsCategory, string> = {
  skincare: "Skincare / Face Care (HS 33.04)",
  makeup: "Makeup / Color Cosmetics (HS 33.04, 33.05)",
  haircare: "Hair Care Products (HS 33.05)",
  fragrance: "Fragrance / Perfume (HS 33.03)",
  sunscreen: "Sunscreen / UV Protection (HS 33.04) — SPECIAL COSMETICS",
  oral_care: "Oral Care / Toothpaste (HS 33.06)",
  body_care: "Body / Hand Care (HS 33.04)",
  baby: "Baby / Children's Products (HS 33.04, 34.01)",
  other: "Other Cosmetics / Personal Care",
};

const SPECIAL_COSMETICS: Record<CosmeticsCategory, boolean> = {
  sunscreen: true, skincare: false, makeup: false, haircare: false,
  fragrance: false, oral_care: false, body_care: false, baby: false, other: false,
};

export function checkCosmetics(input: CosmeticsInput): CosmeticsResult {
  const isSpecial = input.category === 'sunscreen' || (input.hasNewIngredient && input.category === 'skincare');
  const requiresFiling = true;
  const riskScore = isSpecial ? 7.5 : 4.2;
  const riskDimensions = [
    { dimension: "Product Category", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: CATEGORY_LABELS[input.category] },
    { dimension: "Registration Type", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: isSpecial ? "Special cosmetics: NMPA registration" : "Ordinary: NMPA filing" },
    { dimension: "Ingredient Complexity", score: input.hasNewIngredient ? 8 : 4, color: input.hasNewIngredient ? "🔴" : "🟢", note: input.hasNewIngredient ? "Novel ingredient requires safety assessment" : "Standard ingredients" },
    { dimension: "Testing Requirements", score: isSpecial ? 7 : 4, color: isSpecial ? "🔴" : "🟢", note: isSpecial ? "Full safety + efficacy testing required" : "Standard microbiological + heavy metals" },
    { dimension: "Timeline", score: isSpecial ? 8 : 3, color: isSpecial ? "🔴" : "🟢", note: isSpecial ? "6-12 months" : "2-4 months" },
  ];
  const summary = isSpecial
    ? `Your product (${CATEGORY_LABELS[input.category]}) is classified as SPECIAL cosmetics. Requires NMPA registration with full safety assessment and efficacy testing.`
    : `Your product (${CATEGORY_LABELS[input.category]}) is classified as ordinary cosmetics. Requires NMPA filing (simplified process).`;

  return {
    requiresFiling, isSpecialCosmetics: isSpecial,
    riskCategory: isSpecial ? "high" : "low",
    riskScore,
    riskDimensions,
    executiveSummary: `NMPA assessment for ${input.productName}. Risk: ${riskScore}/10. ${isSpecial ? "🔴 Special cosmetics — full registration required." : "🟢 Ordinary cosmetics — simplified filing."}`,
    oneLineDecision: isSpecial ? "🔴 Special Cosmetics Registration. 6-12 months." : "🟢 Ordinary Cosmetics Filing. 2-4 months.",
    channels: [
      { name: "General Trade", suitability: "high", description: "Full NMPA registration/filing required", timeline: isSpecial ? "6-12 months" : "2-4 months", costRange: isSpecial ? "$8,000-25,000" : "$3,000-8,000" },
      { name: "CBEC", suitability: "high", description: "Cross-border e-commerce — may bypass NMPA filing", timeline: "1-2 months", costRange: "$500-2,000" },
    ],
    tariffInfo: { mfnRate: "1-6.5% (MFN)", vatRate: "13%", ftaRate: null },
    regulations: [
      { name: "Cosmetics Supervision & Administration Regulation", number: "State Council Decree 727 (2020)", authority: "NMPA/SAMR", relevance: "primary", description: "Primary regulation governing cosmetics in China." },
      { name: "Cosmetics Registration & Filing Management Measures", number: "NMPA 2021", authority: "NMPA", relevance: "primary", description: "Detailed procedures for cosmetics registration/filing." },
      { name: "Cosmetic Ingredients Safety Assessment Guidelines", number: "NMPA 2021 Tech Specs", authority: "NMPA", relevance: "primary", description: "Required safety assessment report format." },
      { name: "GB/T 35914-2018", number: "GB/T 35914", authority: "NHC", relevance: "primary", description: "Hygienic standard for cosmetics." },
    ],
    classification: { code: input.category, riskLevel: isSpecial ? "🔴 Special Cosmetics" : "🟢 Ordinary Cosmetics", description: `${CATEGORY_LABELS[input.category]} — ${isSpecial ? "NMPA registration required. Safety + efficacy testing." : "NMPA filing required. Standard documentation."}` },
    documentGuide: [
      { name: "Product Formula & Ingredient List", format: "Excel/PDF, full INCI names", commonError: "INGI names not matching Chinese catalogue" },
      { name: "Safety Assessment Report", format: "PDF, by qualified safety assessor", commonError: "Assessor not NMPA-recognized" },
      { name: "Microbiological Test Report", format: "CNAS lab report", commonError: "Test items not per GB 7918" },
      { name: "Heavy Metals Test Report", format: "CNAS lab report", commonError: "Testing scope incomplete" },
      { name: "Product Label & Package Images", format: "JPEG/PDF, all sides", commonError: "Missing Chinese ingredient names" },
      { name: "GMP Certificate", format: "PDF, ISO 22716 preferred", commonError: "Certificate expired" },
      ...(isSpecial ? [{ name: "Efficacy Evaluation Report", format: "PDF, NMPA format", commonError: "Method not per NMPA guidelines" }] : []),
    ],
    requiredDocuments: isSpecial ? ["Formula & INCI", "Safety Assessment", "Efficacy Report", "Microbiological Test", "Heavy Metals", "Label Artwork", "GMP Cert"] : ["Formula & INCI", "Safety Assessment", "Microbiological Test", "Heavy Metals", "Label Artwork", "GMP Cert"],
    testRequirements: isSpecial ? ["Microbiological (GB 7918)", "Heavy Metals (Pb, As, Hg, Cd)", "Safety Assessment (NMPA 2021)", "Efficacy Test (if claiming)", "Stability Testing", "Skin Irritation Test (for new ingredients)"] : ["Microbiological (GB 7918)", "Heavy Metals (Pb, As, Hg)", "Stability Testing"],
    testCostRange: isSpecial ? "$3,000-10,000" : "$1,000-3,000",
    timelinePhases: isSpecial ? [
      { phase: "Pre-assessment", duration: "1-2 weeks", description: "Confirm classification: special vs ordinary", responsible: "SinoTrade" },
      { phase: "Formula Review", duration: "2-4 weeks", description: "Full ingredient check against China's ICSC database", responsible: "Both" },
      { phase: "Testing", duration: "6-10 weeks", description: "Safety + efficacy + microbiological + stability", responsible: "SinoTrade" },
      { phase: "Document Compilation", duration: "2-3 weeks", description: "Assemble full dossier incl. safety assessment", responsible: "SinoTrade" },
      { phase: "NMPA Submission", duration: "2-3 weeks", description: "Submit to NMPA. Technical review (can be 3+ months)", responsible: "SinoTrade" },
      { phase: "Certificate Issuance", duration: "4-8 weeks", description: "NMPA review approval + certificate", responsible: "NMPA" },
    ] : [
      { phase: "Pre-assessment", duration: "1 week", description: "Confirm ordinary cosmetics classification", responsible: "SinoTrade" },
      { phase: "Formula Review", duration: "1-2 weeks", description: "Ingredient check", responsible: "Both" },
      { phase: "Testing", duration: "2-4 weeks", description: "Standard microbiological + heavy metals", responsible: "SinoTrade" },
      { phase: "Filing Submission", duration: "2-4 weeks", description: "Submit filing via NMPA online system", responsible: "SinoTrade" },
    ],
    estimatedTimeline: isSpecial ? "6-14 months" : "2-4 months",
    costBreakdown: isSpecial ? [
      { item: "Safety Assessment Report", range: "$2,000-5,000", note: "Qualified assessor per NMPA 2021" },
      { item: "Testing (Full)", range: "$3,000-10,000", note: "Micro + heavy metals + efficacy" },
      { item: "Translation & Notarization", range: "$500-1,500", note: "Chinese translation of all documents" },
      { item: "Professional Service", range: "$5,000-12,000", note: "End-to-end registration management" },
    ] : [
      { item: "Testing (Standard)", range: "$1,000-3,000", note: "Micro + heavy metals" },
      { item: "Translation", range: "$300-1,000", note: "Chinese translation" },
      { item: "Filing Service", range: "$2,000-5,000", note: "End-to-end filing management" },
    ],
    totalCostRange: isSpecial ? "$8,000-25,000" : "$3,000-8,000",
    countryNotes: input.brandCountry ? [`Brand origin: ${input.brandCountry}. Imported cosmetics may need additional country-specific documentation.`] : [],
    commonIssues: [
      { problem: "Ingredient not in ICSC catalogue", cause: "Novel ingredient not approved for cosmetics use in China", solution: "Pre-check all INCI names against ICSC before submission" },
      { problem: "Safety assessor qualifications rejected", cause: "Assessor not NMPA-recognized", solution: "Use NMPA-registered safety assessors only" },
      { problem: "Label claims not substantiated", cause: "Efficacy claims without supporting test data", solution: "Pre-review of all label claims against approved claim list" },
    ],
    postApproval: [
      { item: "Annual Reporting", freq: "Yearly", desc: "Submit production/manufacturing data to NMPA" },
      { item: "Formula Change Notification", freq: "When applicable", desc: "Any formula change requires re-filing" },
      { item: "Label Updates", freq: "Per regulation", desc: "Monitor cosmetics labeling guideline updates" },
      { item: "Registration Renewal", freq: "Every 5 years", desc: "Re-submit safety assessment for renewal" },
    ],
    summary,
  };
}
