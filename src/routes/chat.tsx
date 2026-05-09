import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MapPin,
  Calendar,
  Phone,
  Video,
  MoreHorizontal,
  ArrowLeft,
  Image as ImageIcon,
  Mic,
  Reply,
  Pencil,
  Trash2,
  Check,
  CheckCheck,
  Plus,
  X,
  Bot,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { conversations } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { buildFallbackUserProfile, useCurrentUserProfile } from "@/lib/user-profile";
import { useAuth } from "@/lib/auth";
import {
  getChatSocket,
  type ChatAttachment,
  type ChatMessage,
  type ChatThread,
} from "@/lib/chat-socket";

export const Route = createFileRoute("/chat")({ component: ChatPage });

const EMOJIS = ["👍", "❤️", "😂", "🔥", "👏", "😮", "😅", "🙏", "🎉", "✅", "💯", "✨"];

function ChatPage() {
  const socket = useMemo(() => getChatSocket(), []);
  const { user, loading: authLoading } = useAuth();
  const profileQuery = useCurrentUserProfile();
  const profile = profileQuery.data ?? (user ? buildFallbackUserProfile(user) : null);

  const [threads, setThreads] = useState<ChatThread[]>(() => conversations);
  const [activeId, setActiveId] = useState(conversations[0].id);
  const [showThread, setShowThread] = useState(false);
  const active = threads.find((c) => c.id === activeId) ?? threads[0];
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isAutoScrollRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const folderInputRef = useRef<HTMLInputElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessage["replyTo"] | null>(null);
  const [pending, setPending] = useState<ChatAttachment[]>([]);
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const activeIdRef = useRef(activeId);
  const messagesRef = useRef(messages);

  useEffect(() => {
    activeIdRef.current = activeId;
  }, [activeId]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const revokeMessagePreviews = (ms: ChatMessage[]) => {
    ms.forEach((m) => m.attachments?.forEach((a) => a.previewUrl && URL.revokeObjectURL(a.previewUrl)));
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // only auto-scroll if user is near bottom or the last message is from the current user
    const last = messages.at(-1);
    const lastFromMe = last ? last.from === currentUser.id || last.from === "me" : false;
    const shouldAuto = isAutoScrollRef.current || lastFromMe;
    if (!shouldAuto) return;

    // wait for DOM updates and any images to settle
    requestAnimationFrame(() => requestAnimationFrame(() => container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })));
  }, [messages.length, typing, pending.length, replyTo?.id, editingId]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const onScroll = () => {
      const threshold = 64; // px
      const nearBottom = container.scrollTop + container.clientHeight + threshold >= container.scrollHeight;
      isAutoScrollRef.current = nearBottom;
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleThreads = ({ threads: nextThreads }: { threads: ChatThread[] }) => {
      setThreads(nextThreads);
    };

    const handleThreadMessages = ({ thread, messages: nextMessages }: { thread: ChatThread; messages: ChatMessage[] }) => {
      if (thread.id !== activeIdRef.current) return;
      setMessages(nextMessages);
    };

    const handleThreadUpdate = ({ thread, messages: nextMessages }: { thread: ChatThread; messages: ChatMessage[] }) => {
      const threadId = thread.id;
      setThreads((current) =>
        current.map((thread) =>
          thread.id === threadId
            ? { ...thread, lastMsg: nextMessages.at(-1)?.text ?? thread.lastMsg, time: nextMessages.at(-1)?.time ?? thread.time }
            : thread,
        ),
      );
      if (threadId === activeIdRef.current) {
        setMessages(nextMessages);
      }
    };

    socket.on("chat:threads", handleThreads);
    socket.on("chat:thread:messages", handleThreadMessages);
    socket.on("chat:thread:update", handleThreadUpdate);
    socket.emit("chat:threads:load");

    return () => {
      socket.off("chat:threads", handleThreads);
      socket.off("chat:thread:messages", handleThreadMessages);
      socket.off("chat:thread:update", handleThreadUpdate);
      socket.disconnect();
    };
  }, [socket]);

  const messageById = useMemo(() => new Map(messages.map((m) => [m.id, m])), [messages]);

  const currentUser = useMemo(
    () => ({
      id: profile?.firebaseUid ?? user?.uid ?? "guest",
      name: profile?.displayName ?? user?.displayName ?? "You",
      avatar: profile?.photoUrl ?? user?.photoURL ?? null,
    }),
    [profile, user],
  );

  const AI_AVATAR = "https://avatars.dicebear.com/api/identicon/ai-assistant.svg";
  const AI_NAME = "AI Assistant";

  useEffect(() => {
    if (authLoading) return;

    revokeMessagePreviews(messagesRef.current);
    setMessages([]);
    socket.emit("chat:thread:join", {
      threadId: activeId,
      user: currentUser,
    });
    setText("");
    setEditingId(null);
    setReplyTo(null);
    setTyping(false);
    setPending((current) => {
      current.forEach((attachment) => attachment.previewUrl && URL.revokeObjectURL(attachment.previewUrl));
      return [];
    });
  }, [activeId, authLoading, currentUser, socket]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        window.clearTimeout(typingTimerRef.current);
      }
    };
  }, []);

  const onPickFiles = (files: FileList | null, kind: "file" | "image") => {
    if (!files?.length) return;
    const next: ChatAttachment[] = Array.from(files).slice(0, 6).map((file) => {
      const isImage = kind === "image" || file.type.startsWith("image/");
      const previewUrl = isImage ? URL.createObjectURL(file) : undefined;
      return {
        id: crypto.randomUUID(),
        kind: isImage ? "image" : "file",
        name: file.name,
        size: file.size,
        previewUrl,
      };
    });
    setPending((p) => [...p, ...next].slice(0, 6));
  };

  useEffect(() => {
    // Enable folder selection where supported (Chromium)
    if (folderInputRef.current) {
      try {
        (folderInputRef.current as any).webkitdirectory = true;
        (folderInputRef.current as any).directory = true;
      } catch {
        // ignore
      }
    }
  }, []);

  const removePending = (id: string) => {
    setPending((p) => {
      const target = p.find((x) => x.id === id);
      if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
      return p.filter((x) => x.id !== id);
    });
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    socket.emit("chat:message:react", { threadId: activeId, messageId, emoji, user: currentUser });
  };

  const beginReply = (m: ChatMessage) =>
    setReplyTo({ id: m.id, text: m.text || (m.attachments?.[0]?.name ?? "Message"), from: m.from });

  const beginEdit = (m: ChatMessage) => {
    setEditingId(m.id);
    setReplyTo(null);
    setText(m.text);
  };

  const deleteMessage = (id: string) =>
    socket.emit("chat:message:delete", { threadId: activeId, messageId: id, user: currentUser });

  const send = () => {
    const trimmed = text.trim();
    if (!trimmed && pending.length === 0) return;

    if (editingId) {
      socket.emit("chat:message:edit", {
        threadId: activeId,
        messageId: editingId,
        text: trimmed,
        user: currentUser,
      });
      setEditingId(null);
      setText("");
      return;
    }

    const attachments = pending.map((a) => ({
      id: a.id,
      kind: a.kind,
      name: a.name,
      size: a.size,
      previewUrl: a.previewUrl,
    }));

    socket.emit("chat:message:send", {
      threadId: activeId,
      user: currentUser,
      text: trimmed,
      replyTo: replyTo ?? undefined,
      attachments: attachments.length ? attachments : undefined,
    });

    // Fire-and-forget: ask AI for a suggested reply and emit it as a separate 'AI' user
    (async () => {
      try {
        const token = user ? await user.getIdToken() : "";
        const resp = await fetch("/api/ai/chat", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: "You are a concise assistant for a campus marketplace chat." },
              { role: "user", content: trimmed },
            ],
          }),
        });

        const payload = (await resp.json().catch(() => ({}))) as { ok?: boolean; content?: string };
        if (resp.ok && payload?.ok && payload.content) {
          socket.emit("chat:message:send", {
            threadId: activeId,
            user: { id: "ai", name: AI_NAME, avatar: AI_AVATAR },
            text: payload.content,
          });
        }
      } catch {
        // ignore AI failures — UI remains functional
      }
    })();

    setReplyTo(null);
    setText("");
    setPending((p) => p.filter(() => false));
    setTyping(true);
    if (typingTimerRef.current) {
      window.clearTimeout(typingTimerRef.current);
    }
    typingTimerRef.current = window.setTimeout(() => setTyping(false), 1400);
  };

  const sendAiMessage = async () => {
    const prompt = aiInput.trim();
    if (!prompt || aiLoading) return;

    const nextMessages = [...aiMessages, { role: "user" as const, content: prompt }];
    setAiMessages(nextMessages);
    setAiInput("");
    setAiLoading(true);

    try {
      const token = user ? await user.getIdToken() : "";
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content:
                "You are a concise assistant for a campus marketplace chat. Help users draft replies, negotiate politely, and propose safe meetup wording.",
            },
            ...nextMessages,
          ],
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean; content?: string };
      if (!response.ok || !payload.ok || !payload.content) {
        throw new Error("AI response failed");
      }

      setAiMessages((current) => [...current, { role: "assistant", content: payload.content ?? "" }]);
    } catch {
      setAiMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I could not respond right now. Please check your OpenRouter key setup and try again.",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-0 py-0 sm:px-4 sm:py-6 lg:px-8">
        <div className="grid h-[calc(100vh-4rem)] overflow-hidden border border-border bg-card sm:h-[calc(100vh-7rem)] sm:rounded-3xl md:grid-cols-[320px_1fr]">
          {/* Sidebar */}
          <aside className={cn("flex flex-col border-r border-border", showThread && "hidden md:flex")}>
            <div className="border-b border-border p-4">
              <h2 className="text-lg font-semibold">Messages</h2>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input placeholder="Search conversations" className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
              </div>
            </div>
            <ul className="flex-1 overflow-y-auto">
              {threads.length === 0 ? (
                <li className="p-6 text-center text-sm text-muted-foreground">
                  No conversations yet. Messages will appear after a real chat starts.
                </li>
              ) : null}
              {threads.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => { setActiveId(c.id); setShowThread(true); }}
                    className={cn(
                      "flex w-full items-center gap-3 border-b border-border/60 p-4 text-left transition hover:bg-secondary/40",
                      c.id === activeId && "bg-secondary/60",
                    )}
                  >
                    <div className="relative">
                      <img src={c.avatar} alt="" className="h-11 w-11 rounded-full" />
                      {c.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success ring-2 ring-card" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="truncate text-sm font-semibold">{c.name}</span>
                        <span className="text-[10px] text-muted-foreground">{c.time || ""}</span>
                      </div>
                      <div className="text-[11px] text-primary">{c.product}</div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">{c.lastMsg || "No messages yet"}</div>
                    </div>
                    {c.unread > 0 && (
                      <span className="grid h-5 min-w-[20px] place-items-center rounded-full bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Thread */}
          <section className={cn("flex flex-col", !showThread && "hidden md:flex")}>
            <header className="flex items-center gap-3 border-b border-border p-4">
              <button onClick={() => setShowThread(false)} className="md:hidden">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="relative">
                <img src={active.avatar} alt="" className="h-10 w-10 rounded-full" />
                {active.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">{active.name}</div>
                <div className="text-xs text-muted-foreground">{active.online ? "Online · About " + active.product : "Last seen recently"}</div>
              </div>
              <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </header>

            <div ref={scrollContainerRef} className="flex-1 space-y-3 overflow-y-auto bg-background/40 p-5">
              <div className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-card p-3 text-center text-xs text-muted-foreground">
                You're chatting about <span className="font-semibold text-foreground">{active.product}</span>. Stay safe — meet only on campus.
              </div>
              {messages.map((m, i) => {
                const isMe = m.from === "me" || m.from === currentUser.id;
                const reply = m.replyTo ? messageById.get(m.replyTo.id) : null;
                const timeMeta = (
                  <div
                    className={cn(
                      "mt-1 flex items-center justify-end gap-1 text-[10px] leading-none",
                      isMe ? "opacity-75" : "text-muted-foreground",
                    )}
                  >
                    {m.edited ? <span className="opacity-80">edited</span> : null}
                    <span>{m.time}</span>
                    {isMe ? (
                      <span className="ml-1 inline-flex items-center">
                        {m.delivery === "seen" ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : m.delivery === "delivered" ? (
                          <CheckCheck className="h-3 w-3 opacity-70" />
                        ) : (
                          <Check className="h-3 w-3 opacity-70" />
                        )}
                      </span>
                    ) : null}
                  </div>
                );

                return (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={cn("flex items-end gap-2", isMe ? "justify-end" : "justify-start")}
                  >
                    {!isMe ? (
                      <img
                        src={m.authorAvatar ?? (m.from === "ai" ? AI_AVATAR : active.avatar)}
                        alt=""
                        className="hidden h-7 w-7 rounded-full md:block"
                      />
                    ) : null}

                    <div className={cn("group relative max-w-[78%]", isMe && "items-end")}>
                      {/* Hover actions */}
                      <div
                        className={cn(
                          "pointer-events-none absolute -top-9 flex items-center gap-1 opacity-0 transition",
                          "group-hover:pointer-events-auto group-hover:opacity-100",
                          isMe ? "right-0" : "left-0",
                        )}
                      >
                        <div className="flex items-center gap-1 rounded-full border border-border bg-card/90 px-1.5 py-1 shadow-soft backdrop-blur">
                          {["👍", "❤️", "😂"].map((e) => (
                            <button
                              key={e}
                              type="button"
                              onClick={() => toggleReaction(m.id, e)}
                              className="grid h-7 w-7 place-items-center rounded-full text-sm transition hover:bg-secondary"
                              aria-label={`React ${e}`}
                            >
                              {e}
                            </button>
                          ))}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="grid h-7 w-7 place-items-center rounded-full transition hover:bg-secondary"
                                aria-label="More actions"
                              >
                                <Plus className="h-4 w-4 text-muted-foreground" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align={isMe ? "end" : "start"} className="w-48">
                              <DropdownMenuItem onClick={() => beginReply(m)}>
                                <Reply className="h-4 w-4" /> Reply
                              </DropdownMenuItem>
                              {isMe ? (
                                <>
                                  <DropdownMenuItem onClick={() => beginEdit(m)}>
                                    <Pencil className="h-4 w-4" /> Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => deleteMessage(m.id)}
                                  >
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </DropdownMenuItem>
                                </>
                              ) : null}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2.5 text-sm shadow-soft transition",
                          isMe
                            ? "bg-brand-gradient text-primary-foreground"
                            : "border border-border bg-card hover:border-border/80",
                        )}
                      >
                        {m.replyTo ? (
                          <div
                            className={cn(
                              "mb-2 rounded-xl border border-border/40 bg-background/20 px-3 py-2 text-[12px]",
                              isMe ? "text-primary-foreground/90" : "text-muted-foreground",
                            )}
                          >
                            <div className={cn("mb-0.5 text-[11px] font-semibold", isMe ? "opacity-90" : "text-foreground")}>
                              Replying to {m.replyTo.from === "me" || m.replyTo.from === currentUser.id ? "you" : m.replyTo.from === "ai" ? AI_NAME : active.name}
                            </div>
                            <div className="line-clamp-2">{reply?.text ?? m.replyTo.text}</div>
                          </div>
                        ) : null}

                        {m.attachments?.length ? (
                          <div className="mb-2 grid gap-2">
                            {m.attachments.map((a) => (
                              <div
                                key={a.id}
                                className={cn(
                                  "overflow-hidden rounded-xl border border-border/40 bg-background/10",
                                  a.kind === "image" ? "max-w-[280px]" : "",
                                )}
                              >
                                {a.kind === "image" && a.previewUrl ? (
                                  <img src={a.previewUrl} alt={a.name} className="max-h-56 w-full object-cover" />
                                ) : (
                                  <div className="flex items-center gap-3 p-3">
                                    <Paperclip className="h-4 w-4 opacity-80" />
                                    <div className="min-w-0 flex-1">
                                      <div className="truncate text-xs font-medium">{a.name}</div>
                                      <div className="text-[11px] opacity-70">{Math.max(1, Math.round(a.size / 1024))} KB</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : null}

                        {m.text ? <div className="whitespace-pre-wrap break-words">{m.text}</div> : null}

                        {m.reactions && Object.keys(m.reactions).length ? (
                          <div className={cn("mt-2 flex flex-wrap gap-1.5", isMe ? "justify-end" : "justify-start")}>
                            {Object.entries(m.reactions).map(([emoji, meta]) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => toggleReaction(m.id, emoji)}
                                className={cn(
                                  "inline-flex items-center gap-1 rounded-full border border-border/50 bg-background/20 px-2 py-1 text-[11px] transition",
                                  meta.mine ? "border-primary/40 bg-primary/10" : "hover:bg-secondary/40",
                                )}
                              >
                                <span className="text-sm leading-none">{emoji}</span>
                                <span className="tabular-nums">{meta.count}</span>
                              </button>
                            ))}
                          </div>
                        ) : null}

                        {timeMeta}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {typing ? (
                <div className="flex items-end gap-2">
                  <img src={active.avatar} alt="" className="hidden h-7 w-7 rounded-full md:block" />
                  <div className="rounded-2xl border border-border bg-card px-4 py-3 text-sm shadow-soft">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">{active.name} is typing</span>
                      <motion.span
                        aria-hidden
                        className="inline-flex items-center gap-1"
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/70" />
                      </motion.span>
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Calendar className="h-3.5 w-3.5 text-foreground" /> Schedule a meet-up
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  {["Today, 5 PM", "Tomorrow, 11 AM", "Sat, 2 PM", "Custom…"].map((t) => (
                    <button key={t} className="rounded-lg border border-border bg-background px-3 py-2 text-left hover:bg-secondary">{t}</button>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-secondary/60 p-2 text-xs">
                  <MapPin className="h-3.5 w-3.5 text-foreground" /> Suggested: Central Library entrance
                </div>
              </div>

              <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <Bot className="h-3.5 w-3.5 text-foreground" /> AI assistant
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Draft replies, negotiation wording, and meetup messages.
                </p>

                <div className="mt-3 max-h-44 space-y-2 overflow-y-auto rounded-xl border border-border bg-background p-3">
                  {aiMessages.length === 0 ? (
                    <div className="text-xs text-muted-foreground">Try: "Draft a polite price negotiation reply"</div>
                  ) : (
                    aiMessages.map((message, index) => (
                      <div
                        key={`${message.role}-${index}`}
                        className={cn(
                          "rounded-lg px-2.5 py-2 text-xs",
                          message.role === "user"
                            ? "ml-6 bg-primary/10 text-foreground"
                            : "mr-6 bg-secondary text-foreground",
                        )}
                      >
                        {message.content}
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <input
                    value={aiInput}
                    onChange={(event) => setAiInput(event.target.value)}
                    placeholder="Ask assistant..."
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs outline-none focus:border-primary"
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        void sendAiMessage();
                      }
                    }}
                  />
                  <Button size="icon" type="button" disabled={aiLoading} onClick={() => void sendAiMessage()}>
                    <Send className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="border-t border-border p-3"
            >
              {replyTo || editingId ? (
                <div className="mb-2 flex items-center justify-between rounded-2xl border border-border bg-card px-3 py-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs font-semibold">
                      {editingId ? <Pencil className="h-3.5 w-3.5 text-foreground" /> : <Reply className="h-3.5 w-3.5 text-foreground" />}
                      <span>{editingId ? "Editing message" : `Replying to ${replyTo?.from === "me" ? "you" : active.name}`}</span>
                    </div>
                    {!editingId ? (
                      <div className="mt-1 line-clamp-1 text-xs text-muted-foreground">{replyTo?.text}</div>
                    ) : null}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setReplyTo(null);
                      setEditingId(null);
                    }}
                    aria-label="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : null}

              {pending.length ? (
                <div className="mb-2 flex flex-wrap gap-2">
                  {pending.map((a) => (
                    <div
                      key={a.id}
                      className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
                    >
                      {a.kind === "image" && a.previewUrl ? (
                        <img src={a.previewUrl} alt={a.name} className="h-20 w-20 object-cover" />
                      ) : (
                        <div className="flex h-20 w-56 items-center gap-3 px-3">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <div className="min-w-0">
                            <div className="truncate text-xs font-semibold">{a.name}</div>
                            <div className="text-[11px] text-muted-foreground">
                              {Math.max(1, Math.round(a.size / 1024))} KB
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removePending(a.id)}
                        className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-background/80 opacity-0 backdrop-blur transition group-hover:opacity-100"
                        aria-label="Remove attachment"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="flex items-end gap-2 rounded-3xl border border-border bg-card px-2 py-2 shadow-soft">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => onPickFiles(e.target.files, "file")}
                />
                <input
                  ref={imageInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickFiles(e.target.files, "image")}
                />
                <input
                  ref={folderInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => onPickFiles(e.target.files, "file")}
                />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" type="button" aria-label="Add attachment" className="rounded-2xl">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-52">
                    <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                      <Paperclip className="h-4 w-4" /> Upload file
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => imageInputRef.current?.click()}>
                      <ImageIcon className="h-4 w-4" /> Upload image
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => folderInputRef.current?.click()}>
                      <FolderIcon /> Upload folder
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                  onClick={() => imageInputRef.current?.click()}
                  aria-label="Upload image"
                  className="rounded-2xl"
                >
                  <ImageIcon className="h-4 w-4" />
                </Button>

                <div className="flex-1">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={1}
                    placeholder="Write a message…"
                    className="max-h-28 w-full resize-none bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                  />
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" type="button" aria-label="Emoji picker" className="rounded-2xl">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64 p-3">
                    <div className="text-xs font-semibold text-muted-foreground">Reactions</div>
                    <div className="mt-2 grid grid-cols-6 gap-1.5">
                      {EMOJIS.map((e) => (
                        <button
                          key={e}
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-card transition hover:bg-secondary"
                          onClick={() => setText((t) => (t ? t + e : e))}
                          aria-label={`Insert ${e}`}
                        >
                          <span className="text-lg leading-none">{e}</span>
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" type="button" aria-label="Voice message" className="rounded-2xl">
                  <Mic className="h-4 w-4" />
                </Button>

                <motion.div whileTap={{ scale: 0.96 }} whileHover={{ y: -1 }} transition={{ type: "spring", stiffness: 500, damping: 30 }}>
                  <Button
                    size="icon"
                    type="submit"
                    className="rounded-2xl bg-brand-gradient text-primary-foreground shadow-soft hover:opacity-90"
                    aria-label="Send message"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function FolderIcon() {
  // minimal inline icon to avoid extra lucide import weight for a single menu row
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden className="text-muted-foreground">
      <path
        d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2H18.5A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
