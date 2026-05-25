/** 品牌保护 — 判断规则 */

export type TrademarkCategory =
  | "food" | "cosmetics" | "electronics" | "apparel"
  | "beverage" | "health_supplement" | "luxury" | "other";

export interface TrademarkInput {
  category: TrademarkCategory;
  brandName: string;
  registeredInChina: boolean;
  productName: string;
}

export interface TrademarkResult {
  needsRegistration: boolean;
  riskCategory: "high" | "medium" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

export const CATEGORY_LABELS: Record<TrademarkCategory, string> = {
  food: "Food & Beverage",
  cosmetics: "Cosmetics / Personal Care",
  electronics: "Consumer Electronics",
  apparel: "Apparel / Fashion",
  beverage: "Beverages",
  health_supplement: "Health Supplements",
  luxury: "Luxury / High-end Goods",
  other: "Other Products",
};

export function checkTrademark(input: TrademarkInput): TrademarkResult {
  const needsRegistration = !input.registeredInChina;
  const isHighRisk = !input.registeredInChina;

  return {
    needsRegistration,
    riskCategory: isHighRisk ? "high" : "low",
    summary: needsRegistration
      ? `Your brand "${input.brandName}" is not registered in China. China's first-to-file system means your brand could be registered by someone else. Immediate registration is strongly recommended.`
      : `Your brand "${input.brandName}" appears to be registered in China. However, we recommend verifying the registration scope covers all relevant classes.`,
    requiredDocuments: needsRegistration ? [
      "Trademark Registration Application",
      "Brand Logo (vector format)",
      "Product Category List (Nice Classification)",
      "Proof of First Use (foreign registration)",
      "Power of Attorney to Chinese Agent",
      "Customs IP Recordal Application",
    ] : [
      "Trademark Registration Certificate (China)",
      "Customs IP Recordal Confirmation",
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
