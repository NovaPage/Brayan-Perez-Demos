"use client";

import * as React from "react";
import type { BitacoraItem } from "@/types/bitacora";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/services/bitacora";
import { Eye, GitFork } from "lucide-react";

interface BitacoraTableProps {
  items: BitacoraItem[];
  onSelectItem: (item: BitacoraItem) => void;
}

export function BitacoraTable({ items, onSelectItem }: BitacoraTableProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center">
        <p className="text-sm text-muted-foreground">
          No se encontraron tareas pendientes con los filtros seleccionados.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-xs">
      <Table>
        <TableHeader className="bg-muted/40">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[100px] font-mono text-xs">CÓDIGO</TableHead>
            <TableHead className="min-w-[280px] text-xs">TAREA / ALCANCE</TableHead>
            <TableHead className="text-xs">CATEGORÍA</TableHead>
            <TableHead className="text-xs">PRIORIDAD</TableHead>
            <TableHead className="text-xs">PRESUPUESTO</TableHead>
            <TableHead className="text-xs">ESTADO</TableHead>
            <TableHead className="text-xs">ESTRUCTURA</TableHead>
            <TableHead className="w-[100px] text-right text-xs">ACCIÓN</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const cat = CATEGORY_LABELS[item.category] || {
              label: item.category,
              color: "bg-muted text-muted-foreground",
            };

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

                {/* Título & Resumen */}
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                      {item.summary}
                    </p>
                  </div>
                </TableCell>

                {/* Categoría */}
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${cat.color}`}
                  >
                    {cat.label}
                  </span>
                </TableCell>

                {/* Prioridad */}
                <TableCell>
                  <Badge
                    variant={
                      item.priority === "alta"
                        ? "destructive"
                        : item.priority === "media"
                        ? "secondary"
                        : "outline"
                    }
                    className="text-[11px] uppercase tracking-wider"
                  >
                    {item.priority}
                  </Badge>
                </TableCell>

                {/* Costo */}
                <TableCell>
                  <span className="font-display font-medium text-xs text-foreground">
                    {item.cost?.formattedText || "—"}
                  </span>
                </TableCell>

                {/* Estado */}
                <TableCell>
                  <Badge
                    variant="outline"
                    className="capitalize text-[11px] bg-background/50"
                  >
                    {item.status.replace("_", " ")}
                  </Badge>
                </TableCell>

                {/* Estructura / Jerarquía */}
                <TableCell>
                  {item.parentId ? (
                    <span
                      className="inline-flex items-center gap-1 text-[11px] text-muted-foreground font-mono bg-muted/60 px-2 py-0.5 rounded-md"
                      title={`Subtarea de: ${item.parentTitle}`}
                    >
                      <GitFork className="size-3 text-foreground" />
                      Subtarea
                    </span>
                  ) : item.subtasks && item.subtasks.length > 0 ? (
                    <span className="inline-flex items-center gap-1 text-[11px] text-foreground font-mono bg-muted px-2 py-0.5 rounded-md font-medium">
                      Padre ({item.subtasks.length})
                    </span>
                  ) : (
                    <span className="text-[11px] text-muted-foreground/60">—</span>
                  )}
                </TableCell>

                {/* Acción */}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 text-xs opacity-70 group-hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                  >
                    <Eye className="size-3.5" />
                    <span>Ver</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
