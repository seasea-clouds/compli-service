/**
 * CCC 认证 — 深度报告规则引擎
 * 覆盖：消费电子、家电、IT设备、照明、电动工具、汽配、玩具等
 */

export type CccCategory =
  | "electronics" | "home_appliance" | "it_equipment" | "lighting"
  | "power_tool" | "auto_parts" | "toy" | "medical" | "wire_cable" | "other";

export interface CccInput {
  category: CccCategory;
  productName: string;
  hsCode?: string;
  originCountry?: string;
  intendedUse: string;
}

export interface CccResult {
  requiresCcc: boolean;
  riskCategory: "high" | "medium" | "low";
  riskScore: number;
  riskDimensions: { dimension: string; score: number; color: string; note: string }[];
  executiveSummary: string;
  oneLineDecision: string;
  channels: { name: string; suitability: string; description: string; timeline: string; costRange: string }[];
  tariffInfo: { mfnRate: string; vatRate: string; ftaRate: string | null };
  regulations: { name: string; number: string; authority: string; relevance: string; description: string }[];
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

export const CATEGORY_LABELS: Record<CccCategory, string> = {
  electronics: "Consumer Electronics (HS 85)",
  home_appliance: "Home Appliances (HS 84.xx)",
  it_equipment: "IT / Communication Equipment (HS 84.71, 85.17)",
  lighting: "Lighting Products (HS 85.39, 94.05)",
  power_tool: "Power Tools (HS 84.67, 84.68)",
  auto_parts: "Automotive Parts (HS 87.xx)",
  toy: "Toys / Children's Products (HS 95.03)",
  medical: "Medical Devices (HS 90.18-90.22)",
  wire_cable: "Wires / Cables / Switches (HS 85.44, 85.36)",
  other: "Other Products",
};

const CCC_CATALOG: Record<CccCategory, boolean> = {
  electronics: true, home_appliance: true, it_equipment: true,
  lighting: true, power_tool: true, auto_parts: false,
  toy: true, medical: true, wire_cable: true, other: false,
};

export function checkCcc(input: CccInput): CccResult {
  const requiresCcc = CCC_CATALOG[input.category] ?? false;
  const riskScore = requiresCcc ? 7.2 : 2.5;
  const riskDimensions = [
    { dimension: "Product Category", score: requiresCcc ? 8 : 3, color: requiresCcc ? "🔴" : "🟢", note: CATEGORY_LABELS[input.category] },
    { dimension: "Certification Complexity", score: requiresCcc ? 7 : 2, color: requiresCcc ? "🟡" : "🟢", note: requiresCcc ? "CCC mandatory — factory inspection required" : "No CCC required" },
    { dimension: "Testing Requirements", score: requiresCcc ? 6 : 2, color: requiresCcc ? "🟡" : "🟢", note: "Safety + EMC + chemical testing" },
    { dimension: "Timeline", score: requiresCcc ? 7 : 1, color: requiresCcc ? "🔴" : "🟢", note: requiresCcc ? "3-6 months typical" : "Immediate" },
    { dimension: "Origin Country", score: 4, color: "🟢", note: input.originCountry || "Standard" },
  ];
  const summary = requiresCcc
    ? `Your product (${CATEGORY_LABELS[input.category]}) falls under CCC mandatory certification. Requires testing at CNCA-accredited lab and possible factory inspection.`
    : `Your product (${CATEGORY_LABELS[input.category]}) does not fall under mandatory CCC certification. Verification of HS code is recommended.`;
  
  return {
    requiresCcc,
    riskCategory: requiresCcc ? "high" : "low",
    riskScore,
    riskDimensions,
    executiveSummary: `CCC compliance assessment for ${input.productName}. Risk: ${riskScore}/10. ${requiresCcc ? "🔴 Certificate required before import." : "🟢 No CCC certification needed."}`,
    oneLineDecision: requiresCcc ? "🔴 CCC certification required. Estimate 3-6 months." : "🟢 No CCC required. Proceed with import.",
    channels: [
      { name: "General Trade", suitability: requiresCcc ? "conditional" : "high", description: requiresCcc ? "CCC cert required before first shipment" : "Standard import, no CCC needed", timeline: requiresCcc ? "3-6 months" : "1-2 weeks", costRange: requiresCcc ? "$5,000-20,000" : "$200-500" },
      { name: "CBEC", suitability: "high", description: "Cross-border e-commerce — simplified compliance pathway", timeline: "1-2 months", costRange: "$500-2,000" },
    ],
    tariffInfo: { mfnRate: "5-20% (MFN)", vatRate: "13%", ftaRate: null },
    regulations: [
      { name: "CNCA-CCC Implementation Rules", number: "CNCA 00C-001", authority: "CNCA", relevance: "primary", description: "Framework for CCC certification implementation." },
      { name: "CCC Certification Catalogue", number: "CNCA 2023 Update", authority: "CNCA / SAMR", relevance: "primary", description: "List of products subject to mandatory CCC certification." },
      { name: "GB 4943.1", number: "GB 4943.1-2022", authority: "NHC/CNCA", relevance: "primary", description: "Safety of IT equipment." },
      { name: "GB 4706 Series", number: "GB 4706.1-.xx", authority: "CNCA", relevance: "primary", description: "Safety of household electrical appliances." },
    ],
    classification: { code: input.hsCode || "Varies", riskLevel: requiresCcc ? "🔴 CCC Mandatory" : "🟢 No CCC", description: `${CATEGORY_LABELS[input.category]} — ${requiresCcc ? "CCC certification required before import/ Sale in China" : "Not in CCC catalog. Standard import applies."}` },
    documentGuide: requiresCcc ? [
      { name: "CCC Application Form", format: "CNCA-specified format", commonError: "Incomplete applicant info" },
      { name: "Product Specification", format: "PDF, Chinese translation", commonError: "Missing key parameters" },
      { name: "Factory Inspection Report", format: "ISO 9001 or equivalent", commonError: "Facility address mismatch" },
      { name: "Safety Test Report", format: "CNAS/ISO 17025 lab report", commonError: "Wrong standard edition" },
      { name: "Chinese User Manual", format: "PDF/printed", commonError: "Missing safety warnings in Chinese" },
      { name: "Key Component List", format: "Excel/PDF", commonError: "Incomplete component safety certs" },
    ] : [{ name: "Product Spec Sheet", format: "PDF", commonError: "None" }],
    requiredDocuments: requiresCcc ? ["CCC Application", "Product Specs", "Factory Inspection", "Safety Test Reports", "Chinese Manual", "Component List"] : ["Product Spec Sheet", "HS Code Confirmation"],
    testRequirements: requiresCcc ? ["Safety (GB 4943/4706)", "EMC (GB 9254/17625)", "Chemical (RoHS)", "Energy efficiency (if applicable)", "Specific product GB standards"] : ["None required"],
    testCostRange: requiresCcc ? "$3,000-12,000" : "Not applicable — verify at assessment",
    timelinePhases: requiresCcc ? [
      { phase: "Pre-assessment", duration: "1-2 weeks", description: "Confirm HS code, CCC catalog applicability", responsible: "Both" },
      { phase: "Document Preparation", duration: "2-3 weeks", description: "Prepare technical documents, translate to Chinese", responsible: "Both" },
      { phase: "Type Testing", duration: "4-8 weeks", description: "Safety + EMC testing at CNCA-accredited lab", responsible: "SinoTrade" },
      { phase: "Factory Inspection", duration: "2-4 weeks", description: "CNCA inspector visits manufacturing facility", responsible: "SinoTrade" },
      { phase: "Certification & Mark", duration: "2-4 weeks", description: "Certificate issuance. CCC mark printing approval", responsible: "SinoTrade" },
      { phase: "Annual Follow-up", duration: "Ongoing", description: "Annual factory inspection + testing", responsible: "Both" },
    ] : [
      { phase: "HS Code Verification", duration: "1 week", description: "Confirm product not in CCC catalog", responsible: "SinoTrade" },
      { phase: "Import Clearance", duration: "1-2 weeks", description: "Standard customs clearance", responsible: "Both" },
    ],
    estimatedTimeline: requiresCcc ? "3-8 months" : "1-2 weeks",
    costBreakdown: requiresCcc ? [
      { item: "Type Testing", range: "$3,000-12,000", note: "Safety + EMC at CNAS lab" },
      { item: "Factory Inspection", range: "$2,000-5,000", note: "Auditor travel + fee" },
      { item: "Certification Fee", range: "$1,000-3,000", note: "CNCA/CCIC certification body" },
      { item: "Document Translation", range: "$500-1,500", note: "Chinese translation of technical docs" },
      { item: "Professional Service", range: "$3,000-8,000", note: "End-to-end certification management" },
    ] : [{ item: "HS Code Verification", range: "$100-300", note: "Classification advisory" }],
    totalCostRange: requiresCcc ? "$5,000-20,000" : "$100-500",
    countryNotes: input.originCountry ? [`Origin: ${input.originCountry}. Factory location must be disclosed in CCC application.`] : [],
    commonIssues: requiresCcc ? [
      { problem: "Wrong GB standard edition applied", cause: "Using outdated standard for EMC/safety testing", solution: "Verify latest GB standard edition before testing" },
      { problem: "Factory inspection fails", cause: "Production line not meeting CCC quality management requirements", solution: "Pre-inspection readiness audit before official visit" },
      { problem: "Component CCC certs missing", cause: "Key components not CCC-certified", solution: "Component sourcing compliance pre-check" },
    ] : [],
    postApproval: requiresCcc ? [
      { item: "Annual Factory Inspection", freq: "Yearly", desc: "CNCA inspector visits factory annually" },
      { item: "Product Change Notification", freq: "When applicable", desc: "Any design/component change must be notified" },
      { item: "CCC Mark Usage", freq: "Ongoing", desc: "Correct printing dimensions and positions" },
    ] : [],
    summary,
  };
}
