"use client";

import { ReportTemplate } from '@/core/report/template';

const labels = {
  title: "China Market Entry Compliance Report",
  sectionProduct: "Product Information",
  sectionResult: "Assessment Result",
  sectionDocuments: "Required Documents",
  sectionNextSteps: "Next Steps",
  ctaTitle: "Get a Custom Quote",
  ctaDesc: "Tailored plan and pricing for your specific product.",
  ctaBtn: "Contact Us",
  footerName: "SinoTrade Compliance",
  footerAddress: "Shanghai, China",
  footerEmail: "david@sinotradecompliance.com",
  labelProduct: "Product",
  labelCategory: "Category",
  labelHsCode: "HS Code",
  labelOrigin: "Origin",
  gaccRequired: "Compliance Action Required",
  gaccNotRequired: "No Compliance Action Required",
};

export default function PreviewPage() {
  const result = {};
  return (
    <div className="min-h-screen bg-bg-ice py-8">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-4 text-center mb-6">
          <p className="text-sm font-bold text-amber-800">🔬 Preview: NMPA Module</p>
          <p className="text-xs text-amber-600">Sample data — template with default values</p>
        </div>
      </div>
      <ReportTemplate
        reportId="PREVIEW-nmpa"
        module="NMPA"
        locale="en"
        labels={labels}
        productInfo={{ name: "Sample Product", category: "Standard Category", originCountry: "USA" }}
        result={{}}
        nextSteps={[ "Contact SinoTrade Compliance", "Prepare documentation", "Submit application" ]}
        generatedAt={new Date().toISOString()}
      />
    </div>
  );
}
