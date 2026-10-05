import { useCollectionPicker } from "@techaaroorian-ui/collection-picker/react";
import "@techaaroorian-ui/aar-craft/index.css";

const choices = [
  { id: "poster", label: "Poster" },
  { id: "slides", label: "Slides" },
  { id: "locked", label: "Shared library (unavailable)", disabled: true },
  { id: "story", label: "Story" },
];

export default function CollectionPickerExample() {
  const picker = useCollectionPicker(choices);
  return (
    <div className="aar-root aar-stack" data-gap="3">
      <label className="aar-field" htmlFor="picker-filter">
        Filter formats
        <input
          id="picker-filter"
          className="aar-input"
          value={picker.query}
          onChange={(event) => picker.setQuery(event.target.value)}
        />
      </label>
      <span id="picker-label" className="aar-eyebrow">
        Available formats
      </span>
      <div
        {...picker.listboxProps}
        className="aar-picker"
        aria-labelledby="picker-label"
      >
        {picker.visibleItems.map((item) => (
          <div
            key={item.id}
            {...picker.getOptionProps(item)}
            className="aar-picker-option"
          >
            {item.label}
          </div>
        ))}
      </div>
      <p className="aar-hint" role="status">
        {picker.visibleItems.length
          ? `${picker.visibleItems.length} formats shown. Selected format: ${choices.find((item) => item.id === picker.selectedId)?.label ?? "None"}.`
          : "No matching formats. Clear the filter to see all options."}
      </p>
    </div>
  );
}
