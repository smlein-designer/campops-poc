import { CalendarDays, CameraOff, Clock9, MapPin, Truck, Users } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { campsitePublished } from "@/lib/campsite-data"

function PublicPreview() {
  const campsite = campsitePublished
  const visibleAmenities = campsite.amenities.filter((amenity) => amenity.publiclyVisible)

  const stats = [
    { icon: Users, label: "Capacity", value: `Up to ${campsite.capacity} campers` },
    { icon: Truck, label: "Max vehicle", value: `${campsite.maxVehicleLength} ft` },
    { icon: CalendarDays, label: "Season", value: campsite.bookingSeason.replace("October", "Oct") },
    { icon: Clock9, label: "Check-in", value: campsite.checkInTime },
  ]

  return (
    <div className="flex w-full flex-col items-center p-6">
      <div className="flex w-full max-w-[560px] flex-col gap-4 rounded-lg border border-border bg-card p-6">
        <div className="flex h-[180px] w-full flex-col items-center justify-center gap-2 rounded-sm bg-accent">
          <CameraOff className="size-6 text-muted-midground" aria-hidden="true" />
          <p className="text-sm text-muted-midground">No photos yet</p>
        </div>

        <div className="flex items-center gap-1">
          <MapPin className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <p className="text-[13px] text-muted-foreground">{campsite.campgroundName}</p>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl leading-normal font-semibold text-foreground">
            Campsite {campsite.siteNumberOrName}
          </h1>
          <Badge variant="neutral">{campsite.siteType === "rv" ? "RV site" : campsite.siteType}</Badge>
        </div>

        <div className="flex gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <stat.icon className="size-4 text-foreground" aria-hidden="true" />
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-sm font-medium text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="heading-h4">Amenities</Typography>
          <div className="flex gap-2">
            {visibleAmenities.map((amenity) => (
              <Badge key={amenity.id} variant="neutral">
                {amenity.label}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-accent p-4">
          <Typography variant="label-md">Ready to book?</Typography>
          <p className="text-[13px] text-muted-midground">
            This site is available {campsite.bookingSeason}. Select your dates to check
            availability.
          </p>
          <Button variant="default" className="w-fit">
            Check availability
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="heading-h4">Things to know</Typography>
          <div className="flex flex-col gap-1 text-[13px] text-muted-foreground">
            <p>
              • Check-in at {campsite.checkInTime}, check-out by {campsite.checkOutTime}
            </p>
            <p>• Maximum vehicle length: {campsite.maxVehicleLength} feet</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PublicPreview
