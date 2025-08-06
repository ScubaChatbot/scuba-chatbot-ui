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
      setError('Please enter username and password');
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
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[50vw] mx-auto h-full flex flex-col justify-center">
      <h2 className="text-2xl font-bold mb-6 text-orange-500">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="relative mb-4">
          <input
            id="login-username"
            type="text"
            className={`peer border border-orange-300 focus:border-2 focus:border-orange-500 rounded-2xl px-4 h-12 shadow-md focus:shadow-lg transition w-full placeholder-transparent`}
            placeholder="Username"
            value={form.username}
            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
            required
          />
          <label htmlFor="login-username" className="absolute left-3 -top-2 text-purple-700 text-xs font-medium transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-700">Username</label>
        </div>
        <div className="relative mb-4">
          <input
            id="login-password"
            type="password"
            className={`peer border border-orange-300 focus:border-2 focus:border-orange-500 rounded-2xl px-4 h-12 shadow-md focus:shadow-lg transition w-full placeholder-transparent`}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            required
          />
          <label htmlFor="login-password" className="absolute left-3 -top-2 text-purple-700 text-xs font-medium transition-all bg-white px-1 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-purple-700">Password</label>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded font-semibold hover:bg-orange-500 transition cursor-pointer">Login</button>
      </form>
      <div className="mt-4 text-center">
        <span>Don't have an account? </span>
        <button className="text-orange-500 underline cursor-pointer" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  );
};
export default Login;
