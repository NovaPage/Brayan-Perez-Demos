import { NextResponse } from "next/server";
import {
  extractInstagramMetadata,
  extractYouTubeMetadata,
} from "@/services/social-extractor";
import type { ParrillaItem } from "@/types/parrilla";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = body?.url?.trim();

    if (!url) {
      return NextResponse.json(
        { error: "Debe proporcionar una URL válida de Instagram o YouTube" },
        { status: 400 }
      );
    }

    let partialItem: Partial<ParrillaItem>;

    if (url.includes("instagram.com")) {
      partialItem = await extractInstagramMetadata(url);
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      partialItem = await extractYouTubeMetadata(url);
    } else {
      return NextResponse.json(
        { error: "Plataforma no soportada aún. Solo se admiten URLs de Instagram y YouTube." },
        { status: 400 }
      );
    }

    const uniqueId = `par-${Date.now().toString().slice(-4)}`;
    const fullItem: ParrillaItem = {
      id: uniqueId,
      code: `PAR-${Date.now().toString().slice(-3)}`,
      title: partialItem.title || "Nueva Publicación",
      pillar: partialItem.pillar || "marca_personal",
      format: partialItem.format || "reel",
      channel: partialItem.channel || "Instagram",
      status: "publicado",
      date: partialItem.date || new Date().toISOString().split("T")[0],
      timeSlot: partialItem.timeSlot || "7:00 PM",
      hook: partialItem.hook || "Gancho oficial",
      caption: partialItem.caption || "",
      hashtags: partialItem.hashtags || [],
      cta: partialItem.cta || {
        label: "Ver publicación original",
        url,
      },
      media: partialItem.media || {
        videoUrl: url,
      },
      metrics: partialItem.metrics,
      assignedEditor: partialItem.assignedEditor || "Equipo NovaPage",
      notes: partialItem.notes,
    };

    return NextResponse.json({
      success: true,
      item: fullItem,
      message: "Publicación extraída en vivo exitosamente",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error desconocido extrayendo datos";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
