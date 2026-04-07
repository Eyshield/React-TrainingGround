import { useState } from "react";
import type { AuthResponse } from "../../../entities/AuthResponse";
import type { User } from "../../../entities/User";
import { register } from "../AuthService";

export const useRegister = () => {
  const [data, setData] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(user);
      setData(response);
      cookieStore.set("token", response.token);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unkown Error");
    } finally {
      setLoading(false);
    }
  };
  return { handleRegister, data, error, loading };
};
