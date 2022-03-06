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
      <div>
        {/* <img src={image} alt={name} /> */}
        <h3>name: {name}</h3>
        <h3>cuisine: {cuisine}</h3>
        <h3>diet: {diet}</h3>
        <h3>difficulty: {difficulty}</h3>
        <button onClick={() => this.props.deleteRecipe(this.props.id)}>Delete Recipe</button>
      </div>
    );
  }
}

export default Recipe;
