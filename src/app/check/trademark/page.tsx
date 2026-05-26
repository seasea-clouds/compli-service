"use client";
import CheckForm from "../CheckForm";
import { checkTrademark, CATEGORY_LABELS, type TrademarkCategory } from "../../../../modules/trademark/rules";

const fields = [
  {
    name: "category", label: "Product Category", type: "select" as const, required: true,
    options: (Object.entries(CATEGORY_LABELS) as [TrademarkCategory, string][]).map(([v, l]) => ({ value: v, label: l })),
  },
  { name: "brandName", label: "Brand Name", type: "text" as const, required: true, placeholder: "e.g., NaturePure" },
  { name: "productName", label: "Product Name", type: "text" as const, required: true, placeholder: "e.g., Organic Honey" },
  { name: "registeredInChina", label: "Is your brand already registered as a trademark in China?", type: "boolean" as const },
];

export default function TrademarkCheckPage() {
  return (
    <CheckForm
      config={{
        title: "Brand Protection Check",
        description: "Assess your brand's trademark registration needs and protection strategy in China.",
        moduleKey: "trademark",
        moduleLabel: "Brand Protection",
        fields,
        getFullResult: (vals) => {
          const result = checkTrademark({ category: vals.category, brandName: vals.brandName, registeredInChina: vals.registeredInChina === 'true', productName: vals.productName });
          return result;
        },
        checkProduct: (vals) => {
          const result = checkTrademark({
            category: vals.category as TrademarkCategory,
            brandName: vals.brandName,
            productName: vals.productName,
            registeredInChina: vals.registeredInChina === "yes",
          });
          return {
            summary: result.summary,
            isActionNeeded: result.needsRegistration,
            details: [
              { label: "Brand", value: vals.brandName },
              { label: "Product", value: vals.productName },
              { label: "Category", value: CATEGORY_LABELS[vals.category as TrademarkCategory] },
              { label: "Registered in China", value: vals.registeredInChina === "yes" ? "✅ Yes" : "❌ No" },
            ],
            documents: result.requiredDocuments,
          };
        },
      }}
    />
  );
}
