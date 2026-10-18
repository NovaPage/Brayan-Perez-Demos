import rawData from "@/data/parrilla.json";
import type {
  ParrillaDataset,
  ParrillaItem,
  ParrillaFilterState,
  ContentPillar,
  ContentFormat,
  ContentStatus,
  ContentChannel,
} from "@/types/parrilla";

export const PARRILLA_DATASET: ParrillaDataset = rawData as unknown as ParrillaDataset;

export function getParrillaItems(): ParrillaItem[] {
  return PARRILLA_DATASET.items;
}

export function getParrillaItemById(id: string): ParrillaItem | undefined {
  return PARRILLA_DATASET.items.find((item) => item.id === id);
}

export function filterParrillaItems(
  items: ParrillaItem[],
  filters: ParrillaFilterState
): ParrillaItem[] {
  return items.filter((item) => {
    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const inTitle = item.title.toLowerCase().includes(q);
      const inHook = item.hook.toLowerCase().includes(q);
      const inCaption = item.caption.toLowerCase().includes(q);
      const inCode = item.code.toLowerCase().includes(q);
      const inHashtags = item.hashtags.some((h) => h.toLowerCase().includes(q));
      if (!inTitle && !inHook && !inCaption && !inCode && !inHashtags) {
        return false;
      }
    }

    // Pillar
    if (filters.pillar !== "all" && item.pillar !== filters.pillar) {
      return false;
    }

    // Channel
    if (filters.channel !== "all" && item.channel !== filters.channel) {
      return false;
    }

    // Status
    if (filters.status !== "all" && item.status !== filters.status) {
      return false;
    }

    // Format
    if (filters.format !== "all" && item.format !== filters.format) {
      return false;
    }

    return true;
  });
}

export interface ParrillaStats {
  totalItems: number;
  publishedCount: number;
  scheduledCount: number;
  inProgressCount: number;
  totalViews: number;
  channelsCount: Record<ContentChannel, number>;
  pillarsCount: Record<ContentPillar, number>;
}

export function getParrillaStats(items: ParrillaItem[]): ParrillaStats {
  const stats: ParrillaStats = {
    totalItems: items.length,
    publishedCount: 0,
    scheduledCount: 0,
    inProgressCount: 0,
    totalViews: 0,
    channelsCount: {
      YouTube: 0,
      Instagram: 0,
      TikTok: 0,
      Multiplataforma: 0,
    },
    pillarsCount: {
      mindset: 0,
      trading_riesgo: 0,
      marca_personal: 0,
    },
  };

  for (const item of items) {
    if (item.status === "publicado") {
      stats.publishedCount++;
    } else if (item.status === "programado") {
      stats.scheduledCount++;
    } else {
      stats.inProgressCount++;
    }

    if (item.metrics?.views) {
      stats.totalViews += item.metrics.views;
    }

    if (item.channel in stats.channelsCount) {
      stats.channelsCount[item.channel]++;
    }

    if (item.pillar in stats.pillarsCount) {
      stats.pillarsCount[item.pillar]++;
    }
  }

  return stats;
}

export const PILLAR_META: Record<
  ContentPillar,
  { label: string; color: string; badgeClass: string }
> = {
  mindset: {
    label: "Mindset & Psicología",
    color: "text-indigo-400",
    badgeClass: "bg-indigo-500/10 text-indigo-500 border-indigo-500/20",
  },
  trading_riesgo: {
    label: "Trading Técnico & Riesgo",
    color: "text-emerald-400",
    badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  marca_personal: {
    label: "Marca Personal & Filosofía",
    color: "text-amber-400",
    badgeClass: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
};

export const FORMAT_META: Record<ContentFormat, { label: string; badge: string }> = {
  video_largo: { label: "Video Largo / Podcast", badge: "YouTube 16:9" },
  reel: { label: "Instagram Reel", badge: "Reel 9:16" },
  short: { label: "YouTube Short", badge: "Short 9:16" },
  tiktok: { label: "TikTok Video", badge: "TikTok 9:16" },
  carrusel: { label: "Carrusel Editorial", badge: "Carrusel 4:5" },
};

export const STATUS_META: Record<
  ContentStatus,
  { label: string; variant: "default" | "secondary" | "outline" | "destructive" }
> = {
  publicado: { label: "Publicado", variant: "default" },
  programado: { label: "Programado", variant: "secondary" },
  en_edicion: { label: "En Edición", variant: "outline" },
  en_guion: { label: "En Guion", variant: "outline" },
};
