/** 报告模板 — 专业版，价值 $10,000 */

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
    estimatedTimeline?: string;
  };
  nextSteps: string[];
  generatedAt: string;
}

const DocIcon = () => (
  <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const AlertIcon = () => (
  <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5 text-primary-navy flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5 text-primary-navy flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

function RiskBadge({ level }: { level: 'high' | 'low' }) {
  const colors = {
    high: 'bg-red-50 text-red-700 border-red-200',
    low: 'bg-green-50 text-green-700 border-green-200',
  };
  const labels = {
    high: '🔴 High Risk',
    low: '🟢 Low Risk',
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${colors[level] || colors.low}`}>
      {labels[level] || labels.low}
    </span>
  );
}

const SectionTitle = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
    {icon}
    <h2 className="text-sm font-bold text-primary-navy uppercase tracking-wider">{label}</h2>
  </div>
);

const ValueCard = ({ label, value, className = '' }: { label: string; value: string; className?: string }) => (
  <div className={`bg-gray-50 rounded-lg p-3 ${className}`}>
    <p className="text-xs text-gray-500 uppercase tracking-wider mb-0.5">{label}</p>
    <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
  </div>
);

const StepArrow = () => (
  <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
);

export function ReportTemplate(data: ReportTemplateProps) {
  const {
    reportId, module, locale, labels,
    productInfo, result, nextSteps, generatedAt,
  } = data;
  const href = (path: string) => `/${locale || 'en'}${path}`;
  const riskLevel = result.isHighRisk ? 'high' : (result.riskCategory as 'high' | 'low') || 'low';
  const formattedDate = generatedAt ? new Date(generatedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : '—';

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      
      {/* ── HEADER ──────────────────────────────────────────────── */}
      <div className="bg-primary-navy text-white px-8 py-8">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-1">{module}</p>
            <h1 className="text-2xl font-bold">{labels.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs">Report #{reportId}</p>
            <p className="text-white/60 text-xs">{formattedDate}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/10 flex gap-4 text-sm text-white/80">
          <span>CONFIDENTIAL</span>
          <span>·</span>
          <span>Prepared for: {productInfo.name || 'Client'}</span>
        </div>
      </div>

      {/* ── EXECUTIVE SUMMARY ────────────────────────────────────── */}
      <div className="px-8 py-6 bg-gradient-to-r from-gold/5 to-transparent border-b border-gray-100">
        <SectionTitle icon={<ShieldIcon />} label="EXECUTIVE SUMMARY" />
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              {result.requiresRegistration
                ? `This assessment indicates that <strong>${productInfo.name}</strong> (${productInfo.category}) <strong>requires compliance action</strong> for import into the People's Republic of China. The regulatory pathway involves multiple government agencies including GACC, CNCA, and customs authorities.`
                : `Based on our initial assessment, <strong>${productInfo.name}</strong> (${productInfo.category}) does not currently require immediate compliance action for import into China. However, ongoing monitoring of regulatory changes is recommended.`}
            </p>
          </div>
          <div className="flex-shrink-0">
            <RiskBadge level={riskLevel} />
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN INFO ─────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<DocIcon />} label={labels.sectionProduct} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <ValueCard label={labels.labelProduct} value={productInfo.name} />
          <ValueCard label={labels.labelCategory} value={productInfo.category} />
          {productInfo.hsCode && <ValueCard label={labels.labelHsCode} value={productInfo.hsCode} />}
          <ValueCard label={labels.labelOrigin} value={productInfo.originCountry} />
        </div>
      </div>

      {/* ── REGULATORY PATHWAY ──────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<AlertIcon />} label="REGULATORY PATHWAY" />
        
        <div className="space-y-4">
          {/* Step 1 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Regulatory Determination</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                {result.isHighRisk
                  ? 'Product falls under GACC Category 18 high-risk classification. Enhanced documentation and third-party verification required.'
                  : 'Product is classified as standard risk under current GACC regulations. Standard documentation package applies.'}
              </p>
            </div>
            <StepArrow />
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Document Preparation</h3>
              <p className="text-xs text-gray-500 mt-0.5">Gather and prepare {result.requiredDocuments.length} required documents. All non-Chinese documents must be translated and notarized.</p>
            </div>
            <StepArrow />
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Application Submission</h3>
              <p className="text-xs text-gray-500 mt-0.5">Submit complete application package to GACC via the China CIFER system. Processing time varies by product category and completeness.</p>
            </div>
            <StepArrow />
          </div>

          {/* Step 4 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-navy text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Review & Approval</h3>
              <p className="text-xs text-gray-500 mt-0.5">GACC reviews application, may request additional information. Upon approval, registration certificate is issued with unique registration number.</p>
            </div>
            <StepArrow />
          </div>

          {/* Step 5 */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gold text-primary-navy rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-sm">Market Entry & Compliance</h3>
              <p className="text-xs text-gray-500 mt-0.5">Registration valid for 5 years. Annual reporting required. Customs clearance at port of entry with proper documentation.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ASSESSMENT RESULT ────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<AlertIcon />} label={labels.sectionResult} />
        
        <div className={`rounded-xl p-5 border-2 ${result.requiresRegistration ? 'bg-amber-50 border-amber-300' : 'bg-green-50 border-green-300'}`}>
          <div className="flex items-start gap-3">
            {result.requiresRegistration ? <AlertIcon /> : <CheckIcon />}
            <div>
              <p className="font-bold text-lg text-gray-900">
                {result.requiresRegistration ? `⚠️ ${labels.gaccRequired}` : `✅ ${labels.gaccNotRequired}`}
              </p>
              <p className="text-sm text-gray-700 mt-1">{result.summary}</p>
              {result.estimatedTimeline && (
                <div className="flex items-center gap-1.5 mt-3 text-sm text-gray-600">
                  <ClockIcon />
                  <span><strong>Estimated timeline:</strong> {result.estimatedTimeline}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── REQUIRED DOCUMENTS ──────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<DocIcon />} label={labels.sectionDocuments} />
        
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-3 uppercase tracking-wider font-semibold">{result.requiredDocuments.length} Documents Required</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {result.requiredDocuments.map((doc, i) => (
              <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                <span className="w-5 h-5 bg-gold/10 text-gold rounded flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-sm text-gray-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── NEXT STEPS ──────────────────────────────────────────── */}
      <div className="px-8 py-6 border-b border-gray-100">
        <SectionTitle icon={<ClockIcon />} label="RECOMMENDED ACTION PLAN" />
        
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-lg p-3 border border-gray-100 hover:border-gold/30 transition-colors">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${i === 0 ? 'bg-gold text-primary-navy' : 'bg-gray-100 text-gray-500'}`}>
                {i + 1}
              </div>
              <p className="text-sm text-gray-700">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <div className="px-8 py-8 bg-gradient-to-br from-primary-navy to-primary-navy/95 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">{labels.ctaTitle}</h3>
          <p className="text-white/70 text-sm mb-6 max-w-md mx-auto">{labels.ctaDesc}</p>
          <a
            href={href('/quote')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-primary-navy font-bold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl text-sm"
          >
            {labels.ctaBtn}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────── */}
      <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
          <div>
            <p className="text-sm font-semibold text-gray-900">{labels.footerName}</p>
            <p className="text-xs text-gray-500 mt-0.5">{labels.footerAddress}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500">{labels.footerEmail}</p>
            <p className="text-xs text-gray-500">sinotradecompliance.com</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Report #{reportId}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">
            This report is prepared for informational purposes only. Regulatory requirements may change without notice.
            Please consult with a qualified compliance professional before taking action.
          </p>
        </div>
      </div>
    </div>
  );
}
