# CampOps — Design System Implementation Contract

This file is the Figma-to-code binding: component contracts, tokens, typography, and naming conventions. It's the companion to `CLAUDE.md` (how to work in this repo) and `CORRECTIONS.md` (the deviation/judgment-call log). Consult this file before implementing or modifying anything Figma-derived.

## Source files

- **Design system**: Figma file `uV8nvy1rALWKVadZL9lP64` ("CampOps — DS"). Style Guide / type ramp lives on page `12:8`. The component pages below are only reachable by direct node ID — this file's top-level page listing doesn't reliably enumerate them (confirmed empirically; see `CORRECTIONS.md`), so don't rely on browsing to discover new ones. Known pages: Badge `59:235`, Checkbox `61:15`, ReadinessItem `20:2`, ReadinessPanel `20:17`, PageHeader `33:120`.
- **Screens**: Figma file `sjv7WBAZEkmHuExwkeGTdV` ("CampOps — Pages"), canvas `6:242` ("Campsite Publishing Improvements").
- **No Figma Code Connect access on this project.** Every mapping below was read manually via `get_design_context`, not synced automatically. Treat this file as a snapshot, not a live binding — re-verify against Figma when told the DS has changed (this has already happened once mid-project; see `CORRECTIONS.md` items 29–32 for what that update touched).

## Component contracts

Build in this order — each one is a real shadcn component with only its *colors* changed, not its structure or behavior:

1. **Button** — variants: `default` (primary), `secondary`, `outline`, `destructive`. No size variants needed.
2. **Input** — no built-in label. Compose a `FieldGroup` wrapper (label + Input + optional helper/error text), reused constantly.
3. **Badge** — shadcn's default variants don't include severity colors. Extend the base Badge with `warning` and `success` variants using `class-variance-authority`, the same pattern shadcn's own docs use for custom colors. Variants: `destructive` (blocking), `warning` (advisory), `success` (ready), `secondary` (earth-tint neutral), `neutral` (muted-gray neutral — added later via a DS update; distinct from `secondary`, see `CORRECTIONS.md` item 29).
4. **Select** — no built-in label, same `FieldGroup` composition pattern as Input.
5. **Checkbox** — no built-in label either. Compose with a sibling label at point of use (a `CheckboxRow` pattern), don't build a label into the primitive itself.

Then the three CampOps-specific compositions, built from the primitives above, not from shadcn (shadcn has no equivalent for these):

6. **ReadinessItem** — composes a `Badge` + message text + affected-field label. Non-interactive.
7. **ReadinessPanel** — composes a list of `ReadinessItem`s. Three states: `incomplete`, `ready-with-warnings`, `ready`. All three share the same white/card background — don't tint the warning state, that was a deliberate reversal in the design pass, tinting it yellow implied "don't proceed" when warnings don't block publishing.
8. **PageHeader** — breadcrumb link (styled with the `link` token, not `primary`) with a back arrow icon, page title, optional status Badge, and 1–2 action Buttons.

## Naming conventions

Match Figma property names to code prop names as documented in the component contracts above — `Variant=Outline` is `variant="outline"`, not `variant="secondary"`.

## Token usage

Every color, spacing, and radius value comes from a CSS variable (`src/index.css`). No hardcoded hex codes or pixel values in component files.

## Typography

Figma is the design source of truth for what each rung looks like; `src/components/ui/typography.tsx` is the implementation source of truth for what actually renders. This section is the *contract* between them — which Figma rung maps to which code variant, and why — not a second copy of the values themselves. No Code Connect means nothing keeps a duplicated value in sync automatically, so exact font/size/weight/line-height live in exactly one place: the component. If you need to check or change a value, read/edit `typography.tsx`, then re-verify it against the DS Style Guide page (`12:8`) directly — don't trust a cached number here, and don't add one.

All ten rungs from the DS Style Guide's type ramp are implemented as `Typography` variants:

| Variant | Default tag | Maps to (DS Style Guide, page `12:8`) |
|---|---|---|
| `display-hero` | `h1` | Display/Hero |
| `display-h2` | `h2` | Display/H2 |
| `display-h3` | `h3` | Display/H3 |
| `heading-h4` | `h4` | Heading/H4 |
| `body-lg` | `p` | Body/Large |
| `body-base` | `p` | Body/Base |
| `body-sm` | `p` | Body/Small |
| `label-md` | `span` | Label/Medium |
| `label-sm` | `span` | Label/Small |
| `caption` | `p` | Caption |

Read each rung's actual computed style off its text node in Figma, not its caption label — captions have been wrong before (see `CORRECTIONS.md` item 20).

**The Figma rung name maps directly to the HTML tag — that's the entire point of this contract.** A "Display/H2" renders as `<h2>`. A "Heading/H4" renders as `<h4>`. Use each variant's default tag as-is; don't pass `as` to override it for a document-outline opinion of your own (e.g. forcing a single `<h1>` per page) — doing that silently breaks the Figma-to-code binding this table exists to enforce, since Figma's own naming is the only place that mapping is recorded (Figma's dev-mode output never emits semantic tags — every text node exports as `<p>` — so the rung name is the one signal available for what tag it should become). This was gotten wrong once already: `PageHeader`'s title (`display-h2`) and `ReadinessPanel`'s heading (`heading-h4`) were both overridden via `as` to satisfy an invented single-`<h1>` rule nobody asked for — see `CORRECTIONS.md` item 41. If a screen's outline genuinely needs an exception, that's a conversation to have explicitly with whoever owns the Figma file, not a call to make unilaterally in code.

**Resolved DS inconsistency (see `CORRECTIONS.md` item 42):** the Style Guide's `Heading/H4` rung was Fraunces while several real screen headings sharing its exact size/weight/line-height ("Campsite details," "Amenities," "Availability & Restrictions" on the editor screens; "Amenities," "Things to know" on the public preview; the Published Success confirmation heading) were rendered in Public Sans instead — a real disagreement inside the Figma file, not a code bug, so it wasn't "fixed" by picking a side in code. The DS file has since been corrected to Fraunces across all of them; all now use `Typography variant="heading-h4"`. If a similar mismatch turns up again, flag it back to whoever owns the Figma file rather than resolving it unilaterally in code.

Every new heading or body text pulled from Figma should get its line-height read from the actual node (`get_design_context`), not assumed from Tailwind's default pairing for that font size — that mismatch (Tailwind's default `text-lg` line-height vs. the DS's explicit 135%) was the specific bug that prompted this section.

All text should use the `Typography` component rather than hand-written `text-*`/`font-*`/`leading-*` combinations, so every piece of text is traceable to a verified DS rung instead of reconstructed from memory.

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
