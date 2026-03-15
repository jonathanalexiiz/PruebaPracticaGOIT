const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/projects`;

type Proyecto = {
  id: string;
  name: string;
  description?: string | null;
  color: string;
  totalTasks: number;
  tasksByStatus: {
    pending: number;
    inProgress: number;
    completed: number;
  };
};

type ProyectoPayload = {
  name: string;
  description?: string;
  color: string;
};

function getAuthHeaders() {
  const token = localStorage.getItem('access_token');

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function getProjects(): Promise<Proyecto[]> {
  const response = await fetch(API_URL, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al obtener proyectos');
  }

  return data;
}

export async function createProject(
  payload: ProyectoPayload,
): Promise<Proyecto> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al crear proyecto');
  }

  return data;
}

export async function updateProject(
  projectId: string,
  payload: ProyectoPayload,
): Promise<Proyecto> {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Error al actualizar proyecto');
  }

  return data;
}

export async function deleteProject(projectId: string): Promise<void> {
  const response = await fetch(`${API_URL}/${projectId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Error al eliminar proyecto');
  }
}

export type { Proyecto, ProyectoPayload };