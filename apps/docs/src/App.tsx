import { useState } from "react";
// Import your library just like a real user would!
import {
  SearchEmpty,
  FirstUseEmpty,
  ErrorEmpty,
} from "@techaaroorian-ui/contextual-empty";
// Import the compiled CSS
import "@techaaroorian-ui/contextual-empty/dist/index.css";

function App() {
  const [view, setView] = useState<"first-use" | "search" | "error">(
    "first-use",
  );

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <header
        style={{
          marginBottom: "2rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <h1 style={{ margin: "0 0 1rem 0" }}>Techaaroorian UI - Playground</h1>
        <div style={{ display: "flex", gap: "1rem" }}>
          <button
            onClick={() => setView("first-use")}
            style={btnStyle(view === "first-use")}
          >
            First Use
          </button>
          <button
            onClick={() => setView("search")}
            style={btnStyle(view === "search")}
          >
            Search
          </button>
          <button
            onClick={() => setView("error")}
            style={btnStyle(view === "error")}
          >
            Error
          </button>
        </div>
      </header>

      <main
        style={{
          padding: "4rem",
          backgroundColor: "#f9fafb",
          borderRadius: "12px",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {view === "first-use" && (
          <FirstUseEmpty
            itemName="Dashboard widget"
            onCreate={() => alert("Create action clicked!")}
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
          />
        )}

        {view === "search" && (
          <SearchEmpty
            query="quantum metrics"
            onClear={() => alert("Filters cleared!")}
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
          />
        )}

        {view === "error" && (
          <ErrorEmpty
            onRetry={() => alert("Retrying fetch...")}
            icon={
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        )}
      </main>
    </div>
  );
}

// Simple inline style helper for the playground buttons
const btnStyle = (isActive: boolean) => ({
  padding: "0.5rem 1rem",
  cursor: "pointer",
  borderRadius: "6px",
  border: "1px solid #d1d5db",
  backgroundColor: isActive ? "#111827" : "#ffffff",
  color: isActive ? "#ffffff" : "#374151",
  fontWeight: 500,
});

export default App;
