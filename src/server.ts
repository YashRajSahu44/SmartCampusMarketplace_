import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { OpenRouter } from "@openrouter/sdk";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

type AuthUser = {
  localId?: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  emailVerified?: boolean;
  createdAt?: string;
  lastLoginAt?: string;
  phoneNumber?: string;
};

type StoredUserProfile = Record<string, unknown> & {
  firebaseUid?: string;
  email?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
  emailVerified?: boolean;
  createdAt?: string | null;
  lastLoginAt?: string | null;
  walletBalance?: number;
};

type UserProfileResponse = {
  ok: true;
  user: StoredUserProfile & {
    firebaseUid: string;
    email: string | null;
    displayName: string | null;
    photoUrl: string | null;
    emailVerified: boolean;
    createdAt: string | null;
    lastLoginAt: string | null;
    source: "backend" | "firebase";
    walletBalance: number;
  };
};

type AiChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type DataApiConfig = {
  url: string;
  apiKey: string;
  dataSource: string;
  database: string;
  collection: string;
};

type DataApiResponse<T> = {
  document?: T | null;
  documents?: T[];
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m as { default?: ServerEntry }).default ?? (m as unknown as ServerEntry),
    );
  }
  return serverEntryPromise;
}

function brandedErrorResponse(): Response {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function getEnvValue(env: unknown, key: string): string | undefined {
  if (env && typeof env === "object" && key in env) {
    const value = (env as Record<string, unknown>)[key];
    if (typeof value === "string" && value.length > 0) return value;
  }

  if (typeof process !== "undefined" && process.env) {
    const value = process.env[key];
    if (typeof value === "string" && value.length > 0) return value;
  }

  return undefined;
}

function getDataApiConfig(env: unknown): DataApiConfig | null {
  const url = getEnvValue(env, "MONGODB_DATA_API_URL");
  const apiKey = getEnvValue(env, "MONGODB_DATA_API_KEY");
  const dataSource = getEnvValue(env, "MONGODB_DATA_SOURCE");
  const database = getEnvValue(env, "MONGODB_DATABASE");
  const collection = getEnvValue(env, "MONGODB_USERS_COLLECTION") ?? "users";

  if (!url || !apiKey || !dataSource || !database) {
    return null;
  }

  return { url, apiKey, dataSource, database, collection };
}

async function callDataApi(
  config: DataApiConfig,
  action: string,
  body: Record<string, unknown>,
): Promise<Response> {
  return fetch(toDataApiActionUrl(config.url, action), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": config.apiKey,
    },
    body: JSON.stringify({
      dataSource: config.dataSource,
      database: config.database,
      collection: config.collection,
      ...body,
    }),
  });
}

async function lookupFirebaseUserByIdToken(idToken: string, env: unknown) {
  const apiKey =
    getEnvValue(env, "FIREBASE_WEB_API_KEY") ?? getEnvValue(env, "VITE_FIREBASE_API_KEY");

  if (!apiKey) {
    throw new Error(
      "Missing FIREBASE_WEB_API_KEY or VITE_FIREBASE_API_KEY for token verification.",
    );
  }

  const response = await fetch(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ idToken }),
    },
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    users?: Array<{
      localId?: string;
      email?: string;
      displayName?: string;
      photoUrl?: string;
      emailVerified?: boolean;
      createdAt?: string;
      lastLoginAt?: string;
      phoneNumber?: string;
    }>;
  };

  return payload.users?.[0] ?? null;
}

function toDataApiActionUrl(url: string, action: string) {
  return url.replace(/\/action\/[^/]+$/, `/action/${action}`);
}

