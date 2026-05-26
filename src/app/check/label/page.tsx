"use client";
import CheckForm from "../CheckForm";
import { checkLabel, CATEGORY_LABELS, type LabelCategory } from "../../../../modules/label/rules";

const fields = [
  {
    name: "category", label: "Product Category", type: "select" as const, required: true,
    options: (Object.entries(CATEGORY_LABELS) as [LabelCategory, string][]).map(([v, l]) => ({ value: v, label: l })),
  },
  { name: "productName", label: "Product Name", type: "text" as const, required: true, placeholder: "e.g., Organic Honey Almond Granola" },
  { name: "packagingType", label: "Packaging Type", type: "text" as const, required: true, placeholder: "e.g., Box, Pouch, Bottle" },
];

export default function LabelCheckPage() {
  return (
    <CheckForm
      config={{
        title: "Chinese Label Compliance Check",
        description: "Verify if your product label meets GB 7718 and GB 28050 requirements for the Chinese market.",
        moduleKey: "label",
        moduleLabel: "Chinese Label Compliance",
        fields,
        getFullResult: (vals) => {
          const result = checkLabel({ category: vals.category, productName: vals.productName, packagingType: vals.packagingType, originCountry: vals.originCountry });
          return result;
        },
        checkProduct: (vals) => {
          const result = checkLabel({ category: vals.category as LabelCategory, productName: vals.productName, packagingType: vals.packagingType });
          return {
            summary: result.summary,
            isActionNeeded: result.riskCategory !== "low",
            details: [
              { label: "Product", value: vals.productName },
              { label: "Category", value: CATEGORY_LABELS[vals.category as LabelCategory] },
              { label: "Risk Level", value: result.riskCategory === "high" ? "🔴 High" : "🟡 Medium" },
            ],
            documents: result.requiredDocuments,
          };
        },
      }}
    />
  );
}
