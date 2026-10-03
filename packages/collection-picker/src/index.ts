export interface PickerItem { id: string; label: string; disabled?: boolean }
export interface PickerState {
  query: string; activeId: string | null; selectedId: string | null;
  searchText: string; searchTime: number;
}
export type PickerAction =
  | { type: 'query'; query: string }
  | { type: 'navigate'; direction: 'next' | 'previous' | 'first' | 'last' }
  | { type: 'select'; id?: string }
  | { type: 'typeahead'; text: string; time: number };
export function visibleItems<T extends PickerItem>(items: readonly T[], query: string): readonly T[] {
  const needle = query.trim().toLocaleLowerCase();
  return items.filter(item => item.label.toLocaleLowerCase().includes(needle));
}
export function reconcilePicker(state: PickerState, items: readonly PickerItem[]): PickerState {
  if (items.some(item => !item.id) || new Set(items.map(item => item.id)).size !== items.length) throw new Error('Picker IDs must be nonempty and unique');
  const enabled = visibleItems(items, state.query).filter(item => !item.disabled);
  const selectedId = items.some(item => item.id === state.selectedId && !item.disabled) ? state.selectedId : null;
  const activeId = enabled.some(item => item.id === state.activeId) ? state.activeId
    : enabled.find(item => item.id === selectedId)?.id ?? enabled[0]?.id ?? null;
  return { ...state, activeId, selectedId };
}
export function createPicker(items: readonly PickerItem[], selectedId: string | null = null): PickerState {
  return reconcilePicker({ query: '', activeId: selectedId, selectedId, searchText: '', searchTime: 0 }, items);
}
export function reducePicker(state: PickerState, action: PickerAction, items: readonly PickerItem[]): PickerState {
  const current = reconcilePicker(state, items);
  const enabled = visibleItems(items, current.query).filter(item => !item.disabled);
  const index = enabled.findIndex(item => item.id === current.activeId);
  switch (action.type) {
    case 'query':
      return reconcilePicker({ ...current, query: action.query, activeId: null, searchText: '', searchTime: 0 }, items);
    case 'select': {
      const id = action.id ?? current.activeId;
      return enabled.some(item => item.id === id) ? { ...current, selectedId: id, activeId: id } : current;
    }
    case 'navigate': {
      let next = index;
      if (action.direction === 'first') next = 0;
      if (action.direction === 'last') next = enabled.length - 1;
      if (action.direction === 'next') next = Math.min(index + 1, enabled.length - 1);
      if (action.direction === 'previous') next = Math.max(index - 1, 0);
      return { ...current, activeId: enabled[next]?.id ?? null, searchText: '', searchTime: 0 };
    }
    case 'typeahead': {
      if (!Number.isFinite(action.time) || !action.text) return current;
      const text = action.text.toLocaleLowerCase();
      const prefix = action.time >= current.searchTime && action.time - current.searchTime <= 700 ? current.searchText + text : text;
      const repeated = [...prefix].every(char => char === text) ? text : prefix;
      const start = repeated.length === 1 ? index + 1 : Math.max(index, 0);
      const ordered = [...enabled.slice(start), ...enabled.slice(0, start)];
      const match = ordered.find(item => item.label.toLocaleLowerCase().startsWith(repeated));
      return { ...current, activeId: match?.id ?? current.activeId, searchText: prefix, searchTime: action.time };
    }
  }
}
