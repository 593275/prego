import React from 'react';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { getAuth } from "firebase/auth";

const Navbar = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  const handleClick = (event) => {
    const knapp = event.target.textContent;
    if(knapp === "Fødeland") {
      if(user.uid === "PEBh74M2IeSVfpey2C4iIsXuifu2") {
        navigate("/admindashboard")
      } else {
        navigate("/dashboard")
      }
    } else if (knapp === "Migrasjonsrelaterte faktorer") {
      navigate("/andrefaktorer");
    } else if (knapp === "Om PreGO!") {
      navigate("/omprego")
    } else if (knapp === "Log ut") {
    
      auth.signOut()
        .then(() => {
          navigate("/")
        })
        .catch((error) => {
          console.log(error)
        });
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><a href="#" onClick={handleClick}>Fødeland</a></li>
        <li><a href="#" onClick={handleClick}>Migrasjonsrelaterte faktorer</a></li>
        <li><a href="#" onClick={handleClick}>Om PreGO!</a></li>
        <li><a href="#" onClick={handleClick}>Log ut</a></li>
      </ul>
    </nav>
  );
};


export default Navbar;