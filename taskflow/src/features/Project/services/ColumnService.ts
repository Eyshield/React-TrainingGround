import type { ColumnRequest } from "../../../entities/ColumnRequest";
import type { ColumnResponse } from "../../../entities/ColumnResponse";

const apiUrl = import.meta.env.VITE_API_URL;
export const addColumn = async (
  columnRequest: ColumnRequest,
): Promise<ColumnResponse> => {
  try {
    const response = await fetch(`${apiUrl}column/add`, {
      method: "POST",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(columnRequest),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error when adding a column");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addColumn error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while adding column");
  }
};
export const updateColumn = async (
  id: string,
  columnRequest: ColumnRequest,
): Promise<ColumnResponse> => {
  try {
    const response = await fetch(`${apiUrl}column/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(columnRequest),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error when updating a column");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("updateColumn error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while updating column");
  }
};

export const deleteColumn = async (id: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}column/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error when deleting a column");
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("deleteColumn error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while deleting column");
  }
};
export const getColumnByProjectId = async (
  id: string,
): Promise<ColumnResponse[]> => {
  try {
    const response = await fetch(`${apiUrl}column/project/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Error when fetching columns by project id",
      );
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getColumnByProjectId error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching columns by project id");
  }
};
export const getColumnById = async (id: string): Promise<ColumnResponse> => {
  try {
    const response = await fetch(`${apiUrl}column/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error when fetching column by id");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getColumnById error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while fetching column by id");
  }
};
