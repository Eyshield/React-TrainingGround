import type { AuthResponse } from "../../entities/AuthResponse";
import type { User } from "../../entities/User";

export const login = async (user: User): Promise<AuthResponse> => {
  try {
    const response = await fetch("http://localhost:9000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // gestion erreur HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(errorData?.message || "Connection Error");
    }

    const data: AuthResponse = await response.json();

    return data;
  } catch (error: unknown) {
    //centraliser erreur
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("Unkown Error");
  }
};
export const register = async (user: User): Promise<AuthResponse> => {
  try {
    const response = await fetch("http://localhost:9000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    // gestion erreur HTTP
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(errorData?.message || "Connection error");
    }

    const data: AuthResponse = await response.json();
    return data;
  } catch (error: unknown) {
    //centraliser erreur
    if (error instanceof Error) {
      console.error(error.message);
      throw error;
    }
    throw new Error("Unkown error");
  }
};
