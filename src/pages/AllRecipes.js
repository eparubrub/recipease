import React from "react";
import { db } from '../firebase';
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe";
import { collection, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import '../css/global.css';
import '../css/recipe.css';
import '../css/AllRecipes.css';
import { useNavigate } from "react-router";
import { signOutWithGoogle } from "../firebase";
import MockRecipe from "../functions/MockRecipe";


const SignOutButton = () => {
  let navigate = useNavigate();
  function handleButton() {
    signOutWithGoogle(navigate)
  }
  return (
    <button className="navbar-button middle-centered-container" onClick={handleButton}>Logout</button>
  );
}

class AllRecipes extends React.Component {
  state = {
    recipes: {}
  };

  addTestRecipe = async () => {
    const sampleRecipe = MockRecipe();
    const recipes = { ...this.state.recipes};
    recipes[sampleRecipe.id] = sampleRecipe;
    this.setState({ recipes });
  };

  deleteRecipe = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    const recipes = { ...this.state.recipes};
    delete recipes[id];
    this.setState({ recipes });
  };

  PopulateFromFirebase = async () => {
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

  componentDidMount = async () => {
    if (process.env.REACT_APP_DEV_OR_ENV !== "dev") {
      this.PopulateFromFirebase();
    }
  }

  render() {
    return (
      <div>
        <div className="navbar-container">
          <div className="navbar-top">
          <div className="navbar-center-text">All Recipes</div>
              <SignOutButton/>
              <button 
                className="navbar-button middle-centered-container firebase-button" 
                onClick={this.PopulateFromFirebase}
              >Firebase</button>
              <button 
                className="navbar-button middle-centered-container testdata-button" 
                onClick={this.addTestRecipe}
              >Testdata</button>
              <Link to="/addRecipe">
                <img 
                  className="navbar-add-recipe" 
                  src={"/images/add-recipe.png"} 
                  alt="add recipe icon"
                />
              </Link>
          </div>
          <div className="navbar-bottom"/>
        </div>
        <div className="middle-centered-container">
          <div className="all-recipes-middle-wrapper">
            {Object.keys(this.state.recipes).map(key => (
              <Recipe
                key={key}
                id={key}
                details={this.state.recipes[key]}
                deleteRecipe={this.deleteRecipe}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AllRecipes;
