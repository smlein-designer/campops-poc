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

## Source of truth

- **Design system**: Figma file `uV8nvy1rALWKVadZL9lP64` ("CampOps — DS")
- **Screens**: Figma file `sjv7WBAZEkmHuExwkeGTdV` ("CampOps — Pages")
- **Component contracts, tokens, typography, and Figma-to-code naming conventions**: `DESIGN_SYSTEM.md`
- **Deviations, judgment calls, and bug fixes made along the way**: `CORRECTIONS.md`

## Build order & workflow

Primitives first (Button, Input, Badge, Select, Checkbox, plus their `FieldGroup`/`CheckboxRow` compositions), then the three CampOps-specific compositions (`ReadinessItem`, `ReadinessPanel`, `PageHeader`), then screen assembly. The full component-by-component contract — variants, states, composition rules — lives in `DESIGN_SYSTEM.md`, not here.

## Screens to assemble

Five screens, matching the object model's `Campsite.publishStatus` states:

1. Campsite editor, missing information (a blocking issue present, Publish disabled)
2. Campsite editor, ready with warnings (blocking issue resolved, one advisory warning remains, Publish enabled)
3. Published success (a real confirmation state: checkmark, summary list, "View public listing" / "Back to campground" actions, not just the same form with a green badge)
4. Published, unpublished blocking edits (was live, a later edit reintroduced a blocking issue)
5. Public preview (the camper-facing read-only view, different visual context entirely, no editor chrome)

## Mock data

One `Campsite` object matching the object model's attributes: `siteNumberOrName`, `siteType`, `capacity`, `maxVehicleLength`, `checkInTime`, `checkOutTime`, `bookingSeason`, `amenities` (with `publiclyVisible` per amenity), `photos`, `publishStatus`. Derive each screen's `ValidationIssue[]` from this same object rather than hardcoding issue lists per screen, that's the actual object-model relationship and it's worth keeping honest in code too. Exact validation-message copy is in `DESIGN_SYSTEM.md`.

## Rules

1. Before implementing anything derived from Figma — a component, a screen, a piece of text — inspect the actual node (`get_design_context`) rather than working from memory or a similar-looking existing pattern. Don't invent props or states that aren't in the contracts; flag what's missing rather than guessing.
2. Prefer reusing an existing component (a primitive, a composition, `Typography`) over hand-rolling styles inline. Check `DESIGN_SYSTEM.md` for the current component/token contract before adding anything new.
3. Consult `DESIGN_SYSTEM.md` before implementing or modifying anything Figma-derived — components, tokens, typography, naming.
4. Consult `CORRECTIONS.md` before re-deciding something already resolved, and keep it updated: log every deviation from the Figma spec, judgment call, or bug fix as you go, this feeds back into the project's corrections log.
