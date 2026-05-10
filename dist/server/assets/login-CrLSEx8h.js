import { W as jsxRuntimeExports, r as reactExports } from "./server-DVOLq0Aw.js";
import { S as ShoppingBag, r as Sparkles, B as Button, b as useNavigate, L as Link, m as motion, s as signInWithPopup, e as auth, g as googleProvider, t as toast, f as getFirebaseAuthErrorMessage, v as signInWithEmailAndPassword } from "./router-CB4HpqAs.js";
import { T as ThemeToggle } from "./theme-toggle-BX1RR6ZL.js";
import { M as Mail, L as Lock, E as EyeOff, a as Eye, s as syncAuthenticatedUserToMongo } from "./user-sync-DeV-425Q.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function LoginPage() {
  const navigate = useNavigate();
  const [show, setShow] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleEmailSignIn = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      await syncAuthenticatedUserToMongo(credential.user);
      toast.success("Signed in successfully.");
      navigate({
        to: "/dashboard"
      });
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithPopup(auth, googleProvider);
      await syncAuthenticatedUserToMongo(credential.user);
      toast.success("Signed in with Google.");
      navigate({
        to: "/dashboard"
      });
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-h-screen lg:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthAside, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-8 w-8 place-items-center rounded-xl bg-brand-gradient text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold lg:hidden", children: "SmartCampus" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center px-6 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "w-full max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "Sign in to your campus account." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBtn, { provider: "Google", onClick: handleGoogleSignIn, disabled: loading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBtn, { provider: "Apple", disabled: true, title: "Apple sign-in is not configured yet." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
          " OR ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: handleEmailSignIn, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Mail, label: "College email", type: "email", placeholder: "name@university.edu", autoComplete: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Lock, label: "Password", type: show ? "text" : "password", placeholder: "••••••••", autoComplete: "current-password", value: password, onChange: (event) => setPassword(event.target.value), required: true, trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", className: "text-xs text-primary hover:underline", children: "Forgot password?" }) })
          ] }),
          error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full rounded-xl bg-brand-gradient text-primary-foreground shadow-elegant hover:opacity-90", size: "lg", disabled: loading, children: loading ? "Signing in..." : "Sign in" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "Don't have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/signup", className: "font-medium text-primary hover:underline", children: "Sign up" })
        ] })
      ] }) })
    ] })
  ] });
}
function Field({
  icon: Icon,
  label,
  trailing,
  ...rest
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-1.5 block text-xs font-medium", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ...rest, className: "flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" }),
      trailing
    ] })
  ] });
}
function SocialBtn({
  provider,
  onClick,
  disabled,
  title
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "lg", className: "w-full justify-center gap-2 rounded-xl", onClick, disabled, title, type: "button", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base", children: provider === "Google" ? "🇬" : "" }),
    "Continue with ",
    provider
  ] });
}
function AuthAside() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden overflow-hidden bg-brand-gradient lg:flex lg:flex-col lg:justify-between lg:p-10 lg:text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_60%)]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid h-9 w-9 place-items-center rounded-xl bg-background/15 backdrop-blur", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: "SmartCampus" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-6 w-6 opacity-80" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-3xl font-semibold leading-tight", children: "The trusted marketplace built exclusively for verified students." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm opacity-80", children: "Books, gadgets, notes, cycles, hostel essentials — buy and sell with people you can actually meet on campus." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex -space-x-2", children: [12, 47, 33, 20].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: `https://i.pravatar.cc/80?img=${n}`, className: "h-8 w-8 rounded-full border-2 border-primary-foreground/30", alt: "" }, n)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-80", children: "Joined by 4,200+ verified students across pilot campuses" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative text-xs opacity-60", children: "© SmartCampus · Built for students" })
  ] });
}
export {
  AuthAside,
  Field,
  SocialBtn,
  LoginPage as component
};
