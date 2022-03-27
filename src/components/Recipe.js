import React from "react";
import PropTypes from "prop-types";

class Recipe extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      cuisine: PropTypes.string,
      diet: PropTypes.string,
      difficulty: PropTypes.string,
    }),
    deleteRecipe: PropTypes.func,
    id: PropTypes.string
  }; 
  render() {
    const { name, cuisine, diet, difficulty } = this.props.details;
    return (
      <div className="recipe-container-small">
        {/* <img src={image} alt={name} /> */}
        <div className="recipe-image">Recipe Image</div>
        <div className="recipe-data-container">
          <h3 className="recipe-title">{name}</h3>
          <div className="recipe-split-columns">
            <div className="recipe-column">
              <div>
                <img src={"/images/ingredients.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">ingredients</p>
              </div>
              <div>
                <img src={"/images/cook-time.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">cooking time</p>
              </div>
            </div>
            <div className="recipe-column">
              {/* <p>Diet: {diet}</p> */}
              {/* <p>Difficulty: {difficulty} </p> */}
              <div>
                <img src={"/images/cuisine.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">cuisine</p>
              </div>
              <div>
                <img src={"/images/likes.png"} className="recipe-icon" alt="recipe icon"/>
                <p className="recipe-text-small">likes</p>
              </div>
            </div>
          </div>
          <button onClick={() => this.props.deleteRecipe(this.props.id)}>Delete Recipe</button>
        </div>
      </div>
    );
  }
}

export default Recipe;
