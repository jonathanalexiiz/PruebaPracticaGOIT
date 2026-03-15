'use client';

import type { Proyecto } from '@/lib/projectsApi';
import ProjectCard from './ProjectCard';

type ProjectsListProps = {
  projects: Proyecto[];
  loading: boolean;
  textoCargando: string;
  textoVacio: string;
  tituloListado: string;
  subtituloListado: string;
  textoEditar: string;
  textoEliminar: string;
  onEdit: (project: Proyecto) => void;
  onDelete: (projectId: string) => void;
};

export default function ProjectsList({
  projects,
  loading,
  textoCargando,
  textoVacio,
  tituloListado,
  subtituloListado,
  textoEditar,
  textoEliminar,
  onEdit,
  onDelete,
}: ProjectsListProps) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{tituloListado}</h2>
        <p className="mt-1 text-sm text-gray-500">{subtituloListado}</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
          {textoCargando}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center text-gray-500 shadow-sm">
          {textoVacio}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              textoEditar={textoEditar}
              textoEliminar={textoEliminar}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}