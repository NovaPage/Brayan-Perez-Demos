export type BitacoraCategory =
  | "hardware"
  | "produccion"
  | "talento"
  | "estrategia"
  | "automatizacion"
  | "branding";

export type BitacoraStatus =
  | "pendiente"
  | "en_progreso"
  | "en_revision"
  | "completado";

export type BitacoraPriority = "alta" | "media" | "baja";

export interface BitacoraCost {
  amount?: number;
  currency: "COP" | "USD";
  status: "estimado" | "pendiente_cotizacion" | "fijado" | "no_aplica";
  formattedText: string;
  notes?: string;
}

export interface BitacoraDetailItem {
  label: string;
  value: string;
  type?: "text" | "currency" | "badge" | "link";
}

export interface BitacoraSubtask {
  id: string;
  title: string;
  status: BitacoraStatus;
  notes?: string;
}

export interface BitacoraItem {
  id: string;
  code: string;
  title: string;
  summary: string;
  category: BitacoraCategory;
  status: BitacoraStatus;
  priority: BitacoraPriority;
  cost?: BitacoraCost;
  parentId?: string;
  parentTitle?: string;
  subtasks?: BitacoraSubtask[];
  objectives: string[];
  details: BitacoraDetailItem[];
  channels?: string[];
  assignedTo?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BitacoraDataset {
  version: string;
  lastUpdated: string;
  project: {
    name: string;
    owner: string;
    slogan: string;
    portfolioUrl: string;
  };
  items: BitacoraItem[];
}

export interface BitacoraFilterState {
  search: string;
  category: "all" | BitacoraCategory;
  status: "all" | BitacoraStatus;
  priority: "all" | BitacoraPriority;
}
