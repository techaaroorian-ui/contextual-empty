/**
 * @techaaroorian-ui/contextual-empty
 * * A contextual, composable empty-state system for React applications.
 * * @author Janarthanan Soundararajan (@TechAaroorian)
 * @license MIT
 * @repository https://github.com/techaaroorian-ui/contextual-empty
 * * This foundational compound component acts as a pure function: (Context + Props) => UI.
 * It relies entirely on standard HTML semantics and data-attributes for true headless flexibility.
 */

import React, { ReactNode } from "react";

// --- Types ---
export interface ContextualEmptyStateProps {
  children: ReactNode;
  /** Custom class names to append to the root container */
  className?: string;
  /** The contextual reason for the empty state. Drives data-attributes for styling. */
  type?:
    | "first-use"
    | "search"
    | "filter"
    | "permission"
    | "error"
    | "archived"
    | "offline"
    | "completed";
}

// --- Sub-Components ---
const Icon = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`contextual-empty-icon ${className}`.trim()}
    aria-hidden="true"
  >
    {children}
  </div>
);

const Content = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`contextual-empty-content ${className}`.trim()}>
    {children}
  </div>
);

const Actions = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div className={`contextual-empty-actions ${className}`.trim()}>
    {children}
  </div>
);

// --- Root Component ---
const Root = ({
  children,
  type = "first-use",
  className = "",
}: ContextualEmptyStateProps) => {
  return (
    <div
      className={`contextual-empty-state ${className}`.trim()}
      data-state={type}
    >
      {children}
    </div>
  );
};

// --- Dot Notation Export ---
export const ContextualEmptyState = Object.assign(Root, {
  Icon,
  Content,
  Actions,
});
