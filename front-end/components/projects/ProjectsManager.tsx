'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
  type Proyecto,
} from '@/lib/projectsApi';
import ProjectForm from './ProjectForm';
import ProjectsList from './ProjectsList';

type FormData = {
  name: string;
  description: string;
  color: string;
};

type ProjectsManagerProps = {
  tituloFormularioNuevo: string;
  tituloFormularioEditar: string;
  subtituloFormulario: string;
  tituloListado: string;
  subtituloListado: string;
  textoCargando: string;
  textoVacio: string;
  textoCrear: string;
  textoActualizar: string;
  textoGuardando: string;
  textoCancelar: string;
  textoEliminar: string;
  textoEditar: string;
  textoConfirmacionEliminar: string;
};

const initialForm: FormData = {
  name: '',
  description: '',
  color: '#6366f1',
};

export default function ProjectsManager({
  tituloFormularioNuevo,
  tituloFormularioEditar,
  subtituloFormulario,
  tituloListado,
  subtituloListado,
  textoCargando,
  textoVacio,
  textoCrear,
  textoActualizar,
  textoGuardando,
  textoCancelar,
  textoEliminar,
  textoEditar,
  textoConfirmacionEliminar,
}: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const tituloFormulario = useMemo(() => {
    return editingId ? tituloFormularioEditar : tituloFormularioNuevo;
  }, [editingId, tituloFormularioEditar, tituloFormularioNuevo]);

  const cargarProyectos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al cargar proyectos');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProyectos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError('El nombre del proyecto es obligatorio');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      if (editingId) {
        await updateProject(editingId, {
          name: form.name,
          description: form.description,
          color: form.color,
        });
      } else {
        await createProject({
          name: form.name,
          description: form.description,
          color: form.color,
        });
      }

      resetForm();
      await cargarProyectos();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al guardar proyecto');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Proyecto) => {
    setEditingId(project.id);
    setForm({
      name: project.name,
      description: project.description || '',
      color: project.color,
    });
  };

  const handleDelete = async (projectId: string) => {
    const confirmar = window.confirm(textoConfirmacionEliminar);

    if (!confirmar) {
      return;
    }

    try {
      setError(null);
      await deleteProject(projectId);
      await cargarProyectos();

      if (editingId === projectId) {
        resetForm();
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error al eliminar proyecto');
      }
    }
  };

  return (
    <div className="space-y-8">
      <ProjectForm
        tituloFormulario={tituloFormulario}
        subtituloFormulario={subtituloFormulario}
        error={error}
        form={form}
        saving={saving}
        editingId={editingId}
        textoCrear={textoCrear}
        textoActualizar={textoActualizar}
        textoGuardando={textoGuardando}
        textoCancelar={textoCancelar}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      <ProjectsList
        projects={projects}
        loading={loading}
        textoCargando={textoCargando}
        textoVacio={textoVacio}
        tituloListado={tituloListado}
        subtituloListado={subtituloListado}
        textoEditar={textoEditar}
        textoEliminar={textoEliminar}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}