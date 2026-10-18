"use client";

import * as React from "react";
import type {
  ParrillaItem,
  ParrillaFilterState,
  ContentPillar,
  ContentChannel,
} from "@/types/parrilla";
import {
  filterParrillaItems,
  getParrillaStats,
  PILLAR_META,
} from "@/services/parrilla";
import { useIsMobile } from "@/hooks/use-mobile";
import { ParrillaHeader } from "./parrilla-header";
import { ParrillaTable } from "./parrilla-table";
import { ParrillaCards } from "./parrilla-cards";
import { ParrillaDetailModal } from "./parrilla-detail-modal";
import { ParrillaImportModal } from "./parrilla-import-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  LayoutGrid,
  Table as TableIcon,
  FilterX,
} from "lucide-react";
import {
  YouTubeIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/ui/social-icons";

interface ParrillaViewProps {
  initialItems: ParrillaItem[];
}

export function ParrillaView({ initialItems }: ParrillaViewProps) {
  const isMobile = useIsMobile();
  const [items, setItems] = React.useState<ParrillaItem[]>(initialItems);
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [lastSyncTime, setLastSyncTime] = React.useState<string>("Reciente");
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);

  const handleItemImported = (newItem: ParrillaItem) => {
    setItems((prev) => [newItem, ...prev.filter((i) => i.id !== newItem.id)]);
  };

  const handleLiveSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/parrilla/sync");
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items)) {
          setItems(data.items);
          const time = new Date().toLocaleTimeString("es-CO", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });
          setLastSyncTime(time);
        }
      }
    } catch (e) {
      console.error("Error sincronizando en tiempo real:", e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Filter State
  const [filters, setFilters] = React.useState<ParrillaFilterState>({
    search: "",
    pillar: "all",
    channel: "all",
    status: "all",
    format: "all",
  });

  // View mode
  const [viewMode, setViewMode] = React.useState<"auto" | "table" | "cards">("auto");

  // Selected item for modal/drawer
  const [selectedItem, setSelectedItem] = React.useState<ParrillaItem | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Compute stats and filtered items
  const stats = React.useMemo(() => getParrillaStats(items), [items]);
  const filteredItems = React.useMemo(
    () => filterParrillaItems(items, filters),
    [items, filters]
  );

  const handleSelectItem = (item: ParrillaItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      pillar: "all",
      channel: "all",
      status: "all",
      format: "all",
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.pillar !== "all" ||
    filters.channel !== "all" ||
    filters.status !== "all" ||
    filters.format !== "all";

  const isCardsMode =
    isMobile || viewMode === "cards" || (viewMode === "auto" && isMobile);

  const channels: ContentChannel[] = ["YouTube", "Instagram", "TikTok"];
  const pillars: ContentPillar[] = ["mindset", "trading_riesgo", "marca_personal"];

  return (
    <div className="space-y-8">
      {/* Metrics Header */}
      <ParrillaHeader
        stats={stats}
        isSyncing={isSyncing}
        onSync={handleLiveSync}
        lastSyncTime={lastSyncTime}
        onOpenImport={() => setIsImportModalOpen(true)}
      />

      {/* Filter and Control Bar */}
      <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Buscar por título, gancho (hook), copy, hashtags..."
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

        {/* Channel Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-semibold text-muted-foreground uppercase mr-1">
            Canal:
          </span>
          <Button
            variant={filters.channel === "all" ? "default" : "outline"}
            size="sm"
            className="h-7 text-xs rounded-full px-3"
            onClick={() => setFilters((prev) => ({ ...prev, channel: "all" }))}
          >
            Todos ({items.length})
          </Button>

          {channels.map((ch) => {
            const count = items.filter((i) => i.channel === ch).length;
            const isSelected = filters.channel === ch;

            return (
              <Button
                key={ch}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-7 text-xs rounded-full px-3 gap-1.5 ${
                  isSelected ? "" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    channel: isSelected ? "all" : ch,
                  }))
                }
              >
                {ch === "YouTube" && <YouTubeIcon className="size-3" />}
                {ch === "Instagram" && <InstagramIcon className="size-3" />}
                {ch === "TikTok" && <TikTokIcon className="size-3" />}
                <span>{ch} ({count})</span>
              </Button>
            );
          })}
        </div>

        {/* Pillar Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-border/50">
          <span className="text-xs font-semibold text-muted-foreground uppercase mr-1">
            Pilar:
          </span>
          <Button
            variant={filters.pillar === "all" ? "secondary" : "ghost"}
            size="sm"
            className="h-7 text-xs rounded-full px-2.5"
            onClick={() => setFilters((prev) => ({ ...prev, pillar: "all" }))}
          >
            Todos los Pilares
          </Button>
          {pillars.map((pil) => {
            const meta = PILLAR_META[pil];
            const isSelected = filters.pillar === pil;

            return (
              <Button
                key={pil}
                variant={isSelected ? "default" : "outline"}
                size="sm"
                className={`h-7 text-xs rounded-full px-2.5 ${
                  isSelected ? "" : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    pillar: isSelected ? "all" : pil,
                  }))
                }
              >
                {meta.label}
              </Button>
            );
          })}

          {/* Status Quick Filter: Solo Publicados */}
          <div className="ml-auto flex items-center gap-1.5">
            <Button
              variant={filters.status === "publicado" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs rounded-full px-2.5"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  status: prev.status === "publicado" ? "all" : "publicado",
                }))
              }
            >
              Solo Publicados
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearFilters}
                className="h-7 text-xs gap-1 text-muted-foreground hover:text-foreground"
              >
                <FilterX className="size-3" />
                <span>Limpiar</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Results Count & Active View */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Mostrando <strong>{filteredItems.length}</strong> de{" "}
            <strong>{items.length}</strong> piezas de contenido
          </span>
          <span className="font-mono text-[11px]">
            {isCardsMode ? "Vista: Cards (Optimizado Mobile)" : "Vista: Tabla estándar"}
          </span>
        </div>

        {isCardsMode ? (
          <ParrillaCards items={filteredItems} onSelectItem={handleSelectItem} />
        ) : (
          <ParrillaTable items={filteredItems} onSelectItem={handleSelectItem} />
        )}
      </div>

      {/* Responsive Dialog (Desktop) / Drawer (Mobile) */}
      <ParrillaDetailModal
        item={selectedItem}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {/* Dynamic Social Import Modal */}
      <ParrillaImportModal
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
        onItemImported={handleItemImported}
      />
    </div>
  );
}
