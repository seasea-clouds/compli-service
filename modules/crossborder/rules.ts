/** CROSSBORDER — 深度规则引擎 */

export type CrossborderCategory =

  | "food" | "cosmetics" | "electronics" | "apparel"
  | "health_supplement" | "baby_product" | "home_goods" | "other";

export interface CrossborderInput {
  category: CrossborderCategory;
  productName: string;
  targetPlatform: string;
  hasBondedWarehouse: boolean;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "food": "Food & Beverages",
  "cosmetics": "Cosmetics",
  "electronics": "Electronics",
  "health_supplement": "Health Supplements",
};

const P: Record<string, any> = {"food": {"label": "Food & Beverages", "risk": "Low", "riskReason": "On CBEC positive list.", "time": "4-8 weeks", "cost": "$10,000-40,000", "testing": [], "testCost": "", "reject": [{"problem": "HS code not on positive list", "cause": "Sub-category restricted", "solution": "Verify against positive list"}]}, "cosmetics": {"label": "Cosmetics", "risk": "Low", "riskReason": "Most on positive list.", "time": "4-10 weeks", "cost": "$10,000-40,000", "testing": [], "testCost": "", "reject": [{"problem": "NMPA filing needed before listing", "cause": "CBEC still needs first import permit", "solution": "File NMPA in parallel"}]}, "electronics": {"label": "Electronics", "risk": "Medium", "riskReason": "On list. Battery transport rules.", "time": "4-10 weeks", "cost": "$10,000-40,000", "testing": ["Battery UN38.3"], "testCost": "$500-2,000", "reject": []}, "health_supplement": {"label": "Health Supplements", "risk": "Medium", "riskReason": "On list. Claims limited.", "time": "4-10 weeks", "cost": "$10,000-40,000", "testing": [], "testCost": "", "reject": [{"problem": "Claims not on CFDA list", "cause": "Only 27 approved", "solution": "Limit to CFDA's 27 functions"}]}};
const R: any[] = [{"name": "CBEC Retail Import Policy", "num": "MOFCOM 2018", "auth": "MOFCOM", "rel": "primary", "desc": "CBEC framework."}, {"name": "CBEC Positive List", "num": "MOFCOM/GACC", "auth": "MOFCOM/GACC", "rel": "primary", "desc": "Eligible categories."}, {"name": "Personal Use Declaration", "num": "GACC 249 Art.5", "auth": "GACC", "rel": "primary", "desc": "Goods as personal use."}];
const C: any[] = [{"item": "Platform Deposit", "range": "$5,000-25,000", "note": "Refundable."}, {"item": "Platform Annual Fee", "range": "$5,000-15,000", "note": "Yearly."}, {"item": "Bonded Warehouse", "range": "$2,000-5,000", "note": "Setup."}, {"item": "Fulfillment", "range": "$3-8/order", "note": "Per order."}];
const T: any[] = [{"phase": "Platform Selection", "dur": "2-4w", "desc": "Choose platform", "resp": "Both"}, {"phase": "Documents", "dur": "2-4w", "desc": "Brand auth, info", "resp": "Both"}, {"phase": "Warehouse", "dur": "2-4w", "desc": "Bonded setup", "resp": "SinoTrade"}, {"phase": "Onboarding", "dur": "2-4w", "desc": "Store setup", "resp": "Both"}, {"phase": "Launch", "dur": "Ongoing", "desc": "Sales + compliance", "resp": "Both"}];
const PO: any[] = [{"item": "Platform Audit", "freq": "Quarterly", "desc": "Listings reviewed."}, {"item": "Stock Check", "freq": "Monthly", "desc": "Inventory."}];
const H: any[] = [{"topic": "Positive List Expansion", "impact": "high", "when": "2025", "desc": "More food categories.", "action": true}];
const D: any[] = [{"name": "Business Registration", "fmt": "PDF", "not": "Yes", "err": "Not apostilled"}, {"name": "Brand Auth Letter", "fmt": "PDF", "not": "Yes", "err": "Chain broken"}, {"name": "Product Listings", "fmt": "HTML", "not": "No", "err": "Claims"}, {"name": "Origin Certificate", "fmt": "PDF", "not": "Yes", "err": "Missing"}];

export function checkCrossborder(input: any): any {
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
    documentGuide:D, requiredDocuments:["Business Registration", "Brand Auth Letter", "Product Listings", "Origin Certificate"],
    testRequirements:cat.testing||[], testCostRange:cat.testCost||"", labGuide:"",
    labelGuide:{requiredItems:[],gb7718Highlights:[],gb28050Highlights:[]},
    timelinePhases:T, costBreakdown:C,
    countryProfile:{region:"—",ftaWithChina:false,ftaDetails:"",specialRestrictions:[],bilateralMeatAccess:false,bilateralAquaticAccess:false,dairyApproved:false,gaccDifficulty:"moderate",languageNote:"",commonIssues:[],importVolumeNote:""},
    marketIntel:{chinaImportTrend:cat.trend||"",keyDrivers:cat.drivers||[],barriers:cat.barriers||[],consumerPerception:cat.perception||"",topOrigins:[],recommendation:ih?"Engage professional":"Standard"},
    competitiveAnalysis:cat.competition||"", commonRejections:[{"problem": "HS code not on positive list", "cause": "Sub-category restricted", "solution": "Verify against positive list"}],
    postApprovalObligations:PO, horizonScan:H,
    summary:ih?"Action required":"Standard process",
  };
}