import React from "react";

export function formatProfileDate(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") return "Unknown";

  const numeric = typeof value === "number" ? value : Number(value);
  const parsed = Number.isFinite(numeric) && numeric > 1e12 ? new Date(numeric) : new Date(String(value));

  if (Number.isNaN(parsed.getTime())) return String(value);

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export function AccountOverview({ profile }: { profile: any }) {
  const email = profile?.email ?? "No email on file";

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold">Account overview</h3>
          <p className="text-xs text-muted-foreground">Your synced profile and login details</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Email", value: email },
          { label: "Member since", value: formatProfileDate(profile?.createdAt) },
          { label: "Last login", value: formatProfileDate(profile?.lastLoginAt) },
          { label: "Verification", value: profile?.emailVerified ? "Email verified" : "Verification pending" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-border bg-secondary/30 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</div>
            <div className="mt-2 text-sm font-medium text-foreground break-words" data-testid={`account-${item.label.replace(/\s+/g, "-")}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountOverview;
