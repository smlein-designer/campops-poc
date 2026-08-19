import {
  ReadinessItem,
  type ReadinessSeverity,
} from "@/components/composed/readiness-item"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

type ReadinessStatus = "incomplete" | "ready-with-warnings" | "ready"

interface ReadinessIssue {
  field: string
  severity: ReadinessSeverity
  message: string
}

interface ReadinessPanelProps {
  status: ReadinessStatus
  issues: ReadinessIssue[]
  className?: string
}

function ReadinessPanel({ status, issues, className }: ReadinessPanelProps) {
  return (
    <div
      data-slot="readiness-panel"
      data-status={status}
      className={cn(
        "flex flex-col items-start gap-2 rounded-lg border border-border bg-card p-4",
        className
      )}
    >
      <Typography variant="heading-h4" as="h2" className="w-full">
        Publish readiness
      </Typography>
      {status === "ready" ? (
        <Typography variant="body-sm" className="text-muted-foreground">
          No issues found. This campsite is ready to publish.
        </Typography>
      ) : (
        issues.map((issue) => (
          <ReadinessItem
            key={issue.field}
            severity={issue.severity}
            message={issue.message}
            field={issue.field}
          />
        ))
      )}
    </div>
  )
}

export { ReadinessPanel }
export type { ReadinessStatus, ReadinessIssue, ReadinessPanelProps }
