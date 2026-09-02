# Milton redesign — design direction

## Three initial stylistic approaches

### Theme Name: Precision Workshop
Very Brief Intro: A bright editorial-industrial system that treats fittings, threads, and flow diagrams as premium objects. Warm paper, cobalt markings, and hard-edged typography make technical confidence feel tangible.
Probability: 0.07

### Theme Name: Fluid Interface
Very Brief Intro: A dark, cinematic interface built around flowing lines, pressure maps, and luminous product silhouettes. It makes Milton feel like a control room for modern building systems.
Probability: 0.03

### Theme Name: Material Atlas
Very Brief Intro: A tactile catalog experience using steel, copper, rubber, and painted surfaces as the organizing language. Large specimen photography and quiet navigation make the product range feel collectible and legible.
Probability: 0.08

## Selected approach: Precision Workshop

### Design Movement
Contemporary Swiss industrial editorial with references to technical manuals, product specimen sheets, and modernist wayfinding systems.

### Core Principles
1. **Make the material legible.** Use cropped, high-contrast product imagery and crisp linework so brass, steel, rubber, and thread geometry feel specific.
2. **Turn navigation into instrumentation.** The interface should feel like a calm control surface: index numbers, status labels, categories, filters, and measurable facts.
3. **Use asymmetry with restraint.** Anchor the page with offset columns, oversized editorial type, and horizontal rails rather than centered marketing blocks.
4. **Keep the system human.** Serbian copy stays direct, practical, and confident; interactions provide clear feedback without theatrics.

### Color Philosophy
The base is an almost-white workshop paper (#F2F0EA) and graphite ink (#172126), creating the atmosphere of a premium technical sheet. Cobalt blue (#1646D8) is the operational signal for links, active states, and flow paths. Oxide orange (#C85D2A) is reserved for product emphasis and calls to action, like a painted valve handle on a steel assembly. The palette feels engineered rather than corporate and keeps the original Milton orange/green spirit present without copying the old site.

### Layout Paradigm
A vertical index rail establishes orientation on desktop while content moves through full-bleed horizontal bands. The hero uses a split composition: a narrow technical note column, an offset headline column, and a large product specimen panel. Product browsing behaves like a catalog wall with filter chips, a horizontal scroll rail, and an expandable detail drawer.

### Signature Elements
- **Flow-line diagrams:** thin cobalt paths and numbered nodes that connect sections and products.
- **Specimen labels:** tiny uppercase labels, SKU-like codes, and measured metadata placed beside product visuals.
- **Workshop cursor moments:** hover states add a compact orange marker, shift a line drawing, or reveal a short technical annotation.

### Interaction Philosophy
Interactions should feel like handling a well-made instrument: immediate, precise, and quietly tactile. Hovering a product lifts it by a few pixels and reveals a technical tag; clicking a category updates the catalog without a page reload; the quote/contact panel slides in from the right with focus management; navigation compresses into a labeled drawer on mobile.

### Animation
Use 160–240ms cubic-bezier transitions for hover, filter, and drawer states. Stagger initial section reveals by 45ms, using opacity and translateY only. Product rails should glide horizontally with momentum but never auto-scroll. The hero flow-line can draw in once on load, then remain static. Respect prefers-reduced-motion and make all functional state changes understandable without animation.

### Typography System
Display: **Space Grotesk** 600–700 for assertive headlines and numeric facts. Body: **DM Sans** 400–600 for Serbian copy and UI labels. Use tight display tracking for large headings, generous uppercase tracking for metadata, and a tabular numeric style for metrics.

### Brand Essence
Milton equips installers and distributors with the parts that keep buildings moving — a more legible, more modern buying experience for serious technical work.
Personality: exacting, grounded, forward-looking.

### Brand Voice
Headlines are short, active, and concrete. CTAs sound like confident next steps, never generic promises. Microcopy explains what changes and why.

Example lines:
- “Spoj koji drži sistem.”
- “Pronađite deo po meri, materijalu ili nameni.”

### Wordmark & Logo
Keep the existing Milton logo unchanged as the primary brand mark, using it as a familiar anchor inside the new system. The surrounding interface should be redesigned so the logo feels intentional rather than inherited.

### Signature Brand Color
**Milton Cobalt — #1646D8**, the ownable operational blue that marks movement, availability, and technical confidence.
