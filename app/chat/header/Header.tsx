import React from "react";
import './header.css'

const Header: React.FC<any> = ({ handleClick }) => {
  return (
    <div className="header">
      <h2>Chat Header</h2>
      <button className="close" onClick={handleClick}>x</button>
    </div>
  );
};

export default Header;
