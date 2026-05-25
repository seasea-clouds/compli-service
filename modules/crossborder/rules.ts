/** 跨境电商合规 — 判断规则 */

export type CrossborderCategory =
  | "food" | "cosmetics" | "electronics" | "apparel"
  | "health_supplement" | "baby_product" | "home_goods" | "other";

export interface CrossborderInput {
  category: CrossborderCategory;
  productName: string;
  targetPlatform: string;
  hasBondedWarehouse: boolean;
}

export interface CrossborderResult {
  requiresCompliance: boolean;
  riskCategory: "high" | "medium" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

export const CATEGORY_LABELS: Record<CrossborderCategory, string> = {
  food: "Food & Beverage",
  cosmetics: "Cosmetics / Personal Care",
  electronics: "Consumer Electronics",
  apparel: "Apparel / Fashion",
  health_supplement: "Health Supplements",
  baby_product: "Baby / Maternal Products",
  home_goods: "Home / Kitchen Goods",
  other: "Other Products",
};

export function checkCrossborder(input: CrossborderInput): CrossborderResult {
  const isHighRisk = ["food", "health_supplement", "baby_product"].includes(input.category);
  const needsBonded = ["cosmetics", "health_supplement", "baby_product"].includes(input.category);

  return {
    requiresCompliance: true,
    riskCategory: isHighRisk ? "high" : "medium",
    summary: isHighRisk
      ? `Your product (${CATEGORY_LABELS[input.category]}) has strict cross-border compliance requirements. Platform onboarding and bonded warehouse setup are recommended.`
      : `Your product (${CATEGORY_LABELS[input.category]}) can be sold cross-border with standard compliance procedures.`,
    requiredDocuments: [
      "Product Listing Content (Chinese)",
      "Brand Authorization Letter",
      "Import/Export License",
      "Product Quality Report",
      ...(needsBonded ? ["Bonded Warehouse Entry Agreement"] : []),
      ...(isHighRisk ? ["Health Food Registration Certificate", "Baby Product Safety Certificate"] : []),
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
