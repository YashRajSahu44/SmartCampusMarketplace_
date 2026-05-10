import { r as reactExports, W as jsxRuntimeExports } from "./server-DVOLq0Aw.js";
import { c as createLucideIcon, b as useNavigate, A as AuthAside, L as Link, S as ShoppingBag, m as motion, d as SocialBtn, F as Field, B as Button, s as signInWithPopup, e as auth, g as googleProvider, t as toast, f as getFirebaseAuthErrorMessage, h as createUserWithEmailAndPassword, i as updateProfile, j as sendEmailVerification } from "./router-CB4HpqAs.js";
import { T as ThemeToggle } from "./theme-toggle-BX1RR6ZL.js";
import { M as Mail, L as Lock, E as EyeOff, a as Eye, s as syncAuthenticatedUserToMongo } from "./user-sync-DeV-425Q.js";
import { S as ShieldCheck } from "./shield-check-CAa_sK7V.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const User = createLucideIcon("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);
function SignupPage() {
  const navigate = useNavigate();
  const [show, setShow] = reactExports.useState(false);
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const handleCreateAccount = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {
        displayName: name
      });
      await sendEmailVerification(credential.user);
      await syncAuthenticatedUserToMongo(credential.user);
      toast.success("Account created. Check your email to verify it.");
      navigate({
        to: "/dashboard"
      });
    } catch (authError) {
      setError(getFirebaseAuthErrorMessage(authError));
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignUp = async () => {
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
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 items-center justify-center px-6 pb-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        opacity: 0,
        y: 16
      }, animate: {
        opacity: 1,
        y: 0
      }, className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-semibold tracking-tight", children: "Create your account" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1.5 text-sm text-muted-foreground", children: "Use your college email to get verified instantly." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 grid gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBtn, { provider: "Google", onClick: handleGoogleSignUp, disabled: loading }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SocialBtn, { provider: "Apple", disabled: true, title: "Apple sign-in is not configured yet." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-6 flex items-center gap-3 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" }),
          " OR",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px flex-1 bg-border" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-3", onSubmit: handleCreateAccount, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: User, label: "Full name", placeholder: "Alex Morgan", autoComplete: "name", value: name, onChange: (event) => setName(event.target.value), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Mail, label: "College email", type: "email", placeholder: "name@university.edu", autoComplete: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { icon: Lock, label: "Password", type: show ? "text" : "password", placeholder: "At least 8 characters", autoComplete: "new-password", value: password, onChange: (event) => setPassword(event.target.value), required: true, trailing: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShow(!show), className: "text-muted-foreground", children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-secondary/40 p-3 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "mr-1.5 inline h-3.5 w-3.5 text-foreground" }),
            "We'll send a verification email after your account is created."
          ] }),
          error ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: error }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", size: "lg", className: "w-full rounded-xl bg-brand-gradient text-primary-foreground shadow-elegant hover:opacity-90", disabled: loading, children: loading ? "Creating account..." : "Continue" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-6 text-center text-sm text-muted-foreground", children: [
          "Already have an account?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "font-medium text-primary hover:underline", children: "Sign in" })
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  SignupPage as component
};
