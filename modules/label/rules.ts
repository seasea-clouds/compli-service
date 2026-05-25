/** 中文标签合规 — 判断规则 */

export type LabelCategory =
  | "prepackaged" | "dairy" | "beverage" | "confectionery" | "alcohol"
  | "health_food" | "infant" | "oil" | "seasoning" | "other";

export interface LabelInput {
  category: LabelCategory;
  productName: string;
  packagingType: string;
}

export interface LabelResult {
  requiresCompliance: boolean;
  riskCategory: "high" | "medium" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

export const CATEGORY_LABELS: Record<LabelCategory, string> = {
  prepackaged: "Prepackaged Food (General)",
  dairy: "Dairy Products",
  beverage: "Beverages",
  confectionery: "Confectionery / Snacks",
  alcohol: "Alcoholic Beverages",
  health_food: "Health / Dietary Supplements",
  infant: "Infant Food / Formula",
  oil: "Edible Oils",
  seasoning: "Seasonings / Condiments",
  other: "Other Food Products",
};

export function checkLabel(input: LabelInput): LabelResult {
  const isHighRisk = ["dairy", "infant", "health_food"].includes(input.category);

  return {
    requiresCompliance: true,
    riskCategory: isHighRisk ? "high" : "medium",
    summary: isHighRisk
      ? `Your product (${CATEGORY_LABELS[input.category]}) requires strict GB 7718 / GB 28050 compliant labels. Special warnings and nutritional tables are mandatory.`
      : `Your product (${CATEGORY_LABELS[input.category]}) needs a Chinese label meeting GB 7718 standards.`,
    requiredDocuments: [
      "Chinese Label Design Mockup",
      "Product Ingredients List (translated)",
      "Nutritional Information Table",
      "Original Product Label (English)",
      "Certificate of Free Sale",
      ...(isHighRisk ? ["Infant Formula Registration Certificate", "Health Food Approval"] : []),
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
