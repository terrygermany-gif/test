"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const subscribe = () => () => {};

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const { resolvedTheme, setTheme } = useTheme();
  const light = mounted && resolvedTheme === "light";
  const label = light ? "Switch to dark mode" : "Switch to light mode";
  return <button type="button" className="theme-toggle" onClick={() => setTheme(light ? "dark" : "light")} aria-label={label} title={label}>{light ? <Moon size={18} aria-hidden="true" /> : <Sun size={18} aria-hidden="true" />}</button>;
}
