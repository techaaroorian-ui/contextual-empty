import { useState } from "react";
import { Plus, Search, TriangleAlert } from "lucide-react";
import {
  ContextualEmptyState,
  FirstUseEmpty,
  SearchEmpty,
  ErrorEmpty,
} from "@techaaroorian-ui/contextual-empty";
import "@techaaroorian-ui/aar-craft/index.css";
import "./example-setup.css";

export default function ContextualEmptyExample() {
  const [view, setView] = useState("first-use");
  const [notice, setNotice] = useState("");
  return (
    <div className="aar-root example-stack">
      <div className="aar-toolbar" aria-label="Empty state examples">
        {[
          ["first-use", "First use"],
          ["search", "Search"],
          ["error", "Error"],
          ["compound", "Compound"],
        ].map(([id, label]) => (
          <button
            className="aar-button"
            aria-pressed={view === id}
            key={id}
            onClick={() => {
              setView(id);
              setNotice("");
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <div key={view}>
        {view === "first-use" && (
          <FirstUseEmpty
            className="aar-contextual-empty"
            itemName="Projects"
            icon={<Plus size={32} strokeWidth={1.75} aria-hidden="true" />}
            onCreate={() =>
              setNotice(
                "Create action received. Your application supplies the creation flow.",
              )
            }
          />
        )}
        {view === "search" && (
          <SearchEmpty
            className="aar-contextual-empty"
            query="interface ideas"
            icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />}
            onClear={() =>
              setNotice(
                "Clear-search action received. Your application clears the query.",
              )
            }
          />
        )}
        {view === "error" && (
          <ErrorEmpty
            className="aar-contextual-empty"
            icon={
              <TriangleAlert size={32} strokeWidth={1.75} aria-hidden="true" />
            }
            onRetry={() =>
              setNotice(
                "Retry action received. Your application supplies the request.",
              )
            }
          />
        )}
        {view === "compound" && (
          <ContextualEmptyState className="aar-contextual-empty" type="error">
            <ContextualEmptyState.Icon>!</ContextualEmptyState.Icon>
            <ContextualEmptyState.Content>
              <h3>Could not load projects</h3>
              <p>Check your connection and try again.</p>
            </ContextualEmptyState.Content>
            <ContextualEmptyState.Actions>
              <button onClick={() => setNotice("Compound action received.")}>
                Try again
              </button>
            </ContextualEmptyState.Actions>
          </ContextualEmptyState>
        )}
      </div>
      <p className="aar-hint" role="status">
        {notice || "Choose a state, then try its action."}
      </p>
    </div>
  );
}
