/** CCC 认证 — 深度规则引擎（10品类 / 8法规 / 全模块） */

export type CccCategory =
  | "electronics"
  | "home_appliance"
  | "it_equipment"
  | "lighting"
  | "toy"
  | "medical"
  | "power_tool"
  | "auto_parts"
  | "wire_cable"
  | "other"
  | "other";

export interface CccInput {
  category: CccCategory;
  productName: string;
  hsCode?: string;
  originCountry?: string;
  intendedUse: string;
}

export const CATEGORY_LABELS: Record<CccCategory, string> = {
  electronics: "Consumer Electronics (HS 85)",
  home_appliance: "Home Appliances (HS 84.xx)",
  it_equipment: "IT / Communication (HS 84.71, 85.17)",
  lighting: "Lighting Products (HS 85.39, 94.05)",
  toy: "Toys / Children's Products (HS 95.03)",
  medical: "Medical Devices (HS 90.18-90.22)",
  power_tool: "Power Tools (HS 84.67, 84.68)",
  auto_parts: "Automotive Parts (HS 87.xx)",
  wire_cable: "Wires / Cables (HS 85.44, 85.36)",
  other: "Other Products",
};

const PROFILES: Record<string, any> = {
  "electronics": {"label": "Consumer Electronics (HS 85)", "hsRange": "8517-8518, 8528-8529", "riskLevel": "🔴 High", "riskReason": "Mandatory CCC. Safety + EMC required.", "mfnRate": "5-15%", "vatRate": "13%", "testingStandards": ["GB 4943.1-2022", "GB 9254"], "testCostRange": "$3,000-8,000", "labTests": ["Safety (GB 4943.1)", "EMC", "Harmonics", "Energy efficiency"], "commonRejections": [{"problem": "EMC exceeds GB 9254", "cause": "Not optimized for Chinese grid", "solution": "Pre-compliance EMC pre-scan"}], "timeline": "4-6 months"},
  "home_appliance": {"label": "Home Appliances (HS 84.xx)", "hsRange": "8414-8450", "riskLevel": "🔴 High", "riskReason": "Mandatory CCC. GB 4706 series.", "mfnRate": "8-20%", "vatRate": "13%", "testingStandards": ["GB 4706.1", "GB 4706.xx"], "testCostRange": "$3,500-10,000", "labTests": ["Safety (GB 4706.1)", "EMC", "Energy label", "Noise"], "commonRejections": [{"problem": "Wrong GB 4706.xx applied", "cause": "Product-specific standard needed", "solution": "Identify correct sub-standard"}], "timeline": "4-7 months"},
  "it_equipment": {"label": "IT / Communication (HS 84.71, 85.17)", "hsRange": "8471, 8517", "riskLevel": "🔴 High", "riskReason": "Mandatory CCC. Telecom needs SRRC.", "mfnRate": "0-8%", "vatRate": "13%", "testingStandards": ["GB 4943.1", "GB 9254"], "testCostRange": "$4,000-12,000", "labTests": ["Safety (GB 4943.1)", "EMC", "Wireless (SRRC)", "SAR"], "commonRejections": [{"problem": "Missing SRRC approval", "cause": "Wireless devices need SRRC", "solution": "File SRRC in parallel with CCC"}], "timeline": "4-8 months"},
  "lighting": {"label": "Lighting Products (HS 85.39, 94.05)", "hsRange": "8539, 9405", "riskLevel": "🔴 High", "riskReason": "CCC mandatory for lighting.", "mfnRate": "5-15%", "vatRate": "13%", "testingStandards": ["GB 7000.1", "GB 17625.1"], "testCostRange": "$3,000-8,000", "labTests": ["Safety (GB 7000.1)", "Photometric", "EMC", "Harmonics"], "commonRejections": [{"problem": "LED flicker exceeds limits", "cause": "Driver issue", "solution": "Use certified LED drivers"}], "timeline": "3-6 months"},
  "toy": {"label": "Toys / Children's Products (HS 95.03)", "hsRange": "9503", "riskLevel": "🔴 High", "riskReason": "CCC mandatory. GB 6675 series.", "mfnRate": "5-10%", "vatRate": "13%", "testingStandards": ["GB 6675.1-.4"], "testCostRange": "$2,000-6,000", "labTests": ["Mechanical (GB 6675.2)", "Flammability", "Chemical migration", "Phthalates", "Heavy metals"], "commonRejections": [{"problem": "Phthalates exceed limit", "cause": "China stricter than EU/US", "solution": "Use phthalate-free materials"}], "timeline": "3-6 months"},
  "medical": {"label": "Medical Devices (HS 90.18-90.22)", "hsRange": "9018-9022", "riskLevel": "🔴 High", "riskReason": "CCC + NMPA dual registration.", "mfnRate": "0-8%", "vatRate": "13%", "testingStandards": ["GB 9706.1", "YY/T specific"], "testCostRange": "$8,000-25,000", "labTests": ["Safety (GB 9706.1)", "EMC", "Biocompatibility"], "commonRejections": [{"problem": "Clinical evaluation inadequate", "cause": "NMPA requires specific data", "solution": "Use NMPA-recognized evaluator"}], "timeline": "8-18 months"},
  "power_tool": {"label": "Power Tools (HS 84.67, 84.68)", "hsRange": "8467, 8468", "riskLevel": "🔴 High", "riskReason": "CCC mandatory.", "mfnRate": "8-12%", "vatRate": "13%", "testingStandards": ["GB 3883.1"], "testCostRange": "$3,000-8,000", "labTests": ["Safety (GB 3883.1)", "EMC", "Vibration"], "commonRejections": [], "timeline": "4-7 months"},
  "auto_parts": {"label": "Automotive Parts (HS 87.xx)", "hsRange": "8701-8708", "riskLevel": "🟡 Conditional", "riskReason": "Only safety parts require CCC.", "mfnRate": "6-25%", "vatRate": "13%", "testingStandards": ["GB/T specific"], "testCostRange": "$2,000-6,000", "labTests": ["Product-specific", "Material"], "commonRejections": [], "timeline": "3-5 months"},
  "wire_cable": {"label": "Wires / Cables (HS 85.44, 85.36)", "hsRange": "8544, 8536", "riskLevel": "🔴 High", "riskReason": "CCC mandatory.", "mfnRate": "5-15%", "vatRate": "13%", "testingStandards": ["GB/T 5023", "GB 2099"], "testCostRange": "$2,000-5,000", "labTests": ["Conductor", "Insulation", "Voltage", "Flame"], "commonRejections": [], "timeline": "3-5 months"},
  "other": {"label": "Other Products", "hsRange": "Varies", "riskLevel": "🟡 Conditional", "riskReason": "Check CCC catalog.", "mfnRate": "5-30%", "vatRate": "13%", "testingStandards": ["Varies"], "testCostRange": "$1,000-5,000", "labTests": ["Product-specific"], "commonRejections": [], "timeline": "3-6 months"},
};

