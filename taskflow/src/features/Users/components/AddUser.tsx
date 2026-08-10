import { useState } from "react";
import { useAddUser } from "../hooks/useUser";
import type { Role } from "../../../entities/User";

interface FormData {
  username: string;
  email: string;
  password: string;
  role?: Role;
}

interface AddUserProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

const ROLES: { value: Role; label: string }[] = [
  { value: "admin", label: "Administrator" },
  { value: "Manager", label: "Manager" },
  { value: "viewer", label: "User" },
];

const INITIAL_FORM: FormData = {
  username: "",
  email: "",
  password: "",
  role: undefined,
};

function AddUser({ onSuccess, onClose }: AddUserProps) {
  const { handleAddUser, loading, error } = useAddUser();

  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [success, setSuccess] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "role" ? value || undefined : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSuccess("");

    await handleAddUser(form);

    setForm(INITIAL_FORM);
    setSuccess("Utilisateur créé");

    onSuccess?.();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 rounded-xl border border-gray-100 bg-white p-7 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium text-gray-900">
            Créer un utilisateur
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-red-500 px-2 py-1 text-sm text-white hover:bg-red-600"
          >
            Fermer
          </button>
        </div>

        <div className="space-y-3">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />

          <select
            name="role"
            value={form.role ?? ""}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm text-gray-800 outline-none transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Sélectionner un rôle</option>

            {ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <p className="rounded-lg border border-red-100 bg-red-50 px-3.5 py-2 text-xs text-red-500">
            {error}
          </p>
        )}

        {success && (
          <p className="rounded-lg border border-green-100 bg-green-50 px-3.5 py-2 text-xs text-green-600">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Chargement..." : "Créer"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
