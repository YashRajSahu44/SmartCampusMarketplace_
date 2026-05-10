import { r as reactExports, W as jsxRuntimeExports } from "./server-DVOLq0Aw.js";
import { N as Navbar, S as Search, C as Check, M as MapPin, X, P as ProductCard, a as ChevronDown } from "./navbar-BdIG9dO8.js";
import { F as Footer } from "./footer-Dob6-IuX.js";
import { C as CategoryIcon } from "./category-icon-D8ve-O03.js";
import { c as createLucideIcon, R as Route, o as useCatalog, p as categorySummaries, a as cn, C as CAMPUSES, B as Button, m as motion, q as AnimatePresence } from "./router-CB4HpqAs.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./theme-toggle-BX1RR6ZL.js";
import "./economy-DMw2zR1K.js";
const SlidersHorizontal = createLucideIcon("SlidersHorizontal", [
  ["line", { x1: "21", x2: "14", y1: "4", y2: "4", key: "obuewd" }],
  ["line", { x1: "10", x2: "3", y1: "4", y2: "4", key: "1q6298" }],
  ["line", { x1: "21", x2: "12", y1: "12", y2: "12", key: "1iu8h1" }],
  ["line", { x1: "8", x2: "3", y1: "12", y2: "12", key: "ntss68" }],
  ["line", { x1: "21", x2: "16", y1: "20", y2: "20", key: "14d8ph" }],
  ["line", { x1: "12", x2: "3", y1: "20", y2: "20", key: "m0wm8r" }],
  ["line", { x1: "14", x2: "14", y1: "2", y2: "6", key: "14e1ph" }],
  ["line", { x1: "8", x2: "8", y1: "10", y2: "14", key: "1i6ji0" }],
  ["line", { x1: "16", x2: "16", y1: "18", y2: "22", key: "1lctlv" }]
]);
function MarketplacePage() {
  const search = Route.useSearch();
  const {
    products
  } = useCatalog();
  const categories = reactExports.useMemo(() => categorySummaries(products), [products]);
  const [query, setQuery] = reactExports.useState("");
  const [activeCat, setActiveCat] = reactExports.useState(search.category ?? null);
  const [conditions, setConditions] = reactExports.useState([]);
  const [maxPrice, setMaxPrice] = reactExports.useState(6e4);
  const [verifiedOnly, setVerifiedOnly] = reactExports.useState(false);
  const [sort, setSort] = reactExports.useState("new");
  const [buyRent, setBuyRent] = reactExports.useState("all");
  const [departments, setDepartments] = reactExports.useState([]);
  const [availabilities, setAvailabilities] = reactExports.useState(["Available"]);
  const [recentlyAdded, setRecentlyAdded] = reactExports.useState(false);
  const [negotiable, setNegotiable] = reactExports.useState(false);
  const [selectedCampuses, setSelectedCampuses] = reactExports.useState([]);
  const normalizedConditions = reactExports.useMemo(() => conditions.map((c) => c === "Used" ? "Fair" : c), [conditions]);
  const filtered = reactExports.useMemo(() => {
    let list = products.filter((p) => {
      if (activeCat && p.category !== activeCat) return false;
      if (normalizedConditions.length && !normalizedConditions.includes(p.condition)) return false;
      if (p.price > maxPrice) return false;
      if (verifiedOnly && !p.seller.verified) return false;
      if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
      if (buyRent === "buy" && p.forRent) return false;
      if (buyRent === "rent" && !p.forRent) return false;
      if (departments.length) {
        const dept = p.department ?? "";
        if (!dept || !departments.includes(dept)) return false;
      }
      const availability = p.availability ?? "Available";
      if (availabilities.length && !availabilities.includes(availability)) return false;
      if (recentlyAdded) {
        const pa = p.postedAgo.toLowerCase();
        const looksRecent = pa.includes("min ago") || pa === "just now" || pa.includes("hour") || pa.includes("hours ago");
        if (!looksRecent) return false;
      }
      if (negotiable && !p.negotiable) return false;
      if (selectedCampuses.length) {
        const hay = `${p.seller.college} ${p.pickupLocation ?? ""}`.toLowerCase();
        const matchCampus = selectedCampuses.some((c) => hay.includes(c.toLowerCase()));
        if (!matchCampus) return false;
      }
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCat, availabilities, buyRent, departments, maxPrice, negotiable, normalizedConditions, products, query, recentlyAdded, selectedCampuses, sort, verifiedOnly]);
  const toggleArrayItem = (setter, item) => {
    setter((prev) => prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold italic tracking-tight sm:text-5xl", children: "Marketplace" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Discover what your campus is buying, selling and renting today." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search listings…", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 sm:contents", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => document.getElementById("mobile-filters")?.classList.toggle("hidden"), className: "flex flex-1 items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-3 text-sm font-medium shadow-soft transition hover:bg-secondary lg:hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
              " Filters"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: sort, onChange: (e) => setSort(e.target.value), className: "flex-1 rounded-full border border-border bg-card px-4 py-3 text-sm shadow-soft outline-none sm:flex-none", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "Newest" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "low", children: "Price: low to high" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "high", children: "Price: high to low" })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[260px_1fr] lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { id: "mobile-filters", className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-24 space-y-1 rounded-2xl border border-border bg-card p-5 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 flex items-center justify-between pb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SlidersHorizontal, { className: "h-4 w-4" }),
              " Filters"
            ] }),
            (activeCat || conditions.length > 0 || maxPrice < 6e4 || verifiedOnly || buyRent !== "all" || departments.length > 0 || availabilities.length > 1 || recentlyAdded || negotiable || selectedCampuses.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
              setActiveCat(null);
              setConditions([]);
              setMaxPrice(6e4);
              setVerifiedOnly(false);
              setBuyRent("all");
              setDepartments([]);
              setAvailabilities(["Available"]);
              setRecentlyAdded(false);
              setNegotiable(false);
              setSelectedCampuses([]);
            }, className: "text-xs font-medium text-primary hover:underline", children: "Reset" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Category", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveCat(null), className: cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition", !activeCat ? "bg-secondary font-medium" : "hover:bg-secondary/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "All" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: products.length })
            ] }),
            categories.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActiveCat(c.name), className: cn("flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition", activeCat === c.name ? "bg-secondary font-medium" : "hover:bg-secondary/60"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-7 w-7 place-items-center rounded-lg bg-secondary text-foreground transition group-hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: c.name, size: 16, animated: false }) }),
                c.name
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: c.count })
            ] }, c.name))
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Transaction Type", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex rounded-lg border border-border bg-secondary/50 p-1", children: ["all", "buy", "rent"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setBuyRent(t), className: cn("flex-1 rounded-md py-1.5 text-xs font-medium capitalize transition", buyRent === t ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"), children: t }, t)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(FilterBlock, { title: `Price range · ₹0 - ₹${maxPrice.toLocaleString("en-IN")}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "range", min: 100, max: 6e4, step: 100, value: maxPrice, onChange: (e) => setMaxPrice(Number(e.target.value)), className: "w-full accent-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex items-center gap-2 text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", negotiable ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: negotiable && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: negotiable, onChange: (e) => setNegotiable(e.target.checked), className: "hidden" }),
              "Negotiable only"
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Condition", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: ["New", "Like New", "Good", "Fair"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toggleArrayItem(setConditions, c), className: cn("rounded-full border px-3 py-1.5 text-xs transition", conditions.includes(c) ? "border-primary bg-primary/10 text-primary font-medium" : "border-border hover:border-primary/40 bg-card hover:bg-secondary/50"), children: c }, c)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Department", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["CSE", "Mechanical", "Civil", "ECE", "MBA"].map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", departments.includes(d) ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: departments.includes(d) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: departments.includes(d), onChange: () => toggleArrayItem(setDepartments, d), className: "hidden" }),
            d
          ] }, d)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Availability", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Available", "Sold", "Reserved"].map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", availabilities.includes(a) ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: availabilities.includes(a) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: availabilities.includes(a), onChange: () => toggleArrayItem(setAvailabilities, a), className: "hidden" }),
            a
          ] }, a)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Campus", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: CAMPUSES.map((campus) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", selectedCampuses.includes(campus) ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: selectedCampuses.includes(campus) && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: selectedCampuses.includes(campus), onChange: () => toggleArrayItem(setSelectedCampuses, campus), className: "hidden" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 text-muted-foreground" }),
            campus
          ] }, campus)) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FilterBlock, { title: "Trust & Status", defaultOpen: false, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", verifiedOnly ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: verifiedOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: verifiedOnly, onChange: (e) => setVerifiedOnly(e.target.checked), className: "hidden" }),
              "Verified sellers only"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("grid h-4 w-4 place-items-center rounded border transition", recentlyAdded ? "border-primary bg-primary text-primary-foreground" : "border-input"), children: recentlyAdded && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", checked: recentlyAdded, onChange: (e) => setRecentlyAdded(e.target.checked), className: "hidden" }),
              "Recently added"
            ] })
          ] }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
              "Showing ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: filtered.length }),
              " ",
              "listings",
              activeCat && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                " ",
                "in ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: activeCat })
              ] })
            ] }),
            (activeCat || conditions.length || verifiedOnly || query) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
              setActiveCat(null);
              setConditions([]);
              setVerifiedOnly(false);
              setQuery("");
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
              " Clear"
            ] })
          ] }),
          filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { layout: true, className: "grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4", children: filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ListingCountFooter, { total: filtered.length })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function FilterBlock({
  title,
  children,
  defaultOpen = true
}) {
  const [open, setOpen] = reactExports.useState(defaultOpen);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 py-3 last:border-0 last:pb-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "flex w-full items-center justify-between text-sm font-semibold text-foreground hover:text-primary transition-colors", children: [
      title,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: cn("h-4 w-4 text-muted-foreground transition-transform duration-200", open && "rotate-180") })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.2
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4 pb-1", children }) }) })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid place-items-center rounded-2xl border border-dashed border-border bg-card py-20 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-14 w-14 place-items-center rounded-2xl bg-secondary text-foreground shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-6 w-6" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 text-lg font-semibold", children: "No listings found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Try adjusting your filters or search terms." })
  ] });
}
function ListingCountFooter({
  total
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 text-center text-sm text-muted-foreground", children: [
    "Showing ",
    total,
    " listing",
    total === 1 ? "" : "s",
    ".",
    total > 48 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1", children: "Consider narrowing filters — classic paging can be added when the catalog grows further." }) : null
  ] });
}
export {
  MarketplacePage as component
};
