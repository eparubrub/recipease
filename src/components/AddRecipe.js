import React from "react";
import { Link } from "react-router-dom";
import { collection, addDoc} from 'firebase/firestore';
import { db } from '../firebase';
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
      name: '',
      diet: '',
      cuisine: '',
      difficulty: '',
    }

    setRecipeName = async (name) => {
      this.setState({name: name});
    }
    
    setRecipeDiet = async (diet) => {
      this.setState({diet: diet});
    }

    setRecipeCuisine = async (cuisine) => {
      this.setState({cuisine: cuisine});
    }

    setRecipeDifficulty = async (difficulty) => {
      this.setState({difficulty: difficulty});
    }

    resetForm = () => {
      this.setState({name: ""});
      this.setState({cuisine: ""});
      this.setState({diet: ""});
      this.setState({difficulty: ""});
      let inputs = document.getElementsByClassName("recipe-input");
      for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i]
        element.value = ""
      }
    }

    createRecipe = async () => {
        await addDoc(collection(db, "recipes"), {
          name: this.state.name, 
          cuisine: this.state.cuisine,
          diet: this.state.diet,
          difficulty: this.state.difficulty
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
                        {input("Diet", "Vegetarian", this.setRecipeDiet)}
                        {input("Cuisine", "Hawaiian", this.setRecipeCuisine)}
                        {input("Difficulty", "Very Difficult", this.setRecipeDifficulty)}
                        <button className="recipe-submit" onClick={this.createRecipe}>Create Recipe</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default AddRecipe