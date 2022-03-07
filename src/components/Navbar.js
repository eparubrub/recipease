import React from 'react';
import { Link } from "react-router-dom";


function Navbar(centerText, icon = undefined) {
  return (
    <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-center-text">{centerText}</div>
          {(icon === "home") && 
            <Link to="/">
              <img 
                className="navbar-back" 
                src={"/images/back-arrow.png"} 
                alt="back icon"
              />
            </Link>
          }
          {(icon === "addRecipe") && 
            <Link to="/addRecipe">
              <img 
                className="navbar-add-recipe" 
                src={"/images/add-recipe.png"} 
                alt="add recipe icon"
              />
            </Link>
          }
        </div>
        <div className="navbar-bottom"/>
    </div>
  );
}

export default Navbar;
