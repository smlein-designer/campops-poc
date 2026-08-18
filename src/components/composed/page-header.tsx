import * as React from "react"
import { ArrowLeft } from "lucide-react"

import { Badge, type badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { VariantProps } from "class-variance-authority"

interface PageHeaderProps {
  breadcrumbLabel: string
  onBreadcrumbClick?: () => void
  title: string
  status?: {
    label: string
    variant: NonNullable<VariantProps<typeof badgeVariants>["variant"]>
  }
  actions?: React.ReactNode
  className?: string
}

function PageHeader({
  breadcrumbLabel,
  onBreadcrumbClick,
  title,
  status,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex items-center justify-between gap-4", className)}
    >
      <div className="flex flex-col items-start gap-1">
        <button
          type="button"
          onClick={onBreadcrumbClick}
          className="inline-flex w-fit items-center gap-1 text-xs text-link hover:underline"
        >
          <ArrowLeft className="size-3.5" aria-hidden="true" />
          {breadcrumbLabel}
        </button>
        <div className="flex items-center gap-2">
          <h1 className="font-display text-[length:var(--display-sm)] font-semibold text-foreground">
            {title}
          </h1>
          {status && <Badge variant={status.variant}>{status.label}</Badge>}
        </div>
      </div>
      {actions && <div className="flex items-start gap-2">{actions}</div>}
    </div>
  )
}

export { PageHeader }
export type { PageHeaderProps }
