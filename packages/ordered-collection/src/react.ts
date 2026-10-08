import { useReducer } from 'react';
import { createCollection, reduceCollection, type Identified, type CollectionAction, type CollectionOptions } from './index.js';
export function useOrderedCollection<T extends Identified>(initialItems: readonly T[], options: CollectionOptions = {}) {
  const [state, dispatch] = useReducer(
    (current: ReturnType<typeof createCollection<T>>, action: CollectionAction<T>) => reduceCollection(current, action, options),
    initialItems,
    items => createCollection(items, undefined, options),
  );
  return { ...state, dispatch };
}
