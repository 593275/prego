import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from "../config/firebase-config"
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import "../css/loginForm.css"

/**bruker liste
 * Bruker Hei123
 * admin PreGo123
 */
//Login in site for users
const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  if(auth.currentUser != null) {
    signOut(auth).then(() => {

    }).catch((error) => {
      setError("Feil ved logg ut")
    });
  }


    //Handle log in by user with verification by Firebase Auth and redirecting user to corrosponding site
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
    
    <form id ="formLogin" onSubmit={handleSubmit}>
      <div>
        <label id="labelLogin" htmlFor="username">Username: </label>
        <input type="text" id="inputLogin" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label id="labelLogin" htmlFor="password">Password: </label>
        <input type="password" id="inputLogin" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p>{error}</p>}
      <button id="buttonLogin" type="submit">Submit</button>
    </form>
  );
};

export default LoginForm;