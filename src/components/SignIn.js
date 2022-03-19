import React from "react";
import { signInWithGoogle} from "../firebase.js"
import { useNavigate } from "react-router-dom";
import "../css/SignIn.css"

const SignIn = () => {
    let navigate = useNavigate();
    function handleButton() {
      let userPassword = document.getElementById("password").value;
      if (userPassword === process.env.REACT_APP_PASSWORD){
        signInWithGoogle(navigate)
      }
      else if (userPassword === ""){
        alert("Please enter a Password to enter the page")
      }
      else{
        alert("Incorrect password, please enter the correct password and sign in")
      }
      
    }
    return (
    <div className="button-container">
        <div className="middle-centered-container">
          <div className="sign-in-wrapper">
            <h1>Welcome to Recipease</h1>
            <p>Provide the early access password and sign in to get started</p>
            <input className="sign-in-input" type="password" name="password" id="password" placeholder="Password"/>
            <button className="middle-centered" onClick={handleButton}>Sign in with Google</button>
          </div>
        </div>
    </div>
    );
}

export default SignIn;
