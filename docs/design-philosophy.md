# Aar Craft design philosophy

Status: proposed principles with interactive documentation prototypes. Selection marks and compositions are experiments, not public CSS contracts.

**Make possibilities visible. Make change understandable.**

The mage influence is expressed through discovery, intent, and transformation. Everyday applications use familiar labels, quiet surfaces, and honest feedback. Fantasy ornament is optional and never required to understand a control.

## Principles

1. Purpose leads. The main task occupies the strongest region. Supporting tools stay nearby and are grouped by purpose.
2. Reveal possibilities. Relevant actions become apparent in context; essential actions remain discoverable without hover or selection.
3. States tell the truth. Selection, pending, success, and failure convey different facts. A timeout does not establish a failed payment. Status text accompanies color.
4. Change stays connected. A short transition explains a state change or relationship. Motion must not delay access, move focus unexpectedly, or become the only signal. Reduced motion retains the same meaning.
5. Adapt without losing context. Container space determines composition. Preserve task state and reachable actions as supporting regions move below the work.

## Shared visual grammar

- Typography, alignment, and spacing establish hierarchy before borders or boxes.
- Accent identifies action or selection; semantic success and danger roles remain separate.
- Selection uses a thin frame and quiet surface change in these prototypes. Keyboard focus uses a distinct outer outline. Persistent selected state must also be exposed semantically. Component-specific markers can be explored where they help recognition; no decorative marker is required across every component.
- Surfaces communicate working regions rather than decorating every item.
- Themes change semantic roles together, maintaining readable contrast. Density is explicit; coarse input keeps generous targets.

## Comparison laboratory

Open `#/guides/philosophy` in the documentation application. Dashboard account selection, an asynchronous checkout state, and a contextual artwork inspector use the same tokens and experimental anatomy. Checkout progression is deliberately controlled by a labeled simulation button; it does not pretend to contact a payment API.

The expressive study at `#/guides/magic-art` explores a compass, etched geometry, contextual tools, and a resolving seal. Component previews now use a shared consumer stylesheet (`apps/docs/src/example-setup.css`) with parchment/night surfaces, violet/jade accents, asymmetric controls, arched work regions, and short reveals. It is included in the copyable examples. These changes do not alter the published package styles. The Aar Craft package laboratory remains available as a baseline for its current API and custom-theme contract.

Compare narrow and wide regions, light/dark themes, two accent palettes, keyboard focus, reduced motion, and persistent selection after resize. Review whether the accent frame is useful in all three tasks before moving any classes into the public package. The creative example is an interaction study, not the Yuwbrndr redesign.

The existing [adaptive layout philosophy](adaptive-layout.md) describes Focus, Split, Studio, Wide, and future Spatial compositions. These principles complement it; a viewport breakpoint does not provide immersive VR support.
