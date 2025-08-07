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
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[50vw] mx-auto h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">Registrarse</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="relative mb-4">
          <input
            id="register-username"
            type="text"
            className={`peer border border-orange-300 focus:border-2 focus:border-orange-500 rounded-2xl px-4 h-12 shadow-md focus:shadow-lg transition w-full placeholder-transparent`}
            placeholder="Usuario"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <label htmlFor="register-username" className="absolute left-3 -top-2 text-purple-700 text-xs font-medium transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-700">Usuario</label>
        </div>
        <div className="relative mb-4">
          <input
            id="register-password"
            type="password"
            className={`peer border border-orange-300 focus:border-2 focus:border-orange-500 rounded-2xl px-4 h-12 shadow-md focus:shadow-lg transition w-full placeholder-transparent`}
            placeholder="Contraseña"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <label htmlFor="register-password" className="absolute left-3 -top-2 text-purple-700 text-xs font-medium transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-700">Contraseña</label>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded font-semibold hover:bg-orange-500 transition">Registrarse</button>
      </form>
      <div className="mt-4 text-center">
        <span>¿Ya tienes una cuenta? </span>
        <button className="text-orange-500 underline" onClick={() => navigate('/')}>Iniciar sesión</button>
      </div>
    </div>
  );
};
export default Register;
