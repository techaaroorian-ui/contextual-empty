import MagicArtExample from "./MagicArtExample";
import source from "./MagicArtExample.tsx?raw";
import styles from "./MagicArtExample.css?raw";
import CodeBlock from "./CodeBlock";

export default function MagicArtGuide() {
  return (
    <section className="lab-content package-docs">
      <div className="package-setup">
        <p className="aar-eyebrow">Aar Craft / Expressive interaction study</p>
        <p>
          Try the three directions, reveal the surface tools, then transform the
          composition. Compare Night and Parchment with Violet or Jade. This
          explores a magic-art identity through geometry, typography, and
          transitions.
        </p>
      </div>
      <MagicArtExample />
      <div className="package-setup" style={{ marginTop: "2rem" }}>
        <h2 className="aar-heading">What gives this study its identity?</h2>
        <p>
          The rotating compass connects choice to direction. The etched geometry
          and arched work surface establish a visual signature. Contextual tools
          unfold beside the work; the seal resolves into a check when the demo
          completes. Motion happens in response to an action, and reduced motion
          preserves every state.
        </p>
        <p className="aar-hint">
          Experimental docs styles. This timed transformation is a local
          demonstration, not a backend success signal. React controls behavior;
          the visual language is CSS and SVG.
        </p>
      </div>
      <CodeBlock title="MagicArtExample.tsx" language="tsx" code={source} />
      <CodeBlock title="MagicArtExample.css" language="css" code={styles} />
    </section>
  );
}
