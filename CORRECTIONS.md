# Corrections & judgment calls log

Running note of anywhere the build deviated from the brief in `CLAUDE.md`, or required a judgment call. Per the brief: "this feeds back into the project's corrections log."

## Setup phase

1. **Scaffolded in place, not into a nested `campops-poc/` folder.** The brief's example command (`npm create vite@latest campops-poc -- --template react-ts`) names a project folder, but this repo's root (`CampOps/`) was already the intended project root (empty aside from `CLAUDE.md` and `reference/`). Scaffolded directly into the current directory instead of creating a redundant nested folder. `package.json`'s `name` field is set to `campops-poc`.

2. **shadcn init wrote generated theme into the wrong file.** `npx shadcn@latest init` auto-detects the project's Tailwind CSS entry point by scanning for a file that already contains `@import "tailwindcss"`. Because `reference/globals.css` (the spec file) already had that line, shadcn's CLI mistook it for the live stylesheet and merged its default gray/black theme into it, instead of `src/index.css`. Fixed by:
   - Restoring `reference/globals.css` to its original, untouched content.
   - Correcting `components.json`'s `tailwind.css` path from `reference/globals.css` to `src/index.css`.
   - Writing the CampOps token block directly into `src/index.css`.

3. **Swapped the order of the two `@import` statements in `src/index.css`.** The brief's exact block has `@import "tailwindcss";` before the Google Fonts `@import url(...)`. In Tailwind v4, `@import "tailwindcss"` expands into `@layer` statements, which pushes the font import into a position after non-import rules — invalid per the CSS spec (`@import` must precede all other rules). Tailwind's build tooling silently drops the font `@import` when ordered this way, so Fraunces/Public Sans never loaded. Fixed by putting the font import first. Verified empirically: fonts.googleapis.com URL is present in compiled output only with this order. `reference/globals.css` was left in its original order since it's the supplied spec artifact, not build output — this note documents the actual applied fix.

4. **Removed unused packages.** shadcn init's default Nova preset installed `@fontsource-variable/geist` and `tw-animate-css`, neither of which the CampOps token block uses (fonts come from the Google Fonts CDN import). Uninstalled both to keep the dependency list honest.

5. **Removed deprecated `baseUrl` from `tsconfig.json`/`tsconfig.app.json`.** TypeScript in this scaffold flagged `baseUrl` as deprecated (TS5101). The `@/*` path alias shadcn needs still resolves correctly with just `paths` and no `baseUrl` under `moduleResolution: "bundler"`.

6. **`vite.config.ts` uses `import.meta.dirname` instead of `__dirname`** for the `@` alias — Vite flagged `__dirname` as unsupported by its native config loader going forward.

7. **Fixed stale `<title>scaffold-tmp</title>`** in `index.html`, a leftover from the temporary folder name used during scaffolding, changed to `CampOps`.

## Component build phase

8. **Badge trimmed to exactly the four contract variants** (`secondary`, `destructive`, `warning`, `success`) via the same `cva` call shadcn's own Badge uses — not a separate one-off component. Real shadcn Badge ships `default`/`outline`/`ghost`/`link` too, but the brief is explicit ("Four variants total") and none of those four map to a severity/status meaning this design system needs, so they were dropped rather than left as unused dead variants. `defaultVariants` set to `secondary` (the neutral state) since there's no `default` variant anymore.

9. **Badge's `destructive` background switched from `bg-destructive/10` (shadcn's default opacity trick) to `bg-destructive-soft`**, matching the dedicated `--destructive-soft`/`--warning-soft`/`--success-soft` tokens the brief already defines. All three status variants now use the same soft-background pattern consistently.

10. **Badge's base radius changed from `rounded-4xl` to `rounded-full`.** shadcn's default Badge relies on a `--radius-4xl` theme key that only exists in shadcn's own generated Nova preset — the brief's exact token block doesn't define a radius scale beyond `--radius`/`--radius-sm`/`--radius-full`, so `rounded-4xl` had no value to resolve and badges rendered as sharp rectangles instead of pills. `rounded-full` is a static Tailwind utility (not theme-dependent) and matches the pill shape the design clearly intends. Button and Select still reference the same missing `--radius-md` key in their unused `xs`/`sm`/`icon-sm` size variants — left alone since the brief says CampOps doesn't use Button/Select size variants, so those code paths are inert, but flagging here in case that changes.

11. **FieldGroup and CheckboxRow don't auto-wire `id`/`aria-describedby` onto their children.** Considered cloning the child element to inject those automatically, but Input (a real DOM node) and Select (a compound Radix tree whose actual focusable element is `SelectTrigger`, several levels below the `Select` root) can't be handled the same way by a single `cloneElement` call. Chose the simpler, explicit pattern instead: the caller passes `id={htmlFor}` directly to the inner control. Less magic, easier to reason about, and works identically for both Input and Select.

12. **Removed the default Vite/React template's leftover assets** (`src/App.css`, `src/assets/*`, `public/icons.svg`) once `App.tsx` was rewritten and no longer referenced them. `public/favicon.svg` was kept since `index.html` still points to it and there's no CampOps-branded favicon yet.

13. **Badge status icons added** (`destructive` → `AlertCircle`, `warning` → `TriangleAlert`, `success` → `CircleCheck`, `secondary` → none), sourced from the spec in chat since this detail had fallen out of `CLAUDE.md`. Checked the installed `lucide-react` version (1.31.0) directly against its export list rather than assuming names hadn't shifted — confirmed `AlertCircle`/`TriangleAlert`/`CircleCheck` are current, not deprecated, aliases. Icons use no explicit color class so they inherit `currentColor` from each variant's existing text-color class — same token, no duplication. Sized at `size-3.5` (14px, the bottom of the given 14–16px range) since Badge's own text sits at `text-xs` (12px) and the tighter end reads better against it. This also meant changing the base badge SVG rule from the shadcn default `size-3!` to `size-3.5!`, since that rule now governs the icon that's core to the component rather than an optional decorative one.

**Radius fix follow-up:** confirmed — item 10 above hardcoded `rounded-full` directly on Badge's base class. No `--radius-4xl` (or any new token) was added to either `src/index.css` or `reference/globals.css`, so there's no drift between the two to reconcile.
