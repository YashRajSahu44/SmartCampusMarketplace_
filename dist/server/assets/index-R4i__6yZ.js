import { r as reactExports, W as jsxRuntimeExports } from "./server-DVOLq0Aw.js";
import { c as createLucideIcon, u as useAuth, q as AnimatePresence, m as motion, r as Sparkles, a as cn, C as CAMPUSES, B as Button, t as toast, H as submitItemRequest, o as useCatalog, L as Link, p as categorySummaries, I as useCampusItemRequests, b as useNavigate } from "./router-CB4HpqAs.js";
import { X, N as Navbar, S as Search, P as ProductCard, M as MapPin, B as BadgeCheck } from "./navbar-BdIG9dO8.js";
import { F as Footer } from "./footer-Dob6-IuX.js";
import { C as CategoryIcon } from "./category-icon-D8ve-O03.js";
import { S as Send } from "./send-CCa7Pw3H.js";
import { T as TrendingUp } from "./trending-up-C1FEqCDZ.js";
import { U as Users } from "./users-Bpnit73Y.js";
import { b as Clock } from "./economy-DMw2zR1K.js";
import { M as MessageCircle } from "./message-circle-Dj3_Ofs5.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./theme-toggle-BX1RR6ZL.js";
const ArrowRight = createLucideIcon("ArrowRight", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
]);
const GraduationCap = createLucideIcon("GraduationCap", [
  [
    "path",
    {
      d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
      key: "j76jl0"
    }
  ],
  ["path", { d: "M22 10v6", key: "1lu8f3" }],
  ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
]);
const HandHeart = createLucideIcon("HandHeart", [
  ["path", { d: "M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16", key: "1ifwr1" }],
  [
    "path",
    {
      d: "m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9",
      key: "17abbs"
    }
  ],
  ["path", { d: "m2 15 6 6", key: "10dquu" }],
  [
    "path",
    {
      d: "M19.5 8.5c.7-.7 1.5-1.6 1.5-2.7A2.73 2.73 0 0 0 16 4a2.78 2.78 0 0 0-5 1.8c0 1.2.8 2 1.5 2.8L16 12Z",
      key: "1h3036"
    }
  ]
]);
const IndianRupee = createLucideIcon("IndianRupee", [
  ["path", { d: "M6 3h12", key: "ggurg9" }],
  ["path", { d: "M6 8h12", key: "6g4wlu" }],
  ["path", { d: "m6 13 8.5 8", key: "u1kupk" }],
  ["path", { d: "M6 13h3", key: "wdp6ag" }],
  ["path", { d: "M9 13c6.667 0 6.667-10 0-10", key: "1nkvk2" }]
]);
const Upload = createLucideIcon("Upload", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
const Zap = createLucideIcon("Zap", [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
]);
const CATEGORIES = [
  "Books",
  "Gadgets",
  "Notes",
  "Electronics",
  "Cycles",
  "Hostel Essentials",
  "Lab Equipment",
  "Furniture"
];
const CONDITIONS = ["Any", "New", "Like New", "Good", "Used"];
const URGENCY_LEVELS = ["Low", "Medium", "High", "Urgent"];
const DEPARTMENTS = ["CSE", "Mechanical", "Civil", "ECE", "MBA", "EEE", "IT", "Chemical"];
function RequestItemModal({ open, onClose }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    itemName: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    condition: "Any",
    description: "",
    urgency: "Medium",
    campus: "",
    department: ""
  });
  const updateField = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.itemName.trim()) return;
    if (!user) {
      toast.error("Sign in required", {
        description: "Please sign in to post a request to the campus board."
      });
      return;
    }
    const cat = form.category || "Books";
    const budgetMin = Math.max(0, Number(form.budgetMin) || 0);
    const budgetMax = Math.max(budgetMin, Number(form.budgetMax) || budgetMin);
    setSubmitting(true);
    try {
      await submitItemRequest({
        itemName: form.itemName.trim(),
        category: cat,
        budgetMin,
        budgetMax,
        condition: form.condition,
        description: form.description.trim(),
        urgency: form.urgency === "Low" || form.urgency === "Medium" || form.urgency === "High" || form.urgency === "Urgent" ? form.urgency : "Medium",
        campus: form.campus || "Campus",
        department: form.department || "General",
        studentName: user.displayName ?? user.email?.split("@")[0] ?? "Student",
        studentAvatar: user.photoURL ?? void 0,
        studentVerified: user.emailVerified,
        authorUid: user.uid
      });
      toast.success("Request posted", {
        description: `Your request for "${form.itemName}" is live for sellers.`
      });
      setForm({
        itemName: "",
        category: "",
        budgetMin: "",
        budgetMax: "",
        condition: "Any",
        description: "",
        urgency: "Medium",
        campus: "",
        department: ""
      });
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Could not post request", {
        description: err instanceof Error ? err.message : "Check Firebase/Firestore rules and try again."
      });
    } finally {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-[100] flex items-center justify-center p-4",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 24, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            exit: { opacity: 0, y: 24, scale: 0.97 },
            transition: { duration: 0.25, ease: "easeOut" },
            className: "relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-elegant",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-0 h-1 bg-brand-gradient" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-b border-border px-6 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold", children: "Request an Item" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Tell the campus what you need" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: onClose,
                    className: "grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "max-h-[70vh] overflow-y-auto px-6 py-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
                      "What do you need? ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        value: form.itemName,
                        onChange: (e) => updateField("itemName", e.target.value),
                        placeholder: "e.g., Engineering Drawing Kit, DSA Notes, Monitor...",
                        required: true,
                        className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Category" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: form.category,
                          onChange: (e) => updateField("category", e.target.value),
                          className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select..." }),
                            CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Department" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: form.department,
                          onChange: (e) => updateField("department", e.target.value),
                          className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select..." }),
                            DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                          ]
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Budget Range (₹)" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.budgetMin,
                          onChange: (e) => updateField("budgetMin", e.target.value),
                          placeholder: "Min",
                          className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "number",
                          value: form.budgetMax,
                          onChange: (e) => updateField("budgetMax", e.target.value),
                          placeholder: "Max",
                          className: "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Condition Preferred" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          value: form.condition,
                          onChange: (e) => updateField("condition", e.target.value),
                          className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary",
                          children: CONDITIONS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Urgency" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5", children: URGENCY_LEVELS.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => updateField("urgency", u),
                          className: cn(
                            "flex-1 rounded-lg py-2 text-xs font-medium transition",
                            form.urgency === u ? u === "Urgent" ? "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30" : u === "High" ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30" : u === "Medium" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30" : "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30" : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                          ),
                          children: u
                        },
                        u
                      )) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Campus" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: form.campus,
                        onChange: (e) => updateField("campus", e.target.value),
                        className: "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select campus..." }),
                          CAMPUSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: c, children: c }, c))
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1.5 block text-sm font-medium", children: "Description" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "textarea",
                      {
                        value: form.description,
                        onChange: (e) => updateField("description", e.target.value),
                        placeholder: "Add details about what you're looking for, specific models, any preferences...",
                        rows: 3,
                        className: "w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "mb-1.5 block text-sm font-medium", children: [
                      "Reference Image",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(optional)" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-6 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Click to upload or drag & drop" })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center justify-end gap-3 border-t border-border pt-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "sm", onClick: onClose, children: "Cancel" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      size: "sm",
                      disabled: !form.itemName.trim() || submitting,
                      className: "rounded-full bg-brand-gradient px-6 text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-50",
                      children: submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: { rotate: 360 },
                          transition: { duration: 1, repeat: Infinity, ease: "linear" },
                          className: "h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "mr-1.5 h-3.5 w-3.5" }),
                        "Post Request"
                      ] })
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  ) });
}
function Landing() {
  const [requestModalOpen, setRequestModalOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, { onRequestItem: () => setRequestModalOpen(true) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stats, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MarketplacePulse, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Categories, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Featured, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RequestedByStudents, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RequestItemModal, { open: requestModalOpen, onClose: () => setRequestModalOpen(false) })
  ] });
}
function Hero({
  onRequestItem
}) {
  const {
    products
  } = useCatalog();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden bg-hero-gradient", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute inset-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-28 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] blur-2xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-32 top-6 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)] blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 h-64 w-[520px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08),transparent_65%)] blur-2xl" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.6
      }, className: "mx-auto max-w-3xl text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-3.5 w-3.5 text-foreground" }),
          "AI-powered campus marketplace · Pilot running across 8 campuses"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-display text-5xl font-semibold italic leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl", children: [
          "Buy, sell & exchange",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-brand-gradient", children: "within your campus." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-6 max-w-2xl text-lg text-muted-foreground", children: "The trusted marketplace built exclusively for verified students. Books, gadgets, notes, cycles, hostel essentials — all from people you can actually meet." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "rounded-full bg-brand-gradient px-7 text-primary-foreground shadow-elegant hover:opacity-90", children: [
            "Explore marketplace ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "rounded-full px-7", children: "Sell something" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
            scale: 1.03
          }, whileTap: {
            scale: 0.97
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", variant: "outline", onClick: onRequestItem, className: "rounded-full border-primary/30 px-7 text-primary hover:bg-primary/5 hover:border-primary/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "mr-1.5 h-4 w-4" }),
            "Request Item"
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "h-4 w-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { placeholder: "Search for books, gadgets, calculators…", className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("kbd", { className: "hidden rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground sm:block", children: "⌘K" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 40
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.7,
        delay: 0.2
      }, className: "mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4", children: products.slice(0, 4).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: {
        y: [0, -8, 0]
      }, transition: {
        duration: 4 + i * 0.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.2
      }, className: "overflow-hidden rounded-2xl border border-border bg-card shadow-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.image, alt: p.title, className: "aspect-square w-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "truncate text-xs font-medium", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-sm font-bold", children: [
            "₹",
            p.price.toLocaleString("en-IN")
          ] })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}
