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
import { Typography } from "@/components/ui/typography"
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
        <Typography variant="heading-h4">Campsite details</Typography>
        <div className="flex items-start gap-4">
          <FieldGroup
            label="Site number or name"
            htmlFor="site-name"
            required
            className="w-[280px]"
          >
            {(a11y) => (
              <Input id="site-name" defaultValue={campsite.siteNumberOrName} {...a11y} />
            )}
          </FieldGroup>
          <FieldGroup label="Site type" htmlFor="site-type" required className="w-[280px]">
            {(a11y) => (
              <Select defaultValue={campsite.siteType ?? undefined}>
                <SelectTrigger id="site-type" className="w-full" {...a11y}>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tent">Tent</SelectItem>
                  <SelectItem value="rv">RV site</SelectItem>
                  <SelectItem value="cabin">Cabin</SelectItem>
                </SelectContent>
              </Select>
            )}
          </FieldGroup>
        </div>
        <div className="flex items-start gap-4">
          <FieldGroup
            label="Capacity"
            htmlFor="capacity"
            helperText="Campers"
            required
            className="w-[280px]"
          >
            {(a11y) => (
              <Input
                id="capacity"
                type="number"
                defaultValue={campsite.capacity ?? ""}
                {...a11y}
              />
            )}
          </FieldGroup>
          <FieldGroup
            label="Max vehicle length"
            htmlFor="max-vehicle-length"
            error={maxVehicleLengthError?.message}
            required={campsite.siteType === "rv"}
            className="w-[280px]"
          >
            {(a11y) => (
              <Input
                id="max-vehicle-length"
                type="number"
                defaultValue={campsite.maxVehicleLength ?? ""}
                {...a11y}
              />
            )}
          </FieldGroup>
        </div>
      </section>

      <section className="flex w-full flex-col gap-4">
        <Typography variant="heading-h4">Amenities</Typography>
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
        <Typography variant="heading-h4">Availability &amp; Restrictions</Typography>
        <div className="flex items-start gap-4">
          <FieldGroup label="Booking season" htmlFor="booking-season" required className="w-[220px]">
            {(a11y) => (
              <Select defaultValue={campsite.bookingSeason}>
                <SelectTrigger id="booking-season" className="w-full" {...a11y}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={campsite.bookingSeason}>{campsite.bookingSeason}</SelectItem>
                </SelectContent>
              </Select>
            )}
          </FieldGroup>
          <FieldGroup label="Check-in time" htmlFor="check-in" required className="w-[220px]">
            {(a11y) => <Input id="check-in" defaultValue={campsite.checkInTime} {...a11y} />}
          </FieldGroup>
          <FieldGroup label="Check-out time" htmlFor="check-out" required className="w-[220px]">
            {(a11y) => <Input id="check-out" defaultValue={campsite.checkOutTime} {...a11y} />}
          </FieldGroup>
        </div>
        <Typography variant="caption" className="text-muted-foreground">
          * Required
        </Typography>
      </section>
    </>
  )
}

export { CampsiteEditorForm }
