import React from "react";
import theme from "../styles/theme";
import Link from "next/link";
import { Button } from "./Button";
import { signOutWithGoogle } from "../lib/firebase";

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
          <Button onClickFunction={signOutWithGoogle}>Sign Out</Button>
          <Button onClickFunction={addTestRecipe} customLeft="8rem">
            Test Data
          </Button>
          <Button onClickFunction={populateFromFirebase} customLeft="15rem">
            Firebase
          </Button>
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
