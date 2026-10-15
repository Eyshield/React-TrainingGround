import { useEffect } from "react";
import { Shield, Plus, Pencil } from "lucide-react";
import { useGetProjectById } from "../hooks/useProject";

function ProjectDetailsHeader({ id }: { id: string }) {
  const { data, error, loading, handleGetProjectById } = useGetProjectById();

  useEffect(() => {
    if (id) {
      handleGetProjectById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-200" />
          <div className="flex-1 space-y-3">
            <div className="h-6 w-2/3 bg-slate-200 rounded" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-white rounded-2xl border border-red-200 p-6">
        <p className="text-sm text-red-600">
          Impossible de charger le projet : {error}
        </p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="flex items-start gap-4 min-w-0">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-teal-700 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">
              {data.name}
            </h1>

            {data.description && (
              <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
                {data.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="flex items-center gap-1.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsHeader;
