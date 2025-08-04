// src/services/authApi.ts
import { saveJwtToken } from './jwtStorage';

const API_URL = import.meta.env.VITE_API_URL;

export async function loginApi(username: string, password: string): Promise<{ token: string }> {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      // Prefer 'error' property from API, fallback to 'message', then default
      throw new Error(error.error || error.message || 'Login failed');
    }
    const data = await response.json();
    if (data.token) {
      saveJwtToken(data.token);
      return { token: data.token };
    } else {
      throw new Error('No token returned');
    }
  } catch (err: any) {
    throw new Error(err.message || 'Network error');
  }
}

export async function registerApi(username: string, password: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { ok: false, error: error.error || error.message || 'Registration failed' };
    }
    return { ok: true };
  } catch (err: any) {
    return { ok: false, error: err.message || 'Network error' };
  }
}
