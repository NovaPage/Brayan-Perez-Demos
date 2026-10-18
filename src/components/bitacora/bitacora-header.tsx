"use client";

import * as React from "react";
import type { BitacoraStats } from "@/services/bitacora";
import { CheckCircle2, DollarSign, AlertCircle, GitFork } from "lucide-react";

interface BitacoraHeaderProps {
  stats: BitacoraStats;
}

export function BitacoraHeader({ stats }: BitacoraHeaderProps) {
  const formattedTotalCost = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(stats.totalPendingCostCOP);

  return (
    <div className="space-y-6">
      {/* Title & Context */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3 py-0.5 text-xs font-mono text-muted-foreground shadow-2xs">
          <span>Ecosistema Brayan Pérez · Backlog Oficial</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Bitácora de Implementación
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
          Estandarización centralizada de tareas pendientes, requerimientos técnicos,
          estrategia editorial y presupuesto operativo.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Total Tareas
            </span>
            <CheckCircle2 className="size-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {stats.totalItems}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Ítems registrados en backlog
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Presupuesto COP
            </span>
            <DollarSign className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground truncate">
            {formattedTotalCost}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Estimado en Hardware + Set
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Alta Prioridad
            </span>
            <AlertCircle className="size-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {stats.highPriorityCount}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Críticos para el despegue
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Jerárquicas
            </span>
            <GitFork className="size-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {stats.hierarchicalSubtasksCount}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Subtareas asociadas a parrilla
          </p>
        </div>
      </div>
    </div>
  );
}
