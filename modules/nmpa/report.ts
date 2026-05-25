import { checkCosmetics, type CosmeticsInput, CATEGORY_LABELS } from "./rules";

export interface ComplianceReport {
  id: string;
  module: string;
  generatedAt: string;
  productInfo: { name: string; category: string; originCountry?: string };
  result: any;
  nextSteps: string[];
}

export function generateCosmeticsReport(input: CosmeticsInput): Omit<ComplianceReport, "id" | "generatedAt"> {
  const result = checkCosmetics(input);
  return {
    module: "Cosmetics Filing (NMPA)",
    productInfo: { name: input.productName, category: CATEGORY_LABELS[input.category] },
    result,
    nextSteps: [
      "Contact SinoTrade Compliance for a detailed compliance assessment",
      "Prepare required documentation",
      "Submit compliance application",
      "Arrange customs clearance support",
    ],
  };
}
