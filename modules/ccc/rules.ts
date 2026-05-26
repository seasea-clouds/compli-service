/**
 * CCC — 深度规则引擎（品类级配置 / 法规 / 费用 / 时间线）
 */

export type CccCategory =
  | "electronics" | "home_appliance" | "it_equipment" | "lighting"
  | "power_tool" | "auto_parts" | "toy" | "medical" | "wire_cable" | "other";

export interface CccInput {
  category: CccCategory;
  productName: string;
  hsCode?: string;
  intendedUse: string;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "electronics": "Consumer Electronics (HS 85)",
  "home_appliance": "Home Appliances (HS 84)",
  "it_equipment": "IT / Communication (HS 84.71, 85.17)",
  "lighting": "Lighting Products (HS 85.39, 94.05)",
  "toy": "Toys / Children's Products (HS 95.03)",
  "medical": "Medical Devices (HS 90)",
};

const PROFILES: Record<string, any> = {"electronics": {"label": "Consumer Electronics (HS 85)", "risk": "🔴 High", "riskReason": "CCC mandatory. CB report often accepted reducing testing scope.", "mfn": "5-15%", "vat": "13%", "testing": ["Safety GB 4943.1-2022", "EMC GB 9254", "Harmonics GB 17625.1", "Energy efficiency"], "testCost": "$3,000-8,000", "certs": ["CCC Certificate", "CB Test Report (optional)"], "reject": [{"problem": "EMC exceeds GB 9254 limits", "cause": "Design optimized for FCC/CE but not Chinese grid", "solution": "EMC pre-scan before formal testing at CNCA lab"}], "time": "4-6 months"}, "home_appliance": {"label": "Home Appliances (HS 84)", "risk": "🔴 High", "riskReason": "CCC mandatory. GB 4706 series applies per product type.", "mfn": "8-20%", "vat": "13%", "testing": ["Safety GB 4706.1", "Product-specific GB 4706.xx", "EMC GB 4343.1", "Energy label registration"], "testCost": "$3,500-10,000", "certs": ["CCC Certificate", "Energy Efficiency Label"], "reject": [{"problem": "Wrong GB 4706 sub-standard applied", "cause": "Different appliance types need different sub-standards", "solution": "Identify correct GB 4706.xx before testing"}], "time": "4-7 months"}, "it_equipment": {"label": "IT / Communication (HS 84.71, 85.17)", "risk": "🔴 High", "riskReason": "CCC + possible SRRC for wireless devices.", "mfn": "0-8%", "vat": "13%", "testing": ["Safety GB 4943.1", "EMC GB 9254", "Wireless SRRC", "SAR if radio"], "testCost": "$4,000-12,000", "certs": ["CCC Certificate", "SRRC Approval (wireless)"], "reject": [{"problem": "Wireless device shipped without SRRC", "cause": "SRRC and CCC are separate approvals", "solution": "File SRRC application in parallel with CCC"}], "time": "4-8 months"}, "lighting": {"label": "Lighting Products (HS 85.39, 94.05)", "risk": "🔴 High", "riskReason": "CCC mandatory. LED-specific GB standards.", "mfn": "5-15%", "vat": "13%", "testing": ["Safety GB 7000.1", "Photometric performance", "EMC GB 17743", "Harmonics GB 17625.1"], "testCost": "$3,000-8,000", "certs": ["CCC Certificate", "Energy Efficiency Label"], "reject": [{"problem": "LED flicker exceeds GB/T limits", "cause": "Driver design not per standard", "solution": "Use CNCA-certified LED drivers"}], "time": "3-6 months"}, "toy": {"label": "Toys / Children's Products (HS 95.03)", "risk": "🔴 High", "riskReason": "CCC mandatory. GB 6675 series for toy safety.", "mfn": "5-10%", "vat": "13%", "testing": ["Mechanical GB 6675.2", "Flammability GB 6675.3", "Chemical GB 6675.4", "Phthalates", "Heavy metals"], "testCost": "$2,000-6,000", "certs": ["CCC Certificate"], "reject": [{"problem": "Phthalates exceed China limit", "cause": "China limit stricter than EU/US standards", "solution": "Use phthalate-free plasticizers for all soft parts"}], "time": "3-6 months"}, "medical": {"label": "Medical Devices (HS 90)", "risk": "🔴 High", "riskReason": "CCC + NMPA medical device registration dual path.", "mfn": "0-8%", "vat": "13%", "testing": ["Safety GB 9706.1", "EMC YY 0505", "Biocompatibility ISO 10993"], "testCost": "$8,000-25,000", "certs": ["CCC Certificate", "NMPA Medical Device Registration"], "reject": [{"problem": "Clinical evaluation inadequate for NMPA", "cause": "NMPA requires China-specific data", "solution": "Engage NMPA-recognized clinical evaluation institution"}], "time": "8-18 months"}};

