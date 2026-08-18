import { CalendarDays, CameraOff, Clock9, MapPin, Truck, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { campsitePublished } from "@/lib/campsite-data"

function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

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
          <CameraOff className="size-6 text-muted-foreground" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">No photos yet</p>
        </div>

        <div className="flex items-center gap-1">
          <MapPin className="size-3.5 text-muted-foreground" aria-hidden="true" />
          <p className="text-[13px] text-muted-foreground">{campsite.campgroundName}</p>
        </div>

        <div className="flex items-center gap-2">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            Campsite {campsite.siteNumberOrName}
          </h1>
          <Tag>{campsite.siteType === "rv" ? "RV site" : campsite.siteType}</Tag>
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
          <h2 className="text-base font-semibold text-foreground">Amenities</h2>
          <div className="flex gap-2">
            {visibleAmenities.map((amenity) => (
              <Tag key={amenity.id}>{amenity.label}</Tag>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg bg-accent p-4">
          <h2 className="text-base font-semibold text-foreground">Ready to book?</h2>
          <p className="text-[13px] text-muted-foreground">
            This site is available {campsite.bookingSeason}. Select your dates to check
            availability.
          </p>
          <Button variant="default" className="w-fit">
            Check availability
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-base font-semibold text-foreground">Things to know</h2>
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
