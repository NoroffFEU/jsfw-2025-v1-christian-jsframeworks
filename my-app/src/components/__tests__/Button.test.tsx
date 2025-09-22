import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Button from "../Button";
import { renderWithProviders } from "../../tests/utils";

describe("Button", () => {
  it("renders children", () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("shows spinner + loading text and is disabled when loading", () => {
    renderWithProviders(
      <Button loading loadingText="Saving...">
        Save
      </Button>
    );
    const btn = screen.getByRole("button", { name: /saving/i });
    expect(btn).toBeDisabled();
  });

  it("calls onClick when not loading", async () => {
    const onClick = vi.fn();
    renderWithProviders(<Button onClick={onClick}>Do it</Button>);
    await user.click(screen.getByRole("button", { name: /do it/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
