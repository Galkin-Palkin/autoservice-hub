import { createContext, useCallback, useContext, useMemo, useState } from "react";

const AUTH_STORAGE_KEY = "autoservice-user";

export interface User {
  email: string;
  name: string;
}

function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(loadUser);

  const login = useCallback((email: string, _password: string) => {
    const u = loadUser();
    if (u && u.email === email) {
      setUser(u);
      return true;
    }
    setUser({ name: email.split("@")[0], email });
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ name: email.split("@")[0], email }));
    return true;
  }, []);

  const register = useCallback((name: string, email: string, _password: string) => {
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
