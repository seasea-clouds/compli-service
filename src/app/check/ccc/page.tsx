"use client";
import CheckForm from "../CheckForm";
import { checkCcc, CATEGORY_LABELS, type CccCategory } from "../../../../modules/ccc/rules";

const fields = [
  {
    name: "category", label: "Product Category", type: "select" as const, required: true,
    options: (Object.entries(CATEGORY_LABELS) as [CccCategory, string][]).map(([v, l]) => ({ value: v, label: l })),
  },
  { name: "productName", label: "Product Name", type: "text" as const, required: true, placeholder: "e.g., Wireless Bluetooth Speaker" },
  { name: "hsCode", label: "HS Code", type: "text" as const, placeholder: "e.g., 8518.22 (optional)" },
  { name: "intendedUse", label: "Intended Use", type: "text" as const, required: true, placeholder: "e.g., Home use, industrial, medical" },
];

export default function CccCheckPage() {
  return (
    <CheckForm
      config={{
        title: "CCC Certification Check",
        description: "Find out if your product requires China Compulsory Certification (CCC) for import.",
        moduleKey: "ccc",
        moduleLabel: "CCC Certification",
        fields,
        getFullResult: (vals) => {
          const result = checkCcc({ category: vals.category, productName: vals.productName, hsCode: vals.hsCode, intendedUse: vals.intendedUse, originCountry: vals.originCountry });
          return result;
        },
        checkProduct: (vals) => {
          const result = checkCcc({ category: vals.category as CccCategory, productName: vals.productName, hsCode: vals.hsCode, intendedUse: vals.intendedUse });
          return {
            summary: result.summary,
            isActionNeeded: result.requiresCcc,
            details: [
              { label: "Product", value: vals.productName },
              { label: "Category", value: CATEGORY_LABELS[vals.category as CccCategory] },
              { label: "CCC Required", value: result.requiresCcc ? "✅ Yes" : "❌ May not be required" },
            ],
            documents: result.requiredDocuments,
          };
        },
      }}
    />
  );
}
