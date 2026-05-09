import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { MongoClient } from "mongodb";
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
  };
};

type AiChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;
let mongoClientPromise: Promise<MongoClient> | undefined;

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

function getMongoClient(uri: string): Promise<MongoClient> {
  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(uri).connect();
  }

  return mongoClientPromise;
}

async function syncUserWithMongoDriver(user: AuthUser, env: unknown) {
  const mongoUri = getEnvValue(env, "MONGO_URI");
  const database = getEnvValue(env, "MONGODB_DATABASE");
  const collection = getEnvValue(env, "MONGODB_USERS_COLLECTION") ?? "users";

  if (!mongoUri || !database) {
    throw new Error("Missing MONGO_URI or MONGODB_DATABASE for MongoDB driver sync.");
  }

  const client = await getMongoClient(mongoUri);
  const now = new Date().toISOString();

  await client.db(database).collection(collection).updateOne(
    { firebaseUid: user.localId },
    {
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
    { upsert: true },
  );
}

async function syncUserWithDataApi(user: AuthUser, env: unknown) {
  const dataApiUrl = getEnvValue(env, "MONGODB_DATA_API_URL");
  const dataApiKey = getEnvValue(env, "MONGODB_DATA_API_KEY");
  const dataSource = getEnvValue(env, "MONGODB_DATA_SOURCE");
  const database = getEnvValue(env, "MONGODB_DATABASE");
  const collection = getEnvValue(env, "MONGODB_USERS_COLLECTION") ?? "users";

  if (!dataApiUrl || !dataApiKey || !dataSource || !database) {
    throw new Error(
      "Missing MongoDB Data API configuration (MONGODB_DATA_API_URL, MONGODB_DATA_API_KEY, MONGODB_DATA_SOURCE, MONGODB_DATABASE).",
    );
  }

  const now = new Date().toISOString();
  const response = await fetch(dataApiUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": dataApiKey,
    },
    body: JSON.stringify({
      dataSource,
      database,
      collection,
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
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`MongoDB Data API request failed (${response.status}): ${body}`);
  }

  return response;
}

async function readUserWithMongoDriver(userId: string, env: unknown) {
  const mongoUri = getEnvValue(env, "MONGO_URI");
  const database = getEnvValue(env, "MONGODB_DATABASE");
  const collection = getEnvValue(env, "MONGODB_USERS_COLLECTION") ?? "users";

  if (!mongoUri || !database) {
    return null;
  }

  const client = await getMongoClient(mongoUri);
  return client.db(database).collection<StoredUserProfile>(collection).findOne(
    { firebaseUid: userId },
    { projection: { _id: 0 } },
  );
}

async function readUserWithDataApi(userId: string, env: unknown) {
  const dataApiUrl = getEnvValue(env, "MONGODB_DATA_API_URL");
  const dataApiKey = getEnvValue(env, "MONGODB_DATA_API_KEY");
  const dataSource = getEnvValue(env, "MONGODB_DATA_SOURCE");
  const database = getEnvValue(env, "MONGODB_DATABASE");
  const collection = getEnvValue(env, "MONGODB_USERS_COLLECTION") ?? "users";

  if (!dataApiUrl || !dataApiKey || !dataSource || !database) {
    return null;
  }

  const response = await fetch(toDataApiActionUrl(dataApiUrl, "findOne"), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "api-key": dataApiKey,
    },
    body: JSON.stringify({
      dataSource,
      database,
      collection,
      filter: { firebaseUid: userId },
      projection: { _id: 0 },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as {
    document?: StoredUserProfile | null;
  };

  return payload.document ?? null;
}

async function readUserProfileFromMongo(userId: string, env: unknown) {
  const mongoUri = getEnvValue(env, "MONGO_URI");

  if (mongoUri) {
    return readUserWithMongoDriver(userId, env);
  }

  return readUserWithDataApi(userId, env);
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
  };
}

async function syncUserToMongo(user: AuthUser, env: unknown) {
  const mongoUri = getEnvValue(env, "MONGO_URI");

  if (mongoUri) {
    return syncUserWithMongoDriver(user, env);
  }

  return syncUserWithDataApi(user, env);
}

async function completeAiChat(messages: AiChatMessage[], env: unknown) {
  const apiKey = getEnvValue(env, "OPENROUTER_API_KEY");
  const model = getEnvValue(env, "OPENROUTER_MODEL") ?? "meta-llama/llama-3-8b-instruct";

  if (!apiKey) {
    throw new Error("Missing OPENROUTER_API_KEY.");
  }

  const client = new OpenRouter({ apiKey });

  const response = await client.chat.send({
    model,
    stream: false,
    messages,
  });

  const text = response.choices?.[0]?.message?.content;

  if (typeof text === "string") {
    return text;
  }

  if (Array.isArray(text)) {
    return text
      .map((part) => (typeof part === "string" ? part : part?.text ?? ""))
      .join("")
      .trim();
  }

  return "I could not generate a response right now.";
}

async function handleApiRequest(request: Request, env: unknown): Promise<Response | null> {
  const url = new URL(request.url);

  if (url.pathname !== "/api/users/sync") {
    if (url.pathname !== "/api/users/me" && url.pathname !== "/api/ai/chat") {
      return null;
    }
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "";

  if (!token) {
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
        storedProfile = await readUserProfileFromMongo(user.localId, env);
      } catch (error) {
        console.warn("User profile lookup failed, falling back to Firebase data:", error);
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
      return new Response(JSON.stringify({ ok: false, error: "AI response failed." }), {
        status: 500,
        headers: { "content-type": "application/json" },
      });
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
