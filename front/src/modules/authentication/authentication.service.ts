import { httpRequest } from "../../utils/api";
import { User } from "./authentication.model";

export const authService = {
  signIn(email: string, password: string): Promise<User> {
    return httpRequest({
      path: "/auth/sign-in/password",
      method: "POST",
      body: { email, password },
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
