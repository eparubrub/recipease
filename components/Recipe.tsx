import React from "react";
import PropTypes from "prop-types";

const getDeleteButton = (deleteFunction, id, imgSmallUrl, imgBigUrl) => {
  if (process.env.REACT_APP_DEV_OR_ENV === "dev") {
    return(
      <button className="recipeDelete" onClick={() => deleteFunction(id, imgSmallUrl, imgBigUrl)}>Delete Recipe</button>
    )
  }
}

class Recipe extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      cuisine: PropTypes.string,
      cookingTime: PropTypes.string,
      diet: PropTypes.string,
      difficulty: PropTypes.string,
      directions: PropTypes.string,
      ingredients: PropTypes.string,
      ingredientCount: PropTypes.number,
      likes: PropTypes.string,
      name: PropTypes.string,
      imgSmall: PropTypes.object,
      imgBig: PropTypes.object,
    }),
    deleteRecipe: PropTypes.func,
    id: PropTypes.string
  }; 
  render() {
    const { cuisine, cookingTime, diet, difficulty, directions, ingredients, ingredientCount, likes, name, imgSmall, imgBig} = this.props.details;
    return (
      <div className="recipe-container-small">
        {/* <img src={image} alt={name} /> */}
        <div className="recipe-image" style={{"backgroundImage": "url(" + imgSmall.url + ")"}}></div>
        <div className="recipe-data-container">
          <h3 className="recipe-title">{name}</h3>
          <div className="recipe-split-columns">
            <div className="recipe-column">
              <div>
                <img src={"/images/ingredients.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">{ingredientCount} ingredients</p>
              </div>
              <div>
                <img src={"/images/cook-time.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">{cookingTime}</p>
              </div>
            </div>
            <div className="recipe-column">
              {/* <p>Diet: {diet}</p> */}
              {/* <p>Difficulty: {difficulty} </p> */}
              <div>
                <img src={"/images/cuisine.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">{cuisine}</p>
              </div>
              <div>
                <img src={"/images/likes.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">{likes} likes</p>
              </div>
            </div>
          </div>
          {getDeleteButton(this.props.deleteRecipe, this.props.id, imgSmall.url, imgBig.url)}
        </div>
      </div>
    );
  }
}

export default Recipe;
