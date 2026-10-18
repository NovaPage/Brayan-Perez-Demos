"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const emptySubscribe = () => () => {};

function useMounted() {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = () => {
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  const isDark = (resolvedTheme || theme) === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      data-testid="theme-toggle-btn"
      className="relative size-10 rounded-full border border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground transition-transform duration-200 active:scale-95"
    >
      <Sun
        className={`size-5 transition-all duration-300 ${
          mounted && isDark
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100 text-amber-500"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute size-5 transition-all duration-300 ${
          mounted && isDark
            ? "rotate-0 scale-100 opacity-100 text-indigo-400"
            : "-rotate-90 scale-0 opacity-0"
        }`}
        aria-hidden="true"
      />
      <span className="sr-only">Cambiar tema</span>
    </Button>
  );
}
