import { checkTrademark, type TrademarkInput, CATEGORY_LABELS } from "./rules";

export interface ComplianceReport {
  id: string;
  module: string;
  generatedAt: string;
  productInfo: { name: string; category: string; originCountry?: string };
  result: any;
  nextSteps: string[];
}

export function generateTrademarkReport(input: TrademarkInput): Omit<ComplianceReport, "id" | "generatedAt"> {
  const result = checkTrademark(input);
  return {
    module: "Brand Protection",
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
