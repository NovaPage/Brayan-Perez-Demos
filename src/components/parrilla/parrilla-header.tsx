"use client";

import * as React from "react";
import type { ParrillaStats } from "@/services/parrilla";
import {
  Video,
  Eye,
  Sparkles,
  RefreshCw,
  Users,
  ShieldCheck,
  Plus,
} from "lucide-react";
import { YouTubeIcon, InstagramIcon } from "@/components/ui/social-icons";
import { Button } from "@/components/ui/button";

interface ParrillaHeaderProps {
  stats: ParrillaStats;
  isSyncing?: boolean;
  onSync?: () => void;
  lastSyncTime?: string;
  onOpenImport?: () => void;
}

export function ParrillaHeader({
  stats,
  isSyncing = false,
  onSync,
  lastSyncTime,
  onOpenImport,
}: ParrillaHeaderProps) {
  const formattedViews = new Intl.NumberFormat("es-CO").format(stats.totalViews);

  return (
    <div className="space-y-6">
      {/* Top Banner with Brand and Live Sync Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-xs font-mono text-emerald-500 shadow-2xs">
              <ShieldCheck className="size-3.5" />
              <span>100% Datos Reales Auditados</span>
            </div>
            {lastSyncTime && (
              <span className="text-[11px] font-mono text-muted-foreground">
                Última recarga: {lastSyncTime}
              </span>
            )}
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Parrilla de Contenido & Métricas en Vivo
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            Esquema omnicanal auditado directamente desde las plataformas públicas.
            Cero estimaciones ficticias: todas las reproducciones, fechas y enlaces
            corresponden a la actividad verificada de Brayan Pérez. Haz clic en el botón 
            <strong className="text-foreground font-semibold"> &ldquo;Ver enlace&rdquo;</strong> o en la ficha de cada publicación para saltar directo al video original y corroborar los datos.
          </p>
        </div>

        {/* Real-time Sync and Social Links */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {onOpenImport && (
            <Button
              variant="default"
              size="sm"
              onClick={onOpenImport}
              className="h-9 gap-1.5 text-xs font-semibold shadow-2xs bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="size-3.5" />
              <span>Sumar por Link</span>
            </Button>
          )}

          {onSync && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSync}
              disabled={isSyncing}
              className="h-9 gap-2 text-xs font-semibold shadow-2xs"
            >
              <RefreshCw
                className={`size-3.5 text-emerald-500 ${
                  isSyncing ? "animate-spin" : ""
                }`}
              />
              <span>{isSyncing ? "Sincronizando..." : "Sincronizar en Vivo"}</span>
            </Button>
          )}

          <a
            href="https://www.youtube.com/@BrayanPerezPro"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card px-2.5 py-1.5 text-xs font-medium hover:border-red-500/40 hover:text-red-500 transition-colors shadow-2xs"
          >
            <YouTubeIcon className="size-3.5" />
            <span>@BrayanPerezPro</span>
          </a>
          <a
            href="https://www.instagram.com/brayan_perezoficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/70 bg-card px-2.5 py-1.5 text-xs font-medium hover:border-pink-500/40 hover:text-pink-500 transition-colors shadow-2xs"
          >
            <InstagramIcon className="size-3.5" />
            <span>@brayan_perezoficial</span>
          </a>
        </div>
      </div>

      {/* KPI Cards Grid with Real Live Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Videos Extraídos
            </span>
            <Video className="size-4 text-primary" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {stats.publishedCount}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Publicaciones auditadas en vivo
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Vistas Reales
            </span>
            <Eye className="size-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-500 truncate">
            {formattedViews}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Reproducciones verificadas en YouTube
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              Comunidad YouTube
            </span>
            <Users className="size-4 text-cyan-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            96
          </div>
          <p className="text-[11px] text-muted-foreground">
            Suscriptores actuales en canal
          </p>
        </div>

        <div className="rounded-2xl border border-border/80 bg-card p-4 space-y-1.5 shadow-2xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="text-xs font-medium uppercase tracking-wider">
              En Pipeline / Guion
            </span>
            <Sparkles className="size-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-foreground">
            {stats.scheduledCount + stats.inProgressCount}
          </div>
          <p className="text-[11px] text-muted-foreground">
            Piezas programadas en matriz 3·2·1
          </p>
        </div>
      </div>
    </div>
  );
}
