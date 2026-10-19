import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [message, setMessage] = useState('');
  const [msgs, setMsgs] = useState([]);

  const load = () =>
    fetch(`http://localhost:5000/messages?email=${user.email}`)
      .then(r => r.json()).then(setMsgs);

  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch('http://localhost:5000/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: user.name, email: user.email, message })
    });
    setMessage('');
    load();
  };

  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <div className="page">
      <div className="top">
        <h3>Welcome, {user.name}</h3>
        <button onClick={logout}>Logout</button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea placeholder="Your message" value={message} onChange={e => setMessage(e.target.value)} required />
        <button type="submit">Send</button>
      </form>
      <h4>My Messages</h4>
      {msgs.map(m => <p key={m._id}>{m.message}</p>)}
    </div>
  );
}

export default UserPage;
