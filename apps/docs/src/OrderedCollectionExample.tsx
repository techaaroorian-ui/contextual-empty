import { useOrderedCollection } from "@techaaroorian-ui/ordered-collection/react";
import "@techaaroorian-ui/aar-craft/index.css";

const initialItems = [
  { id: "cover", name: "Cover" },
  { id: "details", name: "Details" },
];

export default function OrderedCollectionExample() {
  const collection = useOrderedCollection(initialItems, {
    minItems: 1,
    maxItems: 6,
  });
  const selected = collection.items.find(
    (item) => item.id === collection.selectedId,
  );
  return (
    <div className="aar-root aar-stack" data-gap="4">
      <div className="aar-cluster" aria-label="Collection items">
        {collection.items.map((item) => (
          <button
            key={item.id}
            className="aar-button"
            data-variant={item.id === collection.selectedId ? 'primary' : undefined}
            aria-pressed={item.id === collection.selectedId}
            onClick={() => collection.dispatch({ type: "select", id: item.id })}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="aar-cluster">
        <button
          className="aar-button"
          disabled={collection.items.length >= 6}
          onClick={() =>
            collection.dispatch({
              type: "insert",
              item: {
                id: crypto.randomUUID(),
                name: `Item ${collection.items.length + 1}`,
              },
            })
          }
        >
          Add item
        </button>
        <button
          className="aar-button"
          disabled={!selected || collection.items.length >= 6}
          onClick={() => {
            if (selected)
              collection.dispatch({
                type: "insert",
                afterId: selected.id,
                item: {
                  ...selected,
                  id: crypto.randomUUID(),
                  name: `${selected.name} copy`,
                },
              });
          }}
        >
          Duplicate selected
        </button>
        <button
          className="aar-button"
          disabled={!selected || collection.items.length <= 1}
          onClick={() => {
            if (selected)
              collection.dispatch({ type: "remove", id: selected.id });
          }}
        >
          Remove selected
        </button>
        <button
          className="aar-button"
          disabled={!selected || collection.items[0]?.id === selected.id}
          onClick={() => {
            if (selected)
              collection.dispatch({
                type: "move",
                id: selected.id,
                toIndex: 0,
              });
          }}
        >
          Move selected to start
        </button>
      </div>
      <p className="aar-hint" role="status">
        Selected: {selected?.name ?? "None"}. {collection.items.length} of 6
        items.
      </p>
    </div>
  );
}
