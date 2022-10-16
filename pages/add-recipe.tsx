import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import Link from "next/link";
import RecipeInputText from "../lib/RecipeInput/RecipeInputText";
import RecipeInputDropdown from "../lib/RecipeInput/RecipeInputDropdown";
import RecipeInputImage from "../lib/RecipeInput/RecipeInputImage";
import RecipeInputSubmit from "../lib/RecipeInput/RecipInputSubmit";
// import "../css/global.css";
// import "../css/AddRecipe.css";

const resizeFile = (file, size) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, // Is the file of the image which will resized.
      size, // Is the maxWidth of the resized new image.
      size, // Is the maxHeight of the resized new image.
      "JPEG", // Is the compressFormat of the resized new image.
      100, // Is the quality of the resized new image.
      0, // Is the degree of clockwise rotation to apply to uploaded image.
      (uri) => {
        // Is the callBack function of the resized new image URI.
        resolve(uri);
      }
    );
  });

export default function AddRecipe() {
  const defaults = require("../lib/data/recipeDefaults.json");
  const [loading, setLoading] = useState<boolean>(false);
  const [cookingTime, setCookingTime] = useState<string>();
  const [cuisine, setCuisine] = useState<string>();
  const [diet, setDiet] = useState<string>();
  const [difficulty, setDifficulty] = useState<string>();
  const [directions, setDirections] = useState<string>();
  const [ingredients, setIngredients] = useState<string>();
  const [ingredientCount, setIngredientCount] = useState<string>();
  const [name, setName] = useState<string>();
  const [img] = useState();

  const setImage = (selectImage) => {
    if (selectImage.target.files[0]) {
      this.setState({ img: selectImage.target.files[0] });
      document.getElementById(
        "choose-file"
      ).innerHTML = `File chosen: ${selectImage.target.files[0].name}`;
    }
  };

  const uploadImage = (size) => {
    return new Promise((resolve, reject) => {
      resizeFile(this.state.img, size).then((newImageUri) => {
        const newImageName = `${this.state.img.name}_${size}x${size}.jpeg`;
        const newImageRef = ref(storage, `/images/${newImageName}`);
        uploadString(newImageRef, newImageUri, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              // console.log("snapshot:", snapshot.ref)
              // console.log('File available at', url);
              const imageInfo = {
                path: snapshot.ref.fullPath,
                url: url,
              };
              resolve(imageInfo);
            });
          })
          .catch((error) => {
            console.error("Upload failed", error);
            alert("Image upload failed");
            reject("Upload failed");
          });
      });
    });
  };

  const resetForm = () => {
    setCookingTime("");
    setCuisine("");
    setDiet("");
    setDifficulty("");
    setDirections("");
    setIngredients("");
    setIngredientCount("");
    setName("");
    setImage(null);
    let inputs = document.getElementsByClassName("recipe-input");
    for (let i = 0; i < inputs.length; i++) {
      let element = inputs[i];
      element.value = "";
    }
    document.getElementById("choose-file").innerHTML = "Choose a file...";
  };

  const createRecipe = async () => {
    this.setLoading(true);
    const image400 = await this.uploadImage(400);
    const image680 = await this.uploadImage(680);
    await addDoc(collection(db, "recipes"), {
      cookingTime: this.state.cookingTime,
      cuisine: this.state.cuisine,
      diet: this.state.diet,
      difficulty: this.state.difficulty,
      directions: this.state.directions,
      ingredients: this.state.ingredients,
      ingredientCount: Number(this.state.ingredientCount),
      name: this.state.name,
      imgSmall: image400,
      imgBig: image680,
      likes: 0,
    })
      .then(
        function (docRef) {
          console.log("Successfully created new recipe with ID", docRef.id);
          setLoading(false);
          resetForm();
          this.props.navigate("/home");
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div>
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-center-text">Add Recipe</div>
          <Link href="/">
            <img
              src={"/images/back-arrow.png"}
              className="navbar-back"
              alt="back icon"
            />
          </Link>
        </div>
        <div className="navbar-bottom" />
      </div>
      <div
        className="middle-centered-container"
        style={{ paddingBottom: "50px" }}
      >
        <div className="add-recipe-middle-wrapper">
          <RecipeInputText
            recipeName="Name"
            recipePlaceholder="Haulolo"
            recipeEvent={setName}
          />
          <RecipeInputText
            recipeName="Ingredients"
            recipePlaceholder="Rice"
            recipeEvent={setIngredients}
          />
          <RecipeInputDropdown
            recipeName="Ingredient Count"
            recipeOptions={defaults.ingredientCount}
            recipeEvent={setIngredientCount}
            currentVal={ingredientCount}
          />
          <RecipeInputText
            recipeName="Directions"
            recipePlaceholder="Cook this"
            recipeEvent={setDirections}
          />
          <RecipeInputDropdown
            recipeName="Cooking Time"
            recipeOptions={defaults.cookingTime}
            recipeEvent={setCookingTime}
            currentVal={cookingTime}
          />
          <RecipeInputDropdown
            recipeName="Difficulty"
            recipeOptions={defaults.difficulty}
            recipeEvent={setDifficulty}
            currentVal={difficulty}
          />
          <RecipeInputDropdown
            recipeName="Cuisine"
            recipeOptions={defaults.cuisine}
            recipeEvent={setCuisine}
            currentVal={cuisine}
          />
          <RecipeInputDropdown
            recipeName="Diet"
            recipeOptions={defaults.diet}
            recipeEvent={setDiet}
            currentVal={diet}
          />
          <RecipeInputImage chooseFileId="choose-file" setImage={setImage} />
          <RecipeInputSubmit loading={loading} submitRecipe={createRecipe} />
        </div>
      </div>
      <style jsx>{`
        input[type="file"] {
          display: none;
        }
        select {
          appearance: none;
          text-indent: 5px;
          background-image: linear-gradient(
              45deg,
              transparent 50%,
              var(--color-brand) 50%
            ),
            linear-gradient(135deg, var(--color-brand) 50%, transparent 50%),
            linear-gradient(
              to right,
              var(--color-brand-30-transparent),
              var(--color-brand-30-transparent)
            );
          background-position: calc(100% - 20px) calc(1em + 2px),
            calc(100% - 15px) calc(1em + 2px), 100% 0;
          background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
          background-repeat: no-repeat;
        }
        select:focus {
          background-image: linear-gradient(
              45deg,
              var(--color-white) 50%,
              transparent 50%
            ),
            linear-gradient(135deg, transparent 50%, var(--color-white) 50%),
            linear-gradient(
              to right,
              var(--color-brand-30-transparent),
              var(--color-brand-30-transparent)
            );
          background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em,
            100% 0;
          background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
          background-repeat: no-repeat;
          border-color: rgb(0, 133, 84);
          outline: 0;
        }
        .custom-file-upload {
          border: 1px solid #ccc;
          display: inline-block;
          padding: 6px 12px;
          cursor: pointer;
        }

        .add-recipe-middle-wrapper {
          display: flex;
          height: auto;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
          /* border: 2px dashed red; */
        }
        .recipe-input {
          color: var(--color-brand);
          border-style: solid;
          border-color: var(--color-brand);
          min-width: 100%;
          min-height: 40px;
          border-radius: 7.5px;
          margin-top: 7.5px;
          font-size: 1em;
          border-width: 2px;
          text-indent: 5px;
        }

        .directions {
          font-family: "Nunito", sans-serif;
          height: 90px;
          padding-right: 0px;
          padding-left: 0px;
          padding-top: 5px;
        }

        .recipe-image-upload {
          display: inline-block;
          width: 100%;
          height: 100%;
          text-align: center;
          border-radius: 7.5px;
          cursor: pointer;
        }

        .recipe-image-upload-text {
          border-radius: 7.5px;
          margin: 0;
          padding-block-start: 0.46em;
          padding-block-end: 0.46em;
        }

        .recipe-image-upload-text:hover {
          background-color: var(--color-brand-30-transparent);
          border-radius: 0px;
        }

        .recipe-input-label {
          font-family: "Nunito";
          font-weight: 600;
          color: var(--color-brand);
          font-size: 1.3em;
        }

        .dropdown {
          min-width: 100.5%;
        }

        .recipe-input-wrapper {
          width: 600px;
          margin: 10px 0 10px 0;
        }

        .loading-bar-container {
          width: 100%;
        }

        .recipe-submit {
          color: var(--color-white);
          border-style: solid;
          border-color: var(--color-brand);
          background-color: var(--color-brand);
          width: 180px;
          height: 40px;
          border-radius: 10px;
          margin: 10px;
          font-size: 0.9em;
          margin-top: 25px;
        }

        .recipe-upload-text {
          text-indent: 0px;
        }

        @media screen and (max-width: 1150px) {
          .recipe-input-wrapper {
            width: 400px;
          }
        }

        @media screen and (max-width: 800px) {
          .recipe-input-wrapper {
            width: 250px;
          }
          .recipe-image-upload-text {
            padding-block-start: 0.88em;
            padding-block-end: 0.88em;
          }
        }
      `}</style>
    </div>
  );
}
