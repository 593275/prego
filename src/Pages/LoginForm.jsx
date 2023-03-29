import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth";
import "../css/loginForm.css"


const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);



    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, username + "@prego.com", password);
        const user = auth.currentUser;
        console.log(user.uid)
        if(user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2") {
          navigate("/adminDashboard")
        } else {
          navigate("/dashboard")
        }
      } catch(error) {
        setError("Ugylding brukernavn eller passord")
      }

      
        
       
    };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username: </label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;