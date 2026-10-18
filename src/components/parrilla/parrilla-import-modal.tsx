"use client";

import * as React from "react";
import type { ParrillaItem } from "@/types/parrilla";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/social-icons";

interface ParrillaImportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemImported: (item: ParrillaItem) => void;
}

export function ParrillaImportModal({
  open,
  onOpenChange,
  onItemImported,
}: ParrillaImportModalProps) {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [extractedItem, setExtractedItem] = React.useState<ParrillaItem | null>(null);

  const handleExtract = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setExtractedItem(null);

    try {
      const res = await fetch("/api/parrilla/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "No se pudo extraer la información del enlace.");
      }

      setExtractedItem(data.item);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al procesar el enlace";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmAdd = () => {
    if (!extractedItem) return;
    onItemImported(extractedItem);
    handleClose();
  };

  const handleClose = () => {
    setUrl("");
    setExtractedItem(null);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="space-y-1 pb-2 border-b border-border/60">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
            <Sparkles className="size-4" />
            <span>Extracción Dinámica en Tiempo Real</span>
          </div>
          <DialogTitle className="text-xl font-bold leading-snug">
            Sumar Publicación por Enlace
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
            Pega el enlace de un <strong>Instagram Reel</strong> o <strong>YouTube Video/Short</strong>. El sistema extraerá automáticamente el gancho, copy, miniatura y métricas públicas reales.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleExtract} className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Link2 className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="https://www.instagram.com/reel/... o https://youtube.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="pl-9 text-xs font-mono h-10"
              />
            </div>
            <Button
              type="submit"
              disabled={loading || !url.trim()}
              className="h-10 px-4 text-xs font-semibold gap-2 shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Consultando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5" />
                  <span>Extraer Datos</span>
                </>
              )}
            </Button>
          </div>

          {/* Quick Examples */}
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground flex-wrap pt-1">
            <span>Ejemplos rápidos de Brayan:</span>
            <button
              type="button"
              onClick={() => setUrl("https://www.instagram.com/reel/DefoDG3RMfK/")}
              className="font-mono underline hover:text-foreground inline-flex items-center gap-1"
            >
              <InstagramIcon className="size-3" />
              <span>Reel Ep. #1</span>
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => setUrl("https://www.instagram.com/reel/DekaynGBSq6/")}
              className="font-mono underline hover:text-foreground inline-flex items-center gap-1"
            >
              <InstagramIcon className="size-3" />
              <span>Reel Ep. #2</span>
            </button>
          </div>
        </form>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 flex items-start gap-2.5 text-xs text-destructive">
            <AlertCircle className="size-4 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">No se pudo extraer la publicación</p>
              <p className="opacity-90">{error}</p>
            </div>
          </div>
        )}

        {extractedItem && (
          <div className="space-y-4 rounded-xl border border-border/80 bg-muted/20 p-4 pt-3.5 animate-in fade-in-50 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4 text-emerald-500" />
                <span>Datos 100% Reales Extraídos con Éxito</span>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {extractedItem.channel}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="font-display font-semibold text-sm text-foreground">
                {extractedItem.title}
              </h4>
              <p className="text-xs text-muted-foreground italic line-clamp-2">
                &ldquo;{extractedItem.hook}&rdquo;
              </p>
            </div>

            {/* Metrics extracted preview */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-card border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                  Canal
                </span>
                <p className="font-bold text-foreground mt-0.5">
                  {extractedItem.channel}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                  Likes Reales
                </span>
                <p className="font-bold text-foreground mt-0.5">
                  {extractedItem.metrics?.likes ?? 0}
                </p>
              </div>
              <div className="p-2 rounded-lg bg-card border border-border/60">
                <span className="text-muted-foreground text-[10px] uppercase font-semibold">
                  Comentarios
                </span>
                <p className="font-bold text-foreground mt-0.5">
                  {extractedItem.metrics?.comments ?? 0}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border/60">
              <a
                href={extractedItem.media.videoUrl || extractedItem.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
              >
                <span>Inspeccionar link original</span>
                <ExternalLink className="size-3" />
              </a>
              <Button
                size="sm"
                onClick={handleConfirmAdd}
                className="h-8 gap-1.5 text-xs font-semibold"
              >
                <CheckCircle2 className="size-3.5" />
                <span>Sumar a la Parrilla</span>
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
