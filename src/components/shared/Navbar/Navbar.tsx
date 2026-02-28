"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Zap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../../theme-toggle";

// ── Nav config ────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const DROPDOWN_ITEMS = [
  {
    label: "Products",
    children: [
      {
        title: "Analytics",
        href: "/products/analytics",
        desc: "Deep insights into your data",
      },
      {
        title: "Automation",
        href: "/products/automation",
        desc: "Streamline your workflows",
      },
      {
        title: "Integrations",
        href: "/products/integrations",
        desc: "Connect your favorite tools",
        badge: "New",
      },
    ],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md shadow-sm border-b border-zinc-200/60 dark:border-zinc-800/60"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link
            href="/"
            className="flex items-center gap-2 shrink-0 group"
            aria-label="Go to homepage"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-transform group-hover:scale-105">
              <Zap size={16} strokeWidth={2.5} />
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Acme<span className="text-zinc-400 dark:text-zinc-500">.</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Plain links */}
                {NAV_LINKS.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={link.href}>{link.label}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* Dropdown groups */}
                {DROPDOWN_ITEMS.map((group) => (
                  <NavigationMenuItem key={group.label}>
                    <NavigationMenuTrigger>{group.label}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-95 gap-1 p-3">
                        {group.children.map((item) => (
                          <li key={item.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={item.href}
                                className="group flex items-start gap-3 rounded-md p-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <Badge
                                        variant="secondary"
                                        className="text-[10px] px-1.5 py-0"
                                      >
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                                    {item.desc}
                                  </p>
                                </div>
                                <ChevronRight
                                  size={14}
                                  className="mt-1 shrink-0 text-zinc-400 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0"
                                />
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Get started</Link>
            </Button>
          </div>

          {/* ── Mobile hamburger ── */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-full max-w-xs p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>{" "}
              {/* Sheet header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    <Zap size={14} strokeWidth={2.5} />
                  </span>
                  <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Acme
                  </span>
                </Link>
                {/* <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close menu">
                    <X size={18} />
                  </Button>
                </SheetClose> */}
              </div>
              {/* Mobile links */}
              <nav className="flex flex-col px-3 py-4 gap-0.5">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                {/* Dropdown groups flattened for mobile */}
                {DROPDOWN_ITEMS.map((group) => (
                  <div key={group.label} className="mt-2">
                    <p className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      {group.label}
                    </p>
                    {group.children.map((item) => (
                      <SheetClose asChild key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <span>{item.title}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="text-[10px] px-1.5 py-0"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </SheetClose>
                    ))}
                  </div>
                ))}
              </nav>
              {/* Mobile CTAs */}
              <div className="absolute bottom-0 inset-x-0 p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex flex-col gap-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    Get started
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
