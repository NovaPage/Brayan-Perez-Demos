import { NextResponse } from "next/server";
import { getParrillaItems } from "@/services/parrilla";
import type { ParrillaItem } from "@/types/parrilla";

export async function GET() {
  try {
    const currentItems = getParrillaItems();
    const updatedItems: ParrillaItem[] = [];

    // Query channel stats in real time
    let subscribers = "96 suscriptores";
    let channelVideos = 33;

    try {
      const channelRes = await fetch("https://www.youtube.com/@BrayanPerezPro", {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
        },
        cache: "no-store",
      });

      if (channelRes.ok) {
        const html = await channelRes.text();
        const subsMatch = html.match(
          /(\d[\d.,]*\s*(?:suscriptores|subscribers))/i
        );
        const videosMatch = html.match(/(\d[\d.,]*)\s*(?:vídeos|videos)/i);

        if (subsMatch) subscribers = subsMatch[0];
        if (videosMatch) channelVideos = parseInt(videosMatch[1], 10);
      }
    } catch {
      // Keep defaults if channel fetch fails
    }

    // Update real-time views for published YouTube items
    for (const item of currentItems) {
      if (item.media.youtubeId && item.channel === "YouTube") {
        try {
          const videoRes = await fetch(
            `https://www.youtube.com/watch?v=${item.media.youtubeId}`,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
              },
              cache: "no-store",
            }
          );

          if (videoRes.ok) {
            const html = await videoRes.text();
            const viewMatch = html.match(/"viewCount":\s*"(\d+)"/);

            if (viewMatch) {
              const liveViews = parseInt(viewMatch[1], 10);
              updatedItems.push({
                ...item,
                metrics: {
                  ...item.metrics,
                  views: liveViews,
                },
              });
              continue;
            }
          }
        } catch {
          // Fall through to existing metrics
        }
      }

      updatedItems.push(item);
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      channelStats: {
        handle: "@BrayanPerezPro",
        subscribers,
        totalVideos: channelVideos,
      },
      items: updatedItems,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al sincronizar",
      },
      { status: 500 }
    );
  }
}
