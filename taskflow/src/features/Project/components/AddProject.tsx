import { useEffect, useState } from "react";
import { useAddProject } from "../hooks/useProject";
import { useSearchUser } from "../../Users/hooks/useUser";
import type { UserResponse } from "../../../entities/UserResponse";

interface AddProjectProps {
  onSuccess?: () => void;
  onClose?: () => void;
}
interface FormData {
  name: string;
  description: string;
  userId: string;
}

const INITIAL_FORM: FormData = {
  name: "",
  description: "",
  userId: "",
};
function AddProject({ onClose, onSuccess }: AddProjectProps) {
  const {
    data: usersData,
    error: userError,
    loading: userLoading,
    handleSearchUser,
  } = useSearchUser();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    handleAddProject,
    loading: addLoading,
    error: addError,
  } = useAddProject();
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [success, setSuccess] = useState("");

  const isSubmitting = addLoading;

  useEffect(() => {
    if (searchTerm.trim() === "") return;
    handleSearchUser(searchTerm);
  }, [searchTerm, handleSearchUser]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess("");

    await handleAddProject(form);
    setForm(INITIAL_FORM);
    setSuccess("Projet créé");

    onSuccess?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-7 rounded-xl shadow-lg border border-gray-100 space-y-4"
      >
        <div className="flex justify-between">
          <h2 className="text-sm font-medium text-gray-900">Créer un Projet</h2>
          <button
            type="button"
            onClick={onClose}
            className="border rounded-lg py-1 px-2 text-sm text-white bg-red-500 hover:bg-red-600"
          >
            close
          </button>
        </div>

        <div className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Project Name"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          <input
            name="searchTerm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search users"
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-gray-200 bg-gray-50 placeholder:text-gray-400 text-gray-800 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
          />

          {userLoading && (
            <p className="text-sm text-gray-500 animate-pulse">Searching...</p>
          )}

          {userError && <p className="text-sm text-red-500">{userError}</p>}

          {!userLoading &&
            !userError &&
            searchTerm &&
            usersData?.content.length === 0 && (
              <p className="text-sm text-gray-500">No users found</p>
            )}
        </div>

        <div className="w-full max-w-xl mt-6">
          <ul className="space-y-3">
            {usersData?.content.map((user: UserResponse) => (
              <li
                key={user.id}
                onClick={() =>
                  setForm((p) => ({ ...p, userId: String(user.id) }))
                }
                className="bg-white shadow-sm hover:shadow-md transition rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-gray-800">{user.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {addError && (
          <p className="px-3.5 py-2 rounded-lg bg-red-50 border border-red-100 text-xs text-red-500">
            {addError}
          </p>
        )}

        {success && (
          <p className="px-3.5 py-2 rounded-lg bg-green-50 border border-green-100 text-xs text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Chargement..." : "Créer projet"}
        </button>
      </form>
    </div>
  );
}
export default AddProject;
