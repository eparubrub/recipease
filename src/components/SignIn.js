import React from "react";
import { signInWithGoogle} from "../firebase.js"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();
    function handleButton() {
      let userPassword = document.getElementById("passwd").value;
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
        <input placeholder="Password" type="text" id="passwd" name="Password"/>
        <button onClick={handleButton}>
          Sign in with Google
        </button>
    </div>
    );
}

export default SignIn;
