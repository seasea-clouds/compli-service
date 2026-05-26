/**
 * NMPA — 深度规则引擎（品类级配置 / 法规 / 费用 / 时间线）
 */

export type CosmeticsCategory =
  | "skincare" | "makeup" | "haircare" | "fragrance" | "sunscreen"
  | "oral_care" | "body_care" | "baby" | "other";

export interface CosmeticsInput {
  category: CosmeticsCategory;
  productName: string;
  brandCountry: string;
  hasNewIngredient: boolean;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "skincare": "Skincare (HS 33.04)",
  "makeup": "Color Cosmetics (HS 33.04)",
  "sunscreen": "Sunscreen (HS 33.04) — SPECIAL",
  "haircare": "Hair Care (HS 33.05)",
  "fragrance": "Fragrance / Perfume (HS 33.03)",
  "baby": "Baby Products (HS 33.04)",
};

const PROFILES: Record<string, any> = {"skincare": {"label": "Skincare (HS 33.04)", "special": false, "risk": "🟡 Medium", "riskReason": "Ordinary cosmetics. NMPA filing required.", "mfn": "1-5%", "vat": "13%", "testing": ["Microbiological GB 7918", "Heavy metals Pb/As/Hg/Cd", "Stability testing", "Skin irritation"], "testCost": "$1,000-3,000", "reject": [{"problem": "Ingredient not on ICSC catalogue", "cause": "Novel ingredient requires safety assessment", "solution": "Pre-check all INCI names against ICSC database"}], "time": "2-4 months"}, "makeup": {"label": "Color Cosmetics (HS 33.04)", "special": false, "risk": "🟡 Medium", "riskReason": "Ordinary cosmetics. Color additives on positive list.", "mfn": "1-5%", "vat": "13%", "testing": ["Microbiological", "Heavy metals", "Colorant identification", "Stability"], "testCost": "$1,500-4,000", "reject": [{"problem": "Color additive not approved in China", "cause": "China CosIng differs from EU/US approved lists", "solution": "Verify all colorants against China CosIng positive list"}], "time": "2-4 months"}, "sunscreen": {"label": "Sunscreen (HS 33.04) — SPECIAL", "special": true, "risk": "🔴 High", "riskReason": "SPECIAL cosmetics. Full NMPA registration + efficacy testing.", "mfn": "1-5%", "vat": "13%", "testing": ["Safety assessment per NMPA 2021", "SPF efficacy GB/T 35954", "Microbiological", "Heavy metals", "Stability"], "testCost": "$3,000-10,000", "reject": [{"problem": "SPF test method not per GB/T 35954", "cause": "Different protocol vs ISO or FDA methods", "solution": "Use CNAS lab qualified for GB/T 35954 SPF testing"}], "time": "6-12 months"}, "haircare": {"label": "Hair Care (HS 33.05)", "special": false, "risk": "🟢 Low", "riskReason": "Ordinary cosmetics. Standard filing.", "mfn": "1-5%", "vat": "13%", "testing": ["Microbiological", "Heavy metals"], "testCost": "$800-2,500", "reject": [], "time": "2-4 months"}, "fragrance": {"label": "Fragrance / Perfume (HS 33.03)", "special": false, "risk": "🟡 Medium", "riskReason": "Ordinary cosmetics. Alcohol regulations + allergen labeling.", "mfn": "3-6.5%", "vat": "13%", "testing": ["Microbiological", "Heavy metals", "Alcohol content", "Allergen screening"], "testCost": "$1,000-3,000", "reject": [{"problem": "Allergen list differs from EU", "cause": "China allergen list not identical to EU CosIng", "solution": "Cross-check fragrance allergens against China's list"}], "time": "2-4 months"}, "baby": {"label": "Baby Products (HS 33.04)", "special": false, "risk": "🟡 Medium", "riskReason": "Stricter safety requirements for children's products.", "mfn": "1-5%", "vat": "13%", "testing": ["Microbiological", "Heavy metals", "Skin irritation", "pH balance", "Preservative efficacy"], "testCost": "$1,200-3,500", "reject": [{"problem": "Preservative not permitted for baby cosmetics", "cause": "Restricted preservatives list for baby products", "solution": "Check NMPA banned preservatives for children"}], "time": "3-5 months"}};

const COUNTRIES: Record<string, any> = {"France": {"diff": "easy", "note": "Strong reputation in China. French brands well-received."}, "Japan": {"diff": "easy", "note": "Japanese cosmetics highly trusted by Chinese consumers."}, "South Korea": {"diff": "easy", "note": "K-beauty popular. Fastest NMPA processing history."}, "USA": {"diff": "moderate", "note": "US brand premium positioning. Standard processing."}};