const COUNTRIES: Record<string, any> = {"USA": {"diff": "moderate", "fta": false, "note": "CB reports accepted. Section 301 tariffs may apply."}, "Germany": {"diff": "easy", "fta": false, "note": "CB reports widely accepted. Strong CE alignment."}, "Japan": {"diff": "easy", "fta": true, "note": "PSE certification often recognized for testing."}, "South Korea": {"diff": "easy", "fta": true, "note": "KC certification testing may be accepted."}};

export function checkCcc(input: any): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const requiresReg = cat.risk === "🔴 High";
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
    regulations: [{"name": "CNCA-CCC Implementation Rules", "num": "CNCA 00C-001:2023", "auth": "CNCA/SAMR", "rel": "primary", "desc": "CCC certification procedures: application, testing, factory inspection, certification maintenance."}, {"name": "CCC Product Catalogue", "num": "CNCA 2023 Announcement", "auth": "CNCA", "rel": "primary", "desc": "Products subject to mandatory CCC certification. 17 categories currently."}, {"name": "GB 4943.1-2022", "num": "GB 4943.1-2022", "auth": "NHC/CNCA", "rel": "secondary", "desc": "Safety of IT equipment. Mandatory for electronics CCC testing."}, {"name": "GB 4706.1-2005", "num": "GB 4706.1-2005 + 30 sub-standards", "auth": "CNCA", "rel": "secondary", "desc": "Safety of household appliances. Each product type has a specific sub-standard."}, {"name": "GB 6675 Series", "num": "GB 6675.1-.4:2014", "auth": "CNCA/SAMR", "rel": "secondary", "desc": "Toy safety: mechanical, flammability, chemical migration standards."}, {"name": "GB 17625.1-2022", "num": "GB 17625.1-2022", "auth": "CNCA", "rel": "secondary", "desc": "EMC harmonic current emissions."}, {"name": "China Energy Label", "num": "NDRC/MOFCOM 2020", "auth": "NDRC", "rel": "secondary", "desc": "Mandatory energy efficiency labeling for specified products."}, {"name": "China RoHS 2", "num": "MIIT Order 32:2016", "auth": "MIIT", "rel": "secondary", "desc": "Hazardous substances in electronic products."}],
    classification: { assignedHsChapter: "Varies", ciqCode: "Check import", isHighRisk, riskReason: cat.riskReason, alternativeClassificationNote: "" },
    riskMatrix: [
      { dimension: "Category Risk", rating: requiresReg ? "🔴" : "🟢", explanation: cat.riskReason },
      { dimension: "Testing", rating: requiresReg ? "🟡" : "🟢", explanation: `${(cat.testing||[]).length} tests` },
      { dimension: "Timeline", rating: requiresReg ? "🔴" : "🟢", explanation: cat.time },
      { dimension: "Cost", rating: requiresReg ? "🟡" : "🟢", explanation: requiresReg ? "$5,000+" : "$800-5,000" },
      { dimension: "History", rating: "🟢", explanation: "First time" },
    ],
    documentGuide: [{"name": "CCC Application Form", "fmt": "CNCA format", "not": "No", "err": "Incomplete applicant info"}, {"name": "Product Specification & Photos", "fmt": "PDF, bilingual", "not": "No", "err": "Missing key parameters"}, {"name": "User Manual (Chinese)", "fmt": "PDF full translation", "not": "No", "err": "Safety warnings not translated"}, {"name": "Factory Quality Manual", "fmt": "PDF, ISO 9001/QSO", "not": "Certified translation", "err": "Address mismatch"}, {"name": "Key Component List", "fmt": "Excel/PDF", "not": "No", "err": "Component certs missing"}, {"name": "Circuit Diagram & PCB", "fmt": "PDF/DXF", "not": "No", "err": "Not labeled in Chinese"}, {"name": "CB Report (if available)", "fmt": "IECEE lab PDF", "not": "Certified copy", "err": "Scope incomplete"}],
    requiredDocuments: ["CCC Application Form", "Product Specification & Photos", "User Manual (Chinese)", "Factory Quality Manual", "Key Component List", "Circuit Diagram & PCB", "CB Report (if available)"],
    testRequirements: cat.testing || [],
    testCostRange: cat.testCost || "Contact us",
    labGuide: "Testing must be at CNAS-accredited lab. " + ((cat.testing||[]).join(", ") || ""),
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [{"phase": "Pre-assessment & Application", "dur": "2-4 weeks", "desc": "Determine GB standards, select lab, prepare application.", "resp": "Both"}, {"phase": "Type Testing", "dur": "6-12 weeks", "desc": "Safety + EMC testing at CNCA-accredited lab.", "resp": "SinoTrade"}, {"phase": "Factory Inspection", "dur": "2-4 weeks", "desc": "QMS audit per CCC requirements.", "resp": "SinoTrade"}, {"phase": "Certification Review", "dur": "4-6 weeks", "desc": "CNCA reviews test reports + inspection results.", "resp": "CNCA"}, {"phase": "Certificate & Mark", "dur": "1-2 weeks", "desc": "Certificate issued. CCC mark printing approval.", "resp": "Both"}, {"phase": "Annual Maintenance", "dur": "Ongoing", "desc": "Factory re-inspection + market surveillance.", "resp": "Both"}],
    costBreakdown: [{"item": "Type Testing (Safety + EMC)", "range": "$3,000-12,000", "note": "CNCA-accredited lab. CB report may reduce scope."}, {"item": "Factory Inspection (Initial)", "range": "$2,000-5,000", "note": "Auditor visit. Travel cost extra if outside China."}, {"item": "CCC Certification Fee", "range": "$1,000-3,000", "note": "CNCA/CCIC certification body."}, {"item": "CB Report Conversion", "range": "$1,000-3,000", "note": "If existing IEC CB test report is available."}, {"item": "Chinese Manual Translation", "range": "$500-2,000", "note": "CCC requires complete Chinese user manual."}, {"item": "Professional Service", "range": "$4,000-12,000", "note": "End-to-end: lab coordination, factory inspection, document handling."}, {"item": "Annual Factory Follow-up", "range": "$1,500-3,000/yr", "note": "Required annually to maintain CCC certification."}],
    countryProfile: { region: "—", ftaWithChina: false, ftaDetails: "", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: "moderate", languageNote: "", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "Growing Chinese market demand.", keyDrivers: ["Consumer demand", "Quality perception"], barriers: ["Compliance cost", "Competition"], consumerPerception: "International brands trusted.", topOrigins: [], recommendation: requiresReg ? "Begin process now." : "Proceed." },
    competitiveAnalysis: "Premium segment competitive.",
    commonRejections: [{"problem": "EMC exceeds GB 9254 limits", "cause": "Design optimized for FCC/CE but not Chinese grid", "solution": "EMC pre-scan before formal testing at CNCA lab"}],
    postApprovalObligations: [{"item": "Annual Factory Inspection", "freq": "Yearly", "desc": "CNCA inspector verifies production consistency."}, {"item": "Product Change Notice", "freq": "When applicable", "desc": "Design/component changes require re-evaluation."}, {"item": "CCC Certificate Renewal", "freq": "Every 5 years", "desc": "Full re-evaluation. Begin 6 months before expiry."}, {"item": "Market Surveillance", "freq": "Ongoing", "desc": "SAMR random product testing. Respond within 30 days."}],
    horizonScan: [{"topic": "CCC Catalog Expansion (IoT/Smart Home)", "impact": "high", "when": "2025-2026", "desc": "New products expected to enter CCC scope.", "action": true}, {"topic": "GB Standard Revisions", "impact": "high", "when": "2025-2027", "desc": "Multiple GB safety standards under revision — may require re-testing.", "action": true}, {"topic": "CB Report Digitalization", "impact": "medium", "when": "2025+", "desc": "IECEE digital CB reports may reduce paper handling.", "action": false}],
    summary: requiresReg ? "Compliance action required." : "Standard process applies.",
  };
}