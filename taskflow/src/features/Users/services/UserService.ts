import type { PageResponse } from "../../../entities/PageResponse";
import type { User } from "../../../entities/User";
import type { UserResponse } from "../../../entities/UserResponse";

export const getAllUsers = async (
  page: number,
  size: number,
): Promise<PageResponse<User>> => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/user/all?page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to fetch users");
    }
    const data: PageResponse<User> = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getAllUsers error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching users");
  }
};

export const addUser = async (user: User): Promise<UserResponse> => {
  try {
    const response = await fetch(`http://localhost:9000/api/user/add`, {
      method: "POST",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to add user");
    }
    const data: UserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addUser error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching users");
  }
};

export const updateUser = async (
  id: string,
  user: User,
): Promise<UserResponse> => {
  try {
    const response = await fetch(`http://localhost:9000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update user");
    }
    const data: UserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("updateUser error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while updating the user users");
  }
};

export const getUserById = async (id: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`http://localhost:9000/api/user/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to get user");
    }
    const data: UserResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addUser error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching users");
  }
};
export const deleteUser = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:9000/api/user/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to delete user");
    }

    // DELETE retourne 204 No Content → rien à parser
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("deleteUser error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while deleting user");
  }
};
export const searchUser = async (
  size: number,
  page: number,
  name: string,
): Promise<PageResponse<UserResponse>> => {
  try {
    const response = await fetch(
      `http://localhost:9000/api/user/search?name=${name}&page=${page}&size=${size}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to search user");
    }
    const data: PageResponse<UserResponse> = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("search error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while searching for the user");
  }
};
