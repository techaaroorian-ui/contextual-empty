import "@testing-library/jest-dom/vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ContextualEmptyState } from "./ContextualEmptyState";
import { SearchEmpty } from "./presets";

describe("ContextualEmptyState Primitives", () => {
  it("renders children correctly", () => {
    // ✅ FIXED: Using standard HTML inside the Content block!
    render(
      <ContextualEmptyState type="error">
        <ContextualEmptyState.Content>
          <h3>System Failure</h3>
        </ContextualEmptyState.Content>
      </ContextualEmptyState>,
    );

    // Check if it renders
    expect(screen.getByText("System Failure")).toBeInTheDocument();

    // Check if the data-state attribute is applied for our headless CSS
    const rootElement = screen
      .getByText("System Failure")
      .closest(".contextual-empty-state");
    expect(rootElement).toHaveAttribute("data-state", "error");
  });
});

describe("SearchEmpty Preset", () => {
  it("renders default text when no props are provided", () => {
    render(<SearchEmpty />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders dynamic text based on the query string", () => {
    render(<SearchEmpty query="Apples" />);
    expect(
      screen.getByText('We couldn\'t find anything matching "Apples".'),
    ).toBeInTheDocument();
  });

  it("fires the onClear callback when the button is clicked", () => {
    const mockOnClear = vi.fn();

    render(<SearchEmpty onClear={mockOnClear} actionText="Clear Filters" />);

    const button = screen.getByText("Clear Filters");
    fireEvent.click(button);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});
