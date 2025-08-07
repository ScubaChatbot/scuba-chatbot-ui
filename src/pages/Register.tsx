import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/authContext';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Por favor, ingrese usuario y contraseña');
      return;
    }
    const result = register(form.username, form.password);
    if (result && typeof result.then === 'function') {
      result.then((res: any) => {
        if (res && res.ok) {
          navigate('/');
        }
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-br from-blue-200 to-blue-400">

      {/* Form container */}
      <form onSubmit={handleRegister} className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md flex flex-col gap-6 mt-6">
        <div className="relative">
          <input
            id="register-username"
            type="text"
            className="peer border border-blue-300 focus:border-2 focus:border-blue-600 rounded-2xl px-4 h-14 shadow-md focus:shadow-lg transition w-full placeholder-transparent"
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <label htmlFor="register-username" className="absolute left-4 -top-3 text-blue-700 text-sm font-semibold transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-700">Usuario</label>
        </div>
        <div className="relative">
          <input
            id="register-password"
            type="password"
            className="peer border border-blue-300 focus:border-2 focus:border-blue-600 rounded-2xl px-4 h-14 shadow-md focus:shadow-lg transition w-full placeholder-transparent"
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <label htmlFor="register-password" className="absolute left-4 -top-3 text-blue-700 text-sm font-semibold transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-sm peer-focus:text-blue-700">Contraseña</label>
        </div>
        {error && <span className="text-red-600 text-sm">{error}</span>}
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition">Registrarse</button>
      </form>
      <div className="mt-6 text-center text-white mb-6">
        <span>¿Ya tienes una cuenta?&nbsp;</span>
        <button className="underline font-semibold" onClick={() => navigate('/')}>Iniciar sesión</button>
      </div>
    </div>
  );
};
export default Register;
