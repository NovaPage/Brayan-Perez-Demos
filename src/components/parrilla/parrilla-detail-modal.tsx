"use client";

import * as React from "react";
import type { ParrillaItem } from "@/types/parrilla";
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
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PILLAR_META,
  FORMAT_META,
  STATUS_META,
} from "@/services/parrilla";
import {
  Clock,
  Calendar,
  ExternalLink,
  Copy,
  Check,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  GitFork,
  Target,
  Play,
  ShieldCheck,
} from "lucide-react";

interface ParrillaDetailModalProps {
  item: ParrillaItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ParrillaDetailModal({
  item,
  open,
  onOpenChange,
}: ParrillaDetailModalProps) {
  const isMobile = useIsMobile();
  const [copied, setCopied] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);

  if (!item) return null;

  const pillarMeta = PILLAR_META[item.pillar];
  const formatMeta = FORMAT_META[item.format];
  const statusMeta = STATUS_META[item.status];

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        throw new Error("Clipboard API unavailable");
      }
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
      } catch {
        // Fallback suppressed
      }
      document.body.removeChild(textArea);
    }
  };

  const handleCopyCaption = async () => {
    if (!item) return;
    const fullText = `${item.caption}\n\n${item.hashtags.join(" ")}`;
    await copyToClipboard(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = async () => {
    const targetUrl = item?.media.videoUrl || item?.cta.url;
    if (!targetUrl) return;
    await copyToClipboard(targetUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const content = (
    <div className="flex flex-col gap-5 py-2 px-1 text-sm overflow-y-auto max-h-[72vh]">
      {/* Top Badges */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="font-mono text-xs font-semibold">
          {item.code}
        </Badge>
        <span
          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${pillarMeta.badgeClass}`}
        >
          {pillarMeta.label}
        </span>
        <Badge variant="outline" className="text-xs">
          {formatMeta.label}
        </Badge>
        <Badge variant={statusMeta.variant} className="text-xs capitalize">
          {statusMeta.label}
        </Badge>
        <div className="ml-auto flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <Calendar className="size-3.5" />
          <span>{item.date}</span>
          <Clock className="size-3.5 ml-1" />
          <span>{item.timeSlot}</span>
        </div>
      </div>

      {/* Derived from Master Episode */}
      {item.parentEpisodeTitle && (
        <div className="flex items-center gap-2 rounded-lg border border-border/80 bg-muted/40 p-2.5 text-xs text-muted-foreground">
          <GitFork className="size-4 shrink-0 text-foreground" />
          <span>
            Micro-contenido derivado del episodio maestro:{" "}
            <strong className="text-foreground">{item.parentEpisodeTitle}</strong>
          </span>
        </div>
      )}

      {/* Video Embed or Preview if YouTube */}
      {item.media.youtubeId ? (
        <div className="space-y-1.5">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border/80 bg-black shadow-xs">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${item.media.youtubeId}?rel=0`}
              title={item.title}
              className="absolute inset-0 size-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Duración: {item.media.duration || "0:50"}</span>
            <span className="text-[11px] font-mono text-emerald-500 font-medium">
              ID: {item.media.youtubeId}
            </span>
          </div>
        </div>
      ) : item.media.videoUrl ? (
        <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-muted/30 text-xs">
          <span className="flex items-center gap-2 font-medium text-foreground">
            <Play className="size-4 text-primary" />
            Enlace de video en {item.channel}
          </span>
          <a
            href={item.media.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
          >
            <span>Ver publicación original</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      ) : null}

      {/* Direct Source & Audit Verification Block */}
      {(item.media.videoUrl || item.cta.url) && (
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-4 text-emerald-500" />
              <span>Fuente Oficial & Enlace Directo de Auditoría</span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground">
              {item.channel}: @BrayanPerezPro
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-background/80 rounded-lg p-2.5 border border-border/70">
            <span className="font-mono text-xs text-foreground/80 truncate select-all">
              {item.media.videoUrl || item.cta.url}
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="h-7 px-2.5 text-xs gap-1 font-medium"
              >
                {copiedLink ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-500">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copiar enlace</span>
                  </>
                )}
              </Button>
              <a
                href={item.media.videoUrl || item.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "sm" }),
                  "h-7 px-2.5 text-xs gap-1 bg-red-600 hover:bg-red-700 text-white font-medium shadow-2xs"
                )}
              >
                <ExternalLink className="size-3" />
                <span>Ir a la publicación</span>
              </a>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-normal">
            Enlace público directo al video. Puedes abrirlo para verificar con tus propios ojos las métricas de visualizaciones, comentarios y fecha de publicación original.
          </p>
        </div>
      )}

      {/* Hook Section */}
      <div className="rounded-xl border border-border/80 bg-muted/30 p-4 space-y-1.5 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
          <Sparkles className="size-3.5" />
          <span>Gancho de Retención (Primeros 3-5 Segundos)</span>
        </div>
        <p className="text-sm font-medium italic text-foreground leading-relaxed">
          &ldquo;{item.hook}&rdquo;
        </p>
      </div>

      {/* Metrics Section (if published) */}
      {item.metrics && (
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Métricas de Rendimiento
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="rounded-lg border border-border/60 bg-card p-2.5 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px]">
                <Eye className="size-3 text-cyan-400" />
                <span>Views</span>
              </div>
              <p className="font-display font-bold text-base text-foreground">
                {new Intl.NumberFormat("es-CO").format(item.metrics.views || 0)}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-2.5 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px]">
                <Heart className="size-3 text-pink-500" />
                <span>Likes</span>
              </div>
              <p className="font-display font-bold text-base text-foreground">
                {new Intl.NumberFormat("es-CO").format(item.metrics.likes || 0)}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-2.5 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px]">
                <MessageCircle className="size-3 text-amber-500" />
                <span>Comentarios</span>
              </div>
              <p className="font-display font-bold text-base text-foreground">
                {item.metrics.comments || 0}
              </p>
            </div>
            <div className="rounded-lg border border-border/60 bg-card p-2.5 text-center space-y-0.5">
              <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px]">
                <Share2 className="size-3 text-emerald-500" />
                <span>Compartidos</span>
              </div>
              <p className="font-display font-bold text-base text-foreground">
                {item.metrics.shares || 0}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Social Caption / Copy with Copy Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Copy / Caption de la Publicación
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCaption}
            className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="size-3 text-emerald-500" />
                <span className="text-emerald-500">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="size-3" />
                <span>Copiar texto</span>
              </>
            )}
          </Button>
        </div>
        <div className="rounded-xl border border-border/70 bg-card p-4 text-xs leading-relaxed whitespace-pre-line text-foreground/90 font-sans shadow-2xs">
          {item.caption}
        </div>
      </div>

      {/* Hashtags */}
      {item.hashtags.length > 0 && (
        <div className="space-y-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Hashtags Estratégicos
          </span>
          <div className="flex flex-wrap gap-1.5">
            {item.hashtags.map((h, i) => (
              <span
                key={i}
                className="rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action (CTA) Box */}
      <div className="rounded-xl border border-border/70 bg-muted/30 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Target className="size-3 text-primary" />
            Llamado a la Acción (CTA)
          </div>
          <p className="text-xs font-medium text-foreground">{item.cta.label}</p>
        </div>
        <a
          href={item.cta.url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0"
        >
          <Button size="sm" className="h-8 gap-1.5 text-xs w-full sm:w-auto">
            <span>Visitar Recurso</span>
            <ExternalLink className="size-3" />
          </Button>
        </a>
      </div>

      {/* Production Notes */}
      {item.notes && (
        <p className="text-[11px] text-muted-foreground border-t border-border/60 pt-2">
          <strong>Notas de Producción:</strong> {item.notes} ·{" "}
          <strong>Responsable:</strong> {item.assignedEditor || "Equipo"}
        </p>
      )}
    </div>
  );

  // Desktop: Dialog
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-6">
          <DialogHeader className="space-y-1 pb-2 border-b border-border/60">
            <DialogTitle className="text-lg font-bold leading-snug">
              {item.title}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Ficha editorial y de publicación para {item.channel}
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

  // Mobile: Drawer
  return (
    <Drawer open={open} onOpenChange={onOpenChange} showSwipeHandle>
      <DrawerContent className="px-4 pb-6 max-h-[92dvh]">
        <DrawerHeader className="text-left pb-2 border-b border-border/60">
          <DrawerTitle className="text-base font-bold leading-snug">
            {item.title}
          </DrawerTitle>
          <DrawerDescription className="text-xs text-muted-foreground">
            Ficha editorial para {item.channel}
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
