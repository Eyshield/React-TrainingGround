import { useState } from "react";
import { login } from "../services/AuthService";
import type { AuthResponse } from "../../../entities/AuthResponse";
import type { User } from "../../../entities/User";

export const useLogin = () => {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (user: User) => {
    setLoading(true);
    setError(null);

    try {
      const response = await login(user); // ← service call
      setData(response);

      // ex: stock the token
      cookieStore.set("token", response.token);

      // ex: redidirect
      // navigate("/loginPage");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unkown Error");
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, data, error, loading };
};
