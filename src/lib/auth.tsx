import * as React from "react";
import { onAuthStateChanged, signOut as firebaseSignOut, type User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signOut = React.useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  const value = React.useMemo(
    () => ({ user, loading, signOut }),
    [loading, signOut, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
