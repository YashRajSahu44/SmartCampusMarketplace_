import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CAMPUSES } from "@/lib/campus";
import { toast } from "sonner";

const CATEGORIES = ["Books", "Gadgets", "Notes", "Electronics", "Cycles", "Hostel Essentials", "Lab Equipment", "Furniture"] as const;
const CONDITIONS = ["Any", "New", "Like New", "Good", "Used"] as const;
const URGENCY_LEVELS = ["Low", "Medium", "High", "Urgent"] as const;
const DEPARTMENTS = ["CSE", "Mechanical", "Civil", "ECE", "MBA", "EEE", "IT", "Chemical"] as const;

export function RequestItemModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    itemName: "",
    category: "",
    budgetMin: "",
    budgetMax: "",
    condition: "Any",
    description: "",
    urgency: "Medium",
    campus: "",
    department: "",
  });

  const updateField = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.itemName.trim()) return;
    setSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    toast.success("Request posted!", { description: `Your request for "${form.itemName}" is now visible to sellers on campus.` });
    setForm({ itemName: "", category: "", budgetMin: "", budgetMax: "", condition: "Any", description: "", urgency: "Medium", campus: "", department: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-elegant"
          >
            {/* Gradient header accent */}
            <div className="absolute left-0 right-0 top-0 h-1 bg-brand-gradient" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-brand-gradient text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold">Request an Item</h2>
                  <p className="text-xs text-muted-foreground">Tell the campus what you need</p>
                </div>
              </div>
              <button onClick={onClose} className="grid h-8 w-8 place-items-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <div className="space-y-4">
                {/* Item Name */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">What do you need? <span className="text-destructive">*</span></label>
                  <input
                    value={form.itemName}
                    onChange={(e) => updateField("itemName", e.target.value)}
                    placeholder="e.g., Engineering Drawing Kit, DSA Notes, Monitor..."
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>

                {/* Category + Department */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Category</label>
                    <select value={form.category} onChange={(e) => updateField("category", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary">
                      <option value="">Select...</option>
                      {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Department</label>
                    <select value={form.department} onChange={(e) => updateField("department", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary">
                      <option value="">Select...</option>
                      {DEPARTMENTS.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Budget Range (₹)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={form.budgetMin}
                      onChange={(e) => updateField("budgetMin", e.target.value)}
                      placeholder="Min"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    <input
                      type="number"
                      value={form.budgetMax}
                      onChange={(e) => updateField("budgetMax", e.target.value)}
                      placeholder="Max"
                      className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Condition + Urgency */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Condition Preferred</label>
                    <select value={form.condition} onChange={(e) => updateField("condition", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary">
                      {CONDITIONS.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Urgency</label>
                    <div className="flex gap-1.5">
                      {URGENCY_LEVELS.map((u) => (
                        <button
                          key={u}
                          type="button"
                          onClick={() => updateField("urgency", u)}
                          className={cn(
                            "flex-1 rounded-lg py-2 text-xs font-medium transition",
                            form.urgency === u
                              ? u === "Urgent" ? "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30"
                              : u === "High" ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                              : u === "Medium" ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30"
                              : "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/30"
                              : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground"
                          )}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Campus */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Campus</label>
                  <select value={form.campus} onChange={(e) => updateField("campus", e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary">
                    <option value="">Select campus...</option>
                    {CAMPUSES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    placeholder="Add details about what you're looking for, specific models, any preferences..."
                    rows={3}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground"
                  />
                </div>

                {/* Image Upload (dummy) */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium">Reference Image <span className="text-xs text-muted-foreground">(optional)</span></label>
                  <div className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-6 text-sm text-muted-foreground transition hover:border-primary/40 hover:text-foreground">
                    <Upload className="h-4 w-4" />
                    <span>Click to upload or drag & drop</span>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-border pt-4">
                <Button type="button" variant="ghost" size="sm" onClick={onClose}>Cancel</Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!form.itemName.trim() || submitting}
                  className="rounded-full bg-brand-gradient px-6 text-primary-foreground shadow-soft hover:opacity-90 disabled:opacity-50"
                >
                  {submitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent"
                    />
                  ) : (
                    <>
                      <Send className="mr-1.5 h-3.5 w-3.5" />
                      Post Request
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
