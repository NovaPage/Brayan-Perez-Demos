# Brayan Perez Demos - Next.js + shadcn/ui

Proyecto inicializado con arquitectura limpia utilizando **Next.js 16**, **TypeScript**, **Tailwind CSS v4**, **shadcn/ui** y **pnpm**.

## Características

- ⚡ **Next.js 16 (App Router)** & **React 19**
- 🎨 **shadcn/ui** con preset `base-nova` y estilos con variables CSS semánticas
- 🌓 **Modo Oscuro / Claro** con `next-themes` y botón `ThemeToggle` reactivo
- 🪶 **`lucide-react`**: Iconos tree-shakeable y ligeros para mínimo impacto en el cliente
- 🧪 **Vitest & React Testing Library**: Suite de pruebas unitarias configurada con jsdom
- 📏 **ESLint 9**: Código validado bajo las directrices oficiales

---

## Comandos Disponibles

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Ejecutar suite de pruebas unitarias
pnpm test

# Ejecutar pruebas en modo observador
pnpm test:watch

# Análisis estático de código (linter)
pnpm lint

# Compilar para producción
pnpm build

# Ejecutar build de producción
pnpm start
```

---

## Documentación y Estándares

- Consulta las reglas y convenciones completas en [`docs/SHADCN_STANDARDS.md`](./docs/SHADCN_STANDARDS.md).
- Registro de versiones y cambios en [`CHANGELOG.md`](./CHANGELOG.md).
