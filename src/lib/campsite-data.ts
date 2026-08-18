export type SiteType = "tent" | "rv" | "cabin"

export interface Amenity {
  id: string
  label: string
  publiclyVisible: boolean
}

export interface Campsite {
  siteNumberOrName: string
  siteType: SiteType | null
  capacity: number | null
  maxVehicleLength: number | null
  checkInTime: string
  checkOutTime: string
  bookingSeason: string
  amenities: Amenity[]
  photos: string[]
  publishStatus: "draft" | "published"
  campgroundName: string
}

export type ValidationSeverity = "blocking" | "warning"

export interface ValidationIssue {
  field: string
  severity: ValidationSeverity
  message: string
}

export function getValidationIssues(campsite: Campsite): ValidationIssue[] {
  const issues: ValidationIssue[] = []

  if (!campsite.siteNumberOrName) {
    issues.push({
      field: "Site number or name",
      severity: "blocking",
      message:
        "Add a site number or name so operators and campers can identify this site.",
    })
  }
  if (!campsite.siteType) {
    issues.push({
      field: "Site type",
      severity: "blocking",
      message:
        "Select a site type (tent, RV, cabin, etc.) so campers know what to expect.",
    })
  }
  if (campsite.capacity == null) {
    issues.push({
      field: "Capacity",
      severity: "blocking",
      message:
        "Add a capacity so campers know how many people or vehicles this site fits.",
    })
  }
  if (campsite.siteType === "rv" && campsite.maxVehicleLength == null) {
    issues.push({
      field: "Max vehicle length",
      severity: "blocking",
      message:
        "Add a max vehicle length so RV campers know whether this site fits their vehicle.",
    })
  }
  if (campsite.photos.length === 0) {
    issues.push({
      field: "Photos",
      severity: "warning",
      message:
        "Add photos when available. Listings with photos are easier for campers to trust.",
    })
  }
  if (!campsite.checkInTime) {
    issues.push({
      field: "Check-in time",
      severity: "warning",
      message: "Add a check-in time so campers know when they can arrive.",
    })
  }
  if (!campsite.checkOutTime) {
    issues.push({
      field: "Check-out time",
      severity: "warning",
      message: "Add a check-out time so campers know when they need to leave.",
    })
  }

  return issues
}

export type ReadinessStatus = "incomplete" | "ready-with-warnings" | "ready"

export function getReadinessStatus(issues: ValidationIssue[]): ReadinessStatus {
  if (issues.some((issue) => issue.severity === "blocking")) return "incomplete"
  if (issues.length > 0) return "ready-with-warnings"
  return "ready"
}

const amenities: Amenity[] = [
  { id: "fire-pit", label: "Fire pit", publiclyVisible: true },
  { id: "picnic-table", label: "Picnic table", publiclyVisible: true },
  { id: "wifi", label: "Wifi", publiclyVisible: false },
  { id: "showers", label: "Showers", publiclyVisible: false },
  { id: "water-hookup", label: "Water hookup", publiclyVisible: false },
  { id: "electric-hookup", label: "Electric hookup", publiclyVisible: false },
]

export const campsiteMissingInfo: Campsite = {
  siteNumberOrName: "14",
  siteType: "rv",
  capacity: 6,
  maxVehicleLength: null,
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  bookingSeason: "May – October",
  amenities,
  photos: [],
  publishStatus: "draft",
  campgroundName: "Pinecrest Campground",
}

export const campsiteReadyWithWarnings: Campsite = {
  ...campsiteMissingInfo,
  maxVehicleLength: 32,
}

export const campsitePublished: Campsite = {
  ...campsiteReadyWithWarnings,
  publishStatus: "published",
}

export const campsitePublishedWithBlockingEdits: Campsite = {
  ...campsitePublished,
  maxVehicleLength: null,
}
