import React from 'react';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();

  const handleClick = (event) => {
    const side = event.target.textContent;
    console.log(side);
    if(side === "Fødeland") {
      navigate("/dashboard")
    } else if (side === "Migrasjonsrelaterte faktorer") {
      navigate("/andrefaktorer");
    } else if (side === "Om PreGO!") {
      navigate("/omprego")
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <li><a href="#" onClick={handleClick}>Fødeland</a></li>
        <li><a href="#" onClick={handleClick}>Migrasjonsrelaterte faktorer</a></li>
        <li><a href="#" onClick={handleClick}>Om PreGO!</a></li>
      </ul>
    </nav>
  );
};


export default Navbar;