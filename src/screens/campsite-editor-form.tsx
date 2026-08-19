import { FieldGroup } from "@/components/composed/field-group"
import { CheckboxRow } from "@/components/composed/checkbox-row"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Campsite, ValidationIssue } from "@/lib/campsite-data"

interface CampsiteEditorFormProps {
  campsite: Campsite
  issues: ValidationIssue[]
}

function CampsiteEditorForm({ campsite, issues }: CampsiteEditorFormProps) {
  const maxVehicleLengthError = issues.find((issue) => issue.field === "Max vehicle length")

  return (
    <>
      <section className="flex w-full flex-col gap-4">
        <h2 className="text-lg leading-[1.35] font-semibold text-foreground">Campsite details</h2>
        <div className="flex items-start gap-4">
          <FieldGroup label="Site number or name" htmlFor="site-name" className="w-[280px]">
            <Input id="site-name" defaultValue={campsite.siteNumberOrName} />
          </FieldGroup>
          <FieldGroup label="Site type" htmlFor="site-type" className="w-[280px]">
            <Select defaultValue={campsite.siteType ?? undefined}>
              <SelectTrigger id="site-type" className="w-full">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tent">Tent</SelectItem>
                <SelectItem value="rv">RV site</SelectItem>
                <SelectItem value="cabin">Cabin</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
        </div>
        <div className="flex items-start gap-4">
          <FieldGroup
            label="Capacity"
            htmlFor="capacity"
            helperText="Campers"
            className="w-[280px]"
          >
            <Input id="capacity" type="number" defaultValue={campsite.capacity ?? ""} />
          </FieldGroup>
          <FieldGroup
            label="Max vehicle length"
            htmlFor="max-vehicle-length"
            error={maxVehicleLengthError?.message}
            className="w-[280px]"
          >
            <Input
              id="max-vehicle-length"
              type="number"
              aria-invalid={!!maxVehicleLengthError}
              defaultValue={campsite.maxVehicleLength ?? ""}
            />
          </FieldGroup>
        </div>
      </section>

      <section className="flex w-full flex-col gap-4">
        <h2 className="text-lg leading-[1.35] font-semibold text-foreground">Amenities</h2>
        <div className="flex flex-wrap gap-6">
          {campsite.amenities.map((amenity) => (
            <CheckboxRow
              key={amenity.id}
              id={`amenity-${amenity.id}`}
              label={amenity.label}
              defaultChecked={amenity.publiclyVisible}
            />
          ))}
        </div>
      </section>

      <section className="flex w-full flex-col gap-4">
        <h2 className="text-lg leading-[1.35] font-semibold text-foreground">
          Availability &amp; Restrictions
        </h2>
        <div className="flex items-start gap-4">
          <FieldGroup label="Booking season" htmlFor="booking-season" className="w-[220px]">
            <Select defaultValue={campsite.bookingSeason}>
              <SelectTrigger id="booking-season" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={campsite.bookingSeason}>{campsite.bookingSeason}</SelectItem>
              </SelectContent>
            </Select>
          </FieldGroup>
          <FieldGroup label="Check-in time" htmlFor="check-in" className="w-[220px]">
            <Input id="check-in" defaultValue={campsite.checkInTime} />
          </FieldGroup>
          <FieldGroup label="Check-out time" htmlFor="check-out" className="w-[220px]">
            <Input id="check-out" defaultValue={campsite.checkOutTime} />
          </FieldGroup>
        </div>
      </section>
    </>
  )
}

export { CampsiteEditorForm }
