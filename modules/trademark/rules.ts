/** TRADEMARK — 深度规则引擎 */

export type TrademarkCategory =

  | "food" | "cosmetics" | "electronics" | "apparel"
  | "beverage" | "health_supplement" | "luxury" | "other";

export interface TrademarkInput {
  category: TrademarkCategory;
  brandName: string;
  registeredInChina: boolean;
  productName: string;
  originCountry?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "food": "Food Products",
  "cosmetics": "Cosmetics",
  "electronics": "Electronics/Tech",
  "apparel": "Apparel/Fashion",
};

const P: Record<string, any> = {"food": {"label": "Food Products", "risk": "High", "riskReason": "Class 29/30/31. Brands frequently squatted.", "time": "8-14 months", "cost": "$600-1,200/class", "testing": [], "testCost": "", "reject": [{"problem": "Similar mark exists", "cause": "Prior registration", "solution": "Search + class strategy"}]}, "cosmetics": {"label": "Cosmetics", "risk": "High", "riskReason": "Class 3 most contested.", "time": "8-14 months", "cost": "$600-1,200/class", "testing": [], "testCost": "", "reject": [{"problem": "Brand squatted", "cause": "Bad-faith filing", "solution": "File opposition within 3 months"}]}, "electronics": {"label": "Electronics/Tech", "risk": "Medium", "riskReason": "Class 9/42. Specification drafting critical.", "time": "8-14 months", "cost": "$600-1,200/class", "testing": [], "testCost": "", "reject": [{"problem": "Spec too broad rejected", "cause": "CNIPA requires specific goods", "solution": "List specific products"}]}, "apparel": {"label": "Apparel/Fashion", "risk": "High", "riskReason": "Class 25 most squatted class.", "time": "8-14 months", "cost": "$600-1,200/class", "testing": [], "testCost": "", "reject": [{"problem": "Counterfeit on platform", "cause": "No TM = no takedown", "solution": "Register + customs recordal"}]}};
const R: any[] = [{"name": "Trademark Law of China", "num": "4th Rev 2019", "auth": "CNIPA", "rel": "primary", "desc": "First-to-file system."}, {"name": "Examination Guidelines", "num": "CNIPA 2021", "auth": "CNIPA", "rel": "primary", "desc": "Similarity/distinctiveness standards."}, {"name": "Nice Classification", "num": "12th Ed", "auth": "CNIPA", "rel": "primary", "desc": "45 classes."}, {"name": "Customs IP Protection", "num": "Decree 395", "auth": "GACC", "rel": "secondary", "desc": "Border enforcement."}];
const C: any[] = [{"item": "Trademark Search", "range": "$200-500", "note": "CNIPA + WIPO."}, {"item": "Filing Fee/class", "range": "$300-600", "note": "CNIPA official."}, {"item": "Registration Cert", "range": "$100-200", "note": "Issuance."}, {"item": "Full Service/class", "range": "$800-2,000", "note": "Search+filing."}];
const T: any[] = [{"phase": "Trademark Search", "dur": "1-2w", "desc": "CNIPA database", "resp": "Both"}, {"phase": "Application", "dur": "1-3d", "desc": "File CNIPA", "resp": "SinoTrade"}, {"phase": "Formal Exam", "dur": "1-2m", "desc": "CNIPA formalities", "resp": "CNIPA"}, {"phase": "Substantive Exam", "dur": "6-9m", "desc": "CNIPA review", "resp": "CNIPA"}, {"phase": "Publication", "dur": "3m", "desc": "Opposition window", "resp": "CNIPA"}, {"phase": "Registration", "dur": "1-2m", "desc": "Certificate 10yr", "resp": "Both"}];
const PO: any[] = [{"item": "TM Renewal", "freq": "10yr", "desc": "File 6m before."}, {"item": "Use Evidence", "freq": "Ongoing", "desc": "For non-use challenges."}, {"item": "Watch Service", "freq": "Monthly", "desc": "Monitor conflicts."}];
const H: any[] = [{"topic": "TM Law 5th Revision", "impact": "high", "when": "2025-2026", "desc": "Stronger bad-faith penalties.", "action": true}];
const D: any[] = [{"name": "TM Application Form", "fmt": "CNIPA", "not": "No", "err": "Goods vague"}, {"name": "Brand Specimen", "fmt": "JPEG", "not": "No", "err": "Low res"}, {"name": "Goods List", "fmt": "Excel", "not": "No", "err": "Not specific"}, {"name": "Power of Attorney", "fmt": "PDF", "not": "Yes", "err": "Missing sign"}];

export function checkTrademark(input: any): any {
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
    documentGuide:D, requiredDocuments:["TM Application Form", "Brand Specimen", "Goods List", "Power of Attorney"],
    testRequirements:cat.testing||[], testCostRange:cat.testCost||"", labGuide:"",
    labelGuide:{requiredItems:[],gb7718Highlights:[],gb28050Highlights:[]},
    timelinePhases:T, costBreakdown:C,
    countryProfile:{region:"—",ftaWithChina:false,ftaDetails:"",specialRestrictions:[],bilateralMeatAccess:false,bilateralAquaticAccess:false,dairyApproved:false,gaccDifficulty:"moderate",languageNote:"",commonIssues:[],importVolumeNote:""},
    marketIntel:{chinaImportTrend:cat.trend||"",keyDrivers:cat.drivers||[],barriers:cat.barriers||[],consumerPerception:cat.perception||"",topOrigins:[],recommendation:ih?"Engage professional":"Standard"},
    competitiveAnalysis:cat.competition||"", commonRejections:[{"problem": "Similar mark exists", "cause": "Prior registration", "solution": "Search + class strategy"}],
    postApprovalObligations:PO, horizonScan:H,
    summary:ih?"Action required":"Standard process",
  };
}