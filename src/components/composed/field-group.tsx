import * as React from "react"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FieldGroupProps {
  label: string
  htmlFor: string
  helperText?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
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
  return (
    <div className={cn("grid gap-1.5", className)}>
      <Label htmlFor={htmlFor}>
        {label}
        {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
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
