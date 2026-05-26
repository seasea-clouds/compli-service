/** CROSSBORDER — 深度规则引擎 */

export type CrossborderCategory =
  | "food" | "cosmetics" | "electronics" | "apparel"
  | "health_supplement" | "baby_product" | "home_goods" | "other";

export interface CrossborderInput {
  category: CrossborderCategory;
  productName: string;
  targetPlatform: string;
  hasBondedWarehouse: boolean;
}

export const CATEGORY_LABELS: Record<string, string> = {"food": "Food", "cosmetics": "Cosmetics"};
const PROFILES: Record<string, any> = {"food": {"label": "Food", "risk": "🟢 Low"}, "cosmetics": {"label": "Cosmetics", "risk": "🟢 Low"}};

export function checkCrossborder(input: any): any {
  const cat = PROFILES[input.category];
  if (!cat) return {};
  const isHighRisk = cat.risk && cat.risk.includes("🔴");
  return { requiresRegistration: isHighRisk, riskCategory: isHighRisk ? 'high' : 'low', isHighRisk, riskScore: isHighRisk ? 7.0 : 3.5,
    estimatedTimeline: cat.time || 'Contact us', totalCostRange: cat.cost || '$500-5,000',
    executiveSummary: '', oneLineDecision: isHighRisk ? '⚠️' : '✅',
    riskDimensions: [{ dimension: 'Category', score: isHighRisk ? 7 : 3, color: isHighRisk ? '🔴' : '🟢', note: cat.label }],
    channels: [], tariffInfo: { mfnRate: 'Varies', vatRate: '13%', consumptionTax: 'N/A', ftaRate: null, totalTaxBurden: 'Varies' },
    regulations: [], classification: { assignedHsChapter: '—', ciqCode: '—', isHighRisk, riskReason: cat.riskReason || '', alternativeClassificationNote: '' },
    riskMatrix: [{ dimension: 'Category', rating: isHighRisk ? '🔴' : '🟢', explanation: cat.riskReason }],
    documentGuide: [], requiredDocuments: [], testRequirements: [], testCostRange: '', labGuide: '',
    labelGuide: { requiredItems: [], gb7718Highlights: [], gb28050Highlights: [] },
    timelinePhases: [], costBreakdown: [],
    countryProfile: { region: '', ftaWithChina: false, ftaDetails: '', specialRestrictions: [], bilateralMeatAccess: false, bilateralAquaticAccess: false, dairyApproved: false, gaccDifficulty: 'moderate', languageNote: '', commonIssues: [], importVolumeNote: '' },
    marketIntel: { chinaImportTrend: '', keyDrivers: [], barriers: [], consumerPerception: '', topOrigins: [], recommendation: '' },
    competitiveAnalysis: '', commonRejections: [], postApprovalObligations: [], horizonScan: [],
    summary: isHighRisk ? 'Action required.' : 'Standard process.',
  };
}