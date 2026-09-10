import React, { useState } from "react";
import type { ColumnResponse } from "../../../entities/ColumnResponse";
import { addColumn } from "../services/ColumnService";
import type { ColumnRequest } from "../../../entities/ColumnRequest";
interface AddColumnProps {
  onSuccess?: () => void;
  onClose?: () => void;
  projectId: string;
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

const useAddColumn = () => {
  const [data, setData] = useState<ColumnResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleAddColumn = async (columnRequest: ColumnRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await addColumn(columnRequest);

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
    handleAddColumn,
  };
};
function AddColumn({ onClose, onSuccess, projectId }: AddColumnProps) {
  const { error, loading, handleAddColumn } = useAddColumn();
  const [form, setForm] = useState<FormData>({ ...INITIAL_FORM, projectId });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await handleAddColumn(form);
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
          <h2 className="text-sm font-medium text-gray-900">Créer une colonne</h2>
          <button type="button" onClick={onClose} className="rounded-lg border bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600">
            Fermer
          </button>
        </div>

        <div className="space-y-3">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Column title" required className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none" />
          <input name="position" value={form.position} onChange={handleChange} placeholder="Position" required className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none" />
        </div>

        {error && <p className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2 text-xs text-red-500">{error}</p>}

        <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Chargement..." : "Créer la colonne"}
        </button>
      </form>
    </div>
  );
}


export default AddColumn;
