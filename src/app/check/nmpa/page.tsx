"use client";
import CheckForm from "../CheckForm";
import { checkCosmetics, CATEGORY_LABELS, type CosmeticsCategory } from "../../../../modules/nmpa/rules";

const fields = [
  {
    name: "category", label: "Product Category", type: "select" as const, required: true,
    options: (Object.entries(CATEGORY_LABELS) as [CosmeticsCategory, string][]).map(([v, l]) => ({ value: v, label: l })),
  },
  { name: "productName", label: "Product Name", type: "text" as const, required: true, placeholder: "e.g., Vitamin C Brightening Serum" },
  { name: "brandCountry", label: "Brand Country / Origin", type: "text" as const, required: true, placeholder: "e.g., South Korea" },
  { name: "hasNewIngredient", label: "Contains novel ingredient not used in China before?", type: "boolean" as const },
];

export default function CosmeticsCheckPage() {
  return (
    <CheckForm
      config={{
        title: "Cosmetics Filing (NMPA) Check",
        description: "Determine if your cosmetics need NMPA registration or filing for the Chinese market.",
        moduleKey: "cosmetics",
        moduleLabel: "Cosmetics Filing (NMPA)",
        fields,
        checkProduct: (vals) => {
          const result = checkCosmetics({
            category: vals.category as CosmeticsCategory,
            productName: vals.productName,
            brandCountry: vals.brandCountry,
            hasNewIngredient: vals.hasNewIngredient === "yes",
          });
          return {
            summary: result.summary,
            isActionNeeded: result.isSpecialCosmetics,
            details: [
              { label: "Product", value: vals.productName },
              { label: "Category", value: CATEGORY_LABELS[vals.category as CosmeticsCategory] },
              { label: "Filing Type", value: result.isSpecialCosmetics ? "🔴 Special Cosmetics (NMPA Registration)" : "🟢 Ordinary Cosmetics (Filing)" },
            ],
            documents: result.requiredDocuments,
          };
        },
      }}
    />
  );
}
