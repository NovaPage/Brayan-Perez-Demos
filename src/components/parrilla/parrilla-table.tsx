"use client";

import * as React from "react";
import type { ParrillaItem } from "@/types/parrilla";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PILLAR_META,
  FORMAT_META,
  STATUS_META,
} from "@/services/parrilla";
import { Eye, Clock, Calendar, Sparkles, ExternalLink } from "lucide-react";

interface ParrillaTableProps {
  items: ParrillaItem[];
  onSelectItem: (item: ParrillaItem) => void;
}

export function ParrillaTable({ items, onSelectItem }: ParrillaTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No se encontraron contenidos con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[90px] font-mono text-xs">CÓDIGO</TableHead>
            <TableHead className="w-[120px] text-xs">CANAL</TableHead>
            <TableHead className="min-w-[280px] text-xs">TÍTULO & GANCHO</TableHead>
            <TableHead className="text-xs">PILAR</TableHead>
            <TableHead className="text-xs">FORMATO</TableHead>
            <TableHead className="text-xs">PUBLICACIÓN</TableHead>
            <TableHead className="text-xs">ESTADO</TableHead>
            <TableHead className="text-xs">VISTAS</TableHead>
            <TableHead className="w-[140px] text-right text-xs">ACCIÓN & ENLACE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const pillar = PILLAR_META[item.pillar];
            const format = FORMAT_META[item.format];
            const status = STATUS_META[item.status];

            return (
              <TableRow
                key={item.id}
                className="group cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => onSelectItem(item)}
              >
                {/* Código */}
                <TableCell className="font-mono text-xs font-semibold text-muted-foreground">
                  {item.code}
                </TableCell>

                {/* Canal */}
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 font-medium text-xs text-foreground">
                    {item.channel === "YouTube" && (
                      <svg
                        className="size-3.5 text-red-500 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                    {item.channel === "Instagram" && (
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
                    {item.channel === "TikTok" && (
                      <svg
                        className="size-3.5 text-cyan-400 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                      </svg>
                    )}
                    <span>{item.channel}</span>
                  </span>
                </TableCell>

                {/* Título & Gancho */}
                <TableCell>
                  <div className="space-y-0.5 max-w-md">
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 italic">
                      <Sparkles className="size-3 inline mr-1 text-primary" />
                      &ldquo;{item.hook}&rdquo;
                    </p>
                  </div>
                </TableCell>

                {/* Pilar */}
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${pillar.badgeClass}`}
                  >
                    {pillar.label}
                  </span>
                </TableCell>

                {/* Formato */}
                <TableCell>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {format.badge}
                  </span>
                </TableCell>

                {/* Fecha y Hora */}
                <TableCell>
                  <div className="text-xs space-y-0.5 whitespace-nowrap">
                    <span className="flex items-center gap-1 text-foreground font-mono">
                      <Calendar className="size-3 text-muted-foreground" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground text-[11px] font-mono">
                      <Clock className="size-3" />
                      {item.timeSlot}
                    </span>
                  </div>
                </TableCell>

                {/* Estado */}
                <TableCell>
                  <Badge
                    variant={status.variant}
                    className="capitalize text-[11px] whitespace-nowrap"
                  >
                    {status.label}
                  </Badge>
                </TableCell>

                {/* Métricas */}
                <TableCell>
                  {item.metrics?.views ? (
                    <span className="font-display font-semibold text-xs text-foreground">
                      {new Intl.NumberFormat("es-CO").format(item.metrics.views)}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/60">—</span>
                  )}
                </TableCell>

                {/* Acción */}
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {(item.media.videoUrl || item.cta.url) && (
                      <a
                        href={item.media.videoUrl || item.cta.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "h-7 px-2 text-xs gap-1 border-border/80 text-muted-foreground hover:text-red-500 hover:border-red-500/40"
                        )}
                        title="Ver publicación original directa"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="size-3" />
                        <span className="hidden xl:inline">Ver enlace</span>
                      </a>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs gap-1 opacity-80 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                    >
                      <Eye className="size-3.5" />
                      <span>Ficha</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
