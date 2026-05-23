/** GACC 食品注册 — 判断规则 */

export type GaccCategory =
  | "alcohol" | "beverage" | "confectionery" | "coffee_tea"
  | "canned" | "sugar" | "grain" | "meat" | "dairy" | "seafood"
  | "honey" | "oil" | "seasoning" | "nuts" | "health_food"
  | "other";

/** 高风险 18 类 — 需专业处理 */
export const HIGH_RISK_18: Record<GaccCategory, boolean> = {
  meat: true,
  dairy: true,
  seafood: true,
  honey: true,
  oil: true,
  grain: true,
  seasoning: true,
  nuts: true,
  health_food: true,
  alcohol: false,
  beverage: false,
  confectionery: false,
  coffee_tea: false,
  canned: false,
  sugar: false,
  other: false,
};

export interface GaccInput {
  category: GaccCategory;
  originCountry: string;
  productName: string;
  hsCode?: string;
}

export interface GaccResult {
  requiresRegistration: boolean;
  isHighRisk: boolean;
  riskCategory: "high" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

/** 品类标签映射 */
export const CATEGORY_LABELS: Record<GaccCategory, string> = {
  alcohol: "Alcoholic Beverages (HS 22.03-22.08)",
  beverage: "Non-alcoholic Beverages (HS 22.01-22.02)",
  confectionery: "Confectionery / Chocolate (HS 17.04, 18.06)",
  coffee_tea: "Coffee / Tea (HS 09.01-09.02)",
  canned: "Canned / Processed Foods (HS 20)",
  sugar: "Sugar / Syrups (HS 17)",
  grain: "Grains / Flour (HS 10-11)",
  meat: "Meat Products (HS 02)",
  dairy: "Dairy Products (HS 04)",
  seafood: "Seafood / Aquatic (HS 03)",
  honey: "Honey / Bee Products (HS 04.09)",
  oil: "Edible Oils (HS 15)",
  seasoning: "Seasonings / Condiments (HS 21.03)",
  nuts: "Nuts / Dried Fruits (HS 08)",
  health_food: "Health / Dietary Supplements (HS 21.06)",
  other: "Other Food Products",
};

export function checkGacc(input: GaccInput): GaccResult {
  const isHighRisk = HIGH_RISK_18[input.category] ?? false;

  return {
    requiresRegistration: true, // GACC applies to all food
    isHighRisk,
    riskCategory: isHighRisk ? "high" : "low",
    summary: isHighRisk
      ? `Your product (${CATEGORY_LABELS[input.category]}) is classified under GACC's high-risk category. Professional compliance support is strongly recommended.`
      : `Your product (${CATEGORY_LABELS[input.category]}) requires GACC registration but is classified as low risk.`,
    requiredDocuments: [
      "GACC Registration Application Form",
      "Product Description & Ingredients List",
      "Manufacturing Process Flow Chart",
      "HACCP / ISO 22000 Certificate (if any)",
      "Lab Test Report (composition, microbiology)",
      "Certificate of Free Sale",
      ...(isHighRisk ? ["Third-party audit report", "Specific risk assessment"] : []),
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
