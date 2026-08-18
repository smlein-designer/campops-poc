import { PageHeader } from "@/components/composed/page-header"
import { ReadinessPanel } from "@/components/composed/readiness-panel"
import { Button } from "@/components/ui/button"
import {
  campsiteReadyWithWarnings,
  getReadinessStatus,
  getValidationIssues,
} from "@/lib/campsite-data"
import { CampsiteEditorForm } from "@/screens/campsite-editor-form"

function CampsiteEditorReadyWithWarnings() {
  const campsite = campsiteReadyWithWarnings
  const issues = getValidationIssues(campsite)
  const status = getReadinessStatus(issues)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        breadcrumbLabel={campsite.campgroundName}
        title={`Campsite ${campsite.siteNumberOrName}`}
        actions={
          <>
            <Button variant="outline">Save</Button>
            <Button variant="default" disabled={status === "incomplete"}>
              Publish campsite
            </Button>
          </>
        }
      />
      <ReadinessPanel status={status} issues={issues} className="w-full" />
      <CampsiteEditorForm campsite={campsite} issues={issues} />
    </div>
  )
}

export default CampsiteEditorReadyWithWarnings
