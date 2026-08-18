import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { AlertCircle, TriangleAlert, CircleCheck } from "lucide-react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        secondary:
          "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive:
          "bg-destructive-soft text-destructive [a]:hover:bg-destructive-soft/80",
        warning: "bg-warning-soft text-warning [a]:hover:bg-warning-soft/80",
        success: "bg-success-soft text-success [a]:hover:bg-success-soft/80",
      },
    },
    defaultVariants: {
      variant: "secondary",
    },
  }
)

// Figma spec: destructive/warning/success each carry a fixed leading icon;
// secondary is intentionally bare. Icons inherit color from the variant's
// text class (currentColor) rather than being hardcoded.
const badgeIcons = {
  destructive: AlertCircle,
  warning: TriangleAlert,
  success: CircleCheck,
} as const

function Badge({
  className,
  variant = "secondary",
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"
  const Icon = variant && variant in badgeIcons
    ? badgeIcons[variant as keyof typeof badgeIcons]
    : null

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {Icon && <Icon data-icon="inline-start" aria-hidden="true" />}
      {children}
    </Comp>
  )
}

export { Badge, badgeVariants }
