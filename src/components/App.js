import React from "react";
import '../css/App.css';
import { db } from '../firebase-config';
import Recipe from "./Recipe";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';


class App extends React.Component {
  state = {
    newRecipeName: '',
    newRecipeDiet: '',
    newRecipeCuisine: '',
    newRecipeDifficulty: '',
    recipes: {}
  };

  setRecipeName = async (name) => {
    this.setState({newRecipeName: name});
  }

  setRecipeDiet = async (diet) => {
    this.setState({newRecipeDiet: diet});
  }

  setRecipeCuisine = async (cuisine) => {
    this.setState({newRecipeCuisine: cuisine});
  }

  setRecipeDifficulty = async (difficulty) => {
    this.setState({newRecipeDifficulty: difficulty});
  }

  createRecipe = async () => {
    const name = this.state.newRecipeName;
    const cuisine = this.state.newRecipeCuisine;
    const diet = this.state.newRecipeDiet;
    const difficulty = this.state.newRecipeDifficulty;
    let newId = await addDoc(collection(db, "recipes"), {
      name: name, 
      cuisine: cuisine,
      diet: diet,
      difficulty: difficulty
    })
    .then(function(docRef) {
      return docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    const recipes = { ...this.state.recipes };
    recipes[newId] = {name: name, cuisine: cuisine, diet: diet, difficulty: difficulty, id: newId};
    this.setState({ recipes });
    console.log("recipes:", recipes);
  };

  // * Deprecated update example *
  // upddateUser = async (id, age) => {
  //   const updatedAge = age + 1
  //   const newFields = {age: updatedAge}
  //   await updateDoc(doc(db, "users", id), newFields)
  //   const users = { ...this.state.users };
  //   let name = users[id].name;
  //   users[id] = {name: name, age: updatedAge, id: id};
  //   this.setState({ users });
  // }

  deleteRecipe = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    const recipes = { ...this.state.recipes };
    delete recipes[id];
    this.setState({ recipes });
  };


  componentDidMount = async () => {
    const recipesData = await getDocs(collection(db, "recipes"));
    const tempRecipes = {}
    for (let i = 0; i < recipesData.docs.length; i++) {
      let docId = recipesData.docs[i].id
      tempRecipes[docId] = {...recipesData.docs[i].data(), id: docId}
    }
    console.log(tempRecipes)
    this.setState({
      recipes: tempRecipes
    });
  }


  render() {
    return (
      <div className="App">
        <form >
          <input placeholder="Name..." onChange={(event) => {this.setRecipeName(event.target.value)}}/>
          <input placeholder="Diet..." onChange={(event) => {this.setRecipeDiet(event.target.value)}}/>
          <input placeholder="Cuisine..." onChange={(event) => {this.setRecipeCuisine(event.target.value)}}/>
          <input placeholder="Difficulty..." onChange={(event) => {this.setRecipeDifficulty(event.target.value)}}/>
        </form>
        <button onClick={this.createRecipe}>Create Recipe</button>
        {Object.keys(this.state.recipes).map(key => (
          <Recipe
            key={key}
            id={key}
            details={this.state.recipes[key]}
            deleteRecipe={this.deleteRecipe}
          />
        ))}
      </div>
    );
  }
}

export default App;
