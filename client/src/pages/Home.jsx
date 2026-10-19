import {useNavigate} from 'react-router-dom';
function Home(){
    const navigate = useNavigate();
   return (
    <div className="box">
      <h2>Welcome</h2>
      <p>Continue as</p>
      <button onClick={() => navigate('/auth/user')}>User</button>
      <button onClick={() => navigate('/auth/admin')}>Admin</button>
    </div>
  );
}

export default Home;