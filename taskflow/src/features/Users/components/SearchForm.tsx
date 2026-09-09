import { useEffect, useState } from "react";
import { useSearchUser } from "../hooks/useUser";
import type { UserResponse } from "../../../entities/UserResponse";

interface SearchUserProps {
  onSelect?: (user: UserResponse) => void;
}

function SearchForm({ onSelect }: SearchUserProps) {
  const { data, error, loading, handleSearchUser } = useSearchUser();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const term = searchTerm.trim();

    const timeout = setTimeout(() => {
      handleSearchUser(term);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, handleSearchUser]);

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Rechercher un utilisateur..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5
                   text-sm bg-gray-50
                   focus:outline-none focus:border-indigo-400
                   focus:ring-2 focus:ring-indigo-100 transition"
      />

      {loading && (
        <p className="mt-2 text-xs text-gray-500 animate-pulse">Recherche...</p>
      )}

      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

      {!loading && !error && searchTerm && data?.content.length === 0 && (
        <p className="mt-2 text-xs text-gray-500">Aucun utilisateur trouvé.</p>
      )}

      <div className="mt-2 border border-gray-200 rounded-lg overflow-hidden">
        {data?.content.map((user) => (
          <button
            type="button"
            key={user.id}
            onClick={() => onSelect?.(user)}
            className="w-full text-left px-4 py-3
                         hover:bg-gray-50 transition
                         border-b last:border-b-0"
          >
            <p className="text-sm font-medium text-gray-800">{user.username}</p>

            <p className="text-xs text-gray-500">{user.email}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;
