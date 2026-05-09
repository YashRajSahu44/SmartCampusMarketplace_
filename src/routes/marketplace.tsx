import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal, X, ChevronDown, Check, MapPin } from "lucide-react";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { products, categories, type Category } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CAMPUSES } from "@/lib/campus";

type SearchParams = { category?: string };

export const Route = createFileRoute("/marketplace")({
  component: MarketplacePage,
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
});

function MarketplacePage() {
  const search = Route.useSearch();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<Category | null>((search.category as Category) ?? null);
  const [conditions, setConditions] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(60000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<"new" | "low" | "high">("new");
  
  const [buyRent, setBuyRent] = useState<"all" | "buy" | "rent">("all");
  const [departments, setDepartments] = useState<string[]>([]);
  const [availabilities, setAvailabilities] = useState<string[]>(["Available"]);
  const [recentlyAdded, setRecentlyAdded] = useState(false);
  const [negotiable, setNegotiable] = useState(false);
  const [selectedCampuses, setSelectedCampuses] = useState<string[]>([]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (conditions.length && !conditions.includes(p.condition)) return false;
      if (p.price > maxPrice) return false;
      if (verifiedOnly && !p.seller.verified) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCat, conditions, maxPrice, verifiedOnly, query, sort, buyRent, departments, availabilities, recentlyAdded, negotiable, selectedCampuses]);

  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="border-b border-border bg-hero-gradient">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-semibold italic tracking-tight sm:text-5xl">Marketplace</h1>
            <p className="mt-2 text-muted-foreground">Discover what your campus is buying, selling and renting today.</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search listings…"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex gap-2 sm:contents">
                <button
                  onClick={() => document.getElementById('mobile-filters')?.classList.toggle('hidden')}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium shadow-soft transition hover:bg-secondary lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as typeof sort)}
                  className="flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none sm:flex-none"
                >
                  <option value="new">Newest</option>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8">
          <aside id="mobile-filters" className="hidden lg:block">
            <div className="sticky top-24 space-y-1 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="mb-2 flex items-center justify-between pb-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </div>
                {(activeCat || conditions.length > 0 || maxPrice < 60000 || verifiedOnly || buyRent !== "all" || departments.length > 0 || availabilities.length > 1 || recentlyAdded || negotiable || selectedCampuses.length > 0) && (
                  <button
                    onClick={() => {
                      setActiveCat(null); setConditions([]); setMaxPrice(60000); setVerifiedOnly(false);
                      setBuyRent("all"); setDepartments([]); setAvailabilities(["Available"]);
                      setRecentlyAdded(false); setNegotiable(false); setSelectedCampuses([]);
                    }}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>

              <FilterBlock title="Category">
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveCat(null)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                      !activeCat ? "bg-secondary font-medium" : "hover:bg-secondary/60",
                    )}
                  >
                    <span>All</span><span className="text-xs text-muted-foreground">{products.length}</span>
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveCat(c.name)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition",
                        activeCat === c.name ? "bg-secondary font-medium" : "hover:bg-secondary/60",
                      )}
                    >
                        <span className="flex items-center gap-2">
                          <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary text-foreground transition group-hover:text-primary">
                          <CategoryIcon category={c.name} size={16} animated={false} />
                        </span>
                        {c.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{c.count}</span>
                    </button>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title="Transaction Type">
                <div className="flex rounded-lg border border-border bg-secondary/50 p-1">
                  {["all", "buy", "rent"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setBuyRent(t as any)}
                      className={cn(
                        "flex-1 rounded-md py-1.5 text-xs font-medium capitalize transition",
                        buyRent === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title={`Price range · ₹0 - ₹${maxPrice.toLocaleString("en-IN")}`}>
                <input
                  type="range" min={100} max={60000} step={100}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="mt-4 flex items-center gap-2 text-sm">
                  <label className="flex cursor-pointer items-center gap-2">
                    <div className={cn("grid h-4 w-4 place-items-center rounded border transition", negotiable ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                      {negotiable && <Check className="h-3 w-3" />}
                    </div>
                    <input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} className="hidden" />
                    Negotiable only
                  </label>
                </div>
              </FilterBlock>

              <FilterBlock title="Condition">
                <div className="flex flex-wrap gap-2">
                  {["New", "Like New", "Good", "Used"].map((c) => (
                    <button
                      key={c}
                      onClick={() => toggleArrayItem(setConditions, c)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs transition",
                        conditions.includes(c)
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border hover:border-primary/40 bg-card hover:bg-secondary/50",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title="Department">
                <div className="space-y-2">
                  {["CSE", "Mechanical", "Civil", "ECE", "MBA"].map((d) => (
                    <label key={d} className="flex cursor-pointer items-center gap-2 text-sm">
                      <div className={cn("grid h-4 w-4 place-items-center rounded border transition", departments.includes(d) ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                        {departments.includes(d) && <Check className="h-3 w-3" />}
                      </div>
                      <input type="checkbox" checked={departments.includes(d)} onChange={() => toggleArrayItem(setDepartments, d)} className="hidden" />
                      {d}
                    </label>
                  ))}
                </div>
              </FilterBlock>
              
              <FilterBlock title="Availability">
                <div className="space-y-2">
                  {["Available", "Sold", "Reserved"].map((a) => (
                    <label key={a} className="flex cursor-pointer items-center gap-2 text-sm">
                      <div className={cn("grid h-4 w-4 place-items-center rounded border transition", availabilities.includes(a) ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                        {availabilities.includes(a) && <Check className="h-3 w-3" />}
                      </div>
                      <input type="checkbox" checked={availabilities.includes(a)} onChange={() => toggleArrayItem(setAvailabilities, a)} className="hidden" />
                      {a}
                    </label>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title="Campus" defaultOpen={false}>
                <div className="space-y-2">
                  {CAMPUSES.map((campus) => (
                    <label key={campus} className="flex cursor-pointer items-center gap-2 text-sm">
                      <div className={cn("grid h-4 w-4 place-items-center rounded border transition", selectedCampuses.includes(campus) ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                        {selectedCampuses.includes(campus) && <Check className="h-3 w-3" />}
                      </div>
                      <input type="checkbox" checked={selectedCampuses.includes(campus)} onChange={() => toggleArrayItem(setSelectedCampuses, campus)} className="hidden" />
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {campus}
                    </label>
                  ))}
                </div>
              </FilterBlock>

              <FilterBlock title="Trust & Status" defaultOpen={false}>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <div className={cn("grid h-4 w-4 place-items-center rounded border transition", verifiedOnly ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                      {verifiedOnly && <Check className="h-3 w-3" />}
                    </div>
                    <input type="checkbox" checked={verifiedOnly} onChange={(e) => setVerifiedOnly(e.target.checked)} className="hidden" />
                    Verified sellers only
                  </label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <div className={cn("grid h-4 w-4 place-items-center rounded border transition", recentlyAdded ? "border-primary bg-primary text-primary-foreground" : "border-input")}>
                      {recentlyAdded && <Check className="h-3 w-3" />}
                    </div>
                    <input type="checkbox" checked={recentlyAdded} onChange={(e) => setRecentlyAdded(e.target.checked)} className="hidden" />
                    Recently added
                  </label>
                </div>
              </FilterBlock>
            </div>
          </aside>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{filtered.length}</span> listings
                {activeCat && <> in <span className="font-semibold text-foreground">{activeCat}</span></>}
              </p>
              {(activeCat || conditions.length || verifiedOnly || query) && (
                <Button
                  variant="ghost" size="sm"
                  onClick={() => { setActiveCat(null); setConditions([]); setVerifiedOnly(false); setQuery(""); }}
                >
                  <X className="h-4 w-4" /> Clear
                </Button>
              )}
            </div>

            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <motion.div
                layout
                className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </motion.div>
            )}

            <Pagination />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function FilterBlock({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/60 py-3 last:border-0 last:pb-0">
      <button 
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-sm font-semibold text-foreground hover:text-primary transition-colors"
      >
        {title}
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-foreground shadow-soft">
        <Search className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">No listings found</h3>
      <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search terms.</p>
    </div>
  );
}

function Pagination() {
  return (
    <div className="mt-10 flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          className={cn(
            "h-9 w-9 rounded-full text-sm font-medium transition",
            n === 1 ? "bg-foreground text-background" : "hover:bg-secondary",
          )}
        >
          {n}
        </button>
      ))}
      <span className="px-2 text-muted-foreground">…</span>
      <button className="h-9 w-9 rounded-full text-sm font-medium hover:bg-secondary">12</button>
    </div>
  );
}
