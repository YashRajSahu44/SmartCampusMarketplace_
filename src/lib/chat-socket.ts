import { io, type Socket } from "socket.io-client";

export type ChatThread = {
  id: string;
  name: string;
  avatar: string;
  product: string;
  online: boolean;
  lastMsg: string;
  time: string;
  unread: number;
};

export type ChatAttachment = {
  id: string;
  kind: "image" | "file";
  name: string;
  size: number;
  previewUrl?: string;
};

export type ChatReaction = Record<string, { count: number; mine?: boolean }>;

export type ChatMessage = {
  id: string;
  threadId: string;
  // flexible `from` so messages can come from arbitrary user ids (e.g. 'ai')
  from: string;
  text: string;
  time: string;
  edited?: boolean;
  delivery?: "sending" | "sent" | "delivered" | "seen";
  // optional author metadata to allow rendering AI or other participants
  authorId?: string;
  authorName?: string;
  authorAvatar?: string | null;
  replyTo?: { id: string; text: string; from: string };
  attachments?: ChatAttachment[];
  reactions?: ChatReaction;
};

export type ChatThreadPayload = {
  thread: ChatThread;
  messages: ChatMessage[];
};

export type ChatUser = {
  id: string;
  name: string;
  avatar?: string | null;
};

export type ChatSocketEvents = {
  "chat:threads": (payload: { threads: ChatThread[] }) => void;
  "chat:thread:messages": (payload: ChatThreadPayload) => void;
  "chat:thread:update": (payload: ChatThreadPayload) => void;
  "chat:presence": (payload: { threadId: string; online: boolean }) => void;
};

export type ChatSocketClientEvents = {
  "chat:threads:load": () => void;
  "chat:thread:join": (payload: { threadId: string; user: ChatUser }) => void;
  "chat:message:send": (payload: {
    threadId: string;
    user: ChatUser;
    text: string;
    replyTo?: ChatMessage["replyTo"] | null;
    attachments?: ChatAttachment[];
  }) => void;
  "chat:message:edit": (payload: { threadId: string; messageId: string; text: string; user: ChatUser }) => void;
  "chat:message:delete": (payload: { threadId: string; messageId: string; user: ChatUser }) => void;
  "chat:message:react": (payload: { threadId: string; messageId: string; emoji: string; user: ChatUser }) => void;
  "chat:typing": (payload: { threadId: string; user: ChatUser; typing: boolean }) => void;
};

let socket: Socket<ChatSocketEvents, ChatSocketClientEvents> | null = null;

function getChatSocketUrl() {
  return import.meta.env.VITE_CHAT_SOCKET_URL ?? "http://localhost:3001";
}

export function getChatSocket() {
  if (!socket) {
    socket = io(getChatSocketUrl(), {
      autoConnect: false,
      transports: ["websocket"],
    });
  }

  return socket;
}
