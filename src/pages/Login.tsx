import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Por favor, ingrese usuario y contraseña');
      return;
    }
    login(form.username, form.password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/chat');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-5rem)] w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400">
      {/* Form container */}
      <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6 mt-6">
        <div className="relative">
          <input
            id="login-username"
            type="text"
            className="peer border border-blue-300 focus:border-2 focus:border-blue-600 rounded-2xl px-4 h-14 shadow-md focus:shadow-lg transition w-full placeholder-transparent"
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <label htmlFor="login-username" className="absolute left-4 -top-3 text-blue-700 text-sm font-semibold transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-700">Usuario</label>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type="password"
            className="peer border border-blue-300 focus:border-2 focus:border-blue-600 rounded-2xl px-4 h-14 shadow-md focus:shadow-lg transition w-full placeholder-transparent"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <label htmlFor="login-password" className="absolute left-4 -top-3 text-blue-700 text-sm font-semibold transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-700">Contraseña</label>
        </div>
        {error && <span className="text-red-600 text-sm">{error}</span>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition">Iniciar sesión</button>
      </form>
      <div className="mt-6 text-center text-white mb-6">
        <span>¿No tiene una cuenta? </span>
        <button className="underline font-semibold" onClick={() => navigate('/register')}>Registrarse</button>
      </div>
    </div>
  );
};
export default Login;
