import { useEffect, useState } from "react";
import { useSearchPorjects } from "../hooks/useProject";

function SearchProject() {
  const { data, error, loading, handleSearchProject } = useSearchPorjects();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const term = searchTerm.trim();

    if (!term) {
      handleSearchProject("");
      return;
    }

    const timeout = setTimeout(() => {
      handleSearchProject(term);
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm, handleSearchProject]);
  return (
    <section className="h-fit flex flex-col items-center p-6">
      <div className="w-full max-w-xl">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition"
          />
        </div>
        <div className="mt-4">
          {loading && (
            <p className="text-sm text-gray-500 animate-pulse">Searching...</p>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          {!loading && !error && searchTerm && data?.content.length === 0 && (
            <p className="text-sm text-gray-500">No Projects found</p>
          )}
        </div>
      </div>
      <div className="w-full max-w-xl mt-6">
        <ul className="space-y-3">
          {data?.content.map((project) => (
            <li
              key={project.id}
              className="bg-white shadow-sm hover:shadow-md transition
                         rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold text-gray-800">{project.name}</p>
                <p className="text-sm text-gray-500">{project.creatorName}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default SearchProject;