function Stats() {
  const stats = [{
    v: "8",
    l: "Pilot campuses"
  }, {
    v: "4.2K+",
    l: "Verified students"
  }, {
    v: "12.6K",
    l: "Successful exchanges"
  }, {
    v: "4.8/5",
    l: "Average rating"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border/60 bg-secondary/40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8", children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl", children: s.v }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-muted-foreground", children: s.l })
  ] }, s.l)) }) });
}
function MarketplacePulse() {
  const {
    products
  } = useCatalog();
  const listingWord = products.length === 1 ? "listing" : "listings";
  const items = [{
    t: `${products.length} campus ${listingWord}`,
    d: "Demo inventory plus listings synced from Firestore when configured.",
    icon: TrendingUp
  }, {
    t: "Trusted meet-ups",
    d: "Coordinate pickup on campus via Messages.",
    icon: Zap
  }, {
    t: "Student-first marketplace",
    d: "Buy, sell, and rent with verified peers.",
    icon: Users
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-3", children: items.map((x, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 14
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-40px"
  }, transition: {
    delay: i * 0.08
  }, className: "relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] blur-2xl" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(x.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: x.t }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-muted-foreground", children: x.d })
      ] })
    ] })
  ] }, x.t)) }) });
}
function Categories() {
  const {
    products
  } = useCatalog();
  const categories = categorySummaries(products);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold italic tracking-tight sm:text-4xl", children: "Browse categories" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Find exactly what you need on campus." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", className: "hidden text-sm font-medium text-primary hover:underline sm:block", children: "View all →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 sm:grid-cols-4", children: categories.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true
    }, transition: {
      delay: i * 0.04
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/marketplace", search: {
      category: c.name
    }, className: "group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-foreground transition group-hover:bg-secondary/80 group-hover:text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CategoryIcon, { category: c.name, className: "opacity-95 transition group-hover:opacity-100" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: c.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          c.count,
          " listings"
        ] })
      ] })
    ] }) }, c.name)) })
  ] });
}
function Featured() {
  const {
    products
  } = useCatalog();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-50/20 via-background to-amber-50/50 dark:from-amber-950/10 dark:via-background dark:to-amber-950/20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_70%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 flex items-end justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold italic tracking-tight sm:text-4xl", children: "Trending on campus" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Hand-picked listings from top sellers." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", className: "text-sm font-medium text-primary hover:underline", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4", children: products.slice(0, 8).map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] })
  ] });
}
function RequestedByStudents() {
  const {
    requests
  } = useCampusItemRequests();
  const [provideFor, setProvideFor] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-50/30 via-background to-blue-50/20 dark:from-amber-950/15 dark:via-background dark:to-blue-950/10" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_70%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-10 flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(HandHeart, { className: "h-3 w-3" }),
          " Live requests"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-3xl font-semibold italic tracking-tight sm:text-4xl", children: "Requested by students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground", children: "Students are looking for these items right now. Can you help?" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3", children: requests.map((req, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(RequestCard, { request: req, index: i, onProvide: () => setProvideFor(req) }, req.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProvideModal, { request: provideFor, onClose: () => setProvideFor(null) })
  ] });
}
function RequestCard({
  request,
  index,
  onProvide
}) {
  const urgencyColors = {
    Urgent: "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30",
    High: "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/30",
    Medium: "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30",
    Low: "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 20
  }, whileInView: {
    opacity: 1,
    y: 0
  }, viewport: {
    once: true,
    margin: "-40px"
  }, transition: {
    delay: index * 0.07
  }, whileHover: {
    y: -4,
    transition: {
      duration: 0.2
    }
  }, className: "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elegant", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.1),transparent_65%)] blur-2xl transition-opacity group-hover:opacity-100 opacity-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold", urgencyColors[request.urgency]), children: [
        request.urgency === "Urgent" && "🔥",
        " ",
        request.urgency
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
        " ",
        request.postedAgo
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-base font-semibold leading-snug", children: request.itemName }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 line-clamp-2 text-sm text-muted-foreground", children: request.description }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-3 w-3" }),
        " ₹",
        request.budgetMin.toLocaleString("en-IN"),
        " - ₹",
        request.budgetMax.toLocaleString("en-IN")
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "h-3 w-3" }),
        " ",
        request.department
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3" }),
        " ",
        request.campus
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-xs text-muted-foreground", children: [
      "Preferred: ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: request.condition })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between border-t border-border pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: request.student.avatar, alt: "", className: "h-7 w-7 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs font-medium", children: [
          request.student.name,
          request.student.verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3 w-3 text-primary" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
        scale: 1.04
      }, whileTap: {
        scale: 0.96
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: onProvide, className: "rounded-full bg-brand-gradient px-4 text-xs text-primary-foreground shadow-soft hover:opacity-90", children: "I Can Provide This" }) })
    ] })
  ] });
}
function ProvideModal({
  request,
  onClose
}) {
  const navigate = useNavigate();
  const [message, setMessage] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 400));
    setSending(false);
    toast.success("Draft saved", {
      description: `${request?.student.name} can be reached from Messages — paste your note there to coordinate safely.`
    });
    setMessage("");
    onClose();
    void navigate({
      to: "/chat"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: request && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0
  }, animate: {
    opacity: 1
  }, exit: {
    opacity: 0
  }, className: "fixed inset-0 z-[100] flex items-center justify-center p-4", onClick: (e) => e.target === e.currentTarget && onClose(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 20,
      scale: 0.97
    }, animate: {
      opacity: 1,
      y: 0,
      scale: 1
    }, exit: {
      opacity: 0,
      y: 20,
      scale: 0.97
    }, transition: {
      duration: 0.25
    }, className: "relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-elegant", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 right-0 top-0 h-1 bg-brand-gradient" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-base font-semibold", children: "Respond to request" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-sm text-muted-foreground", children: [
          "Let ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: request.student.name }),
          " know you can provide:"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 rounded-xl border border-border bg-secondary/50 p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: request.itemName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-xs text-muted-foreground", children: [
            "Budget: ₹",
            request.budgetMin.toLocaleString("en-IN"),
            " - ₹",
            request.budgetMax.toLocaleString("en-IN")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "Hi! I have this item available. It's in great condition and I can meet you at...", rows: 3, className: "mt-4 w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-end gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: onClose, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: !message.trim() || sending, onClick: handleSend, className: "rounded-full bg-brand-gradient px-5 text-primary-foreground shadow-soft hover:opacity-90", children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
            rotate: 360
          }, transition: {
            duration: 1,
            repeat: Infinity,
            ease: "linear"
          }, className: "h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-1.5 h-3.5 w-3.5" }),
            "Send Message"
          ] }) })
        ] })
      ] })
    ] })
  ] }) });
}
function CTA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-amber-50/20 via-background to-amber-50/60 dark:from-amber-950/10 dark:via-background dark:to-amber-950/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50 via-orange-50/80 to-yellow-50 p-12 text-center shadow-elegant dark:border-amber-800/30 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/40 sm:p-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.12),transparent_60%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.08),transparent_65%)] blur-3xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl font-semibold italic tracking-tight text-foreground sm:text-5xl", children: "Your campus marketplace is one tap away." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-base text-muted-foreground", children: "Join 4,200+ verified students already exchanging smarter on campus." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", className: "rounded-full bg-brand-gradient px-8 text-primary-foreground shadow-elegant hover:opacity-90", children: "Get started — free" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/marketplace", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", className: "rounded-full border-border px-8 text-foreground hover:bg-secondary", children: "Browse listings" }) })
        ] })
      ] })
    ] })
  ] });
}
export {
  Landing as component
};
