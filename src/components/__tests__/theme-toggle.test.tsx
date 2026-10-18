import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeToggle } from "@/components/theme-toggle";

const mockSetTheme = vi.fn();
let mockCurrentTheme = "light";

vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: mockCurrentTheme,
    resolvedTheme: mockCurrentTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCurrentTheme = "light";
  });

  it("renders with accessible role and label", () => {
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /cambiar tema/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("data-testid", "theme-toggle-btn");
  });

  it("calls setTheme with 'dark' when clicked in light mode", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByTestId("theme-toggle-btn");

    await user.click(button);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("calls setTheme with 'light' when clicked in dark mode", async () => {
    mockCurrentTheme = "dark";
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByTestId("theme-toggle-btn");

    await user.click(button);
    expect(mockSetTheme).toHaveBeenCalledTimes(1);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });
});
