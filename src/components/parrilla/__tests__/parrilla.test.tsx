import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  getParrillaItems,
  getParrillaStats,
  filterParrillaItems,
} from "@/services/parrilla";
import { ParrillaTable } from "@/components/parrilla/parrilla-table";
import { ParrillaCards } from "@/components/parrilla/parrilla-cards";
import type { ParrillaFilterState } from "@/types/parrilla";

describe("Parrilla Service and Models", () => {
  const items = getParrillaItems();

  it("loads all structured content items", () => {
    expect(items.length).toBeGreaterThanOrEqual(20);
  });

  it("calculates accurate stats and real view counts", () => {
    const stats = getParrillaStats(items);
    expect(stats.totalItems).toBe(22);
    expect(stats.publishedCount).toBe(20);
    expect(stats.totalViews).toBeGreaterThan(10000); // 11.926+ real views
    expect(stats.channelsCount.YouTube).toBe(21);
    expect(stats.channelsCount.Instagram).toBe(1);
  });

  it("filters items by YouTube channel", () => {
    const filterState: ParrillaFilterState = {
      search: "",
      channel: "YouTube",
      pillar: "all",
      status: "all",
      format: "all",
    };
    const results = filterParrillaItems(items, filterState);
    expect(results.every((r) => r.channel === "YouTube")).toBe(true);
    expect(results.length).toBe(21);
  });

  it("filters items by keyword in hook or title", () => {
    const filterState: ParrillaFilterState = {
      search: "700 mil",
      channel: "all",
      pillar: "all",
      status: "all",
      format: "all",
    };
    const results = filterParrillaItems(items, filterState);
    expect(results.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Parrilla UI Components", () => {
  const items = getParrillaItems();

  it("renders ParrillaTable and triggers selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<ParrillaTable items={items} onSelectItem={handleSelect} />);

    expect(screen.getByText("PAR-001")).toBeInTheDocument();
    const titleElements = screen.getAllByText(/LA LECCION DE 700 MIL DOLARES/i);
    expect(titleElements.length).toBeGreaterThan(0);

    const buttons = screen.getAllByRole("button", { name: /ficha/i });
    await user.click(buttons[0]);
    expect(handleSelect).toHaveBeenCalledWith(items[0]);
  });

  it("renders ParrillaCards and triggers selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<ParrillaCards items={items} onSelectItem={handleSelect} />);

    expect(screen.getByText("PAR-002")).toBeInTheDocument();
    const buttons = screen.getAllByRole("button", { name: /ficha/i });
    await user.click(buttons[0]);
    expect(handleSelect).toHaveBeenCalled();
  });

  it("renders direct publication links for verification", () => {
    render(<ParrillaTable items={items} onSelectItem={vi.fn()} />);
    const linkButtons = screen.getAllByRole("link", { name: /ver enlace/i });
    expect(linkButtons.length).toBeGreaterThan(0);
    expect(linkButtons[0]).toHaveAttribute("href", expect.stringContaining("youtube.com"));
  });
});
