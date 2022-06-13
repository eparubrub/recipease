import React from "react";
import theme from "../styles/theme";
import Link from "next/link";

const getDevButtons = (populateFromFirebase, addTestRecipe) => {
  if (process.env.REACT_APP_DEV_OR_ENV === "dev") {
    return (
      <>
        <div>
          <button
            className="middle-centered-container firebase-button"
            onClick={populateFromFirebase}
          >
            Firebase
          </button>
          <button
            className="middle-centered-container testdata-button"
            onClick={addTestRecipe}
          >
            Testdata
          </button>
        </div>
        <style jsx>{`
          button {
            border-radius: 20px;
            border-style: solid;
            border-color: ${theme.color.brand.base};
            background-color: ${theme.color.brand.base};
            min-height: 40px;
            height: 40%;
            max-width: 100px;
            width: 30%;
            top: 0;
            bottom: 0;
            left: 20px;
            margin: auto;
            position: absolute;
            text-align: center;
            font-weight: 400;
            font-size: 1.2em;
            color: ${theme.color.background.white};
            display: flex;
            font-family: "Nunito";
            flex-direction: column;
            justify-content: center;
          }
          .navbar-back {
            height: 40%;
            top: 0;
            bottom: 0;
            margin: auto;
            left: 20px;
            position: absolute;
          }
          button:hover {
            border-color: ${theme.color.brand.alt};
            background-color: ${theme.color.brand.alt};
            cursor: pointer;
          }
          @media screen and (max-width: ${theme.layout.breakPoints.small}) {
            button {
              height: 15px;
              width: 70px;
              left: 10px;
              font-weight: 400;
              font-size: 0.9em;
            }
            .navbar-back {
              height: 30%;
              left: 10px;
            }
          }
          .firebase-button {
            left: 125px;
          }
          .testdata-button {
            left: 230px;
          }
        `}</style>
      </>
    );
  }
};

interface NavbarProps {
  populateFromFirebase;
  addTestRecipe;
}

export function Navbar({ populateFromFirebase, addTestRecipe }: NavbarProps) {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-center-text">All Recipes</div>
          {/* <SignOutButton/> */}
          {getDevButtons(populateFromFirebase, addTestRecipe)}
          <Link href="/addRecipe">
            <img
              className="navbar-add-recipe"
              src={"/images/add-recipe.png"}
              alt="add recipe icon"
            />
          </Link>
        </div>
        <div className="navbar-bottom" />
      </div>
      <style jsx>{`
        img {
          height: 40%;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 20px;
          position: absolute;
        }
        .navbar-container {
          height: 10vh;
          position: -webkit-sticky;
          position: sticky;
        }
        .navbar-top {
          background-color: ${theme.color.background.base};
          height: 90%;
          position: relative;
        }
        .navbar-center-text {
          margin: 0;
          position: absolute;
          top: 50%;
          left: 50%;
          -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          font-family: "Nunito";
          font-weight: 600;
          font-size: 2.5em;
          color: ${theme.color.brand.base};
        }
        .navbar-bottom {
          background-color: ${theme.color.brand.base};
          height: 0.6vh;
          bottom: 0px;
        }
        @media screen and (max-width: ${theme.layout
            .breakPoints} max-height: ${theme.layout.breakPoints.small}) {
          img {
            height: 30%;
            right: 10px;
          }
          .navbar-center-text {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
