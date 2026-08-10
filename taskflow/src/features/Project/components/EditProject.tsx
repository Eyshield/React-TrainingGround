import { useEffect, useState } from "react";
import { useSearchUser } from "../../Users/hooks/useUser";
import { useGetProjectById, useUpdateProject } from "../hooks/useProject";
import type { UserResponse } from "../../../entities/UserResponse";

interface EditProjectProps {
  onSuccess?: () => void;
  onClose?: () => void;
  id: string;
}

interface FormData {
  name: string;
  description: string;
  userId: string;
  creatorName: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  description: "",
  userId: "",
  creatorName: "",
};

function EditProject({ onClose, onSuccess, id }: EditProjectProps) {
  const {
    data: usersData,
    error: userError,
    loading: userLoading,
    handleSearchUser,
  } = useSearchUser();
  const [searchTerm, setSearchTerm] = useState("");
  const {
    handleGetProjectById,
    data,
    loading: getLoading,
    error: getError,
  } = useGetProjectById();
  const {
    handleUpdateProject,
    loading: editLoading,
    error: editError,
  } = useUpdateProject();

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (id) handleGetProjectById(id);
  }, [id]);

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        description: data.description,
        userId: "",
        creatorName: data.creatorName,
      });
    }
  }, [data]);

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    const timer = setTimeout(() => handleSearchUser(searchTerm), 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");

    const { creatorName, ...payload } = form;
    await handleUpdateProject(id, payload);
    if (!editError) {
      setForm(INITIAL_FORM);
      setSuccess("Projet mis à jour");
      onSuccess?.();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-7 rounded-xl shadow-lg border border-gray-100 space-y-4"
      >
        <div className="flex justify-between items-center">
          <h2 className="text-sm font-medium text-gray-900">
            Mettre à jour un Projet
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="border rounded-lg py-1 px-2 text-sm text-white bg-red-500 hover:bg-red-600"
          >
            Fermer
          </button>
        </div>

        {getLoading && (
          <p className="px-3.5 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-500 animate-pulse">
            Chargement du projet...
          </p>
        )}
        {getError && (
          <p className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-500">
            {getError}
          </p>
        )}

        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nom du projet"
            required
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          {form.creatorName && (
            <p className="text-xs text-gray-400">
              Créateur actuel :{" "}
              <span className="text-gray-600 font-medium">
                {form.creatorName}
              </span>
            </p>
          )}

          <input
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un utilisateur..."
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          {userLoading && (
            <p className="text-sm text-gray-500 animate-pulse">Recherche...</p>
          )}
          {userError && <p className="text-sm text-red-500">{userError}</p>}
          {!userLoading &&
            !userError &&
            searchTerm &&
            usersData?.content.length === 0 && (
              <p className="text-sm text-gray-500">Aucun utilisateur trouvé</p>
            )}
        </div>

        {usersData?.content && usersData.content.length > 0 && (
          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {usersData.content.map((user: UserResponse) => (
              <li
                key={user.id}
                onClick={() =>
                  setForm((p) => ({ ...p, userId: String(user.id) }))
                }
                className={`cursor-pointer rounded-xl p-3 flex justify-between items-center border transition-all ${
                  form.userId === String(user.id)
                    ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-100"
                    : "border-gray-100 bg-white hover:shadow-sm"
                }`}
              >
                <p className="text-sm font-medium text-gray-800">
                  {user.username}
                </p>
                {form.userId === String(user.id) && (
                  <span className="text-xs text-indigo-600 font-semibold">
                    ✓
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}

        {editError && (
          <p className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-500">
            {editError}
          </p>
        )}
        {success && (
          <p className="px-3.5 py-2 rounded-lg bg-green-50 border border-green-100 text-xs text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={editLoading || getLoading}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {editLoading ? "Mise à jour..." : "Mettre à jour le projet"}
        </button>
      </form>
    </div>
  );
}

export default EditProject;
