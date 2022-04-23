import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Resizer from "react-image-file-resizer";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import '../css/global.css';
import '../css/AddRecipe.css';

const recipeInput = (recipeName, recipePlaceholder, recipeEvent) => {
  if (recipeName === "Directions"){
    return(
      <div className="recipe-input-wrapper">
        <label className="recipe-input-label">{recipeName}</label>
        <textarea  
          className="recipe-input directions" 
          placeholder={recipePlaceholder} 
          onChange={(event) => {recipeEvent(event.target.value)}}
        />
      </div>
    )
  } else {
    return(
      <div className="recipe-input-wrapper">
        <label className="recipe-input-label">{recipeName}</label>
        <input  
          className="recipe-input" 
          placeholder={recipePlaceholder} 
          onChange={(event) => {recipeEvent(event.target.value)}}
        />
      </div>
    )
  }

}

const recipeInputDropdown = (recipeName, recipeOptions, recipeEvent, currentVal) => {
  return(
    <div className="recipe-input-wrapper">
      <label className="recipe-input-label">{recipeName}</label>
      <select className="recipe-input dropdown" value={currentVal} onChange={(e) => recipeEvent(e.target.value)}>
        <option value="">- Select {recipeName} -</option>
        {recipeOptions.map((val) => (
          React.createElement("option", {value: val, key: val}, val)
        ))}
      </select>
    </div>
  )
}

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

const resizeFile = (file, size) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file, // Is the file of the image which will resized.
      size, // Is the maxWidth of the resized new image.
      size, // Is the maxHeight of the resized new image.
      "JPEG", // Is the compressFormat of the resized new image.
      100, // Is the quality of the resized new image.
      0, // Is the degree of clockwise rotation to apply to uploaded image.
      (uri) => { // Is the callBack function of the resized new image URI.
        resolve(uri);
      }
    );
  });

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class AddRecipe extends React.Component{
    defaults = require("../data/recipeDefaults.json")
    state = {
      loading: false,
      cookingTime: '',
      cuisine: '',
      diet: '',
      difficulty: '',
      directions: '',
      ingredients: '',
      ingredientCount: null,
      name: '',
      img: null
    }

    setLoading = async (loading) => {
      this.setState({loading: loading});
    }

    setRecipeCookingTime = async (cookingTime) => {
      this.setState({cookingTime: cookingTime});
    }

    setRecipeCuisine = async (cuisine) => {
      this.setState({cuisine: cuisine});
    }

    setRecipeDiet = async (diet) => {
      this.setState({diet: diet});
    }

    setRecipeDifficulty = async (difficulty) => {
      this.setState({difficulty: difficulty});
    }

    setRecipeDirections = async (directions) => {
      this.setState({directions: directions});
    }

    setRecipeIngredients = async (ingredients) => {
      this.setState({ingredients: ingredients});
    }
    
    setRecipeIngredientCount = async (ingredientCount) => {
      this.setState({ingredientCount: ingredientCount});
    }

    setRecipeName = async (name) => {
      this.setState({name: name});
    }
    
    setImage = (selectImage) => {
      if (selectImage.target.files[0]){
        this.setState({img: selectImage.target.files[0]});
        document.getElementById("choose-file").innerHTML = `File chosen: ${selectImage.target.files[0].name}`;
      }
    }

    uploadImage = (size) => {
      return new Promise((resolve, reject) => {
        resizeFile(this.state.img, size)
          .then((newImageUri) => {
            const newImageName = `${this.state.img.name}_${size}x${size}.jpeg`
            const newImageRef = ref(storage, `/images/${newImageName}`);
            uploadString(newImageRef, newImageUri, "data_url")
              .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                  // console.log("snapshot:", snapshot.ref)
                  // console.log('File available at', url);
                  const imageInfo = {
                    "path": snapshot.ref.fullPath,
                    "url": url
                  }
                  resolve(imageInfo);
                });
              }).catch((error) => {
                console.error('Upload failed', error);
                alert("Image upload failed");
                reject("Upload failed");
              });
          })
      })
    }

    resetForm = () => {
      this.setState({cookingTime: ""});
      this.setState({cuisine: ""});
      this.setState({diet: ""});
      this.setState({difficulty: ""});
      this.setState({directions: ""});
      this.setState({ingredients: ""});
      this.setState({ingredientCount: ""});
      this.setState({name: ""});
      this.setState({img: null});
      let inputs = document.getElementsByClassName("recipe-input");
      for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i]
        element.value = ""
      }
      document.getElementById("choose-file").innerHTML = "Choose a file...";
    }

    createRecipe = async () => {
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
        imgBig: image680
      })
      .then(function(docRef) {
        console.log("Successfully created new recipe with ID", docRef.id)
        this.setLoading(false);
        this.resetForm()
        this.props.navigate("/home")
      }.bind(this))
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
    };
      
    render(){
        return (
            <div>
                <div className="navbar-container">
                    <div className="navbar-top">
                    <div className="navbar-center-text">Add Recipe</div>
                      <Link to="/home">
                        <img src={"/images/back-arrow.png"} className="navbar-back" alt="back icon"/>
                      </Link>
                    </div>
                    <div className="navbar-bottom"/>
                </div>
                <div className="middle-centered-container" style={{"paddingBottom": "50px"}}>
                    <div className="add-recipe-middle-wrapper">
                        {recipeInput("Name", "Haulolo", this.setRecipeName)}
                        {recipeInput("Ingredients", "Rice", this.setRecipeIngredients)}
                        {recipeInputDropdown(
                          "Ingredient Count", this.defaults.ingredientCount, this.setRecipeIngredientCount, this.ingredientCount
                        )}
                        {recipeInput("Directions", "Cook this", this.setRecipeDirections)}
                        {recipeInputDropdown(
                          "Cooking Time", this.defaults.cookingTime, this.setRecipeCookingTime, this.cookingTime
                        )}
                        {recipeInputDropdown(
                          "Difficulty", this.defaults.difficulty, this.setRecipeDifficulty, this.difficulty
                        )}
                        {recipeInputDropdown(
                          "Cuisine", this.defaults.cuisine, this.setRecipeCuisine, this.cuisine
                        )}
                        {recipeInputDropdown(
                          "Diet", this.defaults.diet, this.setRecipeDiet, this.Diet
                        )}
                        <div className="recipe-input-wrapper">
                          <label className="recipe-input-label">Upload Image</label>
                          <div className="recipe-input recipe-input-image-container recipe-upload-text">
                            <label htmlFor="file-upload" className="recipe-image-upload">
                              <p id="choose-file" className="recipe-image-upload-text">Choose a file...</p>
                            </label>
                            <input id="file-upload" type="file" onChange={this.setImage}/>
                          </div>
                        </div>
                        <div className="loading-bar-container">
                          <BarLoader css={override} height="5px" width="100%" color={"var(--color-brand)"} loading={this.state.loading} speedMultiplier={1} />
                        </div>
                        <button className="recipe-submit" onClick={this.createRecipe}>Create Recipe</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default withNavigation(AddRecipe)