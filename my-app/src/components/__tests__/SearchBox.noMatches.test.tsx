import { screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { useState } from "react";
import SearchBox from "../SearchBox";
import type { SearchSuggestion } from "../SearchBox";
import { renderWithProviders } from "../../tests/utils";
import toast from "react-hot-toast";
import type { Mock } from "vitest";

const toastMock = toast as unknown as Mock;

type ControlledProps = {
  initial?: string;
  suggestions?: SearchSuggestion[];
  debounceMs?: number;
};

function ControlledSearch({
  initial = "",
  suggestions = [],
  debounceMs = 10,
}: ControlledProps) {
  const [q, setQ] = useState(initial);
  return (
    <SearchBox
      value={q}
      onChange={setQ}
      suggestions={suggestions}
      toPrefix="/products/"
      debounceMs={debounceMs}
    />
  );
}

describe("SearchBox no-matches toast", () => {
  it("toasts once when there are no matches for a term (>=2 chars)", async () => {
    renderWithProviders(<ControlledSearch suggestions={[]} debounceMs={10} />);

    const input = screen.getByRole("searchbox", { name: /search products/i });
    await user.click(input);
    await user.type(input, "abc");

    await new Promise((r) => setTimeout(r, 25));

    expect(toastMock).toHaveBeenCalledTimes(1);
    const msg = String(toastMock.mock.calls[0][0]);
    expect(msg).toContain("No matches for “abc”");
  });

  it("does not toast for short terms (< 2 chars)", async () => {
    renderWithProviders(<ControlledSearch suggestions={[]} debounceMs={10} />);
    const input = screen.getByRole("searchbox", { name: /search products/i });
    await user.click(input);
    await user.type(input, "a");

    await new Promise((r) => setTimeout(r, 25));

    expect(toastMock).toHaveBeenCalledTimes(0);
  });
});
