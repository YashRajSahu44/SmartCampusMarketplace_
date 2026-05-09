import { Link, useRouterState } from "@tanstack/react-router";
import { Search, ShoppingBag, Heart, Trash2, Menu, X, ChevronDown, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist";
import { CAMPUSES, type CampusName, useCampus } from "@/lib/campus";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { ProductCard } from "@/components/product-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const links = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/chat", label: "Messages" },
];

export function Navbar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const wishlist = useWishlist();
  const { campus, setCampus } = useCampus();
  const [campusOpen, setCampusOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/70 bg-background/92 shadow-soft backdrop-blur-xl dark:bg-background/70"
          : "border-b border-border/50 glass",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-gradient text-primary-foreground shadow-elegant">
            <ShoppingBag className="h-4 w-4" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            Smart<span className="text-brand-gradient">Campus</span>
            <span className="ml-1 text-xs font-medium text-muted-foreground">Marketplace</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                path.startsWith(l.to) && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>

          <Popover open={campusOpen} onOpenChange={setCampusOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="hidden max-w-[220px] items-center gap-2 rounded-full sm:inline-flex transition-all hover:bg-secondary/60"
                aria-label="Select campus"
              >
                <motion.span
                  className="truncate text-sm font-medium"
                  animate={{ opacity: campus ? 1 : 0.6 }}
                  transition={{ duration: 0.2 }}
                >
                  {campus || "Select College"}
                </motion.span>
                <motion.div
                  animate={{ rotate: campusOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[280px] p-0">
              <Command>
                <CommandInput placeholder="Search campus…" />
                <CommandList>
                  <CommandEmpty>No campus found.</CommandEmpty>
                  <CommandGroup heading="Campuses">
                    {CAMPUSES.map((c) => (
                      <CommandItem
                        key={c}
                        value={c}
                        onSelect={(v) => {
                          setCampus(v as CampusName);
                          setCampusOpen(false);
                        }}
                      >
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex flex-1 items-center"
                        >
                          <span className="flex-1">{c}</span>
                          {c === campus && <Check className="h-4 w-4 text-primary" />}
                        </motion.div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
                <Heart className={cn("h-4 w-4", wishlist.count ? "fill-foreground" : "")} />
                {wishlist.count ? (
                  <span className="absolute -right-0.5 -top-0.5 grid min-h-[18px] min-w-[18px] place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                    {wishlist.count}
                  </span>
                ) : null}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Wishlist</SheetTitle>
                <SheetDescription>Saved items you can revisit anytime.</SheetDescription>
              </SheetHeader>

              <div className="mt-6">
                {wishlist.count === 0 ? (
                  <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-10 text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-foreground shadow-soft">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div className="mt-4 text-sm font-semibold">Your wishlist is empty</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      Tap the heart on any listing to save it here.
                    </div>
                    <Link to="/marketplace" className="mt-5">
                      <Button className="rounded-full bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90">
                        Browse marketplace
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="mb-3 flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{wishlist.count}</span> saved
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => wishlist.clear()}
                        className="gap-2 text-muted-foreground hover:text-foreground"
                      >
                        <Trash2 className="h-4 w-4" /> Clear
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {wishlist.items.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
          <ThemeToggle />
          <Link to="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/signup" className="hidden sm:inline-flex">
            <Button size="sm" className="rounded-full bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90">
              Get started
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/60 md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 p-4">
              {links.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">
                  {l.label}
                </Link>
              ))}
              <div className="mt-2 flex gap-2">
                <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Sign in</Button></Link>
                <Link to="/signup" className="flex-1"><Button className="w-full bg-brand-gradient">Get started</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
