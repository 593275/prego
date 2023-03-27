import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from "../config/firebase-config"
import { getDoc, doc, collection, onSnapshot } from "firebase/firestore";
import "../css/loginForm.css"

const LoginForm = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(
    () => 
      onSnapshot(collection(db, "Users"), (snapshot) => 
        setUsers(snapshot.docs.map(doc => ({...doc.data()})))
      ),
    []
    );

    const handleSubmit = (e) => {
      e.preventDefault();
     console.log(users)
      const user = users.find((u) => u.Username === username && u.Password === password);
      if (user) {
        if (user.username === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError("Invalid username or password");
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