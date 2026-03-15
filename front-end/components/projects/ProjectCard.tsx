'use client';

import type { Proyecto } from '@/lib/projectsApi';

type ProjectCardProps = {
  project: Proyecto;
  textoEditar: string;
  textoEliminar: string;
  onEdit: (project: Proyecto) => void;
  onDelete: (projectId: string) => void;
};

export default function ProjectCard({
  project,
  textoEditar,
  textoEliminar,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div
        className="h-3 w-full"
        style={{ backgroundColor: project.color }}
      />

      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{project.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {project.description || 'Sin descripción'}
            </p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Total tareas</p>
            <p className="mt-1 text-lg font-bold text-gray-800">
              {project.totalTasks}
            </p>
          </div>

          <div className="rounded-xl bg-yellow-50 p-3">
            <p className="text-xs text-yellow-700">Pendientes</p>
            <p className="mt-1 text-lg font-bold text-yellow-800">
              {project.tasksByStatus.pending}
            </p>
          </div>

          <div className="rounded-xl bg-blue-50 p-3">
            <p className="text-xs text-blue-700">En progreso</p>
            <p className="mt-1 text-lg font-bold text-blue-800">
              {project.tasksByStatus.inProgress}
            </p>
          </div>

          <div className="rounded-xl bg-green-50 p-3">
            <p className="text-xs text-green-700">Completadas</p>
            <p className="mt-1 text-lg font-bold text-green-800">
              {project.tasksByStatus.completed}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-black"
          >
            {textoEditar}
          </button>

          <button
            type="button"
            onClick={() => onDelete(project.id)}
            className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-600"
          >
            {textoEliminar}
          </button>
        </div>
      </div>
    </article>
  );
}