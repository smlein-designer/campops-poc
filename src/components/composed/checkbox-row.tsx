import * as React from "react"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface CheckboxRowProps
  extends Omit<React.ComponentProps<typeof Checkbox>, "id"> {
  id: string
  label: string
  className?: string
}

function CheckboxRow({ id, label, className, ...props }: CheckboxRowProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Checkbox id={id} {...props} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  )
}

export { CheckboxRow }
