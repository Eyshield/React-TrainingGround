import React, { useEffect, useState } from "react";
import type { ColumnResponse } from "../../../entities/ColumnResponse";
import { getColumnById, updateColumn } from "../services/ColumnService";
import type { ColumnRequest } from "../../../entities/ColumnRequest";
interface EditColumnProps {
  onSuccess?: () => void;
  onClose?: () => void;
  projectId: string;
  id: string;
}

interface FormData {
  id?: string;
  title: string;
  position: string;
  projectId: string;
}

const INITIAL_FORM: FormData = {
  title: "",
  position: "",
  projectId: "",
};

const useEditColumn = () => {
  const [data, setData] = useState<ColumnResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleEditColumn = async (id: string, columnRequest: ColumnRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await updateColumn(id, columnRequest);

      setData(response);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    handleEditColumn,
  };
};

const useGetColumn = () => {
  const [data, setData] = useState<ColumnResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleGetColumn = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getColumnById(id);

      setData(response);
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Une erreur inconnue est survenue.");
      }

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    handleGetColumn,
  };
};
function EditColumn({ onClose, onSuccess, projectId, id }: EditColumnProps) {
  const { error, loading, handleEditColumn } = useEditColumn();
  const {
    data: columnData,
    loading: columnLoading,
    error: columnError,
    handleGetColumn,
  } = useGetColumn();
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM, projectId });

  useEffect(() => {
    if (id) handleGetColumn(id);
  }, [id]);

  useEffect(() => {
    if (columnData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        id: columnData.id,
        title: columnData.title,
        position: columnData.position,
        projectId: projectId,
      });
    }
  }, [columnData]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    try {
      await handleEditColumn(id, form);
      setForm({ ...INITIAL_FORM, projectId });
      onSuccess?.();
    } catch {
      // The hook exposes the request error in the form.
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border border-gray-100 bg-white p-7 shadow-lg"
      >
        <div className="flex justify-between">
          <h2 className="text-sm font-medium text-gray-900">
            Créer une colonne
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
          >
            Fermer
          </button>
        </div>
        {columnLoading && (
          <p className="px-3.5 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500 animate-pulse">
            Chargement de column...
          </p>
        )}
        {columnError && (
          <p className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-500">
            {columnError}
          </p>
        )}
        <div className="space-y-3">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Column title"
            required
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none"
          />
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            required
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2 text-xs text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Chargement..." : "Créer la colonne"}
        </button>
      </form>
    </div>
  );
}

export default EditColumn;
