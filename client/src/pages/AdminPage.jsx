import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/messages';

function AdminPage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [msgs, setMsgs] = useState([]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null);

  const load = () => fetch(API).then(r => r.json()).then(setMsgs);

  useEffect(() => { load(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const body = editId ? { message } : { name: user.name, email: user.email, message };
    await fetch(editId ? `${API}/${editId}` : API, {
      method: editId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setMessage('');
    setEditId(null);
    load();
  };

  const edit = m => { setMessage(m.message); setEditId(m._id); };

  const del = async id => {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    load();
  };

  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <div className="page">
      <div className="top">
        <h3>Admin Panel - {user.name}</h3>
        <button onClick={logout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit}>
        <textarea placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
        <button type="submit">{editId ? 'Update' : 'Add'}</button>
      </form>

      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Message</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {msgs.map(m => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.email}</td>
              <td>{m.message}</td>
              <td>
                <button onClick={() => edit(m)}>Edit</button>
                <button onClick={() => del(m._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;