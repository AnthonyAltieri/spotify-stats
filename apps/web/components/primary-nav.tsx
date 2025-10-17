"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const routes = [
  { href: "/", label: "Home", group: "marketing" },
  { href: "/dashboard", label: "Dashboard", group: "authed" },
  { href: "/listening-history", label: "Listening History", group: "authed" },
  { href: "/library", label: "Library", group: "authed" },
  { href: "/discovery", label: "Discovery", group: "authed" },
  { href: "/sharing", label: "Social", group: "authed" },
  { href: "/settings", label: "Settings", group: "authed" }
] as const;

export function PrimaryNav({ authenticated }: { authenticated: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap items-center gap-4 text-sm font-medium">
      {routes
        .filter((route) => (authenticated ? true : route.group === "marketing"))
        .map((route) => {
          const isActive = route.href === "/"
            ? pathname === route.href
            : pathname.startsWith(route.href);

          return (
            <Link
              key={route.href}
              href={route.href}
              className={clsx(
                "rounded-full px-3 py-1 transition-colors",
                isActive ? "bg-brand text-black" : "text-white/70 hover:text-white"
              )}
            >
              {route.label}
            </Link>
          );
        })}
    </nav>
  );
}
