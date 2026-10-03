# Learning Aar Craft while building it

## 1. Semantic tokens

A raw token names a value; a semantic token names its purpose. `green-700` is a value; `primary` is a role. Components use roles so consumers can change values without redesigning every component.

Try Forest and Iris in the lab. Observe that reading order stays the same. Next, choose Your colors and change primary and its foreground separately.

## 2. Hierarchy

Hierarchy is a ranking of attention. Large headings establish context, restrained supporting text explains it, and one strong action offers a next step. Color is only one tool: size, weight, position, and spacing also matter.

Look at the workbench without reading every word. Locate the main action. Then compare the quiet filter actions with New project.

## 3. Surfaces

Grouping should explain relationships. Our background is the workspace, surfaces contain related content, and borders separate groups. Future overlays may use elevation to explain overlap; ordinary panels do not need it.

Switch between light and dark. A dark theme needs a new surface hierarchy, not merely inverted hex colors.

## 4. Rhythm and density

Spacing encodes relationships. Related label/input pairs sit close; unrelated sections have larger gaps. Density is a separate control that reduces control height and panel padding. Compact controls require additional review for touch-oriented products.

Switch density and verify that text remains readable. The first version intentionally changes only controls and panel padding, rather than compressing all composition spacing.

## 5. States

Hover, keyboard focus, pressed, selected, disabled, and invalid each answer a different question. Use real interactions in the lab; screenshots alone cannot validate state transitions or keyboard behavior.

Tab through Components. The outline should show your current location. Click Select to observe a persistent selected state. The invalid email pairs a border with an explanation.

## 6. Visual testing

Compare theme pairs side by side. Test narrow viewports, long content, browser zoom, and reduced motion. Keep screenshot snapshots of reviewed states; a baseline records an approved decision, so do not approve screenshots automatically merely because the build passes.

The initial browser smoke check covers theme switching, custom color propagation, compact control sizing, keyboard focus, system dark preference, nested theme isolation, and horizontal overflow. It does not certify accessibility or Tailwind compatibility.

## 7. Motion and responsiveness

Responsiveness includes how quickly an interface acknowledges an action. A 140 ms transition gives controls quick feedback; a 220 ms entrance lets new content settle. Easing controls how speed changes: our curve starts promptly and slows toward the final position.

Hover lifts a button by 1 px, pressing compresses it slightly, and keyboard focus remains immediately visible. New content can opt into a short fade and 6 px movement with `aar-enter`. Translation and scaling do not reflow neighboring elements.

Try New project, filter to an empty result, and switch playground sections. Then enable reduced motion in your OS or browser emulation. Movement and entrance animations should stop while focus and selection remain clear. Motion should communicate change without delaying use.
