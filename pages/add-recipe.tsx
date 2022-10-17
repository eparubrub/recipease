import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import Link from "next/link";
import RecipeInputText from "../components/RecipeInput/RecipeInputText";
import RecipeInputDropdown from "../components/RecipeInput/RecipeInputDropdown";
import RecipeInputImage from "../components/RecipeInput/RecipeInputImage";
import RecipeInputSubmit from "../components/RecipeInput/RecipeInputSubmit";
import { Navbar } from "../components/Navbar";
import theme from "../styles/theme";
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
      <Navbar pageName="Add Recipe">
        <Link href="/">
          <img
            src={"/images/back-arrow.png"}
            className="navbar-back"
            alt="back icon"
          />
        </Link>
      </Navbar>
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
        img {
          height: 40%;
          top: 0;
          bottom: 0;
          margin: auto;
          left: 1.25rem;
          position: absolute;
          cursor: pointer;
        }
        .add-recipe-middle-wrapper {
          display: flex;
          height: auto;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-top: 1.5rem;
          /* border: 2px dashed red; */
        }
        .recipe-upload-text {
          text-indent: 0;
        }

        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          img {
            height: 30%;
            left: 0.625rem;
          }
          .recipe-input-wrapper {
            width: 25rem;
          }
        }

        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          img {
            height: 30%;
            left: 0.625rem;
          }
          .recipe-input-wrapper {
            width: 15.625rem;
          }
          .recipe-image-upload-text {
            padding-block-start: 0.88rem;
            padding-block-end: 0.88rem;
          }
        }
      `}</style>
    </div>
  );
}
