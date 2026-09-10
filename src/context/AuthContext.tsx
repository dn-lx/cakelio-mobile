import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";

type CakelioProfile = {
  id: string;
  display_name: string | null;
  primary_role: "customer" | "provider" | string;
  locale: string;
};

type AuthContextValue = {
  userId: string | null;
  profile: CakelioProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [profile, setProfile] = useState<CakelioProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const { data } = await supabase.auth.getClaims();
    const id = data?.claims?.sub ?? null;
    setUserId(id);

    if (!id) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const { data: row } = await supabase
      .from("profiles")
      .select("id, display_name, primary_role, locale")
      .eq("id", id)
      .maybeSingle();

    setProfile((row as CakelioProfile | null) ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refreshProfile();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      setTimeout(() => void refreshProfile(), 0);
    });
    return () => listener.subscription.unsubscribe();
  }, [refreshProfile]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUserId(null);
    setProfile(null);
  }, []);

  const value = useMemo(() => ({ userId, profile, loading, refreshProfile, signOut }), [userId, profile, loading, refreshProfile, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used within AuthProvider");
  return value;
}
