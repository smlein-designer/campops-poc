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

function App() {
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
        <Input id="site-name" placeholder="e.g. Site 14" />
      </FieldGroup>

      <FieldGroup label="Site type" htmlFor="site-type" error="Select a site type.">
        <Select>
          <SelectTrigger id="site-type" className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tent">Tent</SelectItem>
            <SelectItem value="rv">RV</SelectItem>
            <SelectItem value="cabin">Cabin</SelectItem>
          </SelectContent>
        </Select>
      </FieldGroup>

      <CheckboxRow id="publicly-visible" label="Publicly visible" defaultChecked />
    </div>
  )
}

export default App
