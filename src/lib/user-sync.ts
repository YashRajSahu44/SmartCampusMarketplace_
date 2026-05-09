import type { User } from "firebase/auth";

// Attempt to notify the server about the authenticated user, but do not
// fail the client-side auth flow if the server or MongoDB configuration is
// missing or the sync request fails. The app previously threw here which
// could surface a server-side sync failure as a generic authentication error
// even when Firebase auth had succeeded.
export async function syncAuthenticatedUserToMongo(user: User) {
  try {
    const token = await user.getIdToken();
    const response = await fetch("/api/users/sync", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.warn(`User sync failed (${response.status}): ${body}`);
      return;
    }

    return;
  } catch (err) {
    console.warn("Failed to sync authenticated user to Mongo:", err);
    return;
  }
}
