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

export const CATEGORY_LABELS: Record<string, string> = {"prepackaged": "Prepackaged Foods (GB 7718)", "dairy": "Dairy Products", "alcohol": "Alcoholic Beverages", "confectionery": "Confectionery/Snacks"};
const PROFILES: Record<string, any> = {"prepackaged": {"label": "Prepackaged Foods (GB 7718)", "risk": "🟡 Medium"}, "dairy": {"label": "Dairy Products", "risk": "🔴 High"}, "alcohol": {"label": "Alcoholic Beverages", "risk": "🟡 Medium"}, "confectionery": {"label": "Confectionery/Snacks", "risk": "🟡 Medium"}};

export function checkLabel(input: any): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const isHighRisk = cat.risk && cat.risk.includes("🔴");
  return { requiresRegistration: isHighRisk, riskCategory: isHighRisk ? 'high' : 'low', isHighRisk, riskScore: isHighRisk ? 6.5 : 3.5, estimatedTimeline: cat.time || '2-3 weeks', totalCostRange: cat.cost || '$500-2,000',
    executiveSummary: 'Label assessment.', oneLineDecision: isHighRisk ? '⚠️' : '✅',
    riskDimensions: [{ dimension: 'Category', score: isHighRisk ? 7 : 3, color: isHighRisk ? '🔴' : '🟢', note: cat.label }],
    channels: [], tariffInfo: { mfnRate: 'Varies', vatRate: '13%', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: 'Varies' },
    regulations: [{"name": "GB 7718-2011", "num": "GB 7718-2011", "auth": "NHC", "rel": "primary", "desc": "Labeling of Prepackaged Foods."}],
    classification: { assignedHsChapter: '—', ciqCode: '—', isHighRisk, riskReason: cat.riskReason || '', alternativeClassificationNote: '' },
    riskMatrix: [{ dimension: 'Category', rating: isHighRisk ? '🔴' : '🟢', explanation: cat.riskReason }],
    documentGuide: [], requiredDocuments: [], testRequirements: [], testCostRange: '', labGuide: '',
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [], costBreakdown: [],
    countryProfile: { region: '', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'moderate', languageNote: '', commonIssues: [], importVolumeNote: '' },
    marketIntel: { chinaImportTrend: '', keyDrivers: [], barriers: [], consumerPerception: '', topOrigins: [], recommendation: '' },
    competitiveAnalysis: '', commonRejections: [], postApprovalObligations: [], horizonScan: [],
    summary: isHighRisk ? 'High risk category.' : 'Standard label compliance.',
  };
}