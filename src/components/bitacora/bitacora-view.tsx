"use client";

import * as React from "react";
import type {
  BitacoraItem,
  BitacoraFilterState,
  BitacoraCategory,
} from "@/types/bitacora";
import {
  filterBitacoraItems,
  getBitacoraStats,
  CATEGORY_LABELS,
} from "@/services/bitacora";
import { useIsMobile } from "@/hooks/use-mobile";
import { BitacoraHeader } from "./bitacora-header";
import { BitacoraTable } from "./bitacora-table";
import { BitacoraCards } from "./bitacora-cards";
import { BitacoraDetailModal } from "./bitacora-detail-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, LayoutGrid, Table as TableIcon, FilterX } from "lucide-react";

interface BitacoraViewProps {
  initialItems: BitacoraItem[];
}

export function BitacoraView({ initialItems }: BitacoraViewProps) {
  const isMobile = useIsMobile();
  const [items] = React.useState<BitacoraItem[]>(initialItems);

  // Filters State
  const [filters, setFilters] = React.useState<BitacoraFilterState>({
    search: "",
    category: "all",
    status: "all",
    priority: "all",
  });

  // Manual view toggle for desktop (Table vs Grid)
  const [viewMode, setViewMode] = React.useState<"auto" | "table" | "cards">("auto");

  // Selected item for Dialog/Drawer
  const [selectedItem, setSelectedItem] = React.useState<BitacoraItem | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Compute stats on the full dataset
  const stats = React.useMemo(() => getBitacoraStats(items), [items]);

  // Compute filtered items
  const filteredItems = React.useMemo(
    () => filterBitacoraItems(items, filters),
    [items, filters]
  );

  const handleSelectItem = (item: BitacoraItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "all",
      status: "all",
      priority: "all",
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.status !== "all" ||
    filters.priority !== "all";

  // Effective display mode: if mobile, always cards. If desktop, check viewMode preference.
  const isCardsMode =
    isMobile || viewMode === "cards" || (viewMode === "auto" && isMobile);

  const categories: BitacoraCategory[] = [
    "hardware",
    "produccion",
    "talento",
    "estrategia",
    "automatizacion",
    "branding",
  ];

  return (
    <div className="space-y-8">
      {/* Header with Metrics */}
      <BitacoraHeader stats={stats} />

      {/* Filter and Control Bar */}
      <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar por tarea, código, tags o alcance..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="pl-9 bg-background/80"
            />
          </div>

          {/* Desktop View Switcher */}
          <div className="hidden md:flex items-center gap-1 rounded-lg border border-border p-1 bg-muted/40 shrink-0">
            <Button
              variant={viewMode === "table" || viewMode === "auto" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 gap-1.5 text-xs px-2.5"
              onClick={() => setViewMode("table")}
            >
              <TableIcon className="size-3.5" />
              <span>Tabla</span>
            </Button>
            <Button
              variant={viewMode === "cards" ? "secondary" : "ghost"}
              size="sm"
              className="h-8 gap-1.5 text-xs px-2.5"
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="size-3.5" />
              <span>Cards</span>
            </Button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <Button
            variant={filters.category === "all" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs rounded-full px-3"
            onClick={() => setFilters((prev) => ({ ...prev, category: "all" }))}
          >
            Todas ({items.length})
          </Button>

          {categories.map((catKey) => {
            const count = items.filter((i) => i.category === catKey).length;
            const meta = CATEGORY_LABELS[catKey];
            const isSelected = filters.category === catKey;

            return (
              <Button
                key={catKey}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-7 text-xs rounded-full px-3 transition-colors ${
                  isSelected ? "" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    category: isSelected ? "all" : catKey,
                  }))
                }
              >
                {meta.label} ({count})
              </Button>
            );
          })}

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
            >
              <FilterX className="size-3" />
              <span>Limpiar filtros</span>
            </Button>
          )}
        </div>
      </div>

      {/* Results Count & Active View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Mostrando <strong>{filteredItems.length}</strong> de{" "}
            <strong>{items.length}</strong> tareas
          </span>
          <span className="font-mono text-[11px]">
            {isCardsMode ? "Vista: Cards (Optimizado Mobile)" : "Vista: Tabla estándar"}
          </span>
        </div>

        {isCardsMode ? (
          <BitacoraCards items={filteredItems} onSelectItem={handleSelectItem} />
        ) : (
          <BitacoraTable items={filteredItems} onSelectItem={handleSelectItem} />
        )}
      </div>

      {/* Responsive Dialog (Desktop) / Drawer (Mobile) */}
      <BitacoraDetailModal
        item={selectedItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  );
}
