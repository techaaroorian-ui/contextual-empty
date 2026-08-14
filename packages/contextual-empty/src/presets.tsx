/**
 * @techaaroorian-ui/contextual-empty - Presets
 * High-level convenience wrappers for common empty state scenarios.
 * @author Janarthanan Soundararajan (@TechAaroorian)
 * @license MIT
 * @repository https://github.com/techaaroorian-ui/contextual-empty
 */

import React, { ReactNode } from "react";
import { ContextualEmptyState } from "./ContextualEmptyState";

// --- Shared Base Props ---
interface BasePresetProps {
  icon?: ReactNode;
  className?: string;
}

// 1. Search Empty
export interface SearchEmptyProps extends BasePresetProps {
  query?: string;
  onClear?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const SearchEmpty = ({
  query,
  onClear,
  icon,
  title = "No results found",
  description = query
    ? `We couldn't find anything matching "${query}".`
    : "Try adjusting your search terms.",
  actionText = "Clear search",
  className,
}: SearchEmptyProps) => (
  <ContextualEmptyState type="search" className={className}>
    {icon && <ContextualEmptyState.Icon>{icon}</ContextualEmptyState.Icon>}
    <ContextualEmptyState.Content>
      <h3>{title}</h3>
      <p>{description}</p>
    </ContextualEmptyState.Content>
    {onClear && (
      <ContextualEmptyState.Actions>
        <button type="button" onClick={onClear}>
          {actionText}
        </button>
      </ContextualEmptyState.Actions>
    )}
  </ContextualEmptyState>
);

// 2. Filter Empty
export interface FilterEmptyProps extends BasePresetProps {
  onClearFilters?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const FilterEmpty = ({
  onClearFilters,
  icon,
  title = "No exact matches",
  description = "Try changing or clearing your filters to see more results.",
  actionText = "Clear all filters",
  className,
}: FilterEmptyProps) => (
  <ContextualEmptyState type="filter" className={className}>
    {icon && <ContextualEmptyState.Icon>{icon}</ContextualEmptyState.Icon>}
    <ContextualEmptyState.Content>
      <h3>{title}</h3>
      <p>{description}</p>
    </ContextualEmptyState.Content>
    {onClearFilters && (
      <ContextualEmptyState.Actions>
        <button type="button" onClick={onClearFilters}>
          {actionText}
        </button>
      </ContextualEmptyState.Actions>
    )}
  </ContextualEmptyState>
);

// 3. First Use Empty
export interface FirstUseEmptyProps extends BasePresetProps {
  itemName?: string;
  onCreate?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const FirstUseEmpty = ({
  itemName = "items",
  onCreate,
  icon,
  title,
  description = `Get started by creating your first ${itemName.toLowerCase()}.`,
  actionText = `Create ${itemName}`,
  className,
}: FirstUseEmptyProps) => (
  <ContextualEmptyState type="first-use" className={className}>
    {icon && <ContextualEmptyState.Icon>{icon}</ContextualEmptyState.Icon>}
    <ContextualEmptyState.Content>
      <h3>{title || `No ${itemName} yet`}</h3>
      <p>{description}</p>
    </ContextualEmptyState.Content>
    {onCreate && (
      <ContextualEmptyState.Actions>
        <button type="button" onClick={onCreate}>
          {actionText}
        </button>
      </ContextualEmptyState.Actions>
    )}
  </ContextualEmptyState>
);

// 4. Permission Empty
export interface PermissionEmptyProps extends BasePresetProps {
  resourceName?: string;
  onRequestAccess?: () => void;
  title?: string;
  description?: string;
  actionText?: string;
}

export const PermissionEmpty = ({
  resourceName = "this content",
  onRequestAccess,
  icon,
  title = "Access Denied",
  description = `You do not have the required permissions to view ${resourceName}.`,
  actionText = "Request Access",
  className,
}: PermissionEmptyProps) => (
  <ContextualEmptyState type="permission" className={className}>
    {icon && <ContextualEmptyState.Icon>{icon}</ContextualEmptyState.Icon>}
    <ContextualEmptyState.Content>
      <h3>{title}</h3>
      <p>{description}</p>
    </ContextualEmptyState.Content>
    {onRequestAccess && (
      <ContextualEmptyState.Actions>
        <button type="button" onClick={onRequestAccess}>
          {actionText}
        </button>
      </ContextualEmptyState.Actions>
    )}
  </ContextualEmptyState>
);

// 5. Error Empty
export interface ErrorEmptyProps extends BasePresetProps {
  errorMessage?: string;
  onRetry?: () => void;
  title?: string;
  actionText?: string;
}

export const ErrorEmpty = ({
  errorMessage = "Something went wrong while loading the data.",
  onRetry,
  icon,
  title = "Failed to load",
  actionText = "Try again",
  className,
}: ErrorEmptyProps) => (
  <ContextualEmptyState type="error" className={className}>
    {icon && <ContextualEmptyState.Icon>{icon}</ContextualEmptyState.Icon>}
    <ContextualEmptyState.Content>
      <h3>{title}</h3>
      <p>{errorMessage}</p>
    </ContextualEmptyState.Content>
    {onRetry && (
      <ContextualEmptyState.Actions>
        <button type="button" onClick={onRetry}>
          {actionText}
        </button>
      </ContextualEmptyState.Actions>
    )}
  </ContextualEmptyState>
);
