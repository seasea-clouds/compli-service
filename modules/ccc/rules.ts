/** CCC 认证 — 判断规则 */

export type CccCategory =
  | "electronics" | "home_appliance" | "it_equipment" | "lighting"
  | "power_tool" | "auto_parts" | "toy" | "medical" | "wire_cable" | "other";

export interface CccInput {
  category: CccCategory;
  productName: string;
  hsCode?: string;
  intendedUse: string;
}

export interface CccResult {
  requiresCcc: boolean;
  riskCategory: "high" | "medium" | "low";
  summary: string;
  requiredDocuments: string[];
  estimatedTimeline: string;
}

export const CATEGORY_LABELS: Record<CccCategory, string> = {
  electronics: "Consumer Electronics",
  home_appliance: "Home Appliances",
  it_equipment: "IT / Communication Equipment",
  lighting: "Lighting Products",
  power_tool: "Power Tools",
  auto_parts: "Automotive Parts & Accessories",
  toy: "Toys / Children's Products",
  medical: "Medical Devices",
  wire_cable: "Wires / Cables / Switches",
  other: "Other Products",
};

/** CCC catalog - these categories typically require certification */
const CCC_CATALOG: Record<CccCategory, boolean> = {
  electronics: true,
  home_appliance: true,
  it_equipment: true,
  lighting: true,
  power_tool: true,
  auto_parts: false, // only specific parts
  toy: true,
  medical: true,
  wire_cable: true,
  other: false,
};

export function checkCcc(input: CccInput): CccResult {
  const requiresCcc = CCC_CATALOG[input.category] ?? false;

  return {
    requiresCcc,
    riskCategory: requiresCcc ? "high" : "low",
    summary: requiresCcc
      ? `Your product (${CATEGORY_LABELS[input.category]}) falls under CCC mandatory certification. Certification is required before import.`
      : `Your product (${CATEGORY_LABELS[input.category]}) may not require CCC certification, but verification of your specific HS code is recommended.`,
    requiredDocuments: requiresCcc ? [
      "CCC Certification Application Form",
      "Product Specification Sheet",
      "User Manual (Chinese translation required)",
      "Factory Inspection Report",
      "Safety Test Report (GB standard)",
      "Electrical Circuit Diagram",
      "Key Component List",
    ] : [
      "Product Specification Sheet",
      "HS Code Confirmation",
    ],
    estimatedTimeline: "Contact us for a timeline tailored to your product",
  };
}
