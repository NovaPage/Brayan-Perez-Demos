"use client";

import * as React from "react";
import type { BitacoraItem } from "@/types/bitacora";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/services/bitacora";
import { GitFork, DollarSign, ArrowRight } from "lucide-react";

interface BitacoraCardsProps {
  items: BitacoraItem[];
  onSelectItem: (item: BitacoraItem) => void;
}

export function BitacoraCards({ items, onSelectItem }: BitacoraCardsProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 p-8 text-center">
        <p className="text-sm text-muted-foreground">
          No se encontraron tareas pendientes con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3.5">
      {items.map((item) => {
        const cat = CATEGORY_LABELS[item.category] || {
          label: item.category,
          color: "bg-muted text-muted-foreground",
        };

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
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                </div>
                <Badge
                  variant={
                    item.priority === "alta"
                      ? "destructive"
                      : item.priority === "media"
                      ? "secondary"
                      : "outline"
                  }
                  className="text-[10px] uppercase tracking-wide"
                >
                  {item.priority}
                </Badge>
              </div>

              <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                {item.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-3">
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                {item.summary}
              </p>

              {/* Jerarquía si es subtarea */}
              {item.parentTitle && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/30 px-2.5 py-1.5 rounded-md border border-border/40">
                  <GitFork className="size-3.5 text-foreground shrink-0" />
                  <span className="truncate">
                    Subtarea de:{" "}
                    <strong className="text-foreground">{item.parentTitle}</strong>
                  </span>
                </div>
              )}

              {/* Presupuesto */}
              {item.cost && item.cost.status !== "no_aplica" && (
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-2.5 text-xs">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <DollarSign className="size-3.5 text-emerald-500" />
                    Inversión:
                  </span>
                  <span className="font-bold text-foreground font-display">
                    {item.cost.formattedText}
                  </span>
                </div>
              )}
            </CardContent>

            <CardFooter className="p-4 pt-0 border-t border-border/40 mt-1 flex items-center justify-between text-xs text-muted-foreground">
              <Badge variant="outline" className="text-[10px] capitalize">
                {item.status.replace("_", " ")}
              </Badge>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 text-xs font-medium text-foreground hover:bg-muted"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectItem(item);
                }}
              >
                <span>Detalles</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
