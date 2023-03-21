import React from 'react';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    const side = event.target.textContent;
    console.log(side);
    if(side === "Mors fødeland") {
      navigate("/dashboard")
    } else if (side === "Andre faktorer") {
      navigate("/andrefaktorer");
    } else if (side === "Om PreGO!") {
      navigate("/omprego")
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><a href="#" onClick={handleClick}>Mors fødeland</a></li>
        <li><a href="#" onClick={handleClick}>Andre faktorer</a></li>
        <li><a href="#" onClick={handleClick}>Om PreGO!</a></li>
      </ul>
    </nav>
  );
};


export default Navbar;