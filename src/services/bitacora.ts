import rawData from "@/data/bitacora.json";
import type {
  BitacoraDataset,
  BitacoraItem,
  BitacoraFilterState,
  BitacoraCategory,
} from "@/types/bitacora";

export const BITACORA_DATASET: BitacoraDataset = rawData as BitacoraDataset;

export function getBitacoraItems(): BitacoraItem[] {
  return BITACORA_DATASET.items;
}

export function getBitacoraItemById(id: string): BitacoraItem | undefined {
  return BITACORA_DATASET.items.find((item) => item.id === id);
}

export function filterBitacoraItems(
  items: BitacoraItem[],
  filters: BitacoraFilterState
): BitacoraItem[] {
  return items.filter((item) => {
    // Search query matches title, summary, code or tags
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inCode = item.code.toLowerCase().includes(q);
      const inTags = item.tags.some((t) => t.toLowerCase().includes(q));
      if (!inTitle && !inSummary && !inCode && !inTags) {
        return false;
      }
    }

    // Category filter
    if (filters.category !== "all" && item.category !== filters.category) {
      return false;
    }

    // Status filter
    if (filters.status !== "all" && item.status !== filters.status) {
      return false;
    }

    // Priority filter
    if (filters.priority !== "all" && item.priority !== filters.priority) {
      return false;
    }

    return true;
  });
}

export interface BitacoraStats {
  totalItems: number;
  totalPendingCostCOP: number;
  highPriorityCount: number;
  categoriesCount: Record<BitacoraCategory, number>;
  hierarchicalSubtasksCount: number;
}

export function getBitacoraStats(items: BitacoraItem[]): BitacoraStats {
  const stats: BitacoraStats = {
    totalItems: items.length,
    totalPendingCostCOP: 0,
    highPriorityCount: 0,
    hierarchicalSubtasksCount: 0,
    categoriesCount: {
      hardware: 0,
      produccion: 0,
      talento: 0,
      estrategia: 0,
      automatizacion: 0,
      branding: 0,
    },
  };

  for (const item of items) {
    if (item.priority === "alta") {
      stats.highPriorityCount++;
    }
    if (item.parentId) {
      stats.hierarchicalSubtasksCount++;
    }
    if (item.category in stats.categoriesCount) {
      stats.categoriesCount[item.category]++;
    }
    if (item.cost?.amount && item.cost.currency === "COP") {
      stats.totalPendingCostCOP += item.cost.amount;
    }
  }

  return stats;
}

export const CATEGORY_LABELS: Record<
  BitacoraCategory,
  { label: string; color: string }
> = {
  hardware: { label: "Hardware", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  produccion: { label: "Producción & Set", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  talento: { label: "Talento Humano", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  estrategia: { label: "Estrategia", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  automatizacion: { label: "IA & Marketing", color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  branding: { label: "Branding", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
};
