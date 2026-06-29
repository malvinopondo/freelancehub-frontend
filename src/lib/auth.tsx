import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "freelancer" | "client" | "admin";
export interface User {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

const AuthCtx = createContext<{
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  setRole: (r: Role) => void;
}>({ user: null, login: () => {}, logout: () => {}, setRole: () => {} });

const DEFAULT_USER: User = {
  name: "Alex Morgan",
  email: "alex@freelancehub.app",
  role: "freelancer",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("fh-user") : null;
    setUser(raw ? JSON.parse(raw) : DEFAULT_USER);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("fh-user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthCtx.Provider
      value={{
        user,
        login: (u) => setUser(u),
        logout: () => {
          localStorage.removeItem("fh-user");
          setUser(null);
        },
        setRole: (r) => setUser((u) => (u ? { ...u, role: r } : { ...DEFAULT_USER, role: r })),
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);