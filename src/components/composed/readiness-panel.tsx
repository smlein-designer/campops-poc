import {
  ReadinessItem,
  type ReadinessSeverity,
} from "@/components/composed/readiness-item"
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
      <h2 className="w-full text-lg font-semibold text-foreground">Publish readiness</h2>
      {status === "ready" ? (
        <p className="text-sm text-muted-foreground">
          No issues found. This campsite is ready to publish.
        </p>
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
