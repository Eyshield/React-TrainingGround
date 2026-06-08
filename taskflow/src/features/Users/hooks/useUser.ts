import { useCallback, useState } from "react";
import type { UserResponse } from "../../../entities/UserResponse";
import type { User } from "../../../entities/User";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  searchUser,
  updateUser,
} from "../services/UserService";
import type { PageResponse } from "../../../entities/PageResponse";

export const useAddUser = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleAddUser = async (user: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addUser(user);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error");
      }
    } finally {
      setLoading(false);
    }
  };
  return { data, error, loading, handleAddUser };
};

export const useUpdateUser = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateUser = async (id: string, user: User) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateUser(id, user);
      setData(response);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdateUser, data, error, loading };
};
export const useDeleteUser = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteUser(id);
      setSuccess(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteUser, success, error, loading };
};
export const useSearchUser = () => {
  const [data, setData] = useState<PageResponse<UserResponse> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  //useCallBack was used here to avoid infnite refresh
  const handleSearchUser = useCallback(
    async (size: number, page: number, name: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await searchUser(size, page, name);
        setData(response);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown Error");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { data, error, loading, handleSearchUser };
};

export const useGetUserById = () => {
  const [data, setData] = useState<UserResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetUserById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserById(id);
      setData(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown Error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, handleGetUserById };
};

export const useGetAllUsers = () => {
  const [data, setData] = useState<PageResponse<User> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetAllUsers = useCallback(async (page: number, size: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllUsers(page, size);
      setData(response);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown Error");
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, handleGetAllUsers };
};
