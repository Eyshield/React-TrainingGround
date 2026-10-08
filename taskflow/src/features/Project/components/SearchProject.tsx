import { useEffect, useState } from "react";
import type { ProjectResponse } from "../../../entities/ProjectResponse";
import { useSearchPorjects } from "../hooks/useProject";

interface SearchUserProps {
  onSelect?: (user: ProjectResponse) => void;
}

function SearchProject({ onSelect }: SearchUserProps) {
  const { data, error, loading, handleSearchProject } = useSearchPorjects();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const term = searchTerm.trim();

    const timeout = setTimeout(() => {
      handleSearchProject(term);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, handleSearchProject]);

  return (
    <section className="w-full flex items-center justify-center pt-4 ">
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Rechercher un projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5
                   text-sm bg-gray-50
                   focus:outline-none focus:border-indigo-400
                   focus:ring-2 focus:ring-indigo-100 transition"
        />

        {loading && (
          <p className="mt-2 text-xs text-gray-500 animate-pulse">
            Recherche...
          </p>
        )}

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}

        {!loading && !error && searchTerm && data?.content.length === 0 && (
          <p className="mt-2 text-xs text-gray-500">Aucun Projet trouvé.</p>
        )}

        <div className="mt-2 border-transparent rounded-lg overflow-hidden">
          {data?.content.map((project) => (
            <button
              type="button"
              key={project.id}
              onClick={() => {
                setSearchTerm(project.name ?? "");
                onSelect?.(project);
              }}
              className="w-full text-left px-4 py-3
                         hover:bg-gray-50 transition
                         border-b last:border-b-0"
            >
              <p className="text-sm font-medium text-gray-800">
                {project.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export default SearchProject;
