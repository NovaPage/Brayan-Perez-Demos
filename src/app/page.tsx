import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Calendar,
  ExternalLink,
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-4 py-16 sm:py-24 text-center max-w-4xl mx-auto space-y-10">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/60 px-3.5 py-1 text-xs font-mono text-muted-foreground shadow-2xs">
        <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>Ecosistema Brayan Pérez · Plataforma Operativa</span>
      </div>

      {/* Main Heading & Philosophy */}
      <div className="space-y-4">
        <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight text-foreground leading-[1.12]">
          Educación sin reservas. <br />
          <span className="text-muted-foreground font-normal">
            Trading basado en proceso.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
          Plataforma modular para la estandarización y gestión de requerimientos,
          estrategia editorial, talento y automatizaciones.
        </p>
      </div>

      {/* CTA Button to Bitacora */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link href="/bitacora">
          <Button size="lg" className="h-11 px-6 gap-2 text-xs uppercase tracking-wider font-semibold shadow-xs">
            <span>Acceder a la Bitácora</span>
            <ArrowRight className="size-4" />
          </Button>
        </Link>
        <a
          href="https://brayanperez-theta.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="lg" className="h-11 px-5 gap-2 text-xs uppercase tracking-wider font-medium">
            <span>Ver Portafolio</span>
            <ExternalLink className="size-3.5" />
          </Button>
        </a>
      </div>

      {/* Modular Section Preview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full pt-8 text-left">
        {/* Bitacora Active */}
        <Link
          href="/bitacora"
          className="group rounded-2xl border border-border/80 bg-card p-5 transition-all duration-200 hover:border-foreground/30 hover:shadow-xs hover:-translate-y-0.5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CheckCircle2 className="size-4.5" />
            </div>
            <Badge variant="default" className="text-[10px] uppercase font-mono">
              Activo
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
              Bitácora
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Backlog de requerimientos de hardware, set, talento, costos y jerarquías.
            </p>
          </div>
        </Link>

        {/* Parrilla Modular */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-3 opacity-80">
          <div className="flex items-center justify-between">
            <div className="size-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <Layers className="size-4.5" />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-mono">
              Fase 2
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm">
              Parrilla de Contenido
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Matriz editorial 3·2·1, calendarización y ganchos de retención multicanal.
            </p>
          </div>
        </div>

        {/* Cronogramas Modular */}
        <div className="rounded-2xl border border-border/60 bg-muted/20 p-5 space-y-3 opacity-80">
          <div className="flex items-center justify-between">
            <div className="size-9 rounded-xl bg-muted text-muted-foreground flex items-center justify-center">
              <Calendar className="size-4.5" />
            </div>
            <Badge variant="outline" className="text-[10px] uppercase font-mono">
              Fase 3
            </Badge>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground text-sm">
              Cronogramas
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sincronización de fechas de grabación de podcast, entregas y publicaciones.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
