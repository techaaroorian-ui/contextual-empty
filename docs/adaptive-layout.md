# Aar Loom adaptive design and Yuwbrndr redesign

Status: proposed design direction and implementation sequence. These modes are not yet implemented or validated. Yuwbrndr provides task requirements; its existing appearance and panel arrangement are not the design reference.

## Philosophy: the work comes first

The main task occupies the strongest visual region. Tools stay nearby, grouped by purpose, and appear when relevant. A panel explains a relationship; it should not be a box around every control. Primary color marks the next consequential action and selected state, rather than decorating every surface.

Use a restrained surface hierarchy, readable typography, consistent spacing, and stable control geometry. Distinctive identity should come from composition, typography, selection treatment, and interaction consistency. Motion acknowledges state changes; it does not delay access to controls.

Progressive disclosure means exposing detail when it is needed. In Yuwbrndr, browsing templates, editing code, adjusting document settings, and exporting should each have a clear working area. Keeping every tool permanently visible competes with the canvas.

## Derive anatomy, keep behavior boundaries clear

| Yuwbrndr evidence | Reusable Aar Loom candidate | Responsibility outside CSS |
| --- | --- | --- |
| Header and canvas controls | Toolbar, action group, icon button, segmented control | Commands, expanded state, keyboard interaction |
| Sidebar and editor dock | Panel, panel heading, disclosure, resize handle styling | Dock state, focus, resizing and persistence |
| Aspect preset and theme menus | Selectable option, swatch, menu surface | Selection, navigation, dismissal |
| Upload assets and examples | Collection grid, thumbnail card, drop-zone states | Upload validation, drag/drop, file storage |
| Export and prompt forms | Field, help/error text, choice group, progress and feedback | Validation, asynchronous operations |
| About, fonts, stickers and capability dialogs | Dialog anatomy, sheet, overlay surface | Focus containment, Escape, focus restoration, modality |
| Slide strip | Selectable thumbnail, ordered collection, contextual actions | Slide order, duplication, navigation |
| Empty canvas and failures | Contextual Empty integration, notice, status | Message content and recovery actions |
| Code and artwork previews | Workspace frame, status bar | Code editor, rendering, zoom/pan, export |

CSS provides appearance and layout contracts. Native HTML or application code provides behavior. A styled row is not automatically an accessible tabs or menu widget. Contextual Empty remains its own React package. Code parsing, slide models, generated artwork, export and AI prompting remain Yuwbrndr features.

## Layout vocabulary

Start with reusable compositions: stack (vertical rhythm), cluster (wrapping peers), grid (collections), split (two working regions), frame (bounded content), and workspace (command area, main work, contextual tools, status). Use logical properties and minimum-size constraints so long labels and translated text work naturally.

The application shell chooses which regions are present. Components adapt inside those regions using container queries. Do not make a CSS breakpoint silently remove the only way to reach an action. Preserve task state when presentation changes; keyboard focus must remain reachable.

## Adapt to space and input, not device names

| Mode | Composition | Yuwbrndr application |
| --- | --- | --- |
| Focus | One main region; labeled task switcher; tools open as a sheet or dedicated view | Mobile portrait, narrow windows: switch between canvas and code; assets and document settings open on demand |
| Split | Main region plus one supporting region | Tablet or medium window: canvas plus code OR inspector; asset browser temporarily replaces the supporting panel |
| Studio | Main region plus up to two supporting regions | Desktop: narrow tool navigation, canvas, active inspector or code dock; user can collapse either side |
| Wide | Bounded supporting panels; additional room goes to the work | Ultrawide: larger canvas or explicit comparison view; do not stretch forms indefinitely |
| Spatial | Stable task panels around a central work surface | Future XR adapter: explicit panel placement, selection feedback, and controller/hand alternatives |

Initial layout experiments should use approximately 40rem and 70rem width transitions, then revise them based on real minimum panel and canvas sizes. These are hypotheses, not fixed phone/tablet classifications. Low-height landscape layouts need a shorter command area and fewer simultaneous panels even when width is large. Container width, available height, zoom, text size, and input capabilities all affect the result.

Separate three geometries: application window, working viewport, and authored document. A 9:16 artwork does not imply a portrait application layout. Keep artwork dimensions and export resolution stable while the workspace reorganizes. Existing preview isolation must survive the redesign.

Touch and mixed-input environments need generous targets and actions that do not rely on hover. Compact density is an explicit user preference for suitable contexts, not an automatic consequence of a wide screen. Respect reduced motion and ensure state remains clear without animation.

## Yuwbrndr target composition

- Command bar: product/document context, document mode, share, and one primary Export action. Move output dimensions and artwork palette into Document settings; move zoom/fit beside the canvas.
- Tool navigation: Assets, Templates, Document, and Code, with text labels where space permits. Keep selection distinct from action emphasis.
- Work surface: canvas-first preview, quiet boundary, contextual empty state, and a compact view-control area.
- Supporting panel: content for the selected task. Show code and inspector together only when usable work space remains.
- Sequence area: slides when the document uses slides; use a reachable sequence view on narrow screens instead of an unusably compressed strip.
- Feedback: persistent inline recovery for errors; announced short status for successful actions. Important errors must not disappear on a timer.

The redesign can change visual hierarchy, navigation, surfaces, and panel placement. Preserve document content, imports, sharing, exporting, and authored artwork semantics. This is a product redesign rather than recoloring the old utility-based layout.

## Spatial scope

A browser page in a headset remains a 2D interface and can use the adaptive CSS layouts. Immersive VR requires session handling, a spatial renderer, input mapping, and device testing. A large media-query breakpoint cannot enable it.

Share semantic color roles, type roles, spacing relationships, component states, and task structure with an optional future XR adapter. Add spatial-specific sizing, distance, legibility, stable placement, and depth rules only after headset experiments. CSS pixel hit areas are not a validated angular target size. Avoid forced camera movement and hover-only commands; provide explicit open/close and non-drag alternatives. Do not advertise VR support until the adapter has been tested on named devices and browsers.

WebXR DOM overlays offer interactive 2D content in supported immersive sessions; support must be negotiated rather than assumed. They do not replace the spatial renderer or guarantee arbitrary HTML panels throughout a VR scene.

## Build sequence and evidence

1. Create a docs layout laboratory with Focus, Split, Studio, Wide, and low-height examples using the same task content. Compare light/dark, custom palettes, long labels, touch and keyboard. Review composition before standardizing CSS APIs.
2. Add the proven stack/cluster/grid/split/frame compositions to Aar Loom with a changeset. Define public layout and token contracts; no Yuwbrndr-specific selectors in the package.
3. Rebuild Yuwbrndr command bar and workspace shell around the new layout. Preserve actions and artwork isolation while changing navigation and panel composition.
4. Migrate fields, collections, menus, dialogs, notices, and sequence controls. Remove the frozen legacy interface CSS after its final consumer migrates.
5. Validate 320px narrow windows, phone portrait/landscape, tablet portrait/landscape, 1280px desktop, 2560px ultrawide, short windows, and 200% zoom. Check focus after resize, sheet dismissal, long labels, input ergonomics, reduced motion, and unchanged export dimensions. These are test cases, not device guarantees.
6. Prototype a separate spatial adapter using the validated task model. Test headset legibility, selection, panel dismissal, and input alternatives before specifying a public XR contract.

## Technical references

- [MDN: container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries)
- [MDN: media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries)
- [W3C: WebXR Device API](https://www.w3.org/TR/webxr/)
- [W3C: WebXR DOM Overlays Module](https://www.w3.org/TR/webxr-dom-overlays-1/)
