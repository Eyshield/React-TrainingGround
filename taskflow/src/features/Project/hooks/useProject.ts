import { useCallback, useState } from "react";
import type { ProjectRequest } from "../../../entities/ProjectRequest";
import type { ProjectResponse } from "../../../entities/ProjectResponse";
import {
  addProject,
  deleteProject,
  getAllProject,
  getProjectById,
  searchProject,
  updateProject,
} from "../services/ProjectServices";
import type { PageResponse } from "../../../entities/PageResponse";

export const useAddProject = () => {
  const [data, setData] = useState<ProjectResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleAddProject = async (projectRequest: ProjectRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await addProject(projectRequest);
      setData(response);
      setLoading(false);
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
  return { data, error, loading, handleAddProject };
};

export const useUpdateProject = () => {
  const [data, setData] = useState<ProjectResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleUpdateProject = async (
    id: string,
    projectRequest: ProjectRequest,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await updateProject(id, projectRequest);
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
  return { handleUpdateProject, data, error, loading };
};
export const useGetProjectById = () => {
  const [data, setData] = useState<ProjectResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleGetProjectById = async (id: string) => {
    try {
      const response = await getProjectById(id);
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
  return { data, error, loading, handleGetProjectById };
};
export const useDeleteProject = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleDeleteProject = async (id: string) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteProject(id);
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
  return { handleDeleteProject, success, error, loading };
};
export const useGetAllPorjects = () => {
  const [data, setData] = useState<PageResponse<ProjectResponse> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleGetAllProjects = useCallback(
    async (page: number, size: number) => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllProject(page, size);
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
    },
    [],
  );
  return { data, error, loading, handleGetAllProjects };
};

export const useSearchPorjects = () => {
  const [data, setData] = useState<PageResponse<ProjectResponse> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleSearchProject = useCallback(async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      if (!name.trim()) {
        setData(null);
        return;
      }
      const response = await searchProject(name);
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
  }, []);
  return { data, error, loading, handleSearchProject };
};
