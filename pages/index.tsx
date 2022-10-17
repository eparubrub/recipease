import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../lib/firebase";
import Link from "next/link";
import { Recipe } from "../components/Recipe";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Router from "next/router";
import { signOutWithGoogle } from "../lib/firebase";
import { Navbar } from "../components/Navbar";
import MockRecipe from "../lib/MockRecipe";
import { ref, deleteObject } from "firebase/storage";
import { Button } from "../components/Button";
import theme from "../styles/theme";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState<object>({});

  const addTestRecipe = async () => {
    const sampleRecipe = MockRecipe();
    const newRecipes = JSON.parse(JSON.stringify(recipes));
    newRecipes[sampleRecipe.id] = sampleRecipe;
    setRecipes(newRecipes);
  };

  const deleteRecipeImage = (imgPath) => {
    return new Promise<void>((resolve, reject) => {
      const newImageRef = ref(storage, imgPath);
      deleteObject(newImageRef)
        .then(() => {
          // console.log("Deleted image at " + imgPath + " successfully")
          resolve();
        })
        .catch((error) => {
          console.error("Image delete failed", error);
          alert("Image delete failed");
          reject("Upload failed");
        });
    });
  };

  const deleteRecipe = async (id, imgSmallPath, imgBigPath) => {
    // if it's not testdata
    if (!imgSmallPath.startsWith("/images")) {
      await deleteRecipeImage(imgSmallPath);
      await deleteRecipeImage(imgBigPath);
      await deleteDoc(doc(db, "recipes", id));
    }
    const newRecipes = JSON.parse(JSON.stringify(recipes));
    delete newRecipes[id];
    setRecipes(newRecipes);
  };

  const populateFromFirebase = async () => {
    const recipesData = await getDocs(collection(db, "recipes"));
    const tempRecipes = {};
    for (let i = 0; i < recipesData.docs.length; i++) {
      let docId = recipesData.docs[i].id;
      tempRecipes[docId] = { ...recipesData.docs[i].data(), id: docId };
    }
    setRecipes(tempRecipes);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("user") && auth) {
      Router.push("/sign-in");
    }
    if (process.env.REACT_APP_DEV_OR_ENV !== "dev") {
      populateFromFirebase();
    }
    const user = sessionStorage.getItem("user");
  });

  return (
    <>
      <div>
        <Navbar pageName="All Recipes">
          <Button onClickFunction={signOutWithGoogle}>Sign Out</Button>
          <Button onClickFunction={addTestRecipe} customLeft="8rem">
            Test Data
          </Button>
          <Button onClickFunction={populateFromFirebase} customLeft="15rem">
            Firebase
          </Button>
          <Link href="/add-recipe">
            <img
              className="navbar-add-recipe"
              src={"/images/add-recipe.png"}
              alt="add recipe icon"
            />
          </Link>
        </Navbar>
        <div className="middle-centered-container">
          <div className="all-recipes-middle-wrapper">
            {Object.keys(recipes).map((key) => (
              <Recipe
                id={key}
                details={recipes[key]}
                deleteRecipe={deleteRecipe}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        img {
          height: 40%;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 1.25rem;
          position: absolute;
          cursor: pointer;
        }

        .all-recipes-middle-wrapper {
          display: flex;
          width: 90%;
          height: auto;
          flex-flow: row wrap;
          justify-content: center;
        }

        /* Responsive
        ----------------------------- */
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          img {
            height: 30%;
            right: 0.5rem;
          }
          .recipe-input-wrapper {
            width: 25rem;
          }
        }

        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          img {
            height: 30%;
            right: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}
