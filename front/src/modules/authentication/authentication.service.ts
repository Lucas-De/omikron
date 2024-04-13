import { httpRequest } from "../../utils/api";
import { User } from "./authentication.model";

export const authService = {
  signIn(name: string, password: string): Promise<User> {
    return httpRequest({
      path: "/auth/sign-in",
      method: "POST",
      body: { name, password },
    });
  },
  signInWithGoogle(credential: string): Promise<User> {
    return httpRequest({
      path: "/auth/sign-in/google",
      method: "POST",
      body: { credential },
    });
  },
};
