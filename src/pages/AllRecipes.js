import React from "react";
import { db, storage } from '../firebase';
import { Link } from "react-router-dom";
import Recipe from "../components/Recipe";
import { collection, getDocs, updateDoc, deleteDoc, doc} from 'firebase/firestore';
import '../css/global.css';
import '../css/recipe.css';
import '../css/AllRecipes.css';
import { useNavigate } from "react-router";
import { signOutWithGoogle } from "../firebase";
import MockRecipe from "../functions/MockRecipe";
import { ref, deleteObject } from "firebase/storage";


const SignOutButton = () => {
  let navigate = useNavigate();
  function handleButton() {
    signOutWithGoogle(navigate)
  }
  return (
    <button className="navbar-button middle-centered-container" onClick={handleButton}>Logout</button>
  );
}

const getDevButtons = (populateFromFirebase, addTestRecipe) => {
  if (process.env.REACT_APP_DEV_OR_ENV === "dev") {
    return(
      <div>
        <button 
          className="navbar-button middle-centered-container firebase-button" 
          onClick={populateFromFirebase}
        >Firebase</button>
        <button 
          className="navbar-button middle-centered-container testdata-button" 
          onClick={addTestRecipe}
        >Testdata</button>
      </div>
    )
  }
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

  deleteRecipeImage = (imgPath) => {
    return new Promise((resolve, reject) => {
      const newImageRef = ref(storage, imgPath);
      deleteObject(newImageRef).then(() => {
        // console.log("Deleted image at " + imgPath + " successfully")
        resolve();
      }).catch((error) => {
        console.error('Image delete failed', error);
        alert("Image delete failed");
        reject("Upload failed");
      });
    })
  }

  deleteRecipe = async (id, imgSmallPath, imgBigPath) => {
    await this.deleteRecipeImage(imgSmallPath);
    await this.deleteRecipeImage(imgBigPath);
    await deleteDoc(doc(db, "recipes", id));
    const recipes = { ...this.state.recipes};
    delete recipes[id];
    this.setState({ recipes });
  };

  populateFromFirebase = async () => {
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
      this.populateFromFirebase();
    }
  }

  render() {
    return (
      <div>
        <div className="navbar-container">
          <div className="navbar-top">
          <div className="navbar-center-text">All Recipes</div>
              <SignOutButton/>
              {getDevButtons(this.populateFromFirebase, this.addTestRecipe)}
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
