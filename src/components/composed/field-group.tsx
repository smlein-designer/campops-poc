import * as React from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FieldControlA11yProps {
  "aria-describedby"?: string
  "aria-invalid"?: boolean
  "aria-required"?: boolean
}

interface FieldGroupProps {
  label: string
  htmlFor: string
  helperText?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode | ((a11yProps: FieldControlA11yProps) => React.ReactNode)
}

function FieldGroup({
  label,
  htmlFor,
  helperText,
  error,
  required,
  className,
  children,
}: FieldGroupProps) {
  const describedById = error ? `${htmlFor}-error` : helperText ? `${htmlFor}-helper` : undefined
  const a11yProps: FieldControlA11yProps = {
    "aria-describedby": describedById,
    "aria-invalid": !!error,
    "aria-required": required,
  }

  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor}>
        <span>
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </span>
      </Label>
      {typeof children === "function" ? children(a11yProps) : children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-xs text-destructive">
          {error}
        </p>
      ) : helperText ? (
        <p id={`${htmlFor}-helper`} className="text-xs text-muted-foreground">
          {helperText}
        </p>
      ) : null}
    </div>
  )
}

export { FieldGroup }
export type { FieldControlA11yProps }
