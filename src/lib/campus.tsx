import * as React from "react";

export const CAMPUSES = [
  "Technocrats",
  "LNCT",
  "Oriental",
  "SIRT",
  "Bansal",
  "RGPV",
  "MANIT",
] as const;

export type CampusName = (typeof CAMPUSES)[number];

type CampusCtx = {
  campus: CampusName | null;
  setCampus: (c: CampusName) => void;
};

const CampusContext = React.createContext<CampusCtx | null>(null);

const STORAGE_KEY = "smartcampus:campus:v1";

export function CampusProvider({ children }: { children: React.ReactNode }) {
  const [campus, setCampusState] = React.useState<CampusName | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && (CAMPUSES as readonly string[]).includes(raw)) return raw as CampusName;
    } catch {
      // ignore
    }
    return null;
  });

  const setCampus = React.useCallback((c: CampusName) => {
    setCampusState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore
    }
  }, []);

  const value = React.useMemo(() => ({ campus, setCampus }), [campus, setCampus]);
  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
}

export function useCampus() {
  const ctx = React.useContext(CampusContext);
  if (!ctx) throw new Error("useCampus must be used within CampusProvider");
  return ctx;
}

