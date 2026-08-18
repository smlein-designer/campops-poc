# CampOps — Build Brief

You're building a production-shaped React vertical slice of CampOps, a campground-operator admin tool. This is a portfolio POC demonstrating a Figma-to-code handoff with minimal translation loss. The design system already exists in Figma, built on the real shadcn/ui kit, rebound to CampOps's own tokens. Your job is to build the code side to match, using the *real* shadcn/ui components, not approximations.

## Stack

- Vite + React + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- shadcn/ui (Radix UI underneath), installed via the shadcn CLI, not hand-built
- No backend. Mock data only, isolated in its own file so it's easy to swap for real API calls later.

## Setup, in order

1. `npm create vite@latest campops-poc -- --template react-ts`
2. Install and configure Tailwind v4 for Vite (`@tailwindcss/vite` plugin, not the old PostCSS setup)
3. Run `npx shadcn@latest init` to scaffold the shadcn structure (this creates `components.json` and the default CSS variable block)
4. Run `npx shadcn@latest add button input badge select checkbox label` to pull in the real component source files
5. **Replace the generated CSS variables** in your global stylesheet with the exact block in `globals.css` below. This is the whole point, don't let shadcn's default gray/black theme survive, replace it with CampOps's real values immediately after scaffolding, before building anything else.
6. Set up the font imports: Fraunces (display) and Public Sans (body) from Google Fonts, or self-hosted if you prefer.

## Component build order

Build in this order, each one is a real shadcn component with only its *colors* changed, not its structure or behavior:

1. **Button** — variants: `default` (primary), `secondary`, `outline`, `destructive`. No size variants needed.
2. **Input** — no built-in label. Compose a `FieldGroup` wrapper (label + Input + optional helper/error text) as you build it, you'll reuse this constantly.
3. **Badge** — shadcn's default variants don't include severity colors. Extend the base Badge with `warning` and `success` variants using `class-variance-authority`, the same pattern shadcn's own docs use for custom colors. Four variants total: `destructive` (blocking), `warning` (advisory), `success` (ready), `secondary` (neutral).
4. **Select** — no built-in label, same `FieldGroup` composition pattern as Input.
5. **Checkbox** — no built-in label either. Compose with a sibling label at point of use (a `CheckboxRow` pattern), don't build a label into the primitive itself.

Then the three CampOps-specific compositions, built from the primitives above, not from shadcn (shadcn has no equivalent for these):

6. **ReadinessItem** — composes a `Badge` + message text + affected-field label. Non-interactive.
7. **ReadinessPanel** — composes a list of `ReadinessItem`s. Three states: `incomplete`, `ready-with-warnings`, `ready`. All three share the same white/card background, don't tint the warning state, that was a deliberate reversal in the design pass, tinting it yellow implied "don't proceed" when warnings don't block publishing.
8. **PageHeader** — breadcrumb link (styled with the `link` token, not `primary`) with a back arrow icon, page title, optional status Badge, and 1-2 action Buttons.

## Screens to assemble

Five screens, matching the object model's Campsite.publishStatus states:

1. Campsite editor, missing information (a blocking issue present, Publish disabled)
2. Campsite editor, ready with warnings (blocking issue resolved, one advisory warning remains, Publish enabled)
3. Published success (a real confirmation state: checkmark, summary list, "View public listing" / "Back to campground" actions, not just the same form with a green badge)
4. Published, unpublished blocking edits (was live, a later edit reintroduced a blocking issue)
5. Public preview (the camper-facing read-only view, different visual context entirely, no editor chrome)

## Mock data

One `Campsite` object matching the object model's attributes: `siteNumberOrName`, `siteType`, `capacity`, `maxVehicleLength`, `checkInTime`, `checkOutTime`, `bookingSeason`, `amenities` (with `publiclyVisible` per amenity), `photos`, `publishStatus`. Derive each screen's `ValidationIssue[]` from this same object rather than hardcoding issue lists per screen, that's the actual object-model relationship and it's worth keeping honest in code too.

## Validation issues, exact copy

Pull these verbatim from the readiness table, don't paraphrase:

| Field | Severity | Message |
|---|---|---|
| siteNumberOrName | Blocking | Add a site number or name so operators and campers can identify this site. |
| siteType | Blocking | Select a site type (tent, RV, cabin, etc.) so campers know what to expect. |
| capacity | Blocking | Add a capacity so campers know how many people or vehicles this site fits. |
| maxVehicleLength (RV only) | Blocking | Add a max vehicle length so RV campers know whether this site fits their vehicle. |
| photos | Warning | Add photos when available. Listings with photos are easier for campers to trust. |
| checkInTime | Warning | Add a check-in time so campers know when they can arrive. |
| checkOutTime | Warning | Add a check-out time so campers know when they need to leave. |

## Rules

1. Every color, spacing, and radius value comes from a CSS variable. No hardcoded hex codes or pixel values in component files.
2. Match Figma property names to code prop names as documented in the component contracts, `Variant=Outline` is `variant="outline"`, not `variant="secondary"`.
3. Don't invent props or states that aren't in the contracts. If something's missing, flag it rather than guessing.
4. Keep a running note of anywhere you had to deviate from the Figma spec or make a judgment call, this feeds back into the project's corrections log.
