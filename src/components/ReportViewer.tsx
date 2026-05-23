import type { ComplianceReport } from "../../modules/gacc/report";
import { ReportTemplate } from "@/core/report/template";

interface ReportViewerProps {
  report: ComplianceReport;
  onBack?: () => void;
}

export default function ReportViewer({ report, onBack }: ReportViewerProps) {
  return (
    <main className="min-h-screen bg-bg-ice py-12">
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-sm text-gray-500 hover:text-primary-navy transition-colors"
          >
            &larr; Back
          </button>
        )}

        <ReportTemplate
          reportId={report.id}
          module={report.module}
          productInfo={report.productInfo}
          result={report.result}
          nextSteps={report.nextSteps}
          generatedAt={report.generatedAt}
        />
      </div>
    </main>
  );
}
