import type { TaskRequest } from "../../../entities/TaskRequest";
import type { TaskResponse } from "../../../entities/TaskResponse";
const apiUrl = import.meta.env.VITE_API_URL;
export const addTask = async (task: TaskRequest): Promise<TaskResponse> => {
  try {
    const response = await fetch(`${apiUrl}task/add`, {
      method: "POST",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to add Task");
    }
    const data: TaskResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addUser error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching users");
  }
};
export const updateTask = async (
  id: string,
  task: TaskRequest,
): Promise<TaskResponse> => {
  try {
    const response = await fetch(`${apiUrl}task/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to update Task");
    }
    const data: TaskResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("UpdateTask error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while updating tasks");
  }
};
export const deleteTask = async (id: string): Promise<void> => {
  try {
    const response = await fetch(
      `${apiUrl}/task/delete
        /${id}`,
      {
        method: "DELETE",
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to delete task");
    }
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("deleteTask error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while deleting task");
  }
};
export const getTaskById = async (id: string): Promise<TaskResponse> => {
  try {
    const response = await fetch(`${apiUrl}task/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to fetch task");
    }
    const data: TaskResponse = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getTaskById error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching task");
  }
};