async function syncUserProfile(user: AuthUser, env: unknown) {
  const config = getDataApiConfig(env);

  if (!config) {
    return;
  }

  const now = new Date().toISOString();
  const response = await callDataApi(config, "updateOne", {
    filter: { firebaseUid: user.localId },
    update: {
      $set: {
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoUrl: user.photoUrl ?? null,
        emailVerified: Boolean(user.emailVerified),
        lastLoginAt: now,
      },
      $setOnInsert: {
        firebaseUid: user.localId,
        createdAt: now,
      },
    },
    upsert: true,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}

async function readUserProfile(userId: string, env: unknown) {
  const config = getDataApiConfig(env);

  if (!config) {
    return null;
  }

  const response = await callDataApi(config, "findOne", {
    filter: { firebaseUid: userId },
    projection: { _id: 0 },
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as DataApiResponse<StoredUserProfile>;

  return payload.document ?? null;
}

function buildUserProfile(user: AuthUser, storedProfile: StoredUserProfile | null) {
  const profile = storedProfile ?? {};

  return {
    ...profile,
    firebaseUid: user.localId ?? String(profile.firebaseUid ?? ""),
    email: profile.email ?? user.email ?? null,
    displayName: profile.displayName ?? user.displayName ?? null,
    photoUrl: profile.photoUrl ?? user.photoUrl ?? null,
    emailVerified: profile.emailVerified ?? Boolean(user.emailVerified),
    createdAt: profile.createdAt ?? user.createdAt ?? null,
    lastLoginAt: profile.lastLoginAt ?? user.lastLoginAt ?? null,
    source: storedProfile ? "backend" : "firebase",
    walletBalance: typeof profile.walletBalance === "number" ? profile.walletBalance : 1000,
  };
}

async function readWalletBalance(userId: string, env: unknown) {
  const profile = await readUserProfile(userId, env);
  return typeof profile?.walletBalance === "number" ? profile.walletBalance : 1000;
}

async function readTransactions(userId: string, env: unknown) {
  const config = getDataApiConfig(env);

  if (!config) {
    return [];
  }

  const response = await callDataApi(config, "find", {
    filter: { $or: [{ senderId: userId }, { receiverId: userId }] },
    sort: { createdAt: -1 },
    limit: 50,
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as DataApiResponse<Record<string, unknown>>;
  return payload.documents ?? [];
}

async function incrementWalletBalance(userId: string, amount: number, env: unknown) {
  const config = getDataApiConfig(env);

  if (!config) {
    throw new Error("Missing MongoDB Data API configuration for wallet updates.");
  }

  const response = await callDataApi(config, "updateOne", {
    filter: { firebaseUid: userId },
    update: { $inc: { walletBalance: amount } },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}

async function insertTransaction(transaction: Record<string, unknown>, env: unknown) {
  const config = getDataApiConfig(env);

  if (!config) {
    throw new Error("Missing MongoDB Data API configuration for transactions.");
  }

  const response = await callDataApi(config, "insertOne", {
    document: transaction,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }
}

async function syncUserToMongo(user: AuthUser, env: unknown) {
  return syncUserProfile(user, env);
}

async function completeAiChat(messages: AiChatMessage[], env: unknown) {
  const apiKey =
    getEnvValue(env, "OPENROUTER_API_KEY") ??
    getEnvValue(env, "OPEN_ROUTER_API_KEY") ??
    getEnvValue(env, "OPENROUTER_KEY");
  const model =
    getEnvValue(env, "OPENROUTER_MODEL") ??
    getEnvValue(env, "OPEN_ROUTER_MODEL") ??
    "meta-llama/llama-3.1-8b-instruct";

  if (!apiKey) {
    throw new Error(
      "Missing OpenRouter key. Set OPENROUTER_API_KEY in server environment variables.",
    );
  }

  const client = new OpenRouter({ apiKey });

  const response = await client.chat.send({
    chatRequest: {
      model,
      stream: false,
      messages,
    },
  });

  const text = response.choices?.[0]?.message?.content;

  if (typeof text === "string") {
    return text;
  }

  if (Array.isArray(text)) {
    return text
      .map((part) => (typeof part === "string" ? part : (part?.text ?? "")))
      .join("")
      .trim();
  }

  return "I could not generate a response right now.";
}

async function handleApiRequest(request: Request, env: unknown): Promise<Response | null> {
  const url = new URL(request.url);

  const allowedPaths = [
    "/api/users/sync",
    "/api/users/me",
    "/api/ai/chat",
    "/api/economy/balance",
    "/api/economy/transactions",
    "/api/economy/transfer",
    "/api/bots/tick",
  ];

  if (!allowedPaths.includes(url.pathname)) {
    return null;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

  const allowAnonymousAi = getEnvValue(env, "OPENROUTER_ALLOW_ANONYMOUS") === "true";
  const aiChatAllowsAnonymous = url.pathname === "/api/ai/chat" && allowAnonymousAi;
  const isBotTick = url.pathname === "/api/bots/tick";

  if (!token && !aiChatAllowsAnonymous && !isBotTick) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (url.pathname === "/api/users/me") {
    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const user = await lookupFirebaseUserByIdToken(token, env);
      if (!user?.localId) {
        return new Response("Unauthorized", { status: 401 });
      }

      let storedProfile: StoredUserProfile | null = null;
      try {
        storedProfile = await readUserProfile(user.localId, env);
      } catch {
        storedProfile = null;
      }

      const responseBody: UserProfileResponse = {
        ok: true,
        user: buildUserProfile(user, storedProfile),
      };

      return new Response(JSON.stringify(responseBody), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ ok: false }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  if (url.pathname === "/api/ai/chat") {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      const body = (await request.json().catch(() => ({}))) as {
        messages?: AiChatMessage[];
      };

      const messages = (body.messages ?? []).filter(
        (message): message is AiChatMessage =>
          Boolean(message) &&
          (message.role === "system" || message.role === "user" || message.role === "assistant") &&
          typeof message.content === "string" &&
          message.content.trim().length > 0,
      );

      if (messages.length === 0) {
        return new Response(JSON.stringify({ ok: false, error: "No messages provided." }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      const content = await completeAiChat(messages, env);
      return new Response(JSON.stringify({ ok: true, content }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error(error);
      const message = error instanceof Error ? error.message : "AI response failed.";
      return new Response(JSON.stringify({ ok: false, error: message }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
    }
  }

  if (url.pathname === "/api/economy/balance" && request.method === "GET") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });

      const balance = await readWalletBalance(user.localId, env);

      return new Response(JSON.stringify({ ok: true, balance }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false }), { status: 500 });
    }
  }

  if (url.pathname === "/api/economy/transactions" && request.method === "GET") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });

      const transactions = await readTransactions(user.localId, env);

      return new Response(JSON.stringify({ ok: true, transactions }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, transactions: [] }), { status: 500 });
    }
  }

  if (url.pathname === "/api/economy/transfer" && request.method === "POST") {
    try {
      const user = await lookupFirebaseUserByIdToken(token, env);
      if (!user?.localId) return new Response("Unauthorized", { status: 401 });

      const body = await request.json() as {
        receiverId: string;
        amount: number;
        type: string;
        referenceId?: string;
        description: string;
      };

      const amount = Number(body.amount);
      if (isNaN(amount) || amount <= 0 || !body.receiverId) {
        return new Response(JSON.stringify({ error: "Invalid transfer parameters" }), { status: 400 });
      }

      const senderProfile = await readUserProfile(user.localId, env);
      const senderBalance =
        typeof senderProfile?.walletBalance === "number" ? senderProfile.walletBalance : 1000;

      if (senderBalance < amount) {
        return new Response(JSON.stringify({ error: "Insufficient balance" }), { status: 400 });
      }

      const receiverProfile = await readUserProfile(body.receiverId, env);
      if (!receiverProfile) {
        return new Response(JSON.stringify({ error: "Receiver not found in db" }), { status: 400 });
      }

      await incrementWalletBalance(user.localId, -amount, env);
      await incrementWalletBalance(body.receiverId, amount, env);

      const transaction = {
        id: crypto.randomUUID(),
        senderId: user.localId,
        receiverId: body.receiverId,
        amount,
        type: body.type || "buy",
        description: body.description || "Transfer",
        referenceId: body.referenceId,
        createdAt: new Date().toISOString(),
      };

      await insertTransaction(transaction, env);

      return new Response(JSON.stringify({ ok: true, transaction }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    } catch (error) {
      console.error("Transfer error", error);
      const message = error instanceof Error ? error.message : "Transfer failed";
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }

  if (url.pathname === "/api/bots/tick" && request.method === "POST") {
    try {
      const projectId = getEnvValue(env, "VITE_FIREBASE_PROJECT_ID");
      if (!projectId) throw new Error("Firebase Project ID not configured");

      // Generate a listing using AI
      const prompt = `Generate a realistic classifieds listing for a university campus marketplace. 
Return ONLY a valid JSON object (no markdown, no extra text) with the following string keys:
"title" (short item name), 
"description" (2-3 sentences), 
"category" (one of: Books, Gadgets, Notes, Electronics, Cycles, Hostel Essentials, Lab Equipment, Furniture),
"price" (number in INR, realistic second-hand price like 500 or 1200),
"condition" (one of: New, Like New, Good, Fair).
Make it something a student would realistically sell.`;

      const aiText = await completeAiChat([{ role: "user", content: prompt }], env);
      let aiData;
      try {
        const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
        aiData = JSON.parse(cleanedText);
      } catch (e) {
        throw new Error(`Failed to parse AI response: ${aiText}`);
      }

      const sellerId = `ai_bot_${Math.floor(Math.random() * 1000)}`;
      const sellerName = ["Alex", "Sam", "Jordan", "Taylor", "Casey"][Math.floor(Math.random() * 5)];
      const seed = Math.random().toString(36).substring(2, 9);

      const firestorePayload = {
        fields: {
          title: { stringValue: aiData.title || "Study Material" },
          description: { stringValue: aiData.description || "Good condition." },
          price: { doubleValue: Number(aiData.price) || 500 },
          category: { stringValue: aiData.category || "Books" },
          condition: { stringValue: aiData.condition || "Good" },
          sellerId: { stringValue: sellerId },
          sellerName: { stringValue: sellerName },
          sellerCollege: { stringValue: "Campus" },
          availability: { stringValue: "Available" },
          image: { stringValue: `https://picsum.photos/seed/${seed}/600/600` },
          sellerAvatar: { stringValue: `https://api.dicebear.com/7.x/avataaars/svg?seed=${sellerId}` },
          isAi: { booleanValue: true },
          createdAtIso: { stringValue: new Date().toISOString() }
        }
      };

      const fbUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/listings`;
      const fbResponse = await fetch(fbUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(firestorePayload)
      });

      if (!fbResponse.ok) {
        const err = await fbResponse.text();
        throw new Error(`Firestore Error: ${err}`);
      }

      return new Response(JSON.stringify({ ok: true, generated: aiData }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    } catch (error) {
      console.error("Bot tick error", error);
      const message = error instanceof Error ? error.message : "Bot failed";
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  }

  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const user = await lookupFirebaseUserByIdToken(token, env);
    if (!user?.localId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await syncUserToMongo(user, env);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
}

function isCatastrophicSsrErrorBody(body: string, responseStatus: number): boolean {
  let payload: unknown;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }

  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }

  const fields = payload as Record<string, unknown>;
  const expectedKeys = new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }

  return (
    fields.unhandled === true &&
    fields.message === "HTTPError" &&
    (fields.status === undefined || fields.status === responseStatus)
  );
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const apiResponse = await handleApiRequest(request, env);
      if (apiResponse) {
        return apiResponse;
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  },
};
