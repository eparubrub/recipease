import React from "react";
import { Link } from "react-router-dom";
import { collection, addDoc} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '../css/global.css';
import '../css/AddRecipe.css';

const input = (recipeName, recipePlaceholder, recipeEvent) => {
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

class AddRecipe extends React.Component{
    state = {
      cookingTime: '',
      cuisine: '',
      diet: '',
      difficulty: '',
      directions: '',
      ingredients: '',
      ingredientCount: '',
      name: '',
      img: null
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
      }
    }

    uploadImage = () => {
      return new Promise((resolve, reject) => {
        const newImage = this.state.img;
        const imageRef = ref(storage, `/images/${newImage.name}`);
        uploadBytesResumable(imageRef, newImage)
          .then((snapshot) => {
            console.log('Uploaded', snapshot.totalBytes, 'bytes.');
            console.log('File metadata:', snapshot.metadata);
            getDownloadURL(snapshot.ref).then((url) => {
              console.log('File available at', url);
              resolve(url);
            });
          }).catch((error) => {
            console.error('Upload failed', error);
            alert("Image upload failed");
            reject("Upload failed");
          });
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
    }

    createRecipe = async () => {
        const imageUrl = await this.uploadImage();
        console.log("testing:", imageUrl)
        await addDoc(collection(db, "recipes"), {
          cookingTime: this.state.cookingTime,
          cuisine: this.state.cuisine,
          diet: this.state.diet,
          difficulty: this.state.difficulty,
          directions: this.state.directions,
          ingredients: this.state.ingredients,
          ingredientCount: this.state.ingredientCount,
          name: this.state.name, 
          img: imageUrl
        })
        .then(function(docRef) {
          console.log("Successfully created new recipe with ID", docRef.id)
          this.resetForm()
          return docRef.id;
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
                <div className="middle-centered-container">
                    <div className="add-recipe-middle-wrapper">
                        {input("Name", "Haulolo", this.setRecipeName)}
                        {input("Ingredients", "Rice", this.setRecipeIngredients)}
                        {input("Ingredient Count", "1", this.setRecipeIngredientCount)}
                        {input("Directions", "Cook this", this.setRecipeDirections)}
                        {input("Cooking Time", "15 minutes", this.setRecipeCookingTime)}
                        {input("Difficulty", "Very Difficult", this.setRecipeDifficulty)}
                        {input("Cuisine", "Hawaiian", this.setRecipeCuisine)}
                        {input("Diet", "Vegetarian", this.setRecipeDiet)}
                        <input type="file" onChange={this.setImage}/>
                        <button className="recipe-submit" onClick={this.createRecipe}>Create Recipe</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default AddRecipe