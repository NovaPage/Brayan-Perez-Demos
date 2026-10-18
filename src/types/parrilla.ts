export type ContentPillar =
  | "mindset"
  | "trading_riesgo"
  | "marca_personal";

export type ContentFormat =
  | "video_largo"
  | "reel"
  | "short"
  | "tiktok"
  | "carrusel";

export type ContentChannel =
  | "YouTube"
  | "Instagram"
  | "TikTok"
  | "Multiplataforma";

export type ContentStatus =
  | "publicado"
  | "programado"
  | "en_edicion"
  | "en_guion";

export interface ContentMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  retentionRate?: string;
}

export interface ParrillaItem {
  id: string;
  code: string;
  title: string;
  pillar: ContentPillar;
  format: ContentFormat;
  channel: ContentChannel;
  status: ContentStatus;
  date: string;
  timeSlot: string; // e.g. "12:00 PM"
  hook: string; // First 3-5 seconds hook
  caption: string; // Complete social copy
  hashtags: string[];
  cta: {
    label: string;
    url: string;
    targetResource?: string;
  };
  parentEpisodeId?: string;
  parentEpisodeTitle?: string;
  media: {
    youtubeId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    duration?: string;
  };
  metrics?: ContentMetrics;
  assignedEditor?: string;
  notes?: string;
}

export interface ParrillaDataset {
  version: string;
  lastUpdated: string;
  framework: {
    name: string;
    description: string;
    pillars: Array<{
      id: ContentPillar;
      name: string;
      color: string;
      description: string;
    }>;
    channels: Array<{
      name: ContentChannel;
      handle: string;
      url: string;
      standardSchedule: string;
    }>;
  };
  items: ParrillaItem[];
}

export interface ParrillaFilterState {
  search: string;
  pillar: "all" | ContentPillar;
  channel: "all" | ContentChannel;
  status: "all" | ContentStatus;
  format: "all" | ContentFormat;
}
