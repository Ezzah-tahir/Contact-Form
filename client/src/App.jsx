import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';


function Protected({role, children}){
 const user = JSON.parse(localStorage.getItem("user"));
  return user && user.role === role? children : <Navigate to= "/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/:role" element={<Auth />} />
        <Route path="/user" element={<Protected role="user"><UserPage /></Protected>} />
        <Route path="/admin" element={<Protected role="admin"><AdminPage /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
