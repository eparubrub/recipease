import React from "react";
import { db, storage } from "../lib/firebase";
import Link from "next/link";
import { Recipe } from "../components/Recipe";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
// import '../styles/recipe.css';
// import '../styles/AllRecipes.css';
import Router from "next/router";
import { signOutWithGoogle } from "../lib/firebase";
import { Navbar } from "../components/Navbar";
import MockRecipe from "../lib/MockRecipe";
import { ref, deleteObject } from "firebase/storage";

class AllRecipes extends React.Component {
  state = {
    recipes: {},
  };

  addTestRecipe = async () => {
    const sampleRecipe = MockRecipe();
    const recipes = { ...this.state.recipes };
    recipes[sampleRecipe.id] = sampleRecipe;
    this.setState({ recipes });
  };

  deleteRecipeImage = (imgPath) => {
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

  deleteRecipe = async (id, imgSmallPath, imgBigPath) => {
    await this.deleteRecipeImage(imgSmallPath);
    await this.deleteRecipeImage(imgBigPath);
    await deleteDoc(doc(db, "recipes", id));
    const recipes = { ...this.state.recipes };
    delete recipes[id];
    this.setState({ recipes });
  };

  populateFromFirebase = async () => {
    const recipesData = await getDocs(collection(db, "recipes"));
    const tempRecipes = {};
    for (let i = 0; i < recipesData.docs.length; i++) {
      let docId = recipesData.docs[i].id;
      tempRecipes[docId] = { ...recipesData.docs[i].data(), id: docId };
    }
    this.setState({
      recipes: tempRecipes,
    });
  };

  componentDidMount = async () => {
    if (process.env.REACT_APP_DEV_OR_ENV !== "dev") {
      this.populateFromFirebase();
    }
    const user = sessionStorage.getItem("user");
    // if (!user) {
    //   Router.push("/sign-in");
    // }
  };

  render() {
    return (
      <>
        <div>
          <Navbar
            populateFromFirebase={this.populateFromFirebase}
            addTestRecipe={this.addTestRecipe}
          />
          <div className="middle-centered-container">
            <div className="all-recipes-middle-wrapper">
              {Object.keys(this.state.recipes).map((key) => (
                <Recipe
                  id={key}
                  details={this.state.recipes[key]}
                  deleteRecipe={this.deleteRecipe}
                />
              ))}
            </div>
          </div>
        </div>
        <style jsx>{`
          .recipe-container-small {
            height: 200px;
            width: 550px;
            min-height: 200px;
            min-width: 550px;
            border-radius: 20px;
            border: 3.5px solid var(--color-brand);
            margin: 10px;
            display: flex;
            /* justify-content: center; */
            flex-direction: column;
            position: relative;
          }

          .recipe-image {
            height: 180px;
            width: 180px;
            position: absolute;
            left: 0px;
            top: 0px;
            padding: 10px;
            border-radius: 16px 0px 0px 16px; /* top left, top right, bottom right, bottom left */
            border-right: 5px solid var(--color-brand);
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }

          .recipe-data-container {
            /* display: flex;
          flex-direction:column; */
            position: absolute;
            width: 325px;
            height: 100%;
            right: 10px;
          }

          .recipe-title {
            margin-top: 7px;
            margin-bottom: 0px;
          }

          .recipe-split-columns {
            display: flex;
          }

          .recipe-column {
            flex: 50%;
            margin-left: 10px;
          }

          .recipe-icon {
            width: 25px;
            height: 25px;
            position: relative;
            top: 5px;
          }

          .recipe-text-small {
            font-size: 1em;
            position: relative;
            left: 10px;
            display: inline-block;
          }

          .recipeDelete {
            border-radius: 20px;
            border-style: solid;
            border-color: var(--color-brand);
            background-color: var(--color-brand);
            margin: auto;
            position: absolute;
            text-align: center;
            font-weight: 400;
            font-size: 0.8em;
            color: var(--color-white);
            display: flex;
            font-family: "Nunito";
            flex-direction: column;
            justify-content: center;
          }

          @media screen and (max-width: 1150px) {
          }

          @media screen and (max-width: 800px) {
            .recipe-container-small {
              height: 100px;
              width: 275px;
              min-height: 100px;
              min-width: 275px;
            }
            .recipe-image {
              height: 90px;
              width: 90px;
              padding: 5px;
              border-radius: 15px 0px 0px 15px;
              border-right: 2.5px solid var(--color-brand);
            }

            .recipe-data-container {
              width: 162.5px;
              height: 100%;
              right: 5px;
              border-radius: 0px 15px 15px 0px;
            }

            .recipe-title {
              font-size: 0.8em;
              margin-top: 3.5px;
              margin-bottom: 0px;
            }

            .recipe-column {
              margin-left: 5px;
            }

            .recipe-icon {
              width: 12.5px;
              height: 12.5px;
              top: 2.5px;
            }

            .recipe-text-small {
              font-size: 0.5em;
              left: 5px;
            }

            .recipeDelete {
              font-size: 0.5em;
              border-radius: 20px;
            }
          }
          .all-recipes-middle-wrapper {
            display: flex;
            width: 90%;
            height: auto;
            flex-flow: row wrap;
            justify-content: center;
            /* border: 2px dashed red; */
          }

          .firebase-button {
            left: 125px;
          }

          .testdata-button {
            left: 230px;
          }

          /* Responsive
        ----------------------------- */
          @media screen and (max-width: 1150px) {
            .recipe-input-wrapper {
              width: 400px;
            }
          }

          @media screen and (max-width: 800px) {
            .firebase-button {
              left: 80px;
            }
            .testdata-button {
              left: 150px;
            }
          }
        `}</style>
      </>
    );
  }
}

export default AllRecipes;
