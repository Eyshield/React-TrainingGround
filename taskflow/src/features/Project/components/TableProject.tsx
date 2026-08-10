import { useEffect, useState } from "react";
import { useDeleteProject, useGetAllPorjects } from "../hooks/useProject";
import AddProject from "./AddProject";

function TableProject() {
  const [showAddProject, setShowAddProject] = useState(false);

  const { data, error, loading, handleGetAllProjects } = useGetAllPorjects();

  const {
    success: deletingSuccess,
    error: deletingError,
    loading: deletingLoading,
    handleDeleteProject,
  } = useDeleteProject();

  useEffect(() => {
    handleGetAllProjects(0, 10);
  }, [handleGetAllProjects]);

  useEffect(() => {
    if (deletingSuccess && data) {
      const currentPage = data.page;
      const isLastItemOnPage = data.content.length === 1;
      const targetPage =
        isLastItemOnPage && currentPage > 0 ? currentPage - 1 : currentPage;
      handleGetAllProjects(targetPage, 10);
    }
  }, [deletingSuccess, data, handleGetAllProjects]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-sm text-gray-500">Chargement...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-sm text-red-500">Erreur : {error}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full px-4 py-6">
      {deletingError && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
          Erreur : {deletingError}
        </div>
      )}
      {deletingSuccess && (
        <div className="mb-4 px-4 py-2.5 rounded-lg bg-green-50 border border-green-200 text-sm text-green-600">
          Projet supprimé avec succès.
        </div>
      )}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-medium text-gray-700">Projets</h2>
        <button
          onClick={() => setShowAddProject(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded-lg
                     bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <span className="text-base leading-none">+</span>
          Ajouter
        </button>
      </div>

      {showAddProject && (
        <AddProject
          onClose={() => setShowAddProject(false)}
          onSuccess={() => handleGetAllProjects(data?.page ?? 0, 10)}
        />
      )}

      {!data || data.content.length === 0 ? (
        <div className="flex justify-center items-center h-40 rounded-xl border border-gray-100 bg-gray-50">
          <span className="text-sm text-gray-400">Aucun projet trouvé</span>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {["ID", "Name", "Creator name", "Created at", "Actions"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.content.map((projectResponse) => (
                  <tr
                    key={projectResponse.id}
                    className="bg-white hover:bg-gray-50/70 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">
                      #{projectResponse.id}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {projectResponse.name}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {projectResponse.creatorName}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {projectResponse.created_At.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            console.log("edit", projectResponse.id)
                          }
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-gray-200
                                     text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        >
                          Éditer
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteProject(projectResponse.id!)
                          }
                          disabled={deletingLoading}
                          className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-100
                                     text-red-500 hover:bg-red-50 hover:border-red-200 transition-colors
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingLoading ? "..." : "Supprimer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4 px-1">
            <button
              disabled={data.isFirst}
              onClick={() => handleGetAllProjects(data.page - 1, 10)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg
                         border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Précédent
            </button>

            <span className="text-xs text-gray-400">
              Page{" "}
              <span className="font-medium text-gray-600">{data.page + 1}</span>
              {" / "}
              <span className="font-medium text-gray-600">
                {data.totalPages}
              </span>
            </span>

            <button
              disabled={data.isLast}
              onClick={() => handleGetAllProjects(data.page + 1, 10)}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg
                         border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors
                         disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Suivant →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TableProject;
