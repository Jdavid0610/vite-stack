import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

// SECURITY TODO (follow-up): the auth token is persisted in localStorage, which is
// readable by any JS on the page and therefore exposed to XSS. The correct fix is
// server-side: have the backend set the token in an HttpOnly, Secure, SameSite cookie
// (JS cannot read it) and drop this localStorage persistence entirely. Requires a
// backend change, so it's tracked as a follow-up rather than fixed here.
// See https://react.doctor/prompts/rules/react-doctor/auth-token-in-web-storage.md
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  setUser: (user) => set({ user }),
  setToken: (token) => {
    localStorage.setItem("token", token);
    set({ token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
