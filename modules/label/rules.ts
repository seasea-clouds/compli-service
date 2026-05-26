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
  "alcohol": "Alcoholic Beverages",
  "confectionery": "Confectionery/Snacks",
};

const P: Record<string, any> = {"prepackaged": {"label": "Prepackaged Foods (GB 7718)", "risk": "Medium", "riskReason": "12 mandatory label fields. Nutrition panel per GB 28050.", "time": "2-3 weeks", "cost": "$500-2,000", "mfn": "5-20%", "vat": "9%", "testing": ["Nutritional (kJ+kcal)", "Additives (GB 2760)", "Microbiological"], "testCost": "$300-1,500", "trend": "Growing imported food demand.", "drivers": ["Premium food demand", "Rising income"], "barriers": ["Label complexity", "Ingredient adaptation"], "perception": "Imported food trusted for quality.", "competition": "European, Japanese, US brands lead.", "reject": [{"problem": "Energy in kcal without kJ", "cause": "GB 28050 mandates kJ primary", "solution": "Always show kJ first, kcal optional"}]}, "dairy": {"label": "Dairy Products", "risk": "High", "riskReason": "Strict testing. Infant formula needs GB 10765.", "time": "3-4 weeks", "cost": "$800-2,500", "mfn": "5-20%", "vat": "9%", "testing": ["Nutritional", "Microbiological", "Aflatoxin M1", "Melamine"], "testCost": "$500-2,000", "reject": [{"problem": "Missing GB 10765 warnings", "cause": "Separate standard for infant", "solution": "Use GB 10765 label template"}]}, "alcohol": {"label": "Alcoholic Beverages", "risk": "Medium", "riskReason": "GB 7718 + alcohol GB 2758.", "time": "2-3 weeks", "cost": "$500-2,000", "mfn": "5-10%", "vat": "13%", "testing": ["Alcohol content", "Methanol", "Additives"], "testCost": "$300-1,200", "reject": [{"problem": "ABV label vs lab mismatch", "cause": "Production variation", "solution": "Verify before printing"}]}, "confectionery": {"label": "Confectionery/Snacks", "risk": "Medium", "riskReason": "GB 7718. Additives on GB 2760 list.", "time": "2-3 weeks", "cost": "$500-2,000", "mfn": "8-15%", "vat": "13%", "testing": ["Nutritional", "Additive screening", "Microbiological"], "testCost": "$300-1,500", "reject": []}};
const R: any[] = [{"name": "GB 7718-2011 (rev.2025)", "num": "GB 7718-2011", "auth": "NHC", "rel": "primary", "desc": "Labeling of Prepackaged Foods."}, {"name": "GB 28050-2011", "num": "GB 28050-2011", "auth": "NHC", "rel": "primary", "desc": "Nutrition labeling. kJ + NRV%."}, {"name": "GB 2760-2024", "num": "GB 2760-2024", "auth": "NHC", "rel": "primary", "desc": "Food additives positive list."}, {"name": "Food Safety Law", "num": "Arts.42-47", "auth": "NPC", "rel": "primary", "desc": "Label legal basis."}, {"name": "GACC Decree 249", "num": "Ch.2", "auth": "GACC", "rel": "secondary", "desc": "Customs label inspection."}];
const C: any[] = [{"item": "Label Compliance Audit", "range": "$200-500", "note": "Full GB audit."}, {"item": "Chinese Label Design", "range": "$300-1,000", "note": "2 revisions."}, {"item": "Nutrition Testing", "range": "$200-600", "note": "CNAS lab."}, {"item": "Translation", "range": "$100-300", "note": "Chinese cert."}];
const T: any[] = [{"phase": "Label Review", "dur": "3-5d", "desc": "Audit current label", "resp": "SinoTrade"}, {"phase": "Chinese Design", "dur": "5-7d", "desc": "Create compliant label", "resp": "SinoTrade"}, {"phase": "Nutrition Calc", "dur": "2-3d", "desc": "NRV% per GB 28050", "resp": "SinoTrade"}, {"phase": "Final Check", "dur": "2-3d", "desc": "Pre-print verify", "resp": "Both"}];
const PO: any[] = [{"item": "GB 7718 Revision Monitor", "freq": "Ongoing", "desc": "Track 2025 revision."}, {"item": "Formula Change Re-label", "freq": "When applicable", "desc": "New formula = new label."}];
const H: any[] = [{"topic": "GB 7718 Major Revision", "impact": "high", "when": "2025-2026", "desc": "New allergen + digital labeling.", "action": true}];
const D: any[] = [{"name": "Original Label Artwork", "fmt": "JPEG/PDF", "not": "No", "err": "Low res"}, {"name": "Chinese Design", "fmt": "PDF", "not": "No", "err": "Fonts"}, {"name": "Nutrition Report", "fmt": "CNAS PDF", "not": "Yes", "err": "kJ vs kcal"}, {"name": "Free Sale Cert", "fmt": "PDF", "not": "Yes", "err": "Missing"}];

export function checkLabel(input: any): any {
  const cat = P[input.category]; if (!cat) return {};
  const ih = cat.risk && cat.risk.includes("🔴");
  return { requiresRegistration: ih, riskCategory: ih ? "high" : "low", isHighRisk: ih, riskScore: ih ? 7.0 : 3.5,
    estimatedTimeline: cat.time || "Contact us", totalCostRange: cat.cost || "$500-5,000",
    executiveSummary: `Assessment for ${input.productName}.`,
    oneLineDecision: ih ? "⚠️ Action" : "✅ Proceed",
    riskDimensions: [{dimension:"Category",score:ih?8:3,color:ih?"🔴":"🟢",note:cat.label}],
    channels: [{name:"Standard",suitability:"high",description:"Full process",advantages:[],disadvantages:[],timeline:cat.time,costRange:cat.cost}],
    tariffInfo:{mfnRate:cat.mfn||"Varies",vatRate:cat.vat||"13%",consumptionTax:"N/A",ftaRate:null,totalTaxBurden:"Varies"},
    regulations:R, classification:{assignedHsChapter:"—",ciqCode:"—",isHighRisk:ih,riskReason:cat.riskReason,alternativeClassificationNote:""},
    riskMatrix:[{dimension:"Category",rating:ih?"🔴":"🟢",explanation:cat.riskReason}],
    documentGuide:D, requiredDocuments:["Original Label Artwork", "Chinese Design", "Nutrition Report", "Free Sale Cert"],
    testRequirements:cat.testing||[], testCostRange:cat.testCost||"", labGuide:"",
    labelGuide:{requiredItems:[],gb7718Highlights:[],gb28050Highlights:[]},
    timelinePhases:T, costBreakdown:C,
    countryProfile:{region:"—",ftaWithChina:false,ftaDetails:"",specialRestrictions:[],bilateralMeatAccess:false,bilateralAquaticAccess:false,dairyApproved:false,gaccDifficulty:"moderate",languageNote:"",commonIssues:[],importVolumeNote:""},
    marketIntel:{chinaImportTrend:cat.trend||"",keyDrivers:cat.drivers||[],barriers:cat.barriers||[],consumerPerception:cat.perception||"",topOrigins:[],recommendation:ih?"Engage professional":"Standard"},
    competitiveAnalysis:cat.competition||"", commonRejections:[{"problem": "Energy in kcal without kJ", "cause": "GB 28050 mandates kJ primary", "solution": "Always show kJ first, kcal optional"}],
    postApprovalObligations:PO, horizonScan:H,
    summary:ih?"Action required":"Standard process",
  };
}