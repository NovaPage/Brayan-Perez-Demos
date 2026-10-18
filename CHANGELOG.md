# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

## [0.2.0] - 2026-10-18

### Añadido
- **Barra de Navegación Global (`Navbar`)**:
  - Menú superior sticky con marca *BP (Brayan Pérez)*, navegación entre `/` e `/bitacora`, accesos proyectados a módulos de *Parrilla de Contenido* y *Cronogramas*, botón de portafolio oficial y selector de tema integrado.
  - Menú desplegable responsivo para dispositivos móviles.
- **Sección Modular de Bitácora (`/bitacora`)**:
  - Ruta independiente sin dependencias acopladas a futuros módulos (`/parrilla/`, `/cronograma/`).
  - Modelo de datos fuertemente tipado en `src/types/bitacora.ts`.
  - Base de datos centralizada en `src/data/bitacora.json` con los 7 requerimientos del proyecto de Brayan Pérez (Hardware, Set de iluminación, Editor, Parrilla editorial, Agente de marketing IA, Horarios jerárquicos y Copys de bio).
  - Capa de servicio desacoplada en `src/services/bitacora.ts` con filtros de búsqueda, categorías y cálculo de métricas en COP.
- **Estándar de Interfaz Responsiva**:
  - Vista de **Tabla** en escritorio (`BitacoraTable`) con estados, categorías, jerarquía y costos formateados.
  - Vista automática de **Tarjetas** en móviles (`BitacoraCards`) mediante el hook de suscripción `useIsMobile`.
  - Ventana modal responsiva (`BitacoraDetailModal`): se renderiza como **Dialog** en escritorio y como **Drawer** deslizable en móviles.
- **Pruebas Unitarias**:
  - Suite de tests para servicios, cálculos de KPI, filtrado y renderizado responsivo en `src/components/bitacora/__tests__/bitacora.test.tsx` (13 tests en total pasando al 100%).

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
