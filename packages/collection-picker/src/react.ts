import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { createPicker, reconcilePicker, reducePicker, visibleItems, type PickerAction, type PickerItem } from './index.js';
/** Single-selection listbox with explicit selection; the filter is a separate input. */
export function useCollectionPicker<T extends PickerItem>(items: readonly T[], initialSelectedId: string | null = null) {
  const [stored, setStored] = useState(() => createPicker(items, initialSelectedId));
  const state = reconcilePicker(stored, items);
  const shown = visibleItems(items, state.query);
  const listRef = useRef<HTMLDivElement>(null);
  const prefix = useId();
  const optionId = (id: string) => `${prefix}-option-${items.findIndex(item => item.id === id)}`;
  const dispatch = (action: PickerAction) => setStored(current => reducePicker(current, action, items));
  const activeDomId = state.activeId ? optionId(state.activeId) : undefined;
  useEffect(() => {
    const list = listRef.current;
    if (activeDomId && list && list.ownerDocument.activeElement === list) list.ownerDocument.getElementById(activeDomId)?.scrollIntoView({ block: 'nearest' });
  }, [activeDomId]);
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.nativeEvent.isComposing) return;
    const directions = { ArrowDown: 'next', ArrowUp: 'previous', Home: 'first', End: 'last' } as const;
    if (event.key in directions) {
      event.preventDefault(); dispatch({ type: 'navigate', direction: directions[event.key as keyof typeof directions] });
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); dispatch({ type: 'select' });
    } else if (event.key.length === 1) {
      event.preventDefault(); dispatch({ type: 'typeahead', text: event.key, time: Date.now() });
    }
  };
  return {
    ...state, visibleItems: shown,
    setQuery: (query: string) => dispatch({ type: 'query', query }),
    listboxProps: { ref: listRef, role: 'listbox' as const, tabIndex: 0, 'aria-activedescendant': activeDomId, onKeyDown },
    getOptionProps: (item: T) => ({
      id: optionId(item.id), role: 'option' as const,
      'aria-selected': state.selectedId === item.id,
      'aria-disabled': item.disabled || undefined,
      'data-active': state.activeId === item.id ? 'true' : undefined,
      onPointerDown: (event: PointerEvent<HTMLElement>) => { event.preventDefault(); listRef.current?.focus(); },
      onClick: () => { listRef.current?.focus(); dispatch({ type: 'select', id: item.id }); },
    }),
  };
}
