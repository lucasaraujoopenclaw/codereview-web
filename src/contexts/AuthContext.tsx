import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (googleIdToken: string) => Promise<void>;
  logout: () => void;
}

type StoredAuth = {
  token: string;
  user: User;
};

type JwtPayload = {
  exp?: number;
};

type BackendAuthResponse = {
  token: string;
  user: User;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = import.meta.env.VITE_API_URL || "";

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);

  // Validate token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedToken || !storedUser) {
      setIsLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(storedToken);
      const expMs = decoded.exp ? decoded.exp * 1000 : null;

      if (expMs !== null && expMs < Date.now()) {
        logout();
        setIsLoading(false);
        return;
      }

      const parsedUser = JSON.parse(storedUser) as User;
      setToken(storedToken);
      setUser(parsedUser);

      // Validate token with backend
      axios
        .get(`${apiUrl}/api/stats`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then(() => setIsLoading(false))
        .catch(() => {
          logout();
          setIsLoading(false);
        });
    } catch {
      logout();
      setIsLoading(false);
    }
  }, [apiUrl, logout]);

  const login = async (googleIdToken: string) => {
    const response = await axios.post<BackendAuthResponse>(`${apiUrl}/auth/google`, {
      token: googleIdToken,
    });

    const { token: jwtToken, user: userData } = response.data;

    setToken(jwtToken);
    setUser(userData);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
