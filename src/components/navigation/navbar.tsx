"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  ExternalLink,
  Calendar,
  Layers,
  Home,
  CheckCircle2,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/bitacora", label: "Bitácora", icon: CheckCircle2, activeMatch: "/bitacora" },
    {
      href: "/parrilla",
      label: "Parrilla de Contenido",
      icon: Layers,
      activeMatch: "/parrilla",
    },
    {
      href: "/cronograma",
      label: "Cronogramas",
      icon: Calendar,
      badge: "Próx",
      disabled: false,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link href="/" className="group flex items-center gap-3 shrink-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-foreground text-background font-display font-bold text-sm tracking-tight transition-transform duration-200 group-hover:scale-105 shadow-2xs">
            BP
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm font-semibold uppercase tracking-wider text-foreground">
              Brayan Pérez
            </span>
            <span className="text-[10px] font-mono text-muted-foreground leading-none">
              Gestión de Ecosistema
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = item.activeMatch
              ? pathname.startsWith(item.activeMatch)
              : pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-muted text-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="rounded-full border border-border bg-muted/80 px-1.5 py-0.2 text-[9px] font-mono text-muted-foreground">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Portfolio Link & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="https://brayanperez-theta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
          >
            <span>Ver Portafolio</span>
            <ExternalLink className="size-3" />
          </a>

          <ThemeToggle />

          {/* Mobile Menu Dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-9 rounded-lg"
                    aria-label="Abrir menú de navegación"
                  >
                    <Menu className="size-4" />
                  </Button>
                }
              />
              <DropdownMenuContent align="end" className="w-56 p-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.activeMatch
                    ? pathname.startsWith(item.activeMatch)
                    : pathname === item.href;

                  return (
                    <DropdownMenuItem
                      key={item.href}
                      className={isActive ? "bg-muted font-semibold" : ""}
                    >
                      <Link
                        href={item.href}
                        className="flex w-full items-center justify-between gap-2 py-1 text-xs"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="size-3.5 text-muted-foreground" />
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="rounded-full border border-border px-1.5 py-0.2 text-[9px] font-mono text-muted-foreground">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <a
                    href="https://brayanperez-theta.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between text-xs py-1 text-muted-foreground hover:text-foreground"
                  >
                    <span>Portafolio Oficial</span>
                    <ExternalLink className="size-3" />
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
