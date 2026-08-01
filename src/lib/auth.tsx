import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { login as apiLogin, register as apiRegister } from "./api";

export type Role = "freelancer" | "client" | "admin";
export interface User {
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

const AuthCtx = createContext<{
  user: User | null;
  login: (email: string, password: string, role: Role) => Promise<void>;
  register: (name: string, email: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
  setRole: (r: Role) => void;
}>({ user: null, login: async () => {}, register: async () => {}, logout: () => {}, setRole: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("fh-user") : null;
    setUser(raw ? JSON.parse(raw) : null);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("fh-user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthCtx.Provider
      value={{
        user,
        login: async (email, password, role) => {
          const { user: verifiedUser, token } = await apiLogin(email, password);
          localStorage.setItem("fh-token", token);
          setUser({ name: verifiedUser.name, email: verifiedUser.email, role });
        },
        register: async (name, email, password, role) => {
          const { user: newUser, token } = await apiRegister(name, email, password);
          localStorage.setItem("fh-token", token);
          setUser({ name: newUser.name, email: newUser.email, role });
        },
        logout: () => {
          localStorage.removeItem("fh-user");
          localStorage.removeItem("fh-token");
          setUser(null);
        },
        setRole: (r) => setUser((u) => (u ? { ...u, role: r } : u)),
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
