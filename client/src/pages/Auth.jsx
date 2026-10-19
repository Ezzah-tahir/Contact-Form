import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Auth() {
  const { role } = useParams();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
  e.preventDefault();
  const res = await fetch(`http://localhost:5000/auth/${isLogin ? 'login' : 'signup'}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...form, role })
  });
  const data = await res.json();
  if (!res.ok) return setError(data.error);

  localStorage.setItem('user', JSON.stringify(data));
  setError('');
  setSuccess(isLogin ? 'Login successful!' : 'Signup successful!');
  setTimeout(() => navigate(`/${role}`), 1000); // 1 second baad dashboard
};

  return (
    <div className="box">
      <h2>{role === 'admin' ? 'Admin' : 'User'} {isLogin ? 'Login' : 'Signup'}</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && <input name="name" placeholder="Name" onChange={handleChange} required />}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p onClick={() => setIsLogin(!isLogin)} className="link">
        {isLogin ? 'No account? Signup' : 'Have an account? Login'}
      </p>
    </div>
  );
}

export default Auth;