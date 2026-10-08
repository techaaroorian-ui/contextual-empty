import { useState } from "react";
// Import your library just like a real user would!
import {
  SearchEmpty,
  FirstUseEmpty,
  ErrorEmpty,
} from "@techaaroorian-ui/contextual-empty";
// Import the compiled CSS
import "@techaaroorian-ui/aar-loom/index.css";

function App() {
  const [view, setView] = useState<"first-use" | "search" | "error">(
    "first-use",
  );

  return (
    <div
      data-theme="system"
      className="aar-root aar-container aar-p-8"
    >
      <header className="aar-mb-8 aar-pb-4 aar-border-bottom-1px-solid-e5e7eb">
        <h1 className="aar-m-0-0-1rem-0">Techaaroorian UI - Playground</h1>
        <div className="aar-display-flex aar-gap-4">
          <button
            onClick={() => setView("first-use")}
            className="aar-button"
            aria-pressed={view === "first-use"}
          >
            First Use
          </button>
          <button
            onClick={() => setView("search")}
            className="aar-button"
            aria-pressed={view === "search"}
          >
            Search
          </button>
          <button
            onClick={() => setView("error")}
            className="aar-button"
            aria-pressed={view === "error"}
          >
            Error
          </button>
        </div>
      </header>

      <main className="aar-p-16 aar-bg-f9fafb aar-radius-12px aar-min-h-400px aar-display-flex aar-items-center aar-justify-center">
        {view === "first-use" && (
          <FirstUseEmpty
            className="aar-contextual-empty"
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
            className="aar-contextual-empty"
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
            className="aar-contextual-empty"
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

export default App;
