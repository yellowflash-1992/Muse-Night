import { useEffect, useState } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  memberSince?: string;
}

const STORAGE_KEY = "muse_user";
const AUTH_EVENT = "muse_auth_changed";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const handleAuthChange = () => loadUser();
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const login = (email: string, name?: string) => {
    const defaultName = name || email.split("@")[0] || "Patron";
    const formattedName = defaultName.charAt(0).toUpperCase() + defaultName.slice(1);
    const newUser: User = {
      id: "user_" + Date.now(),
      name: formattedName,
      email,
      role: "Reader & Patron",
      memberSince: "Winter 2024",
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      setUser(newUser);
      window.dispatchEvent(new Event(AUTH_EVENT));
    } catch (e) {
      console.error(e);
    }
    return newUser;
  };

  const logout = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUser(null);
      window.dispatchEvent(new Event(AUTH_EVENT));
    } catch (e) {
      console.error(e);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };
}
