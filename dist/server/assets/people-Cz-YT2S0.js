import { r as reactExports, W as jsxRuntimeExports } from "./server-DVOLq0Aw.js";
import { u as useAuth, k as useCampus, l as isFirebaseConfigured, n as subscribePublicProfiles, B as Button, a as cn, L as Link, m as motion, C as CAMPUSES } from "./router-CB4HpqAs.js";
import { N as Navbar, S as Search, M as MapPin } from "./navbar-BdIG9dO8.js";
import { F as Footer } from "./footer-Dob6-IuX.js";
import { U as Users } from "./users-Bpnit73Y.js";
import { S as ShieldCheck } from "./shield-check-CAa_sK7V.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./theme-toggle-BX1RR6ZL.js";
import "./economy-DMw2zR1K.js";
function PeoplePage() {
  const {
    user
  } = useAuth();
  const {
    campus
  } = useCampus();
  const [query, setQuery] = reactExports.useState("");
  const [nearbyOnly, setNearbyOnly] = reactExports.useState(true);
  const [profiles, setProfiles] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!isFirebaseConfigured || typeof window === "undefined") {
      setProfiles([]);
      return void 0;
    }
    const unsub = subscribePublicProfiles(setProfiles);
    return unsub;
  }, []);
  const filtered = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = profiles.filter((p) => user ? p.firebaseUid !== user.uid : true);
    if (nearbyOnly && campus) {
      rows = rows.filter((p) => p.campusKey === campus);
    }
    if (q.length > 0) {
      rows = rows.filter((p) => p.displayNameLower.includes(q) || p.firebaseUid.toLowerCase().includes(q) || p.campusKey.toLowerCase().includes(q));
    }
    return rows;
  }, [profiles, query, nearbyOnly, campus, user]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-b border-border bg-hero-gradient", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-4xl font-semibold italic tracking-tight sm:text-5xl", children: "Find people" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 max-w-2xl text-muted-foreground", children: [
          "Search by name or browse peers who share your campus selection (",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: "Nearby" }),
          " uses your navbar campus hub — choose LNCT, MANIT, etc. first)."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col gap-4 sm:flex-row sm:items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Search by display name…", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: nearbyOnly ? "default" : "outline", className: cn("rounded-full", nearbyOnly && "bg-brand-gradient text-primary-foreground hover:opacity-90"), onClick: () => setNearbyOnly((v) => !v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "mr-2 h-4 w-4" }),
            nearbyOnly ? "Nearby only (campus)" : "Show all campuses"
          ] })
        ] }),
        !campus && nearbyOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 rounded-xl border border-dashed border-border bg-card/60 px-4 py-2 text-xs text-muted-foreground", children: "Pick a campus from the navbar to tighten discovery — or turn off “Nearby only”." }) : null,
        !isFirebaseConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-xs text-amber-600 dark:text-amber-400", children: "Firebase env vars are not configured — people discovery syncs after you add `.env`." }) : null
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8", children: [
        !user ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "mx-auto h-10 w-10 text-muted-foreground/70" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-medium text-foreground", children: "Sign in to appear here yourself" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Your profile row saves automatically once Firebase + Auth are active." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "rounded-full", children: "Sign in" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "rounded-full bg-brand-gradient text-primary-foreground", children: "Join" }) })
          ] })
        ] }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "col-span-full grid place-items-center rounded-2xl border border-dashed border-border py-20 text-center text-sm text-muted-foreground", children: "No profiles match. Invite classmates after they log in once — profiles populate after signup." }) : filtered.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          opacity: 0,
          y: 12
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.03
        }, className: "rounded-2xl border border-border bg-card p-5 shadow-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.photoUrl ?? `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(p.firebaseUid)}`, alt: "", className: "h-14 w-14 rounded-2xl object-cover ring-2 ring-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$userId", params: {
                userId: p.firebaseUid
              }, className: "truncate font-semibold text-foreground hover:underline", children: p.displayName }),
              p.emailVerified ? /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 shrink-0 text-primary", "aria-label": "Verified email" }) : null
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground", children: p.campusKey ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
              p.campusKey
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/80", children: "Campus not set yet" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile/$userId", params: {
              userId: p.firebaseUid
            }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", className: "rounded-full", children: "View profile" }) }) })
          ] })
        ] }) }, p.firebaseUid)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-10 text-center text-xs text-muted-foreground", children: [
          "Campus keys mirror navbar hubs: ",
          CAMPUSES.join(", "),
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PeoplePage as component
};
