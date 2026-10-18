import type { Metadata } from "next";
import { getParrillaItems } from "@/services/parrilla";
import { ParrillaView } from "@/components/parrilla/parrilla-view";

export const metadata: Metadata = {
  title: "Parrilla de Contenido | Brayan Pérez",
  description:
    "Estructuración omnicanal de publicaciones, matriz 3·2·1, ganchos de retención y métricas para YouTube, Instagram y TikTok.",
};

export default function ParrillaPage() {
  const items = getParrillaItems();

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ParrillaView initialItems={items} />
      </div>
    </div>
  );
}
