# Guía y Estándares de shadcn/ui en el Proyecto

Esta documentación define las directrices arquitectónicas, de estilo y de desarrollo para el ecosistema de componentes UI en este repositorio.

---

## 1. Filosofía de shadcn/ui

- **Propiedad del código**: Los componentes no se instalan como dependencias de caja negra; residen directamente en `src/components/ui/` para permitir adaptación total y personalización sin dependencias ocultas.
- **Primitivas accesibles**: Basado en `@base-ui/react` y primitivas WAI-ARIA para garantizar navegación por teclado, soporte para lectores de pantalla y semántica accesible.
- **Variables CSS y Tokens de Diseño**: El diseño se apoya en Tailwind CSS v4 y variables CSS semánticas en espacio de color OKLCH (`--background`, `--foreground`, `--primary`, `--muted`, etc.), permitiendo alternar temas (*Light / Dark / System*) de manera nativa sin recálculos complejos.

---

## 2. Convenciones para Agregar Componentes

Para añadir nuevos componentes al proyecto, utiliza siempre el CLI oficial con `pnpm`:

```bash
pnpm dlx shadcn@latest add <componente>
```

Ejemplos:
```bash
# Agregar un diálogo modal
pnpm dlx shadcn@latest add dialog

# Agregar un avatar o tooltip
pnpm dlx shadcn@latest add avatar tooltip
```

### Reglas de Ubicación
- **Primitivas de UI**: `src/components/ui/<componente>.tsx` (código generado y adaptado de shadcn).
- **Componentes de Dominio / Negocio**: `src/components/<nombre-componente>.tsx` (e.g., `theme-toggle.tsx`, `navbar.tsx`).
- **Utilidades**: `src/lib/utils.ts` mediante la función `cn(...)` para combinar clases de Tailwind condicionalmente.

---

## 3. Estándar de Iconografía (Cliente Ligero y Tree-Shaking)

### Librería Oficial: `lucide-react`
Para evitar sobrecargar el bundle del cliente:

1. **Importaciones Nombradas Específicas**:
   Importa únicamente los iconos requeridos directamente de la raíz:
   ```tsx
   // CORRECTO: Tree-shaking óptimo
   import { Sun, Moon, Check } from "lucide-react";

   // PROHIBIDO: Importación en masa o wildcard
   import * as Icons from "lucide-react";
   ```
2. **Propiedades Estándar**:
   - Asigna clases de tamaño con Tailwind (`size-4`, `size-5`, `size-6`).
   - Usa `aria-hidden="true"` en iconos decorativos.
   - Cuando el icono sea el único contenido de un botón interactivo, acompaña siempre con texto accesible (`<span className="sr-only">Descripción</span>`) o atributo `aria-label`.

---

## 4. Gestión de Temas (Dark / Light / System)

El proyecto utiliza `next-themes` integrado con las clases de Tailwind CSS v4:

- **Proveedor**: `src/components/theme-provider.tsx` envuelve la aplicación en `src/app/layout.tsx`.
- **Atributo**: Se aplica la clase `.dark` en el elemento `<html>` con `suppressHydrationWarning`.
- **Evitar Hidratación Inconsistente**: En componentes interactivos de tema, usa `useSyncExternalStore` para consultar el estado montado sin provocar cascadas de re-renderizado (`react-hooks/set-state-in-effect`).

---

## 5. Estándar de Pruebas Unitarias

Cada componente debe contar con cobertura de pruebas unitarias bajo `Vitest` y `@testing-library/react`:

### Estructura de Archivos de Prueba
- Los tests residen en subdirectorios `__tests__/` adyacentes al componente:
  - `src/components/ui/__tests__/<componente>.test.tsx`
  - `src/components/__tests__/<componente>.test.tsx`

### Comandos de Testing
```bash
# Ejecutar suite completa
pnpm test

# Modo observador (watch)
pnpm test:watch
```

### Puntos Obligatorios a Verificar
1. Renderizado inicial sin excepciones.
2. Accesibilidad: roles ARIA (`button`, `dialog`, etc.) y accesibilidad de nombres.
3. Comportamiento en eventos de usuario (clicks, teclado, cambios de estado).
