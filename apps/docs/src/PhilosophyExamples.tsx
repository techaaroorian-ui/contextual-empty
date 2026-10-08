import { useState } from "react";
import "@techaaroorian-ui/aar-loom/index.css";

export default function PhilosophyExamples() {
  const [theme, setTheme] = useState("light");
  const [palette, setPalette] = useState("default");
  const [density, setDensity] = useState("comfortable");
  const [account, setAccount] = useState("Operations");
  const [order, setOrder] = useState<"pending" | "confirmed">("pending");
  const [element, setElement] = useState("Heading");
  const [weight, setWeight] = useState("Bold");
  return (
    <div
      className="aar-root aar-expression aar-lab"
      data-theme={theme}
      style={palette === "custom" ? { "--aar-primary":"#326954", "--aar-on-primary":"#fff", "--aar-focus":"#326954" } as React.CSSProperties : undefined}
      data-density={density}
    >
      <div className="aar-controls" aria-label="Compare design settings">
        <label>
          Theme
          <select
            aria-label="Theme"
            className="aar-input"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>
        <label>
          Accent
          <select
            aria-label="Accent"
            className="aar-input"
            value={palette}
            onChange={(e) => setPalette(e.target.value)}
          >
            <option value="default">Default accent</option>
            <option value="custom">Custom brand example</option>
          </select>
        </label>
        <label>
          Density
          <select
            aria-label="Density"
            className="aar-input"
            value={density}
            onChange={(e) => setDensity(e.target.value)}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </div>
      <div className="aar-comparisons">
        <section className="aar-example" aria-labelledby="dashboard-title">
          <header>
            <p className="aar-eyebrow">01 / Dashboard</p>
            <h2 id="dashboard-title" className="aar-heading">
              Cash overview
            </h2>
            <p>Selection directs attention. Supporting detail follows.</p>
          </header>
          <div className="aar-split">
            <div className="aar-stack">
              <p className="aar-label">Accounts</p>
              {["Operations", "Reserve", "Payroll"].map((name) => (
                <button
                  key={name}
                  className="aar-choice"
                  aria-pressed={account === name}
                  onClick={() => setAccount(name)}
                >
                  {name}
                  <span>
                    {name === "Operations"
                      ? "$24,800"
                      : name === "Reserve"
                        ? "$80,000"
                        : "$12,400"}
                  </span>
                </button>
              ))}
            </div>
            <div className="aar-detail">
              <p className="aar-label">Selected account</p>
              <h3>{account}</h3>
              <p className="aar-metric">
                {account === "Operations"
                  ? "$24,800"
                  : account === "Reserve"
                    ? "$80,000"
                    : "$12,400"}
              </p>
              <p>Available balance</p>
              <hr />
              <p>Latest activity</p>
              <p>Reconciled today · No action needed</p>
            </div>
          </div>
        </section>
        <section className="aar-example" aria-labelledby="checkout-title">
          <header>
            <p className="aar-eyebrow">02 / Checkout</p>
            <h2 id="checkout-title" className="aar-heading">
              An honest waiting state
            </h2>
            <p>Payment and order confirmation are separate facts.</p>
          </header>
          <div className="aar-stack">
            <div className="aar-receipt">
              <span>Studio notebook × 1</span>
              <strong>$18.00</strong>
            </div>
            <p className="aar-success">✓ Payment received</p>
            <div className="aar-status" role="status">
              <strong>
                {order === "pending"
                  ? "Updating your order"
                  : "Order confirmed"}
              </strong>
              <p>
                {order === "pending"
                  ? "Your payment was received. We are waiting for the order service; no further payment is needed."
                  : "Order #1042 is confirmed. Your receipt is ready."}
              </p>
            </div>
            <div className="aar-cluster">
              <button
                className="aar-button"
                onClick={() => setOrder("confirmed")}
                disabled={order === "confirmed"}
              >
                Simulate order update
              </button>
              <button
                className="aar-button"
                data-variant="quiet"
                onClick={() => setOrder("pending")}
              >
                Reset example
              </button>
            </div>
            <p className="aar-hint">
              Demo controls only. A real application reconciles an API response
              or subscription event.
            </p>
          </div>
        </section>
        <section className="aar-example" aria-labelledby="editor-title">
          <header>
            <p className="aar-eyebrow">03 / Creative editor</p>
            <h2 id="editor-title" className="aar-heading">
              Tools follow the work
            </h2>
            <p>Choose an element. Its settings appear beside the canvas.</p>
          </header>
          <div className="aar-split">
            <div className="aar-artwork" aria-label="Artwork elements">
              <svg
                className="aar-etching"
                viewBox="0 0 160 100"
                aria-hidden="true"
              >
                <circle cx="80" cy="50" r="38" />
                <path d="M80 8 120 76H40ZM80 92 40 24h80Z" />
                <circle cx="80" cy="50" r="14" />
              </svg>
              <button
                className="aar-choice aar-art-title aar-bind-font-weight"
                aria-pressed={element === "Heading"}
                style={
                  {
                    "--aar-font-weight": weight === "Bold" ? 750 : 400,
                  } as React.CSSProperties
                }
                onClick={() => setElement("Heading")}
              >
                Make room
                <br />
                for ideas.
              </button>
              <button
                className="aar-choice"
                aria-pressed={element === "Caption"}
                onClick={() => setElement("Caption")}
              >
                A small start. A new possibility.
              </button>
            </div>
            <div className="aar-detail aar-stack">
              <p className="aar-label">Selected element</p>
              <h3>{element}</h3>
              {element === "Heading" ? (
                <label>
                  Heading weight
                  <select
                    aria-label="Heading weight"
                    className="aar-input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  >
                    <option>Bold</option>
                    <option>Regular</option>
                  </select>
                </label>
              ) : (
                <p>
                  Caption uses the supporting text style. Select Heading to
                  adjust its weight.
                </p>
              )}
              <p className="aar-hint">
                Selection is distinct from keyboard focus. Settings persist when
                the layout changes.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
