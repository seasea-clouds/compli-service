/** 化妆品备案 NMPA — 判断规则 */

export type CosmeticsCategory =
  | "skincare" | "makeup" | "haircare" | "fragrance"
  | "sunscreen" | "oral_care" | "body_care" | "baby" | "other";

export interface CosmeticsInput {
  category: CosmeticsCategory;
  productName: string;
  brandCountry: string;
  hasNewIngredient: boolean;
}

export interface CosmeticsResult {
  requiresFiling: boolean;
  isSpecialCosmetics: boolean;
  riskCategory: "high" | "medium" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

export const CATEGORY_LABELS: Record<CosmeticsCategory, string> = {
  skincare: "Skincare Products",
  makeup: "Makeup / Color Cosmetics",
  haircare: "Hair Care Products",
  fragrance: "Fragrance / Perfume",
  sunscreen: "Sunscreen / UV Protection",
  oral_care: "Oral Care Products",
  body_care: "Body Care / Shower Products",
  baby: "Baby / Children's Cosmetics",
  other: "Other Cosmetics",
};

/** Special cosmetics categories requiring NMPA registration (vs simple filing) */
const SPECIAL_CATEGORIES: Record<CosmeticsCategory, boolean> = {
  sunscreen: true,
  baby: true,
  skincare: false,
  makeup: false,
  haircare: false,
  fragrance: false,
  oral_care: false,
  body_care: false,
  other: false,
};

export function checkCosmetics(input: CosmeticsInput): CosmeticsResult {
  const isSpecial = SPECIAL_CATEGORIES[input.category] || input.hasNewIngredient;

  return {
    requiresFiling: true,
    isSpecialCosmetics: isSpecial,
    riskCategory: isSpecial ? "high" : "medium",
    summary: isSpecial
      ? `Your product (${CATEGORY_LABELS[input.category]}) is classified as special cosmetics requiring NMPA registration. This involves safety assessment and efficacy testing.`
      : `Your product (${CATEGORY_LABELS[input.category]}) requires NMPA filing (ordinary cosmetics). This is a simpler process than special cosmetics registration.`,
    requiredDocuments: [
      "Product Formula / Ingredient List",
      "Manufacturing Process Description",
      "Product Safety Assessment Report",
      "Microbiological Test Report",
      "Heavy Metal Test Report",
      "Certificate of Free Sale",
      "Authorization Letter to Chinese Agent",
      ...(isSpecial ? ["Efficacy Evaluation Report", "Human Safety Test Report", "Sunscreen SPF Test Report"] : []),
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
