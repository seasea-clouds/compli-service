"use client";
import CheckForm from "../CheckForm";
import { checkCrossborder, CATEGORY_LABELS, type CrossborderCategory } from "../../../../modules/crossborder/rules";

const fields = [
  {
    name: "category", label: "Product Category", type: "select" as const, required: true,
    options: (Object.entries(CATEGORY_LABELS) as [CrossborderCategory, string][]).map(([v, l]) => ({ value: v, label: l })),
  },
  { name: "productName", label: "Product Name", type: "text" as const, required: true, placeholder: "e.g., Organic Green Tea Matcha" },
  { name: "targetPlatform", label: "Target Platform", type: "text" as const, required: true, placeholder: "e.g., Tmall Global, JD Worldwide, Douyin" },
  { name: "hasBondedWarehouse", label: "Do you have a bonded warehouse arrangement?", type: "boolean" as const },
];

export default function CrossborderCheckPage() {
  return (
    <CheckForm
      config={{
        title: "Cross-Border E-commerce Check",
        description: "Check compliance requirements for selling your product on Chinese e-commerce platforms.",
        moduleKey: "crossborder",
        moduleLabel: "Cross-Border E-commerce",
        fields,
        checkProduct: (vals) => {
          const result = checkCrossborder({
            category: vals.category as CrossborderCategory,
            productName: vals.productName,
            targetPlatform: vals.targetPlatform,
            hasBondedWarehouse: vals.hasBondedWarehouse === "yes",
          });
          return {
            summary: result.summary,
            isActionNeeded: result.riskCategory === "high",
            details: [
              { label: "Product", value: vals.productName },
              { label: "Category", value: CATEGORY_LABELS[vals.category as CrossborderCategory] },
              { label: "Target Platform", value: vals.targetPlatform },
            ],
            documents: result.requiredDocuments,
          };
        },
      }}
    />
  );
}
