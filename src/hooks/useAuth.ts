import { useState, useEffect } from 'react';
import { useToast } from '../contexts/toastContext';
import { loginApi, registerApi } from '../services/authApi';

import { readJwtToken } from '../services/jwtStorage';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    const token = readJwtToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  async function login(username: string, password: string) {
    try {
      const { token } = await loginApi(username, password);
      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err: any) {
      let message = 'Login failed';
      if (typeof err === 'string') message = err;
      else if (err && typeof err.message === 'string') message = err.message;
      showToast(message, 'error');
    }
  }

  function register(username: string, password: string) {
    return registerApi(username, password).then((result) => {
      if (result.ok) {
        showToast('Registration successful!', 'success');
      } else {
        showToast(result.error || 'Registration failed', 'error');
      }
      return result;
    });
  }

  function logout() {
    setIsAuthenticated(false);
    return true;
  }

  return { isAuthenticated, login, logout, register };
}