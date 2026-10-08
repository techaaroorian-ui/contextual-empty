import { isValidElement, useId } from "react";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export interface AarSelectOption {
  value: string;
  label: ReactNode;
  shortLabel?: ReactNode;
}
export interface AarSelectProps {
  label?: string;
  value: string;
  options: AarSelectOption[];
  onChange: (value: string) => void;
  compact?: boolean;
  menuAlign?: "left" | "right";
}
function text(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(text).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return text(node.props.children);
  return "";
}
// Native selection provides keyboard navigation, typeahead and mobile pickers.
// Aar Loom supplies the appearance; this helper is optional documentation markup.
export default function AarSelect({
  label,
  value,
  options,
  onChange,
  compact = false,
}: AarSelectProps) {
  const id = useId();
  return (
    <div
      className="aar-field aar-select-field"
      data-size={compact ? "sm" : undefined}
    >
      {label && <label htmlFor={id}>{label}</label>}
      <span className="aar-select-frame">
        <select
          id={id}
          className="aar-select"
          aria-label={label || "Choose option"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {text(option.label)}
            </option>
          ))}
        </select>
        <ChevronDown
          className="aar-select-chevron"
          size={16}
          aria-hidden="true"
        />
      </span>
    </div>
  );
}
