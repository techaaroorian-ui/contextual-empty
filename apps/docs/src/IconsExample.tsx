import { useState } from "react";
import {
  ArrowRight,
  Check,
  Download,
  Plus,
  Search,
  Settings,
  TriangleAlert,
} from "lucide-react";
import { SearchEmpty } from "@techaaroorian-ui/contextual-empty";
import "@techaaroorian-ui/aar-craft/index.css";
import "./example-setup.css";

export default function IconsExample() {
  const [message, setMessage] = useState("Try an action below.");
  return (
    <div className="aar-root example-stack">
      <div className="aar-toolbar">
        <button
          className="aar-button"
          onClick={() =>
            setMessage(
              "Download action received; this example does not export a file.",
            )
          }
        >
          <Download size={18} strokeWidth={1.75} aria-hidden="true" />
          Download
        </button>
        <button
          className="aar-button"
          aria-label="Open settings"
          onClick={() => setMessage("Settings action received.")}
        >
          <Settings size={20} aria-hidden="true" />
        </button>
        <button
          className="aar-button"
          onClick={() => setMessage("Create action received.")}
        >
          <Plus size={18} aria-hidden="true" />
          Create project
        </button>
      </div>
      <p className="aar-hint" role="status">
        {message}
      </p>
      <div className="aar-toolbar">
        <span className="aar-badge" data-tone="success">
          <Check size={14} aria-hidden="true" />
          Saved
        </span>
        <span className="aar-badge" data-tone="danger">
          <TriangleAlert size={14} aria-hidden="true" />
          Needs attention
        </span>
        <span className="aar-badge">
          <ArrowRight size={14} aria-hidden="true" />
          Next step
        </span>
      </div>
      <SearchEmpty
        className="aar-contextual-empty"
        query="drafts"
        icon={<Search size={32} strokeWidth={1.75} aria-hidden="true" />}
        onClear={() => setMessage("Search clear action received.")}
      />
    </div>
  );
}
