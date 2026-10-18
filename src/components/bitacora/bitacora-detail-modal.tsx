"use client";

import * as React from "react";
import type { BitacoraItem } from "@/types/bitacora";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/services/bitacora";
import {
  CheckCircle2,
  GitFork,
  DollarSign,
  Tag,
  Video,
  ListTodo,
  Info,
} from "lucide-react";

interface BitacoraDetailModalProps {
  item: BitacoraItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BitacoraDetailModal({
  item,
  open,
  onOpenChange,
}: BitacoraDetailModalProps) {
  const isMobile = useIsMobile();

  if (!item) return null;

  const categoryMeta = CATEGORY_LABELS[item.category] || {
    label: item.category,
    color: "bg-muted text-muted-foreground",
  };

  const content = (
    <div className="flex flex-col gap-5 py-2 px-1 text-sm overflow-y-auto max-h-[70vh]">
      {/* Category & Status Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono text-xs font-semibold">
          {item.code}
        </Badge>
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${categoryMeta.color}`}
        >
          {categoryMeta.label}
        </span>
        <Badge
          variant={
            item.priority === "alta"
              ? "destructive"
              : item.priority === "media"
              ? "secondary"
              : "outline"
          }
          className="text-xs uppercase"
        >
          Prioridad {item.priority}
        </Badge>
        <Badge variant="outline" className="text-xs capitalize">
          {item.status.replace("_", " ")}
        </Badge>
      </div>

      {/* Hierarchical Relation (if Subtask) */}
      {item.parentTitle && (
        <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/40 p-2.5 text-xs text-muted-foreground">
          <GitFork className="size-4 shrink-0 text-foreground" />
          <span>
            Subtarea vinculada jerárquicamente a:{" "}
            <strong className="text-foreground">{item.parentTitle}</strong>
          </span>
        </div>
      )}

      {/* Summary */}
      <p className="text-muted-foreground leading-relaxed">{item.summary}</p>

      {/* Presupuesto / Costo */}
      {item.cost && (
        <div className="rounded-xl border border-border/70 bg-card p-3.5 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <DollarSign className="size-3.5 text-emerald-500" />
              Presupuesto / Inversión
            </span>
            <span className="font-mono uppercase text-[11px] text-foreground">
              {item.cost.status.replace("_", " ")}
            </span>
          </div>
          <div className="text-lg font-bold font-display text-foreground">
            {item.cost.formattedText}
          </div>
          {item.cost.notes && (
            <p className="text-xs text-muted-foreground leading-normal">
              {item.cost.notes}
            </p>
          )}
        </div>
      )}

      {/* Objetivos de la Tarea */}
      {item.objectives && item.objectives.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-foreground" />
            Objetivos Clave
          </div>
          <ul className="space-y-1.5">
            {item.objectives.map((obj, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-xs leading-normal text-foreground/90 bg-muted/20 p-2 rounded-md border border-border/40"
              >
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Subtareas anidadas (si es tarea padre) */}
      {item.subtasks && item.subtasks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <ListTodo className="size-3.5 text-foreground" />
            Estructura de Subtareas
          </div>
          <div className="space-y-1.5">
            {item.subtasks.map((st) => (
              <div
                key={st.id}
                className="flex items-center justify-between gap-2 rounded-md border border-border/50 bg-background px-3 py-2 text-xs"
              >
                <span className="font-medium text-foreground">{st.title}</span>
                <Badge variant="outline" className="text-[10px] capitalize">
                  {st.status.replace("_", " ")}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detalles Específicos Variables */}
      {item.details && item.details.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Info className="size-3.5 text-foreground" />
            Detalles Asociados
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {item.details.map((detail, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border/60 bg-muted/30 p-2.5 text-xs space-y-1"
              >
                <span className="text-muted-foreground text-[11px] block font-medium">
                  {detail.label}
                </span>
                <span className="text-foreground font-semibold block leading-tight">
                  {detail.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Canales Objetivo */}
      {item.channels && item.channels.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Video className="size-3.5 text-foreground" />
            Canales Destino
          </div>
          <div className="flex flex-wrap gap-1.5">
            {item.channels.map((channel) => (
              <span
                key={channel}
                className="inline-flex items-center gap-1.5 rounded-md border border-border/80 bg-background px-2.5 py-1 text-xs font-medium text-foreground shadow-2xs"
              >
                {channel === "YouTube" && (
                  <svg
                    className="size-3.5 text-red-500 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                {channel === "Instagram" && (
                  <svg
                    className="size-3.5 text-pink-500 stroke-current fill-none"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                )}
                {channel === "TikTok" && (
                  <svg
                    className="size-3.5 text-cyan-400 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                  </svg>
                )}
                {channel}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
          <Tag className="size-3 text-muted-foreground mr-1" />
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // Desktop View: Dialog
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl max-h-[88vh] overflow-hidden flex flex-col p-6">
          <DialogHeader className="space-y-1 pb-2 border-b border-border/60">
            <DialogTitle className="text-lg font-bold leading-snug">
              {item.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Expediente de tarea en la bitácora del proyecto Brayan Pérez
            </DialogDescription>
          </DialogHeader>
          {content}
          <div className="pt-3 border-t border-border/60 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenChange(false)}
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Mobile View: Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="px-4 pb-6 max-h-[90dvh]">
        <DrawerHeader className="text-left pb-2 border-b border-border/60">
          <DrawerTitle className="text-base font-bold leading-snug">
            {item.title}
          </DrawerTitle>
          <DrawerDescription className="text-xs text-muted-foreground">
            Detalles y objetivos de la bitácora
          </DrawerDescription>
        </DrawerHeader>
        {content}
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Cerrar
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
