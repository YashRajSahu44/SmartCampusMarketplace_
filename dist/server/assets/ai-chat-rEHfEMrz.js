import { r as reactExports, W as jsxRuntimeExports } from "./server-DVOLq0Aw.js";
import { c as createLucideIcon, b as useNavigate, u as useAuth, q as AnimatePresence, m as motion, a as cn, B as Button } from "./router-CB4HpqAs.js";
import { N as Navbar } from "./navbar-BdIG9dO8.js";
import { A as ArrowLeft } from "./arrow-left-BT3fyW25.js";
import { B as Bot } from "./bot-DUGNTpVV.js";
import { S as Send } from "./send-CCa7Pw3H.js";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./theme-toggle-BX1RR6ZL.js";
import "./economy-DMw2zR1K.js";
const Loader = createLucideIcon("Loader", [
  ["path", { d: "M12 2v4", key: "3427ic" }],
  ["path", { d: "m16.2 7.8 2.9-2.9", key: "r700ao" }],
  ["path", { d: "M18 12h4", key: "wj9ykh" }],
  ["path", { d: "m16.2 16.2 2.9 2.9", key: "1bxg5t" }],
  ["path", { d: "M12 18v4", key: "jadmvz" }],
  ["path", { d: "m4.9 19.1 2.9-2.9", key: "bwix9q" }],
  ["path", { d: "M2 12h4", key: "j09sii" }],
  ["path", { d: "m4.9 4.9 2.9 2.9", key: "giyufr" }]
]);
const SUGGESTED_PROMPTS = ["Find books for CSE", "Suggest affordable gadgets", "Show trending items", "Find hostel essentials"];
function AIChatPage() {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [messages, setMessages] = reactExports.useState([{
    id: "welcome",
    text: "Hi! 👋 I'm your Campus Assistant. I can help you find products, answer questions about the marketplace, and suggest items based on your needs. What are you looking for?",
    sender: "assistant",
    timestamp: /* @__PURE__ */ new Date()
  }]);
  const [input, setInput] = reactExports.useState("");
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [errorText, setErrorText] = reactExports.useState("");
  const bottomRef = reactExports.useRef(null);
  const scrollContainerRef = reactExports.useRef(null);
  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: /* @__PURE__ */ new Date()
    };
    setMessages((prev) => [...prev, newMessage]);
  };
  const callAssistant = async (prompt) => {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setErrorText("");
    addMessage(trimmed, "user");
    setInput("");
    setIsLoading(true);
    try {
      const token = user ? await user.getIdToken() : "";
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({
          messages: [{
            role: "system",
            content: "You are Campus Assistant for a student marketplace. Be concise, practical, safety-aware, and provide actionable suggestions."
          }, ...messages.slice(-8).map((message) => ({
            role: message.sender === "user" ? "user" : "assistant",
            content: message.text
          })), {
            role: "user",
            content: trimmed
          }]
        })
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok || !payload.ok || !payload.content) {
        throw new Error(payload.error || "AI service is currently unavailable.");
      }
      addMessage(payload.content, "assistant");
    } catch (error) {
      const message = error instanceof Error ? error.message : "AI service is currently unavailable.";
      setErrorText(message);
      addMessage("I could not process that right now. Please verify the OpenRouter server configuration and try again.", "assistant");
    } finally {
      setIsLoading(false);
    }
  };
  const handleSendMessage = () => {
    void callAssistant(input);
  };
  const handleSuggestedPrompt = (prompt) => {
    void callAssistant(prompt);
  };
  reactExports.useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: "smooth"
      });
    }
  }, [messages]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-screen flex-col bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between border-b border-border bg-card px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
          to: "/chat"
        }), className: "rounded-lg p-2 hover:bg-accent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-5 w-5 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-semibold text-foreground", children: "Campus Assistant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "AI Powered • Always available" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: scrollContainerRef, className: "flex-1 overflow-y-auto px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: messages.map((msg) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, exit: {
          opacity: 0,
          y: -10
        }, className: cn("flex gap-3", msg.sender === "user" ? "justify-end" : "justify-start"), children: [
          msg.sender === "assistant" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("max-w-xs rounded-lg px-4 py-2 text-sm", msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: msg.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("mt-1 text-xs", msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"), children: msg.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            }) })
          ] })
        ] }, msg.id)) }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, className: "flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "h-4 w-4 text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 rounded-lg bg-secondary px-4 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "h-4 w-4 animate-spin text-secondary-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-secondary-foreground", children: "Thinking..." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
      ] }) }),
      messages.length <= 2 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-3 text-xs font-medium text-muted-foreground", children: "Quick suggestions:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: SUGGESTED_PROMPTS.map((prompt) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleSuggestedPrompt(prompt), className: "rounded-lg border border-border bg-card px-3 py-2 text-left text-xs text-foreground transition-colors hover:bg-accent", children: prompt }, prompt)) })
      ] }),
      errorText ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 pb-2 text-xs text-destructive", children: errorText }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border bg-card px-6 py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }, placeholder: "Ask me anything...", className: "flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm placeholder-muted-foreground focus:border-primary focus:outline-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSendMessage, disabled: !input.trim() || isLoading, size: "sm", className: "gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "h-4 w-4" }) })
      ] }) })
    ] }) })
  ] });
}
export {
  AIChatPage as component
};
