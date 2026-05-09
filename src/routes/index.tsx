import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, ShieldCheck, Zap, Users, ArrowRight, Search,
  BadgeCheck, MessageCircle, Bot, TrendingUp, Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import { Button } from "@/components/ui/button";
import { products, categories, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <MarketplacePulse />
        <Categories />
        <Featured />
        <RecentlyListed />
        <FeaturedDeals />
        <HowItWorks />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] blur-2xl" />
        <div className="absolute -right-32 top-6 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_65%)] blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[520px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.08),transparent_65%)] blur-2xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:px-8 lg:pt-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-foreground" />
            AI-powered campus marketplace · Now in 40+ colleges
          </span>
          <h1 className="mt-6 font-display text-5xl font-semibold italic leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Buy, sell & exchange
            <br />
            <span className="text-brand-gradient">within your campus.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The trusted marketplace built exclusively for verified students. Books, gadgets, notes,
            cycles, hostel essentials — all from people you can actually meet.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/marketplace">
              <Button size="lg" className="rounded-full bg-brand-gradient px-7 text-primary-foreground shadow-elegant hover:opacity-90">
                Explore marketplace <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg" variant="outline" className="rounded-full px-7">
                Sell something
              </Button>
            </Link>
          </div>

          <div className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-3 shadow-soft">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search for books, gadgets, calculators…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="hidden rounded-md border border-border bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground sm:block">⌘K</kbd>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {products.slice(0, 4).map((p, i) => (
            <motion.div
              key={p.id}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <img src={p.image} alt={p.title} className="aspect-square w-full object-cover" />
              <div className="p-3">
                <div className="truncate text-xs font-medium">{p.title}</div>
                <div className="mt-1 text-sm font-bold">₹{p.price.toLocaleString("en-IN")}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { v: "40+", l: "Campuses" },
    { v: "25K+", l: "Verified students" },
    { v: "₹1.2Cr", l: "Saved by students" },
    { v: "4.9/5", l: "Average rating" },
  ];
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.v}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MarketplacePulse() {
  const items = [
    { t: "12 new listings", d: "in the last hour", icon: TrendingUp },
    { t: "Fastest sale", d: "Books in 18 minutes", icon: Zap },
    { t: "Top campus", d: "IIT Delhi trending", icon: Users },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((x, i) => (
          <motion.div
            key={x.t}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.18),transparent_65%)] blur-2xl" />
            <div className="relative flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-foreground">
                <x.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">{x.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{x.d}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Browse categories</h2>
          <p className="mt-2 text-muted-foreground">Find exactly what you need on campus.</p>
        </div>
        <Link to="/marketplace" className="hidden text-sm font-medium text-primary hover:underline sm:block">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {categories.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to="/marketplace"
              search={{ category: c.name }}
              className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-secondary text-foreground transition group-hover:bg-secondary/80 group-hover:text-primary">
                <CategoryIcon category={c.name} className="opacity-95 transition group-hover:opacity-100" />
              </span>
              <div>
                <div className="text-sm font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.count} listings</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Featured() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/15 dark:to-amber-950/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.08),transparent_70%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Trending on campus</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked listings from top sellers.</p>
          </div>
          <Link to="/marketplace" className="text-sm font-medium text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function RecentlyListed() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Recently listed</h2>
            <p className="mt-2 text-muted-foreground">Fresh items posted by students across campuses.</p>
          </div>
          <Link to="/marketplace" className="hidden text-sm font-medium text-primary hover:underline sm:block">
            See latest →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(4, 12).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

function FeaturedDeals() {
  const deals = [
    { t: "Featured campus deals", d: "Best value picks, updated daily", icon: BadgeCheck },
    { t: "Meet-up friendly", d: "Library & main gate safe spots", icon: ShieldCheck },
    { t: "Price-smart listings", d: "Discounts compared to original", icon: TrendingUp },
  ];
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/15 dark:to-amber-950/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Campus highlights</h2>
            <p className="mt-2 text-muted-foreground">A little extra confidence before you hit “Message”.</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {deals.map((d, i) => (
            <motion.div
              key={d.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft hover:shadow-elegant transition-shadow"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-foreground">
                <d.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{d.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: BadgeCheck, t: "Verify your student email", d: "Sign up with your college email and get instantly verified." },
    { icon: Search, t: "List or browse", d: "Post your item in 30 seconds, or browse curated campus listings." },
    { icon: MessageCircle, t: "Chat & meet up", d: "Message safely and coordinate a meet-up on campus." },
  ];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/15 dark:to-amber-950/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-3 text-muted-foreground">Three steps from idea to handshake.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.t}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-border bg-card p-7 shadow-soft"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient text-primary-foreground">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Step {i + 1}</div>
            <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}

function Features() {
  const items = [
    { icon: ShieldCheck, t: "Verified students only", d: "Every account is tied to a real college email — no scammers, no bots." },
    { icon: Bot, t: "AI fair-price engine", d: "Get instant price suggestions based on condition, demand, and trends." },
    { icon: Zap, t: "Built for speed", d: "List an item in under 30 seconds. Chat in real time. Done." },
    { icon: TrendingUp, t: "Smart recommendations", d: "We surface what your campus actually needs, not generic noise." },
    { icon: Users, t: "Community ratings", d: "Buyers and sellers rate each other after every meet-up." },
    { icon: MessageCircle, t: "Safe meet-up planner", d: "Coordinate locations and times right inside the chat." },
  ];
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/15 dark:to-amber-950/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Built for the way students actually trade</h2>
          <p className="mt-3 text-muted-foreground">Trust, speed, and intelligence baked into every screen.</p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:shadow-elegant"
            >
              <f.icon className="h-5 w-5 text-foreground" />
              <h3 className="mt-4 font-semibold">{f.t}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/15 dark:to-amber-950/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.08),transparent_70%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Loved by students</h2>
          <p className="mt-3 text-muted-foreground">Real stories from verified campus users.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="flex gap-0.5 text-foreground/80">
                {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <img src={t.avatar} alt="" className="h-9 w-9 rounded-full" />
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.college}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative px-4 py-24 sm:px-6 lg:px-8 overflow-hidden">
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-amber-50/20 dark:to-amber-950/10" />
      
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-brand-blue/90 via-brand-blue/80 to-brand-blue/70 p-12 text-center text-primary-foreground shadow-elegant sm:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.18),transparent_60%)]" />
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_65%)] blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl font-semibold italic tracking-tight sm:text-5xl">
            Your campus marketplace is one tap away.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base opacity-90">
            Join 25,000+ verified students already buying smarter.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signup">
              <Button size="lg" className="rounded-full bg-background px-8 text-foreground hover:bg-background/90">
                Get started — free
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-primary-foreground hover:bg-primary-foreground/10">
                Browse listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
