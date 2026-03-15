import ProjectsManager from '@/components/projects/ProjectsManager';

export default function ProjectsPage() {
  return (
    <ProjectsManager
      tituloFormularioNuevo="Nuevo proyecto"
      tituloFormularioEditar="Editar proyecto"
      subtituloFormulario="Crea, edita y administra tus proyectos."
      tituloListado="Mis proyectos"
      subtituloListado="Aquí solo verás los proyectos asociados a tu cuenta."
      textoCargando="Cargando proyectos..."
      textoVacio="Aún no tienes proyectos creados."
      textoCrear="Crear proyecto"
      textoActualizar="Actualizar proyecto"
      textoGuardando="Guardando..."
      textoCancelar="Cancelar edición"
      textoEliminar="Eliminar"
      textoEditar="Editar"
      textoConfirmacionEliminar="¿Seguro que deseas eliminar este proyecto? También se eliminarán sus tareas."
    />
  );
}