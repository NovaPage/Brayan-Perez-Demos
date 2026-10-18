import type { Metadata } from "next";
import { getBitacoraItems } from "@/services/bitacora";
import { BitacoraView } from "@/components/bitacora/bitacora-view";

export const metadata: Metadata = {
  title: "Bitácora de Implementación | Brayan Pérez",
  description:
    "Estandarización centralizada de tareas, hardware, producción y estrategia editorial del ecosistema Brayan Pérez.",
};

export default function BitacoraPage() {
  const items = getBitacoraItems();

  return (
    <div className="min-h-screen bg-background py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BitacoraView initialItems={items} />
      </div>
    </div>
  );
}
