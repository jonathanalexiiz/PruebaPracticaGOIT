const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_URL = `${BASE_URL}/auth`;

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
};

type Profile = {
  id: string;
  name: string;
  email: string;
};

function getJsonHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

function getAuthHeaders() {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('access_token')
      : null;

  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function parseResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Ocurrió un error en la solicitud');
  }

  return data;
}

export async function registerUser(
  payload: RegisterPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await parseResponse<AuthResponse>(response);

  return data;
}

export async function loginUser(
  payload: LoginPayload,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  const data = await parseResponse<AuthResponse>(response);

  localStorage.setItem('access_token', data.access_token);

  return data;
}

export async function getProfile(): Promise<Profile> {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });

  const data = await parseResponse<Profile>(response);

  return data;
}

export type { RegisterPayload, LoginPayload, AuthResponse, Profile };