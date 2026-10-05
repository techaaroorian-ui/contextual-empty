import PhilosophyExamples from "./PhilosophyExamples";
import source from "./PhilosophyExamples.tsx?raw";
import styles from "./PhilosophyExamples.css?raw";
import sharedStyles from "./example-setup.css?raw";
import CodeBlock from "./CodeBlock";

export default function PhilosophyGuide() {
  return (
    <section className="lab-content package-docs">
      <div className="package-setup">
        <p className="aar-eyebrow">Aar Craft / Design exploration</p>
        <h1 className="aar-title">
          Make possibilities visible.
          <br />
          Make change understandable.
        </h1>
        <p>
          The mage inspiration becomes discovery, intent, and transformation.
          Familiar labels and readable surfaces let the same language serve
          financial, commercial, and creative applications.
        </p>
        <p className="aar-hint">
          These are interactive design experiments, not new public component
          APIs or a Yuwbrndr integration.
        </p>
      </div>
      <div className="table-scroll">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Principle</th>
              <th>Practical rule</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "Purpose leads",
                "Give the main task the strongest region; keep support nearby.",
              ],
              [
                "Reveal possibilities",
                "Expose relevant tools without hiding the only route to an action.",
              ],
              [
                "States tell the truth",
                "Distinguish selection, pending, success, and failure.",
              ],
              [
                "Change stays connected",
                "Use short transitions to communicate a change; preserve meaning without motion.",
              ],
              [
                "Adapt without losing context",
                "Reorganize by available space while retaining state and reachable actions.",
              ],
            ].map(([principle, rule]) => (
              <tr key={principle}>
                <th scope="row">{principle}</th>
                <td>{rule}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="package-setup">
        <h2 className="aar-heading">One language, three tasks</h2>
        <p>
          Compare light and dark themes, Forest and Iris accents, and density.
          Selection uses a thin frame and quiet surface change; keyboard focus
          has its own outer outline. Status always includes text. Narrow regions
          stack the supporting detail below the work.
        </p>
      </div>
      <PhilosophyExamples />
      <div className="package-setup">
        <h2 className="aar-heading">Complete prototype source</h2>
        <p>
          In an existing React application with Aar Craft installed, save all
          three files together and render PhilosophyExamples. These experimental
          styles stay in the docs until the patterns have been reviewed.
        </p>
      </div>
      <CodeBlock language="tsx" title="PhilosophyExamples.tsx" code={source} />
      <CodeBlock language="css" title="PhilosophyExamples.css" code={styles} />
      <CodeBlock language="css" title="example-setup.css" code={sharedStyles} />
    </section>
  );
}
