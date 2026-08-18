import { PageHeader } from "@/components/composed/page-header"
import { ReadinessPanel } from "@/components/composed/readiness-panel"
import { Button } from "@/components/ui/button"
import {
  campsitePublishedWithBlockingEdits,
  getReadinessStatus,
  getValidationIssues,
} from "@/lib/campsite-data"
import { CampsiteEditorForm } from "@/screens/campsite-editor-form"

function PublishedBlockingEdits() {
  const campsite = campsitePublishedWithBlockingEdits
  const issues = getValidationIssues(campsite)
  const status = getReadinessStatus(issues)

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        breadcrumbLabel={campsite.campgroundName}
        title={`Campsite ${campsite.siteNumberOrName}`}
        status={{ label: "Published", variant: "success" }}
        actions={
          <>
            <Button variant="outline">Save</Button>
            <Button variant="default" disabled={status === "incomplete"}>
              Republish
            </Button>
          </>
        }
      />
      <ReadinessPanel status={status} issues={issues} className="w-full" />
      <CampsiteEditorForm campsite={campsite} issues={issues} />
    </div>
  )
}

export default PublishedBlockingEdits
