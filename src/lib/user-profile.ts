import { useQuery } from "@tanstack/react-query";
import { type User } from "firebase/auth";

import { useAuth } from "@/lib/auth";

export type UserProfile = {
  firebaseUid: string;
  email: string | null;
  displayName: string | null;
  photoUrl: string | null;
  emailVerified: boolean;
  createdAt: string | null;
  lastLoginAt: string | null;
  source: "backend" | "firebase";
  [key: string]: unknown;
};

type UserProfileResponse = {
  ok: boolean;
  user: UserProfile;
};

export function buildFallbackUserProfile(user: User): UserProfile {
  return {
    firebaseUid: user.uid,
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoUrl: user.photoURL ?? null,
    emailVerified: user.emailVerified,
    createdAt: user.metadata.creationTime ?? null,
    lastLoginAt: user.metadata.lastSignInTime ?? null,
    source: "firebase",
  };
}

export async function fetchCurrentUserProfile(user: User): Promise<UserProfile> {
  const token = await user.getIdToken();
  const response = await fetch("/api/users/me", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Failed to load user profile (${response.status}).`);
  }

  const payload = (await response.json()) as UserProfileResponse;

  if (!payload.ok || !payload.user) {
    throw new Error("User profile response was incomplete.");
  }

  return payload.user;
}

export function useCurrentUserProfile() {
  const { user, loading } = useAuth();

  return useQuery({
    queryKey: ["current-user-profile", user?.uid],
    enabled: Boolean(user && !loading),
    queryFn: async () => {
      if (!user) {
        return null;
      }

      try {
        return await fetchCurrentUserProfile(user);
      } catch {
        return buildFallbackUserProfile(user);
      }
    },
    staleTime: 60_000,
  });
}
