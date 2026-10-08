export interface Identified { id: string }
export interface CollectionState<T extends Identified> { readonly items: readonly T[]; readonly selectedId: string | null }
export interface CollectionOptions { maxItems?: number; minItems?: number }
export type CollectionAction<T> =
  | { type: 'select'; id: string }
  | { type: 'insert'; item: T; afterId?: string }
  | { type: 'remove'; id: string }
  | { type: 'move'; id: string; toIndex: number }
  | { type: 'update'; item: T };
function limits(options: CollectionOptions) {
  const min = options.minItems ?? 0, max = options.maxItems ?? Infinity;
  if (!Number.isInteger(min) || min < 0 || !(max === Infinity || Number.isInteger(max)) || max < min) throw new RangeError('Invalid collection limits');
  return { min, max };
}
export function createCollection<T extends Identified>(items: readonly T[] = [], selectedId: string | null = items[0]?.id ?? null, options: CollectionOptions = {}): CollectionState<T> {
  const { min, max } = limits(options);
  if (items.length < min || items.length > max) throw new RangeError('Item count outside collection limits');
  if (items.some(item => !item.id) || new Set(items.map(item => item.id)).size !== items.length) throw new Error('Item IDs must be nonempty and unique');
  if (selectedId !== null && !items.some(item => item.id === selectedId)) throw new Error('Selected item does not exist');
  return { items: [...items], selectedId };
}
export function reduceCollection<T extends Identified>(state: CollectionState<T>, action: CollectionAction<T>, options: CollectionOptions = {}): CollectionState<T> {
  const { min, max } = limits(options);
  const index = 'id' in action ? state.items.findIndex(item => item.id === action.id) : -1;
  switch (action.type) {
    case 'select':
      return index < 0 || state.selectedId === action.id ? state : { ...state, selectedId: action.id };
    case 'insert': {
      if (state.items.length >= max) return state;
      if (!action.item.id || state.items.some(item => item.id === action.item.id)) throw new Error('Item IDs must be nonempty and unique');
      const after = action.afterId === undefined ? state.items.length - 1 : state.items.findIndex(item => item.id === action.afterId);
      if (action.afterId !== undefined && after < 0) return state;
      const items = [...state.items]; items.splice(after + 1, 0, action.item);
      return { items, selectedId: action.item.id };
    }
    case 'remove': {
      if (index < 0 || state.items.length <= min) return state;
      const items = state.items.filter(item => item.id !== action.id);
      return { items, selectedId: state.selectedId === action.id ? items[Math.min(index, items.length - 1)]?.id ?? null : state.selectedId };
    }
    case 'move': {
      if (!Number.isInteger(action.toIndex)) throw new RangeError('Target index must be an integer');
      if (index < 0 || action.toIndex < 0 || action.toIndex >= state.items.length || index === action.toIndex) return state;
      const items = [...state.items]; const [item] = items.splice(index, 1); items.splice(action.toIndex, 0, item!);
      return { ...state, items };
    }
    case 'update':
      return state.items.some(item => item.id === action.item.id) ? { ...state, items: state.items.map(item => item.id === action.item.id ? action.item : item) } : state;
  }
}
