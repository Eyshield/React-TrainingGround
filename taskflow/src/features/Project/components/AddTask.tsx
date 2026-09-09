import React, { useState } from "react";

import type { TaskResponse } from "../../../entities/TaskResponse";
import type { TaskRequest } from "../../../entities/TaskRequest";

import { addTask } from "../services/TaskServices";
import type { UserResponse } from "../../../entities/UserResponse";
import SearchForm from "../../Users/components/SearchForm";

interface AddTaskProps {
  onSuccess?: () => void;
  onClose?: () => void;
  projectId: string;
}

interface FormData {
  title: string;
  description: string;
  priority: string;
  userId: string;
  projectId: string;
  columnId: string;
}

const INITIAL_FORM: FormData = {
  title: "",
  description: "",
  priority: "",
  userId: "",
  projectId: "",
  columnId: "",
};

const useAddTask = () => {
  const [data, setData] = useState<TaskResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleAddTask = async (taskRequest: TaskRequest) => {
    setLoading(true);
    setError(null);

    try {
      const response = await addTask(taskRequest);

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
    handleAddTask,
  };
};

function AddTask({ projectId, onClose, onSuccess }: AddTaskProps) {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  const {
    error: addError,
    loading: isSubmitting,
    handleAddTask,
  } = useAddTask();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim()) {
      return;
    }

    if (!form.userId) {
      return;
    }

    if (!form.projectId) {
      return;
    }

    if (!form.columnId) {
      return;
    }

    const taskRequest: TaskRequest = {
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      userId: form.userId,
      projectId: projectId,
      columnId: form.columnId,
    };

    try {
      await handleAddTask(taskRequest);

      onSuccess?.();

      setForm(INITIAL_FORM);
      setSelectedUser(null);
    } catch {
      // L'erreur est déjà gérée par useAddTask
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white p-7 rounded-xl shadow-lg border border-gray-100 space-y-5"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Créer une tâche
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Ajoutez une nouvelle tâche à votre projet.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
          >
            Fermer
          </button>
        </div>
        {/* TITLE */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Titre
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Ex: Implement authentication"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
        </div>
        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Décrivez la tâche..."
            rows={4}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
          />
        </div>
        {/* PRIORITY */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Priorité
          </label>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Sélectionner une priorité</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        {/* USER */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Utilisateur
          </label>

          {selectedUser ? (
            <div className="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-3">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {selectedUser.username}
                </p>

                <p className="text-xs text-gray-500">Utilisateur sélectionné</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedUser(null);
                  setForm((prev) => ({
                    ...prev,
                    userId: "",
                  }));
                }}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Modifier
              </button>
            </div>
          ) : (
            <SearchForm
              onSelect={(user) => {
                setSelectedUser(user);

                setForm((prev) => ({
                  ...prev,
                  userId: String(user.id),
                }));
              }}
            />
          )}
        </div>

        {addError && (
          <p className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-500">
            {addError}
          </p>
        )}
        <button
          type="submit"
          disabled={
            isSubmitting ||
            !form.title.trim() ||
            !form.userId ||
            !form.projectId ||
            !form.columnId
          }
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Création..." : "Créer la tâche"}
        </button>
      </form>
    </div>
  );
}

export default AddTask;
