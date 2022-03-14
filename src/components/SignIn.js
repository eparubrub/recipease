import React from "react";
import { signInWithGoogle} from "../firebase.js"
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    let navigate = useNavigate();
    function handleButton() {
      signInWithGoogle(navigate)
    }
    return (
    <div className="button-container">
        <button onClick={handleButton}>
          Sign in with Google
        </button>
    </div>
    );
}

export default SignIn;
