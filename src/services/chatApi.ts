// src/services/chatApi.ts
import { readJwtToken } from './jwtStorage';

const API_URL = import.meta.env.VITE_API_URL;

export async function sendChatMessage(message: string): Promise<{ response?: string; error?: string }> {
  const token = readJwtToken();
  if (!token) {
    return { error: 'Not authenticated' };
  }
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ message }),
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      return { error: error.error || error.message || 'Chat request failed' };
    }
    const data = await response.json();
    return { response: data.response };
  } catch (err: any) {
    return { error: err.message || 'Network error' };
  }
}
