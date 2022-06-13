import React from "react";
import { signInWithGoogle } from "../lib/firebase.tsx";
// import "../css/SignIn.css"

const SignIn = () => {
  function handleButton() {
    let userPassword = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (userPassword === process.env.REACT_APP_PASSWORD) {
      signInWithGoogle;
    } else if (userPassword === "") {
      alert("Please enter a Password to enter the page");
    } else {
      alert(
        "Incorrect password, please enter the correct password and sign in"
      );
    }
  }
  return (
    <div className="button-container">
      <div style={{ position: "fixed" }} className="middle-centered-container">
        <div className="sign-in-wrapper">
          <h1>Welcome to Recipease</h1>
          <p>Provide the early access password and sign in to get started</p>
          <input
            className="sign-in-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button className="middle-centered" onClick={handleButton}>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
