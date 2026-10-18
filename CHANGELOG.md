# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/)
y este proyecto se adhiere a [Semantic Versioning](https://semver.org/lang/es/).

Repositorio oficial: [GitHub - NovaPage/Brayan-Perez-Demos](https://github.com/NovaPage/Brayan-Perez-Demos.git)

## [0.3.1] - 2026-10-18

### Añadido
- **Trazabilidad y Enlaces Directos a Fuentes Públicas en Parrilla**:
  - Botón visible **"Ver enlace"** en cada fila de `ParrillaTable` (columna *"ACCIÓN & ENLACE"*) para abrir de inmediato la publicación original en YouTube en una nueva pestaña.
  - Botón directo **"Ver enlace"** en cada tarjeta móvil de `ParrillaCards`.
  - Panel destacado **"Fuente Oficial & Enlace Directo de Auditoría"** en `ParrillaDetailModal` con:
    - URL canónica directa de la publicación (`https://www.youtube.com/watch?v=...`).
    - Botón interactivo de **"Copiar enlace"** con fallback de portapapeles.
    - Botón primario de acceso directo **"Ir a la publicación"** a YouTube oficial.
    - Indicador de veracidad y verificación de métricas públicas.
  - Prueba unitaria adicional en `parrilla.test.tsx` verificando la presencia y validez de los enlaces externos directos (20/20 pruebas pasando).

## [0.3.0] - 2026-10-18

### Añadido
- **Módulo Omnicanal de Parrilla de Contenido (`/parrilla`)**:
  - Extracción y auditoría de **20 publicaciones reales** directamente desde el canal oficial de YouTube `@BrayanPerezPro`:
    - Video maestro de formato largo: *"LA LECCION DE 700 MIL DOLARES"* (155 views reales).
    - 19 YouTube Shorts oficiales con títulos, fechas y métricas públicas exactas (*"PERDI $500 MIL DÓLARES"*, *"SE UN ENFERMO"*, *"ERES REAL"*, etc.).
  - Endpoint de sincronización en tiempo real: `GET /api/parrilla/sync` para consultar en vivo reproducciones, suscriptores y estado del canal.
  - Botón interactivo de **"Sincronizar en Vivo"** en la interfaz para refrescar las métricas dinámicas al instante sin recarga de página.
  - Componentes responsivos de visualización:
    - `ParrillaTable`: Vista de escritorio con badges de canal, pilar temático, formato, fecha, vistas y ganchos (hooks).
    - `ParrillaCards`: Vista móvil optimizada con tarjetas compactas y métricas auditadas.
    - `ParrillaDetailModal`: Dialog/Drawer responsivo con reproductor embebido de YouTube, copy completo, hashtags, CTA y notas editoriales.
  - Iconos SVG ligeros para YouTube, Instagram y TikTok en `src/components/ui/social-icons.tsx`.
- **Pruebas y Validación**:
  - 19 pruebas unitarias aprobadas al 100% en Vitest.
  - Compilación de producción validada con ruta dinámica `/api/parrilla/sync` y rutas estáticas `/`, `/bitacora` y `/parrilla`.

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

[0.3.0]: https://github.com/NovaPage/Brayan-Perez-Demos/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/NovaPage/Brayan-Perez-Demos/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/NovaPage/Brayan-Perez-Demos/releases/tag/v0.1.0
