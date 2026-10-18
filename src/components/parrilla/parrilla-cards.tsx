"use client";

import * as React from "react";
import type { ParrillaItem } from "@/types/parrilla";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PILLAR_META,
  FORMAT_META,
  STATUS_META,
} from "@/services/parrilla";
import {
  Calendar,
  Clock,
  ArrowRight,
  Eye,
  Sparkles,
  ExternalLink,
} from "lucide-react";

interface ParrillaCardsProps {
  items: ParrillaItem[];
  onSelectItem: (item: ParrillaItem) => void;
}

export function ParrillaCards({ items, onSelectItem }: ParrillaCardsProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No se encontraron contenidos con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5">
      {items.map((item) => {
        const pillar = PILLAR_META[item.pillar];
        const format = FORMAT_META[item.format];
        const status = STATUS_META[item.status];

        return (
          <Card
            key={item.id}
            className="group overflow-hidden border-border/80 bg-card transition-all hover:border-foreground/30 hover:shadow-xs active:scale-[0.99] cursor-pointer"
            onClick={() => onSelectItem(item)}
          >
            <CardHeader className="p-4 pb-2 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-mono text-xs font-bold text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-md">
                    {item.code}
                  </span>
                  <span className="inline-flex items-center gap-1 font-medium text-xs text-foreground bg-muted/40 px-2 py-0.5 rounded-md border border-border/60">
                    {item.channel === "YouTube" && (
                      <svg
                        className="size-3 text-red-500 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                    {item.channel === "Instagram" && (
                      <svg
                        className="size-3 text-pink-500 stroke-current fill-none"
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
                        className="size-3 text-cyan-400 fill-current"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                      </svg>
                    )}
                    <span>{item.channel}</span>
                  </span>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${pillar.badgeClass}`}
                  >
                    {pillar.label}
                  </span>
                </div>
                <Badge variant={status.variant} className="text-[10px] capitalize">
                  {status.label}
                </Badge>
              </div>

              <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-2.5">
              {/* Hook */}
              <div className="rounded-lg bg-muted/40 p-2.5 border border-border/50 text-xs">
                <span className="flex items-center gap-1 text-[10px] uppercase font-semibold text-primary pb-0.5">
                  <Sparkles className="size-3" />
                  Gancho de retención
                </span>
                <p className="italic text-foreground/90 font-medium leading-relaxed">
                  &ldquo;{item.hook}&rdquo;
                </p>
              </div>

              {/* Schedule and Format info */}
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3 text-muted-foreground" />
                    {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {item.timeSlot}
                  </span>
                </div>
                <span className="text-[11px] font-mono">{format.badge}</span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 border-t border-border/40 mt-1 flex items-center justify-between text-xs text-muted-foreground">
              {item.metrics?.views ? (
                <span className="flex items-center gap-1 font-mono text-xs font-semibold text-foreground">
                  <Eye className="size-3.5 text-cyan-500" />
                  {new Intl.NumberFormat("es-CO").format(item.metrics.views)} views
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground">Sin publicar</span>
              )}

              <div className="flex items-center gap-1.5">
                {(item.media.videoUrl || item.cta.url) && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 px-2.5 text-xs font-medium gap-1 text-muted-foreground hover:text-red-500 hover:border-red-500/40"
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <a
                      href={item.media.videoUrl || item.cta.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="size-3 text-red-500" />
                      <span>Ver enlace</span>
                    </a>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs font-medium text-foreground hover:bg-muted"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectItem(item);
                  }}
                >
                  <span>Ficha</span>
                  <ArrowRight className="size-3.5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
