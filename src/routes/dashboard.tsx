import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  TrendingUp, Eye, MessageCircle, Heart, Package, ShoppingBag,
  Plus, BadgeCheck, RotateCcw, CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, conversations } from "@/lib/mock-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { useEffect, useMemo, useState } from "react";
import { buildFallbackUserProfile, useCurrentUserProfile } from "@/lib/user-profile";
import { useAuth } from "@/lib/auth";
import AccountOverview from "@/components/account-overview";

export const Route = createFileRoute("/dashboard")({ component: DashboardPage });

const chartData = [
  { d: "Mon", views: 120, msgs: 4 }, { d: "Tue", views: 180, msgs: 7 },
  { d: "Wed", views: 150, msgs: 6 }, { d: "Thu", views: 220, msgs: 11 },
  { d: "Fri", views: 280, msgs: 14 }, { d: "Sat", views: 320, msgs: 18 },
  { d: "Sun", views: 260, msgs: 12 },
];



function DashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const profileQuery = useCurrentUserProfile();
  const rentals = useMemo(() => products.filter((p) => p.forRent).slice(0, 4), []);
  const [returnOpen, setReturnOpen] = useState(false);
  const [selectedRentalId, setSelectedRentalId] = useState<string | null>(null);
  const [returnDate, setReturnDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3);
    return d.toISOString().slice(0, 10);
  });
  const [returnNote, setReturnNote] = useState("");
  const [rentalStatus, setRentalStatus] = useState<Record<string, "Active Rental" | "Return Requested" | "Returned Successfully">>(() => {
    const init: Record<string, "Active Rental" | "Return Requested" | "Returned Successfully"> = {};
    rentals.forEach((r, idx) => {
      init[r.id] = idx === 0 ? "Active Rental" : idx === 1 ? "Return Requested" : "Active Rental";
    });
    return init;
  });
  const profile = profileQuery.data ?? (user ? buildFallbackUserProfile(user) : null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate({ to: "/login", replace: true });
    }
  }, [authLoading, navigate, user]);

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const displayName = profile?.displayName ?? user?.displayName ?? "Student";
  const email = profile?.email ?? user?.email ?? "No email on file";
  const avatarLabel = displayName
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const selectedRental = selectedRentalId ? products.find((p) => p.id === selectedRentalId) : null;

  if (authLoading && !user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-soft">
              <div className="text-sm font-semibold">Loading your dashboard</div>
              <div className="mt-1 text-xs text-muted-foreground">Fetching your account and profile details.</div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-gradient text-lg font-semibold text-primary-foreground shadow-elegant">
                {profile?.photoUrl ? (
                  <img src={profile.photoUrl} alt="" className="h-full w-full rounded-2xl object-cover" />
                ) : (
                  avatarLabel
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Welcome back, {displayName}</p>
              <h1 className="mt-1 font-display text-3xl font-semibold italic tracking-tight sm:text-4xl">Your dashboard</h1>
                <p className="mt-1 text-xs text-muted-foreground">Signed in as {email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link to="/marketplace">
                <Button variant="outline" className="rounded-full">
                  Browse marketplace
                </Button>
              </Link>
              <Button className="rounded-full bg-brand-gradient text-primary-foreground shadow-elegant hover:opacity-90">
                <Plus className="h-4 w-4" /> New listing
              </Button>
              <Button variant="ghost" className="rounded-full" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: Eye, label: "Profile views", v: "1,284", t: "+12.4%" },
              { i: Package, label: "Active listings", v: "8", t: "2 new" },
              { i: MessageCircle, label: "Unread chats", v: "3", t: "Today" },
              { i: TrendingUp, label: "Earnings", v: "₹14,520", t: "+₹2,400" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-secondary text-foreground">
                    <s.i className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">{s.t}</span>
                </div>
                <div className="mt-4 text-2xl font-bold tracking-tight">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <AccountOverview profile={profile} />
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold">Quick actions</h3>
              <p className="text-xs text-muted-foreground">Shortcuts tied to your account</p>
              <div className="mt-5 grid gap-3">
                <Link to="/marketplace">
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <ShoppingBag className="h-4 w-4" /> Browse marketplace
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="w-full justify-start rounded-xl">
                    <MessageCircle className="h-4 w-4" /> Open messages
                  </Button>
                </Link>
                <Button className="w-full justify-start rounded-xl bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90">
                  <BadgeCheck className="h-4 w-4" /> Verify profile status
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Chart */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Activity overview</h3>
                  <p className="text-xs text-muted-foreground">Views and messages this week</p>
                </div>
                <div className="flex gap-2 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Views</span>
                  <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-foreground" /> Msgs</span>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="dv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                    <XAxis dataKey="d" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12 }} />
                    <Area type="monotone" dataKey="views" stroke="var(--primary)" strokeWidth={2} fill="url(#dv)" />
                    <Area type="monotone" dataKey="msgs" stroke="var(--foreground)" strokeWidth={2} fill="transparent" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Activity feed */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold">Recent activity</h3>
              <ul className="mt-4 space-y-4">
                {[
                  { i: Heart, t: "Riya wishlisted your MacBook Air", time: "2m ago" },
                  { i: MessageCircle, t: "New message from Karthik", time: "1h" },
                  { i: ShoppingBag, t: "Order placed: Casio Calculator", time: "3h" },
                  { i: BadgeCheck, t: "Identity re-verified ✓", time: "1d" },
                  { i: Eye, t: "12 new views on your listings", time: "2d" },
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary text-foreground">
                      <a.i className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="text-foreground">{a.t}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* My listings */}
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">My listings</h2>
              <Link to="/marketplace" className="text-sm text-primary hover:underline">View all →</Link>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <thead className="bg-secondary/60 text-xs text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left font-medium">Item</th>
                    <th className="px-5 py-3 text-left font-medium">Price</th>
                    <th className="px-5 py-3 text-left font-medium">Views</th>
                    <th className="px-5 py-3 text-left font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.slice(0, 5).map((p) => (
                    <tr key={p.id} className="hover:bg-secondary/30">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.image} className="h-10 w-10 rounded-lg object-cover" alt="" />
                          <span className="line-clamp-1 font-medium">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 font-semibold">₹{p.price.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-3 text-muted-foreground">{120 + Math.floor(Math.random() * 200)}</td>
                      <td className="px-5 py-3">
                        <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">Active</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Wishlist */}
          <section className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Wishlist</h3>
              <ul className="mt-4 space-y-3">
                {products.slice(5, 9).map((p) => (
                  <li key={p.id} className="flex items-center gap-3">
                    <img src={p.image} className="h-12 w-12 rounded-lg object-cover" alt="" />
                    <div className="flex-1">
                      <div className="line-clamp-1 text-sm font-medium">{p.title}</div>
                      <div className="text-xs text-muted-foreground">₹{p.price.toLocaleString("en-IN")} · {p.seller.college}</div>
                    </div>
                    <Heart className="h-4 w-4 fill-destructive text-destructive" />
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold">Recent chats</h3>
              <ul className="mt-4 space-y-3">
                {conversations.map((c) => (
                  <li key={c.id} className="flex items-center gap-3">
                    <div className="relative">
                      <img src={c.avatar} alt="" className="h-10 w-10 rounded-full" />
                      {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{c.name}</div>
                        <div className="text-[11px] text-muted-foreground">{c.time}</div>
                      </div>
                      <div className="line-clamp-1 text-xs text-muted-foreground">{c.lastMsg}</div>
                    </div>
                    {c.unread > 0 && (
                      <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Rental history */}
          <section className="mt-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold italic">Rental history</h2>
              <div className="text-sm text-muted-foreground">Manage returns and track status</div>
            </div>

            {rentals.length === 0 ? (
              <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card py-16 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary text-foreground shadow-soft">
                  <RotateCcw className="h-5 w-5" />
                </div>
                <div className="mt-4 text-sm font-semibold">No rentals yet</div>
                <div className="mt-1 text-xs text-muted-foreground">Rent items from the marketplace to see them here.</div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {rentals.map((p, i) => {
                  const status = rentalStatus[p.id] ?? "Active Rental";
                  const chip =
                    status === "Returned Successfully"
                      ? "bg-success/15 text-success"
                      : status === "Return Requested"
                        ? "bg-warning/15 text-warning"
                        : "bg-primary/10 text-primary";
                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-border bg-card p-5 shadow-soft"
                    >
                      <div className="flex items-start gap-4">
                        <img src={p.image} alt="" className="h-16 w-16 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="line-clamp-1 text-sm font-semibold">{p.title}</div>
                              <div className="mt-1 text-xs text-muted-foreground">
                                ₹{p.rentPerDay}/day · {p.pickupLocation ?? p.seller.college}
                              </div>
                            </div>
                            <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${chip}`}>
                              {status}
                            </span>
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/40 px-3 py-1 text-[11px] text-muted-foreground">
                              <CalendarDays className="h-3.5 w-3.5 text-foreground" />
                              Return by {returnDate}
                            </div>
                            <Link to="/product/$id" params={{ id: p.id }}>
                              <Button size="sm" variant="outline" className="rounded-full">
                                View listing
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="rounded-full bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90"
                              disabled={status !== "Active Rental"}
                              onClick={() => {
                                setSelectedRentalId(p.id);
                                setReturnOpen(true);
                              }}
                            >
                              <RotateCcw className="h-4 w-4" />
                              Return item
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <Dialog open={returnOpen} onOpenChange={setReturnOpen}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Return item</DialogTitle>
                  <DialogDescription>
                    Request a return pickup/hand-off for your rental. This is a frontend demo flow.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {selectedRental ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
                      <img src={selectedRental.image} alt="" className="h-12 w-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <div className="line-clamp-1 text-sm font-semibold">{selectedRental.title}</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Pickup: {selectedRental.pickupLocation ?? selectedRental.seller.college}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="space-y-1">
                      <div className="text-xs font-semibold text-muted-foreground">Preferred return date</div>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                      />
                    </label>
                    <div className="rounded-xl border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
                      Status becomes <span className="font-semibold text-foreground">Return Requested</span> after confirmation.
                    </div>
                  </div>

                  <label className="space-y-1">
                    <div className="text-xs font-semibold text-muted-foreground">Note (optional)</div>
                    <textarea
                      value={returnNote}
                      onChange={(e) => setReturnNote(e.target.value)}
                      placeholder="e.g. Available after 6 PM, meet near Hostel Block B"
                      className="min-h-24 w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                    />
                  </label>
                </div>

                <DialogFooter>
                  <Button variant="outline" className="rounded-full" onClick={() => setReturnOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="rounded-full bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90"
                    onClick={() => {
                      if (selectedRentalId) {
                        setRentalStatus((s) => ({ ...s, [selectedRentalId]: "Return Requested" }));
                      }
                      setReturnNote("");
                      setReturnOpen(false);
                    }}
                  >
                    Confirm return request
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
