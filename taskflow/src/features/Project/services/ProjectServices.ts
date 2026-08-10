import type { PageResponse } from "../../../entities/PageResponse";
import type { ProjectRequest } from "../../../entities/ProjectRequest";
import type { ProjectResponse } from "../../../entities/ProjectResponse";
const apiUrl = import.meta.env.VITE_API_URL;
export const addProject = async (
  request: ProjectRequest,
): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${apiUrl}project/add`, {
      method: "POST",
      headers: {
        "content-type": "Application/Json",
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error when adding a project");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addProject error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while adding project");
  }
};
export const getProjectById = async (id: string): Promise<ProjectResponse> => {
  try {
    const response = await fetch(`${apiUrl}project/${id}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error in getting project");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("getProjectById error:", error.message);
      throw error;
    }
    throw new Error("Unknown error while getting project");
  }
};
export const updateProject = async (
  id: string,
  request: ProjectRequest,
): Promise<ProjectResponse> => {
  try {
    const reponse = await fetch(`${apiUrl}project/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "Application/Json",
      },
      body: JSON.stringify(request),
    });
    if (!reponse.ok) {
      const errorData = await reponse.json().catch(() => null);
      throw new Error(errorData?.message || "Error in updating the project");
    }
    const data = await reponse.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in updating the project: " + error.message);
      throw error;
    }
    throw new Error("Unkown error while updating the project ");
  }
};
export const deleteProject = async (id: string): Promise<void> => {
  try {
    const reponse = await fetch(`${apiUrl}project/${id}`, {
      method: "DELETE",
    });
    if (!reponse.ok) {
      const errorData = await reponse.json().catch(() => null);
      throw new Error(errorData?.message || "Error in deleting the project");
    }
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while deleting the project: " + error.message);
      throw error;
    }
    throw new Error("Unkown error while deleting the project ");
  }
};

export const getAllProject = async (
  page: number,
  size: number,
): Promise<PageResponse<ProjectResponse>> => {
  try {
    const response = await fetch(
      `${apiUrl}project/all?page=${page}&size${size}`,
      {
        method: "GET",
      },
    );
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error in getting the projects");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while getting the projects: " + error.message);
      throw error;
    }
    throw new Error("Unkown error while getting the projects ");
  }
};
export const searchProject = async (
  name: string,
): Promise<PageResponse<ProjectResponse>> => {
  try {
    const response = await fetch(`${apiUrl}project/search?name=${name}`, {
      method: "GET",
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Error in searching the projects");
    }
    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error while searching the projects: " + error.message);
      throw error;
    }
    throw new Error("Unkown error while searching the projects ");
  }
};
