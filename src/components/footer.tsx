import { Link } from "@tanstack/react-router";
import { ShoppingBag, Github, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-gradient-to-b from-background via-background to-amber-50/20 dark:to-amber-950/10 overflow-hidden">
      {/* Warm gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
              <ShoppingBag className="h-4 w-4" />
            </div>
            <span className="text-base font-semibold">Smart<span className="text-brand-gradient">Campus</span>
            <span className="ml-1 text-xs font-medium text-muted-foreground">Marketplace</span></span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The trusted marketplace built exclusively for verified college students.
            Buy, sell, rent, exchange — all within your campus community.
          </p>
          <div className="mt-6 flex gap-3 text-muted-foreground">
            <a href="#" className="rounded-full border border-border p-2 transition hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="rounded-full border border-border p-2 transition hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="rounded-full border border-border p-2 transition hover:text-foreground"><Github className="h-4 w-4" /></a>
          </div>
        </div>

        {[
          { title: "Product", links: ["Marketplace", "How it works", "AI pricing", "Trust & safety"] },
          { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
          { title: "Legal", links: ["Terms", "Privacy", "Cookies", "Guidelines"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => <li key={l}><a href="#" className="hover:text-foreground">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60">
        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} SmartCampus. Built for students, by students.</span>
          <span>Made with care · v1.0</span>
        </div>
      </div>
    </footer>
  );
}
