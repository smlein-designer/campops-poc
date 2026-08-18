import { CircleCheck } from "lucide-react"

import { PageHeader } from "@/components/composed/page-header"
import { Button } from "@/components/ui/button"
import { campsitePublished } from "@/lib/campsite-data"

const summaryRows = (campsite: typeof campsitePublished) => [
  { label: "Site type", value: campsite.siteType === "rv" ? "RV site" : campsite.siteType },
  { label: "Capacity", value: `${campsite.capacity} campers` },
  { label: "Max vehicle length", value: `${campsite.maxVehicleLength} feet` },
  { label: "Booking season", value: campsite.bookingSeason },
  { label: "Check-in / Check-out", value: `${campsite.checkInTime} / ${campsite.checkOutTime}` },
  {
    label: "Amenities",
    value: campsite.amenities
      .filter((amenity) => amenity.publiclyVisible)
      .map((amenity) => amenity.label)
      .join(", "),
  },
]

function PublishedSuccess() {
  const campsite = campsitePublished

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
      <PageHeader
        breadcrumbLabel={campsite.campgroundName}
        title={`Campsite ${campsite.siteNumberOrName}`}
        status={{ label: "Published", variant: "success" }}
        actions={<Button variant="outline">Edit campsite</Button>}
      />

      <div className="flex w-full flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-2">
          <CircleCheck className="size-[22px] text-success" aria-hidden="true" />
          <h1 className="text-xl font-semibold text-foreground">
            Campsite published successfully
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Campsite {campsite.siteNumberOrName} is now live on {campsite.campgroundName}
          &rsquo;s public listing. Campers can find and book this site immediately.
        </p>
        <div className="flex flex-col gap-2 text-sm">
          {summaryRows(campsite).map((row) => (
            <div key={row.label} className="flex w-full gap-4">
              <p className="w-[180px] shrink-0 text-muted-foreground">{row.label}</p>
              <p className="font-medium text-foreground">{row.value}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="default">View public listing</Button>
          <Button variant="outline">Back to campground</Button>
        </div>
      </div>
    </div>
  )
}

export default PublishedSuccess
