import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ContextualEmptyState,
  SearchEmpty,
} from "@techaaroorian-ui/contextual-empty";
import "@techaaroorian-ui/contextual-empty/dist/index.css";

const meta: Meta<typeof ContextualEmptyState> = {
  title: "Core/ContextualEmptyState",
  component: ContextualEmptyState,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["default", "error", "success", "warning", "offline"],
      description: "The semantic context of the empty state.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContextualEmptyState>;

export const PrimitiveError: Story = {
  render: (args) => (
    <ContextualEmptyState {...args}>
      <ContextualEmptyState.Icon>
        <span style={{ fontSize: "48px" }}>⚠️</span>
      </ContextualEmptyState.Icon>
      <ContextualEmptyState.Content>
        <h3>Connection Lost</h3>
        <p>
          We couldn't connect to the server. Please check your internet
          connection.
        </p>
      </ContextualEmptyState.Content>
      <ContextualEmptyState.Actions>
        <button type="button" onClick={() => alert("Retrying...")}>
          Retry Connection
        </button>
      </ContextualEmptyState.Actions>
    </ContextualEmptyState>
  ),
  args: {
    type: "error",
  },
};

export const SearchPreset: StoryObj<typeof SearchEmpty> = {
  render: (args) => <SearchEmpty {...args} />,
  args: {
    query: "Quantum Mechanics",
    actionText: "Clear Search",
  },
};
