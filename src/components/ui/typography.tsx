import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// Source of truth: CampOps DS "Style Guide" page (Figma file uV8nvy1rALWKVadZL9lP64,
// node 12:8), type ramp section. Each variant's font/size/weight/line-height was read
// directly off that page's text nodes, not the (sometimes stale) caption labels next
// to them — see CORRECTIONS.md item 34.
const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      "display-hero":
        "font-display font-semibold text-[length:var(--display-lg)] leading-[1.2]",
      "display-h2": "font-display font-semibold text-[length:var(--display-md)] leading-[1.25]",
      "display-h3": "font-display font-semibold text-[length:var(--display-sm)] leading-[1.3]",
      "heading-h4": "font-display font-semibold text-lg leading-[1.35]",
      "body-lg": "text-lg font-normal leading-[1.5]",
      "body-base": "text-base font-normal leading-[1.5]",
      "body-sm": "text-sm font-normal leading-[1.45]",
      "label-md": "text-base font-medium leading-[1.3]",
      "label-sm": "text-sm font-medium leading-[1.3]",
      caption: "text-xs font-normal leading-[1.4]",
    },
  },
  defaultVariants: {
    variant: "body-base",
  },
})

type TypographyVariant = NonNullable<VariantProps<typeof typographyVariants>["variant"]>

// The element each variant renders as — this IS the Figma-to-code tag mapping
// (Display/H2 -> h2, Heading/H4 -> h4, etc.), not just a convenient default.
// Don't override via `as` for a document-outline opinion; see DESIGN_SYSTEM.md's
// Typography section and CORRECTIONS.md item 41 for why that's off-limits here.
const defaultElement: Record<TypographyVariant, React.ElementType> = {
  "display-hero": "h1",
  "display-h2": "h2",
  "display-h3": "h3",
  "heading-h4": "h4",
  "body-lg": "p",
  "body-base": "p",
  "body-sm": "p",
  "label-md": "span",
  "label-sm": "span",
  caption: "p",
}

interface TypographyProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "color">,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType
  asChild?: boolean
}

function Typography({
  className,
  variant = "body-base",
  as,
  asChild = false,
  ...props
}: TypographyProps) {
  const resolvedVariant = variant ?? "body-base"
  const Comp = asChild ? Slot.Root : (as ?? defaultElement[resolvedVariant])

  return (
    <Comp
      data-slot="typography"
      data-variant={resolvedVariant}
      className={cn(typographyVariants({ variant: resolvedVariant }), className)}
      {...props}
    />
  )
}

export { Typography, typographyVariants }
export type { TypographyProps, TypographyVariant }
