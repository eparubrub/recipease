import React from "react";
import theme from "../styles/theme";
import { signInWithGoogle } from "../lib/firebase";

const SignIn = () => {
  function handleButton() {
    let userPassword = (document.getElementById("password") as HTMLInputElement)
      .value;
    if (userPassword === process.env.REACT_APP_PASSWORD) {
      signInWithGoogle();
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
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button onClick={handleButton}>Sign in with Google</button>
        </div>
      </div>
      <style jsx>{`
        h1 {
          font-size: 2.5rem;
        }
        input {
          color: ${theme.color.brand.base};
          border-style: solid;
          border-color: ${theme.color.brand.base};
          width: 25rem;
          height: 2.5rem;
          border-radius: 0.6rem;
          margin: 0.6rem;
          font-size: 1rem;
          border-width: 0.15rem;
        }
        button {
          color: ${theme.color.background.white};
          border-style: solid;
          border-color: ${theme.color.brand.base};
          background-color: ${theme.color.brand.base};
          width: 11.2rem;
          height: 2.5rem;
          border-radius: 0.6rem;
          margin: 0.6rem;
          font-size: 0.9rem;
        }
        .sign-in-wrapper {
          width: 38rem;
          height: 25rem;
          font-size: 1rem;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          h1 {
            font-size: 1.7rem;
          }
          p {
            font-size: 0.8rem;
          }
          input {
            width: 18.75rem;
            height: 1.9rem;
            border-radius: 0.5rem;
            margin: 0.5rem;
            font-size: 0.9rem;
          }
          button {
            width: 8rem;
            height: 1.9rem;
            border-radius: 0.5rem;
            margin: 0.5rem;
            font-size: 0.7em;
          }
          .sign-in-wrapper {
            width: 25rem;
            height: 18.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default SignIn;
