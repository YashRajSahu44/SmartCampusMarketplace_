import { Outlet } from "@tanstack/react-router";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AIChatbot } from "./ai-chatbot";

export function SiteLayout({ withFooter = true }: { withFooter?: boolean }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1"><Outlet /></main>
      {withFooter && <Footer />}
      <AIChatbot />
    </div>
  );
}
