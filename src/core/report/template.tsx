/** 报告模板 — React 组件 */

interface ReportLabels {
  title: string;
  sectionProduct: string;
  sectionResult: string;
  sectionDocuments: string;
  sectionNextSteps: string;
  ctaTitle: string;
  ctaDesc: string;
  ctaBtn: string;
  footerName: string;
  footerAddress: string;
  footerEmail: string;
  labelProduct: string;
  labelCategory: string;
  labelHsCode: string;
  labelOrigin: string;
  gaccRequired: string;
  gaccNotRequired: string;
}

interface ReportTemplateProps {
  reportId: string;
  module: string;
  locale?: string;
  labels: ReportLabels;
  productInfo: {
    name: string;
    category: string;
    hsCode?: string;
    originCountry: string;
  };
  result: {
    requiresRegistration: boolean;
    isHighRisk: boolean;
    riskCategory: string;
    summary: string;
    requiredDocuments: string[];
  };
  nextSteps: string[];
  generatedAt: string;
}

export function ReportTemplate(data: ReportTemplateProps) {
  const {
    reportId, module, locale, labels,
    productInfo, result, nextSteps, generatedAt,
  } = data;
  const href = (path: string) => `/${locale || 'en'}${path}`;

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-primary-navy">{labels.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{module}</p>
          </div>
          <div className="text-right text-sm text-gray-400">
            <p>#{reportId}</p>
            <p>{generatedAt}</p>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.sectionProduct}</h2>
        <div className="bg-gray-50 rounded p-4 space-y-1 text-sm">
          <p><span className="font-medium">{labels.labelProduct}</span> {productInfo.name}</p>
          <p><span className="font-medium">{labels.labelCategory}</span> {productInfo.category}</p>
          {productInfo.hsCode && (
            <p><span className="font-medium">{labels.labelHsCode}</span> {productInfo.hsCode}</p>
          )}
          <p><span className="font-medium">{labels.labelOrigin}</span> {productInfo.originCountry}</p>
        </div>
      </section>

      {/* Result */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.sectionResult}</h2>
        <div className={`rounded p-4 ${result.requiresRegistration ? "bg-category:50 border border-category:200" : "bg-green-50 border border-green-200"}`}>
          <p className="font-semibold text-lg">
            {result.requiresRegistration ? `✅ ${labels.gaccRequired}` : `✅ ${labels.gaccNotRequired}`}
          </p>
          <p className="text-sm text-gray-700 mt-2">{result.summary}</p>
        </div>
      </section>

      {/* Required Documents */}
      <section className="mb-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.sectionDocuments}</h2>
        <ul className="space-y-1">
          {result.requiredDocuments.map((doc, i) => (
            <li key={i} className="flex items-start gap-2 text-sm">
              <span className="text-gray-400 mt-0.5">&#x2610;</span>
              <span>{doc}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Next Steps */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">{labels.sectionNextSteps}</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          {nextSteps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <div className="bg-primary-navy text-white rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">{labels.ctaTitle}</h3>
        <p className="text-white/80 text-sm mb-4">{labels.ctaDesc}</p>
        <a
          href={href('/quote')}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gold hover:bg-gold/90 text-primary-navy font-semibold px-6 py-2 rounded transition-all"
        >
          {labels.ctaBtn}
        </a>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-400">
        <p>{labels.footerName} — {labels.footerAddress}</p>
        <p>{labels.footerEmail} | sinotradecompliance.com</p>
      </div>
    </div>
  );
}