export function checkCosmetics(input: any): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const requiresReg = cat.special === true;
  const isHighRisk = requiresReg;
  const riskScore = requiresReg ? 7.0 : 3.5;
  return {
    requiresRegistration: requiresReg,
    riskCategory: requiresReg ? "high" : "low", isHighRisk, riskScore,
    estimatedTimeline: cat.time || "Contact us",
    totalCostRange: requiresReg ? "$5,000-25,000" : "$800-5,000",
    executiveSummary: `Assessment for ${input.productName}. Risk: ${riskScore}/10. ${requiresReg ? "🔴 Action required" : "🟢 Standard pathway"}.`,
    oneLineDecision: requiresReg ? "🔴 Compliance action required" : "🟢 Proceed with standard process",
    riskDimensions: [
      { dimension: "Product Category", score: requiresReg ? 8 : 3, color: requiresReg ? "🔴" : "🟢", note: cat.label },
      { dimension: "Regulatory Complexity", score: requiresReg ? 7 : 3, color: requiresReg ? "🟡" : "🟢", note: cat.riskReason },
      { dimension: "Testing", score: requiresReg ? 6 : 3, color: requiresReg ? "🟡" : "🟢", note: `${(cat.testing||[]).length} tests required` },
      { dimension: "Timeline", score: requiresReg ? 7 : 3, color: requiresReg ? "🔴" : "🟢", note: cat.time },
      { dimension: "Origin Country", score: 4, color: "🟡", note: input.originCountry || "Standard" },
    ],
    channels: [
      { name: "Standard Import", suitability: "high", description: requiresReg ? "Full compliance required" : "Standard process", advantages: ["Full market access"], disadvantages: [cat.time || "TBD"], timeline: cat.time, costRange: requiresReg ? "$5,000-25,000" : "$800-5,000" },
      { name: "CBEC", suitability: "medium", description: "Cross-border e-commerce alternative", advantages: ["Faster entry"], disadvantages: ["Online only", "Order limits"], timeline: "1-2 months", costRange: "$500-2,000" },
    ],
    tariffInfo: { mfnRate: cat.mfn || "Varies", vatRate: cat.vat || "13%", consumptionTax: "N/A", ftaRate: null, totalTaxBurden: (cat.mfn || "Varies") + " + " + (cat.vat || "13%") },
    regulations: [{"name": "Cosmetics Supervision & Administration Regulation", "num": "State Council Decree 727 (2021)", "auth": "NMPA", "rel": "primary", "desc": "Primary cosmetics regulation. Reformed the entire cosmetics regulatory system."}, {"name": "Cosmetics Registration & Filing Measures", "num": "NMPA 2021 No.1-3", "auth": "NMPA", "rel": "primary", "desc": "Detailed procedures for registration (special) vs filing (ordinary)."}, {"name": "Cosmetics Safety Assessment Guidelines", "num": "NMPA 2021 Tech Specs", "auth": "NMPA", "rel": "primary", "desc": "Required safety assessment report format and content."}, {"name": "Cosmetics Ingredients INCI Name Translation", "num": "NMPA ICSC Database", "auth": "NMPA", "rel": "primary", "desc": "Official Chinese translation of INCI names. Must be used in filing."}, {"name": "GB/T 35914-2018", "num": "GB/T 35914-2018", "auth": "NHC", "rel": "secondary", "desc": "Hygienic standard for cosmetics. Microbiological limits."}],
    classification: { assignedHsChapter: "Varies", ciqCode: "Check import", isHighRisk, riskReason: cat.riskReason, alternativeClassificationNote: "" },
    riskMatrix: [
      { dimension: "Category Risk", rating: requiresReg ? "🔴" : "🟢", explanation: cat.riskReason },
      { dimension: "Testing", rating: requiresReg ? "🟡" : "🟢", explanation: `${(cat.testing||[]).length} tests` },
      { dimension: "Timeline", rating: requiresReg ? "🔴" : "🟢", explanation: cat.time },
      { dimension: "Cost", rating: requiresReg ? "🟡" : "🟢", explanation: requiresReg ? "$5,000+" : "$800-5,000" },
      { dimension: "History", rating: "🟢", explanation: "First time" },
    ],
    documentGuide: [{"name": "Product Formula (Full INCI)", "fmt": "Excel/PDF", "not": "No", "err": "INCI names not matching ICSC"}, {"name": "Safety Assessment Report", "fmt": "PDF, NMPA 2021 format", "not": "Yes", "err": "Assessor not NMPA-recognized"}, {"name": "Microbiological Test Report", "fmt": "CNAS lab report", "not": "Yes", "err": "Items not per GB 7918"}, {"name": "Heavy Metals Test Report", "fmt": "CNAS lab report", "not": "Yes", "err": "Incomplete analyte scope"}, {"name": "Label & Package Artwork", "fmt": "JPEG/PDF all sides", "not": "No", "err": "Missing Chinese INCI names"}, {"name": "GMP / ISO 22716 Certificate", "fmt": "PDF valid copy", "not": "Certified copy", "err": "Certificate expired"}, {"name": "Efficacy Report (special only)", "fmt": "PDF NMPA format", "not": "Yes", "err": "Method not per NMPA guidelines"}],
    requiredDocuments: ["Product Formula (Full INCI)", "Safety Assessment Report", "Microbiological Test Report", "Heavy Metals Test Report", "Label & Package Artwork", "GMP / ISO 22716 Certificate", "Efficacy Report (special only)"],
    testRequirements: cat.testing || [],
    testCostRange: cat.testCost || "Contact us",
    labGuide: "Testing must be at CNAS-accredited lab. " + ((cat.testing||[]).join(", ") || ""),
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [{"phase": "Formula Review & Assessment", "dur": "1-3 weeks", "desc": "Check ingredients against ICSC, determine special vs ordinary.", "resp": "Both"}, {"phase": "Safety Assessment", "dur": "2-4 weeks", "desc": "Engage NMPA-qualified safety assessor.", "resp": "SinoTrade"}, {"phase": "Lab Testing", "dur": "3-8 weeks", "desc": "Microbiological + heavy metals + efficacy if special.", "resp": "SinoTrade"}, {"phase": "Dossier Compilation", "dur": "2-3 weeks", "desc": "Compile all documents per NMPA format.", "resp": "SinoTrade"}, {"phase": "NMPA Submission", "dur": "4-16 weeks", "desc": "Filing (fast) or Registration (full review).", "resp": "SinoTrade"}, {"phase": "Post-Approval Monitoring", "dur": "Ongoing", "desc": "Annual reporting + change notifications.", "resp": "Both"}],
    costBreakdown: [{"item": "Safety Assessment Report", "range": "$2,000-5,000", "note": "NMPA-qualified safety assessor."}, {"item": "Product Testing", "range": "$800-10,000", "note": "Micro + heavy metals + efficacy (special)."}, {"item": "Document Translation & Notarization", "range": "$300-1,500", "note": "Chinese translation of all dossier documents."}, {"item": "Formula Review (ICSC Check)", "range": "$500-1,500", "note": "Full INCI audit against China's ingredient list."}, {"item": "Label Artwork Design", "range": "$300-1,000", "note": "GB 5296.3 compliant Chinese label."}, {"item": "Professional Filing/Registration Service", "range": "$2,000-12,000", "note": "End-to-end: formula review → testing → filing."}],
    countryProfile: { region: "—", ftaWithChina: false, ftaDetails: "", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: "moderate", languageNote: "", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "Growing Chinese market demand.", keyDrivers: ["Consumer demand", "Quality perception"], barriers: ["Compliance cost", "Competition"], consumerPerception: "International brands trusted.", topOrigins: [], recommendation: requiresReg ? "Begin process now." : "Proceed." },
    competitiveAnalysis: "Premium segment competitive.",
    commonRejections: [{"problem": "Ingredient not on ICSC catalogue", "cause": "Novel ingredient requires safety assessment", "solution": "Pre-check all INCI names against ICSC database"}],
    postApprovalObligations: [{"item": "Annual Production Report", "freq": "Yearly", "desc": "Submit production data to NMPA."}, {"item": "Formula Change Notification", "freq": "When applicable", "desc": "Any formula change requires re-filing or notification."}, {"item": "Label Update Compliance", "freq": "Per regulation change", "desc": "Monitor NMPA labeling guideline updates."}, {"item": "Registration Renewal", "freq": "Every 5 years", "desc": "Re-submit safety assessment for renewal."}],
    horizonScan: [{"topic": "GB 7718 Cosmetics Label Revision", "impact": "high", "when": "2025-2026", "desc": "Expected to align with international labeling standards.", "action": true}, {"topic": "Special Cosmetics List Expansion", "impact": "medium", "when": "2025", "desc": "More product categories may be reclassified as special.", "action": false}, {"topic": "Animal Testing Alternatives", "impact": "medium", "when": "2025-2027", "desc": "China expanding accepted non-animal test methods.", "action": false}],
    summary: requiresReg ? "Compliance action required." : "Standard process applies.",
  };
}