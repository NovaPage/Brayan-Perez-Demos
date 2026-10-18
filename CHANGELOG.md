# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.1.0] - 2026-10-18

### Añadido
- Inicialización en limpio del proyecto con **Next.js 16 (App Router)**, **TypeScript** y **pnpm**.
- Integración de **shadcn/ui** con preset `base-nova` y **Tailwind CSS v4** mediante variables CSS semánticas en espacio OKLCH.
- Componente `ThemeToggle` (`src/components/theme-toggle.tsx`) centrado en la vista principal con animación de iconos y soporte de hidratación React 19 (`useSyncExternalStore`).
- Soporte para cambio de tema (Light / Dark / System) mediante `next-themes` y `ThemeProvider`.
- Librería de iconografía optimizada y tree-shakeable: **`lucide-react`**.
- Infraestructura de pruebas unitarias con **Vitest**, **React Testing Library**, **@testing-library/jest-dom**, **@testing-library/user-event** y **jsdom**.
- Pruebas unitarias para componentes `Button` y `ThemeToggle`.
- Documentación de arquitectura y directrices en `docs/SHADCN_STANDARDS.md`.
- Reglas de desarrollo para agentes en `.agents/rules/shadcn-standards.md`.
