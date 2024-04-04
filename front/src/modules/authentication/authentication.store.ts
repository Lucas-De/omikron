import { create } from "zustand";
import { User } from "./authentication.model";
import { authService } from "./authentication.service";
import { AxiosError } from "axios";

interface AuthenticationState {
  user?: User;
  processing: boolean;
  authenticate: (username: string, password: string) => void;
  logout: () => void;
  getUserId: () => number;
}

export const useAuthenticationStore = create<AuthenticationState>(
  (set, get) => ({
    user: getLocalStorageUser(),
    processing: false,

    async authenticate(name: string, password: string) {
      set(() => ({ processing: true }));
      try {
        const user = await authService.signIn(name, password);
        setLocalStorageUser(user);
        set(() => ({ user }));
        set(() => ({ processing: false }));
      } catch (err) {
        set(() => ({ processing: false }));
        const isAxiosError = err instanceof AxiosError;
        if (!isAxiosError) throw new Error("Authentication failed");

        const status = err?.response?.status;
        if (status === 401 || status === 404) {
          throw new Error("Invalid credentials");
        }
      }
    },

    getUserId() {
      const userId = get().user?.id;
      if (!userId) {
        get().logout();
        return -1;
      }
      return userId;
    },

    logout() {
      localStorage.removeItem("user");
      set(() => ({ user: undefined }));
      window.open("/login", "_self");
    },
  })
);

function getLocalStorageUser() {
  const userString = localStorage.getItem("user");
  if (!userString) return undefined;
  return JSON.parse(userString) as User;
}

function setLocalStorageUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}
