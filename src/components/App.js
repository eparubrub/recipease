import React from "react";
import { db } from '../firebase-config';
import { Link } from "react-router-dom";
import Recipe from "./Recipe";
import Navbar from "./Navbar";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import '../css/global.css';
import '../css/recipe.css';


class App extends React.Component {
  state = {
    recipes: {}
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
    this.setState({
      recipes: tempRecipes
    });
  }


  render() {
    return (
      <div className="App">
        {Navbar("All Recipes", "addRecipe")}
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
