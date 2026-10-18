# Reglas de Agente para shadcn/ui y Estándares de Código

1. **Uso de componentes UI**:
   - Todo componente base de interfaz debe seguir el estándar de shadcn/ui.
   - Instalar mediante `pnpm dlx shadcn@latest add <componente>`.
   - Reutilizar `Button`, `DropdownMenu` y primitivas existentes en `src/components/ui/`.

2. **Iconos**:
   - Usar exclusivamente `lucide-react` con importaciones nombradas (`import { IconName } from "lucide-react"`).
   - Nunca importar de paquetes pesados ni usar wildcards.

3. **Temas y Colores**:
   - Utilizar tokens semánticos de Tailwind v4 (`bg-background`, `text-foreground`, `border-border`, etc.).
   - No quemar colores hexadecimales estáticos para elementos que deban responder a dark/light mode.

4. **Testing**:
   - Todo nuevo componente interactivo debe incluir su suite de pruebas en `__tests__` con Vitest y `@testing-library/react`.
   - Ejecutar `pnpm test` y `pnpm lint` antes de dar por terminada una tarea.
