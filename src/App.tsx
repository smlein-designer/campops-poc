import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FieldGroup } from "@/components/composed/field-group"
import { CheckboxRow } from "@/components/composed/checkbox-row"
import { ReadinessPanel } from "@/components/composed/readiness-panel"
import { PageHeader } from "@/components/composed/page-header"
import CampsiteEditorMissingInfo from "@/screens/campsite-editor-missing-info"
import CampsiteEditorReadyWithWarnings from "@/screens/campsite-editor-ready-with-warnings"
import PublishedSuccess from "@/screens/published-success"
import PublishedBlockingEdits from "@/screens/published-blocking-edits"
import PublicPreview from "@/screens/public-preview"

const screens = {
  "missing-info": { label: "1. Missing information", component: CampsiteEditorMissingInfo },
  "ready-with-warnings": {
    label: "2. Ready with warnings",
    component: CampsiteEditorReadyWithWarnings,
  },
  "published-success": { label: "3. Published success", component: PublishedSuccess },
  "blocking-edits": { label: "4. Unpublished blocking edits", component: PublishedBlockingEdits },
  "public-preview": { label: "5. Public preview", component: PublicPreview },
  components: { label: "Component library", component: ComponentShowcase },
} as const

type ScreenKey = keyof typeof screens

function ComponentShowcase() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 p-8">
      <h1>Component check</h1>

      <div className="flex flex-wrap gap-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="destructive">Blocking</Badge>
        <Badge variant="warning">Advisory</Badge>
        <Badge variant="success">Ready</Badge>
        <Badge variant="secondary">Neutral</Badge>
      </div>

      <FieldGroup
        label="Site number or name"
        htmlFor="site-name"
        helperText="Shown to operators and campers."
      >
        {(a11y) => <Input id="site-name" placeholder="e.g. Site 14" {...a11y} />}
      </FieldGroup>

      <FieldGroup label="Site type" htmlFor="site-type" error="Select a site type.">
        {(a11y) => (
          <Select>
            <SelectTrigger id="site-type" className="w-full" {...a11y}>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tent">Tent</SelectItem>
              <SelectItem value="rv">RV</SelectItem>
              <SelectItem value="cabin">Cabin</SelectItem>
            </SelectContent>
          </Select>
        )}
      </FieldGroup>

      <CheckboxRow id="publicly-visible" label="Publicly visible" defaultChecked />

      <PageHeader
        breadcrumbLabel="Back to campground"
        title="Site 14"
        status={{ label: "Ready", variant: "success" }}
        actions={
          <>
            <Button variant="outline">Preview</Button>
            <Button variant="default">Publish</Button>
          </>
        }
      />

      <ReadinessPanel
        status="incomplete"
        issues={[
          {
            field: "Site number or name",
            severity: "blocking",
            message:
              "Add a site number or name so operators and campers can identify this site.",
          },
          {
            field: "Photos",
            severity: "warning",
            message:
              "Add photos when available. Listings with photos are easier for campers to trust.",
          },
        ]}
      />

      <ReadinessPanel status="ready" issues={[]} />
    </div>
  )
}

function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenKey>("missing-info")
  const ActiveComponent = screens[activeScreen].component

  return (
    <div className="min-h-screen">
      <nav className="flex flex-wrap gap-2 border-b border-border bg-card p-4">
        {(Object.keys(screens) as ScreenKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveScreen(key)}
            className={
              key === activeScreen
                ? "rounded-lg bg-primary px-2.5 py-1.5 text-sm font-medium text-primary-foreground"
                : "rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted-foreground hover:bg-muted"
            }
          >
            {screens[key].label}
          </button>
        ))}
      </nav>
      <ActiveComponent />
    </div>
  )
}

export default App
