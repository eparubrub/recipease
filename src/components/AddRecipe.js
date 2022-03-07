import React from "react";
import { Link } from "react-router-dom";
import { collection, addDoc} from 'firebase/firestore';
import { db } from '../firebase-config';
import Navbar from "./Navbar";



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

    createRecipe = async () => {
        let newId = await addDoc(collection(db, "recipes"), {
          name: this.state.name, 
          cuisine: this.state.cuisine,
          diet: this.state.diet,
          difficulty: this.state.difficulty
        })
        .then(function(docRef) {
          return docRef.id;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
        console.log("Created recipe with Id:", newId);
      };
      
    render(){
        return (
            <div>
                {Navbar("Add Recipe", "home")}
                <form >
                    <input className="recipeInput" placeholder="Name..." onChange={(event) => {this.setRecipeName(event.target.value)}}/>
                    <input placeholder="Diet..." onChange={(event) => {this.setRecipeDiet(event.target.value)}}/>
                    <input placeholder="Cuisine..." onChange={(event) => {this.setRecipeCuisine(event.target.value)}}/>
                    <input placeholder="Difficulty..." onChange={(event) => {this.setRecipeDifficulty(event.target.value)}}/>
                </form>
                <button onClick={this.createRecipe}>Create Recipe</button>
            </div>
        )
    }
}


export default AddRecipe