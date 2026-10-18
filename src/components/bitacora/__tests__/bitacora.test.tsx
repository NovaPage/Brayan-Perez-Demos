import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  getBitacoraItems,
  getBitacoraStats,
  filterBitacoraItems,
} from "@/services/bitacora";
import { BitacoraTable } from "@/components/bitacora/bitacora-table";
import { BitacoraCards } from "@/components/bitacora/bitacora-cards";
import type { BitacoraFilterState } from "@/types/bitacora";

describe("Bitacora Service and Models", () => {
  const items = getBitacoraItems();

  it("loads all 7 standardized items from centralized json", () => {
    expect(items.length).toBe(7);
  });

  it("calculates correct statistics and budget sum", () => {
    const stats = getBitacoraStats(items);
    expect(stats.totalItems).toBe(7);
    expect(stats.totalPendingCostCOP).toBe(2725000); // 2.500.000 + 225.000
    expect(stats.highPriorityCount).toBeGreaterThan(0);
    expect(stats.hierarchicalSubtasksCount).toBe(1); // BP-006 is a subtask of BP-004
  });

  it("filters items by search keyword", () => {
    const filterState: BitacoraFilterState = {
      search: "trípode",
      category: "all",
      status: "all",
      priority: "all",
    };
    const results = filterBitacoraItems(items, filterState);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("BP-002");
  });

  it("filters items by category", () => {
    const filterState: BitacoraFilterState = {
      search: "",
      category: "hardware",
      status: "all",
      priority: "all",
    };
    const results = filterBitacoraItems(items, filterState);
    expect(results.length).toBe(1);
    expect(results[0].code).toBe("BP-001");
  });
});

describe("Bitacora UI Components", () => {
  const items = getBitacoraItems();

  it("renders BitacoraTable with items and triggers selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<BitacoraTable items={items} onSelectItem={handleSelect} />);

    expect(screen.getByText("BP-001")).toBeInTheDocument();
    expect(
      screen.getByText("Adquisición de PC portátil de alto rendimiento")
    ).toBeInTheDocument();

    const selectButtons = screen.getAllByRole("button", { name: /ver/i });
    await user.click(selectButtons[0]);
    expect(handleSelect).toHaveBeenCalledWith(items[0]);
  });

  it("renders BitacoraCards with mobile details button and triggers selection", async () => {
    const handleSelect = vi.fn();
    const user = userEvent.setup();

    render(<BitacoraCards items={items} onSelectItem={handleSelect} />);

    expect(screen.getByText("BP-002")).toBeInTheDocument();
    const detailButtons = screen.getAllByRole("button", { name: /detalles/i });
    await user.click(detailButtons[0]);
    expect(handleSelect).toHaveBeenCalled();
  });
});
