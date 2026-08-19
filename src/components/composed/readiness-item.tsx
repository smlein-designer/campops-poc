import { Badge } from "@/components/ui/badge"
import { Typography } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

type ReadinessSeverity = "blocking" | "warning"

interface ReadinessItemProps {
  severity: ReadinessSeverity
  message: string
  field: string
  className?: string
}

const severityConfig: Record<
  ReadinessSeverity,
  { label: string; variant: "destructive" | "warning" }
> = {
  blocking: { label: "Blocking", variant: "destructive" },
  warning: { label: "Advisory", variant: "warning" },
}

function ReadinessItem({ severity, message, field, className }: ReadinessItemProps) {
  const { label, variant } = severityConfig[severity]

  return (
    <div
      data-slot="readiness-item"
      className={cn(
        "flex w-full items-center gap-4 border-b border-border py-2",
        className
      )}
    >
      <Badge variant={variant} className="shrink-0">
        {label}
      </Badge>
      <div className="flex flex-1 flex-col gap-1">
        <Typography variant="body-sm">{message}</Typography>
        <Typography variant="caption" className="text-muted-foreground">
          {field}
        </Typography>
      </div>
    </div>
  )
}

export { ReadinessItem }
export type { ReadinessSeverity, ReadinessItemProps }
