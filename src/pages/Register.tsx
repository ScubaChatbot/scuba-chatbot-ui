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
      setError('Please enter username and password');
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
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-[50vw] mx-auto" style={{ marginTop: '15%' }}>
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <label className="text-sm font-medium text-purple-700" htmlFor="register-username">Username</label>
        <input id="register-username" type="text" placeholder="Username" className="border rounded-2xl px-4 py-5 shadow-md focus:shadow-lg transition" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
        <label className="text-sm font-medium text-purple-700" htmlFor="register-password">Password</label>
        <input id="register-password" type="password" placeholder="Password" className="border rounded-2xl px-4 py-5 shadow-md focus:shadow-lg transition" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button type="submit" className="bg-purple-700 text-white px-4 py-2 rounded font-semibold hover:bg-purple-800 transition">Register</button>
      </form>
      <div className="mt-4 text-center">
        <span>Already have an account? </span>
        <button className="text-purple-700 underline" onClick={() => navigate('/')}>Login</button>
      </div>
    </div>
  );
};
export default Register;
