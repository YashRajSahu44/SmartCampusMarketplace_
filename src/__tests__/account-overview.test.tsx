import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import AccountOverview, { formatProfileDate } from "@/components/account-overview";

describe("AccountOverview", () => {
  it("renders account labels and values", () => {
    const profile = {
      email: "avery.long.email.address.that.could.break.layout@exampleuniversitydomain.edu",
      createdAt: "2023-06-01T12:00:00.000Z",
      lastLoginAt: "2024-08-15T09:30:00.000Z",
      emailVerified: true,
    };

    render(<AccountOverview profile={profile} />);

    expect(screen.getByText(/Account overview/i)).toBeTruthy();
    expect(screen.getByTestId("account-Email")).toHaveTextContent(profile.email);
    // ensure the email container uses break-words to avoid overflow
    expect(screen.getByTestId("account-Email")).toHaveClass("break-words");
  });
});

describe("formatProfileDate", () => {
  it("formats numeric timestamps and ISO strings", () => {
    // numeric timestamp in ms
    const ts = 1685606400000; // 1 Jun 2023 UTC
    const formatted = formatProfileDate(ts);
    expect(typeof formatted).toBe("string");
    expect(formatted).toMatch(/2023/);

    const iso = "2024-08-15T09:30:00.000Z";
    const formatted2 = formatProfileDate(iso);
    expect(formatted2).toMatch(/2024/);
  });
});
