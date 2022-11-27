import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../lib/firebase";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import Link from "next/link";
import RecipeInputText from "../components/RecipeInput/RecipeInputText";
import RecipeInputDropdown from "../components/RecipeInput/RecipeInputDropdown";
import RecipeInputImage from "../components/RecipeInput/RecipeInputImage";
import RecipeInputSubmit from "../components/RecipeInput/RecipeInputSubmit";
import { Navbar } from "../components/Navbar/Navbar";
import theme from "../styles/theme";
import Router from "next/router";
import { BackButton } from "../components/Navbar/BackButton";
import RecipeInputIngredients from "../components/RecipeInput/RecipeInputIngredients";

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
  const [ingredients, setIngredients] = useState([{ id: 0, name: "" }]);
  const [name, setName] = useState<string>();
  const [img, setImg] = useState(null);

  const setImage = (event: any) => {
    if (event && event.target.files[0]) {
      setImg(event.target.files[0]);
      document.getElementById(
        "choose-file"
      ).innerHTML = `File chosen: ${event.target.files[0].name}`;
    }
  };

  const uploadImage = (size) => {
    return new Promise((resolve, reject) => {
      resizeFile(img, size).then((newImageUri) => {
        const newImageName = `${img.name}_${size}x${size}.jpeg`;
        const newImageRef = ref(storage, `/images/${newImageName}`);
        uploadString(newImageRef, newImageUri as string, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
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

  const addIngredientInput = () => {
    let emptyInput = {
      id: ingredients.length,
      name: "",
    };
    setIngredients([...ingredients, emptyInput]);
  };

  const updateIngredientInput = (index, newName) => {
    let newIngredientsInput = ingredients;
    newIngredientsInput[index].name = newName;
    setIngredients(ingredients);
  };

  const resetForm = () => {
    setCookingTime("");
    setCuisine("");
    setDiet("");
    setDifficulty("");
    setDirections("");
    setIngredients([{ id: 0, name: "" }]);
    setName("");
    setImage(null);
    let inputs = document.getElementsByClassName("recipe-input");
    for (let i = 0; i < inputs.length; i++) {
      let element = inputs[i] as HTMLInputElement;
      element.value = "";
    }
    document.getElementById("choose-file").innerHTML = "Choose a file...";
  };

  const createRecipe = async () => {
    setLoading(true);
    const image300 = await uploadImage(300);
    const image680 = await uploadImage(680);
    await addDoc(collection(db, "recipes"), {
      cookingTime: cookingTime,
      cuisine: cuisine,
      diet: diet,
      difficulty: difficulty,
      directions: directions,
      ingredients: ingredients,
      ingredientCount: ingredients.length,
      name: name,
      imgSmall: image300,
      imgBig: image680,
      likes: 0,
    })
      .then(
        function (docRef) {
          console.log("Successfully created new recipe with ID", docRef.id);
          setLoading(false);
          resetForm();
          Router.push("/");
        }.bind(this)
      )
      .catch(function (error) {
        console.error("Error adding document: ", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar pageName="Add Recipe">
        <BackButton />
      </Navbar>
      <div
        className="middle-centered-container"
        style={{ paddingBottom: "3rem" }}
      >
        <div className="add-recipe-middle-wrapper">
          <RecipeInputText
            recipeName="Name"
            recipePlaceholder="Haulolo"
            recipeEvent={setName}
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
          <RecipeInputIngredients
            recipeName="Ingredients"
            inputList={ingredients}
            recipeIngredientAdd={addIngredientInput}
            recipeIngredientUpdate={updateIngredientInput}
          />
          <RecipeInputText
            recipeName="Directions"
            recipePlaceholder="Cook this"
            recipeEvent={setDirections}
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