const COUNTRIES: Record<string, any> = {
  "USA": { diff: "moderate", fta: false },
  "Germany": { diff: "easy", fta: false },
  "Japan": { diff: "easy", fta: true },
  "South Korea": { diff: "easy", fta: true },
  "OTHER": { diff: "moderate", fta: false },
};

export function checkCcc(input: CccInput): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const requiresCcc = cat.riskLevel === "🔴 High";
  const country = COUNTRIES[input.originCountry || "OTHER"] || COUNTRIES.OTHER;
  const riskScore = requiresCcc ? 7.2 : 2.5;

  return {
    requiresCcc,
    riskCategory: requiresCcc ? "high" : "low", isHighRisk: requiresCcc,
    riskScore, estimatedTimeline: cat.timeline, totalCostRange: requiresCcc ? "$6,500-28,500" : "$200-1,000",
    executiveSummary: `CCC assessment for ${input.productName}. Risk: ${riskScore}/10. ${requiresCcc ? "🔴 Certification required." : "🟢 No CCC needed."}`,
    oneLineDecision: requiresCcc ? "🔴 CCC required" : "🟢 No CCC",
    riskDimensions: [
      { dimension: "Product Category", score: requiresCcc ? 8 : 2, color: requiresCcc ? "🔴" : "🟢", note: cat.label },
      { dimension: "Testing", score: requiresCcc ? 6 : 2, color: requiresCcc ? "🟡" : "🟢", note: `${cat.labTests.length} tests required` },
      { dimension: "Timeline", score: requiresCcc ? 7 : 1, color: requiresCcc ? "🔴" : "🟢", note: cat.timeline },
      { dimension: "Origin Country", score: requiresCcc ? (country.diff === "easy" ? 3 : 5) : 2, color: country.diff === "easy" ? "🟢" : "🟡", note: `${input.originCountry || "Standard"}: ${country.diff}` },
      { dimension: "Compliance History", score: 2, color: "🟢", note: "First-time certification" },
    ],
    channels: [
      { name: "General Trade", suitability: "high", description: "CCC cert required", advantages: ["Full market access"], disadvantages: [cat.timeline + " timeline"], timeline: cat.timeline, costRange: "$6,500-28,500" },
      { name: "CBEC", suitability: "high", description: "Cross-border e-commerce", advantages: ["Faster", "Lower cost"], disadvantages: ["Online only"], timeline: "1-2 months", costRange: "$500-2,000" },
      { name: "Samples/Testing", suitability: "low", description: "Small quantities only", advantages: ["Test market"], disadvantages: ["Not scalable"], timeline: "1-3 weeks", costRange: "$100-500" },
    ],
    tariffInfo: { mfnRate: cat.mfnRate, vatRate: cat.vatRate, consumptionTax: "N/A", ftaRate: country.fta ? "Eligible" : "MFN applies", totalTaxBurden: cat.mfnRate + " + " + cat.vatRate },
    regulations: [{"name": "CNCA-CCC Implementation Rules", "number": "CNCA 00C-001:2023", "authority": "CNCA/SAMR", "relevance": "primary", "description": "Framework for CCC certification procedures."}, {"name": "CCC Product Catalogue", "number": "CNCA 2023 Update", "authority": "CNCA/SAMR", "relevance": "primary", "description": "Products subject to mandatory CCC. 17 categories."}, {"name": "GB 4943.1-2022", "number": "GB 4943.1-2022", "authority": "CNCA", "relevance": "secondary", "description": "Safety of IT/communication equipment."}, {"name": "GB 4706.1-2005", "number": "GB 4706.1-2005", "authority": "CNCA", "relevance": "secondary", "description": "Safety of household appliances. 30+ sub-standards."}, {"name": "GB 6675 Series", "number": "GB 6675.1-.4:2014", "authority": "CNCA", "relevance": "secondary", "description": "Toy safety: mechanical, flammability, chemical."}, {"name": "GB 17625.1-2022", "number": "GB 17625.1-2022", "authority": "CNCA", "relevance": "secondary", "description": "EMC harmonic current emissions."}, {"name": "Energy Labeling Regulation", "number": "NDRC 2020", "authority": "NDRC", "relevance": "secondary", "description": "Mandatory energy efficiency labeling."}, {"name": "China RoHS 2", "number": "MIIT Order 32", "authority": "MIIT", "relevance": "secondary", "description": "Hazardous substances in electronics."}],
    classification: { assignedHsChapter: cat.hsRange, ciqCode: "Varies", isHighRisk: requiresCcc, riskReason: cat.riskReason, alternativeClassificationNote: "Verify HS code against CCC catalog." },
    riskMatrix: [
      { dimension: "Category", rating: requiresCcc ? "🔴" : "🟢", explanation: cat.riskReason },
      { dimension: "Testing", rating: requiresCcc ? "🟡" : "🟢", explanation: `${cat.labTests.length} tests. Cost: ${cat.testCostRange}` },
      { dimension: "Timeline", rating: requiresCcc ? "🔴" : "🟢", explanation: cat.timeline },
      { dimension: "Origin", rating: country.diff === "easy" ? "🟢" : "🟡", explanation: `${input.originCountry || "Standard"}: ${country.diff}` },
      { dimension: "History", rating: "🟢", explanation: "First time" },
    ],
    documentGuide: [{"name": "Application Form", "format": "CNCA format", "notarization": "No", "commonError": "Incomplete info"}, {"name": "Product Specs", "format": "PDF", "notarization": "No", "commonError": "Missing parameters"}, {"name": "Chinese Manual", "format": "PDF", "notarization": "No", "commonError": "Safety warnings missing"}, {"name": "Factory Quality Manual", "format": "PDF", "notarization": "Yes", "commonError": "Address mismatch"}, {"name": "Component List", "format": "Excel/PDF", "notarization": "No", "commonError": "Missing certs"}, {"name": "Circuit Diagram", "format": "PDF/DXF", "notarization": "No", "commonError": "Not in Chinese"}],
    requiredDocuments: ["Application Form", "Product Specs", "Chinese Manual", "Factory Manual", "Component List", "Circuit Diagram"],
    testRequirements: cat.labTests,
    testCostRange: cat.testCostRange,
    labGuide: `Testing at CNCA lab. Standards: ${cat.testingStandards.join(", ")}.`,
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [{"phase": "Pre-assessment", "duration": "2-4 weeks", "description": "Determine GB standards, prepare application.", "responsible": "Both", "dependencies": []}, {"phase": "Type Testing", "duration": "6-12 weeks", "description": "Safety + EMC at CNCA lab.", "responsible": "SinoTrade", "dependencies": []}, {"phase": "Factory Inspection", "duration": "2-4 weeks", "description": "Quality audit per CCC requirements.", "responsible": "SinoTrade", "dependencies": []}, {"phase": "Certification", "duration": "4-6 weeks", "description": "CNCA reviews and issues certificate.", "responsible": "CNCA", "dependencies": []}, {"phase": "CCC Mark", "duration": "1-2 weeks", "description": "Certificate issued, mark printing approved.", "responsible": "Both", "dependencies": []}, {"phase": "Annual Follow-up", "duration": "Ongoing", "description": "Factory inspection + surveillance.", "responsible": "Both", "dependencies": []}],
    costBreakdown: [{"item": "Type Testing", "estimatedRange": "$3,000-12,000", "notes": "Safety + EMC at CNAS lab."}, {"item": "Factory Inspection", "estimatedRange": "$2,000-5,000", "notes": "CNCA auditor visit."}, {"item": "Certification Fee", "estimatedRange": "$1,000-3,000", "notes": "CNCA certification body fee."}, {"item": "CB Report Conversion", "estimatedRange": "$1,000-3,000", "notes": "If using existing CB report."}, {"item": "Translation", "estimatedRange": "$500-2,000", "notes": "Chinese manual required."}, {"item": "Professional Service", "estimatedRange": "$4,000-12,000", "notes": "End-to-end management."}],
    countryProfile: { region: "—", ftaWithChina: country.fta || false, ftaDetails: country.fta ? "FTA available" : "MFN", specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: country.diff, languageNote: "", commonIssues: [], importVolumeNote: "" },
    marketIntel: { chinaImportTrend: "Growing demand for imported " + cat.label + ".", keyDrivers: ["Rising middle class", "Technology adoption"], barriers: ["CCC cost", "Domestic competition"], consumerPerception: "Imports trusted for quality.", topOrigins: [], recommendation: requiresCcc ? "Start CCC process." : "Verify." },
    competitiveAnalysis: "Premium segment. Competitors from Japan, Korea, Germany, USA.",
    commonRejections: [{"problem": "EMC exceeds GB 9254", "cause": "Not optimized for Chinese grid", "solution": "Pre-compliance EMC pre-scan"}],
    postApprovalObligations: [{"item": "Annual Factory Inspection", "freq": "Yearly", "desc": "CNCA inspector visits factory for production consistency check."}, {"item": "Product Change Notification", "freq": "When applicable", "desc": "Design/component changes need re-evaluation."}, {"item": "Certificate Renewal", "freq": "Every 5 years", "desc": "Full re-evaluation. Begin 6 months before expiry."}],
    horizonScan: [{"topic": "CCC Catalog Expansion", "impact": "high", "timeframe": "2025-2026", "description": "New categories expected (IoT, smart home).", "actionRequired": true}, {"topic": "GB Standard Updates", "impact": "high", "timeframe": "2025-2027", "description": "Multiple GB standards under revision.", "actionRequired": true}],
    summary: requiresCcc ? `CCC required. Cost: $6,500-28,500. Timeline: ${cat.timeline}.` : "No CCC required.",
  };
}