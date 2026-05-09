import { createServer } from "node:http";
import { Server } from "socket.io";

const threads = [
  {
    id: "c1",
    name: "Riya Sharma",
    avatar: "https://i.pravatar.cc/120?img=47",
    product: "Apple MacBook Air M1",
    online: true,
    lastMsg: "",
    time: "",
    unread: 0,
  },
  {
    id: "c2",
    name: "Karthik R.",
    avatar: "https://i.pravatar.cc/120?img=33",
    product: "Casio Calculator",
    online: false,
    lastMsg: "",
    time: "",
    unread: 0,
  },
  {
    id: "c3",
    name: "Devansh Kapoor",
    avatar: "https://i.pravatar.cc/120?img=14",
    product: "Hercules Cycle",
    online: true,
    lastMsg: "",
    time: "",
    unread: 0,
  },
  {
    id: "c4",
    name: "Meera Iyer",
    avatar: "https://i.pravatar.cc/120?img=20",
    product: "Study Lamp",
    online: false,
    lastMsg: "",
    time: "",
    unread: 0,
  },
];

const seedMessages = [];

const threadState = new Map(threads.map((thread) => [thread.id, { thread, messages: seedMessages.map((message) => ({ ...message, threadId: thread.id, reactions: {} })) }]));

const cannedReplies = {
  c1: ["Yes, still available. Want to meet at the library?", "I can share more photos if you need them."],
  c2: ["Yes, it is available. What time works for you?", "I can bring the charger too."],
  c3: ["Sure, I’ll bring it tomorrow after class.", "Happy to meet near the main gate."],
  c4: ["Yes, tomorrow morning works for me.", "I’ll keep it reserved until then."],
};

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function cloneThreadPayload(threadId) {
  const state = threadState.get(threadId);
  return state ? { thread: state.thread, messages: state.messages } : null;
}

function updateThreadSummary(threadId, lastMsg, time) {
  const state = threadState.get(threadId);
  if (!state) return;
  state.thread = {
    ...state.thread,
    lastMsg,
    time,
  };
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("chat:threads:load", () => {
    socket.emit("chat:threads", { threads: [...threadState.values()].map((entry) => entry.thread) });
  });

  socket.on("chat:thread:join", ({ threadId }) => {
    const state = threadState.get(threadId);
    if (!state) return;
    socket.join(threadId);
    socket.emit("chat:thread:messages", cloneThreadPayload(threadId));
  });

  socket.on("chat:message:send", ({ threadId, user, text, replyTo, attachments }) => {
    const state = threadState.get(threadId);
    if (!state) return;
    const isAi = user && user.id === "ai";
    const message = {
      id: crypto.randomUUID(),
      threadId,
      from: isAi ? "them" : "me",
      text,
      time: nowTime(),
      delivery: "sending",
      replyTo: replyTo ?? undefined,
      attachments: attachments?.length ? attachments : undefined,
      reactions: {},
      authorId: user?.id,
      authorName: user?.name,
      authorAvatar: user?.avatar,
    };
    state.messages = [...state.messages, message];
    updateThreadSummary(threadId, text || "Attachment", message.time);
    io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));

    setTimeout(() => {
      const next = threadState.get(threadId);
      if (!next) return;
      next.messages = next.messages.map((m) => (m.id === message.id ? { ...m, delivery: "delivered" } : m));
      io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
    }, 300);

    setTimeout(() => {
      const next = threadState.get(threadId);
      if (!next) return;
      next.messages = next.messages.map((m) => (m.id === message.id ? { ...m, delivery: "seen" } : m));
      io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
    }, 900);

    setTimeout(() => {
      const next = threadState.get(threadId);
      if (!next) return;
      const replies = cannedReplies[threadId] ?? ["Sounds good.", "Okay, see you then."];
      const replyText = replies[Math.floor(Math.random() * replies.length)];
      const replyMessage = {
        id: crypto.randomUUID(),
        threadId,
        from: "them",
        text: replyText,
        time: nowTime(),
        reactions: {},
      };
      next.messages = [...next.messages, replyMessage];
      updateThreadSummary(threadId, replyText, replyMessage.time);
      io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
    }, 1300);
  });

  socket.on("chat:message:edit", ({ threadId, messageId, text }) => {
    const state = threadState.get(threadId);
    if (!state) return;
    state.messages = state.messages.map((message) =>
      message.id === messageId ? { ...message, text, edited: true, time: nowTime() } : message,
    );
    updateThreadSummary(threadId, text, nowTime());
    io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
  });

  socket.on("chat:message:delete", ({ threadId, messageId }) => {
    const state = threadState.get(threadId);
    if (!state) return;
    state.messages = state.messages.filter((message) => message.id !== messageId);
    io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
  });

  socket.on("chat:message:react", ({ threadId, messageId, emoji }) => {
    const state = threadState.get(threadId);
    if (!state) return;
    state.messages = state.messages.map((message) => {
      if (message.id !== messageId) return message;
      const reactions = { ...(message.reactions ?? {}) };
      const entry = reactions[emoji];
      if (!entry) {
        reactions[emoji] = { count: 1, mine: true };
      } else if (entry.mine) {
        const nextCount = entry.count - 1;
        if (nextCount <= 0) delete reactions[emoji];
        else reactions[emoji] = { count: nextCount, mine: false };
      } else {
        reactions[emoji] = { count: entry.count + 1, mine: true };
      }
      return { ...message, reactions };
    });
    io.to(threadId).emit("chat:thread:update", cloneThreadPayload(threadId));
  });

  socket.on("chat:typing", ({ threadId, typing }) => {
    socket.to(threadId).emit("chat:presence", { threadId, online: typing });
  });
});

const PORT = Number(process.env.CHAT_SOCKET_PORT ?? 3001);
httpServer.listen(PORT, () => {
  console.log(`Socket.IO chat server running on http://localhost:${PORT}`);
});
