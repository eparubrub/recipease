import React from "react";
import PropTypes from "prop-types";

interface Recipe2Props {
  details: {
    cuisine: string;
    cookingTime: string;
    diet: string;
    difficulty: string;
    directions: string;
    ingredients: string;
    ingredientCount: number;
    likes: string;
    name: string;
    imgSmall: { url: string; path: string };
    imgBig: { url: string; path: string };
  };
  // deleteRecipe: function;
  id: string;
}

export function Recipe2({ details, id }: Recipe2Props) {
  console.log("Testing:", details);
  return (
    <>
      <div className="recipe-container-small">
        <div
          className="recipe-image"
          style={{ backgroundImage: "url(" + details.imgSmall.url + ")" }}
        ></div>
        <div className="recipe-data-container">
          <h3 className="recipe-title">{details.name}</h3>
          <div className="recipe-split-columns">
            <div className="recipe-column">
              <div>
                <img
                  src={"/images/ingredients.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">
                  {details.ingredientCount} ingredients
                </p>
              </div>
              <div>
                <img
                  src={"/images/cook-time.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{details.cookingTime}</p>
              </div>
            </div>
            <div className="recipe-column">
              {/* <p>Diet: {diet}</p> */}
              {/* <p>Difficulty: {difficulty} </p> */}
              <div>
                <img
                  src={"/images/cuisine.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{details.cuisine}</p>
              </div>
              <div>
                <img
                  src={"/images/likes.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{details.likes} likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .recipe-container-small {
          height: 200px;
          width: 550px;
          min-height: 200px;
          min-width: 550px;
          border-radius: 20px;
          border: 3.5px solid var(--color-brand);
          margin: 10px;
          display: flex;
          /* justify-content: center; */
          flex-direction: column;
          position: relative;
        }

        .recipe-image {
          height: 180px;
          width: 180px;
          position: absolute;
          left: 0px;
          top: 0px;
          padding: 10px;
          border-radius: 16px 0px 0px 16px; /* top left, top right, bottom right, bottom left */
          border-right: 5px solid var(--color-brand);
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }

        .recipe-data-container {
          /* display: flex;
  flex-direction:column; */
          position: absolute;
          width: 325px;
          height: 100%;
          right: 10px;
        }

        .recipe-title {
          margin-top: 7px;
          margin-bottom: 0px;
        }

        .recipe-split-columns {
          display: flex;
        }

        .recipe-column {
          flex: 50%;
          margin-left: 10px;
        }

        .recipe-icon {
          width: 25px;
          height: 25px;
          position: relative;
          top: 5px;
        }

        .recipe-text-small {
          font-size: 1em;
          position: relative;
          left: 10px;
          display: inline-block;
        }
        @media screen and (max-width: 1150px) {
        }

        @media screen and (max-width: 800px) {
          .recipe-container-small {
            height: 100px;
            width: 275px;
            min-height: 100px;
            min-width: 275px;
          }
          .recipe-image {
            height: 90px;
            width: 90px;
            padding: 5px;
            border-radius: 15px 0px 0px 15px;
            border-right: 2.5px solid var(--color-brand);
          }

          .recipe-data-container {
            width: 162.5px;
            height: 100%;
            right: 5px;
            border-radius: 0px 15px 15px 0px;
          }

          .recipe-title {
            font-size: 0.8em;
            margin-top: 3.5px;
            margin-bottom: 0px;
          }

          .recipe-column {
            margin-left: 5px;
          }

          .recipe-icon {
            width: 12.5px;
            height: 12.5px;
            top: 2.5px;
          }

          .recipe-text-small {
            font-size: 0.5em;
            left: 5px;
          }

          .recipeDelete {
            font-size: 0.5em;
            border-radius: 20px;
          }
        }
      `}</style>
    </>
  );
}

const getDeleteButton = (deleteFunction, id, imgSmallUrl, imgBigUrl) => {
  if (process.env.REACT_APP_DEV_OR_ENV === "dev") {
    return (
      <button
        className="recipeDelete"
        onClick={() => deleteFunction(id, imgSmallUrl, imgBigUrl)}
      >
        Delete Recipe
      </button>
    );
  }
};

export class Recipe extends React.Component {
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
    id: PropTypes.string,
  };
  render() {
    const {
      cuisine,
      cookingTime,
      diet,
      difficulty,
      directions,
      ingredients,
      ingredientCount,
      likes,
      name,
      imgSmall,
      imgBig,
    } = this.props.details;
    return (
      <div className="recipe-container-small">
        {/* <img src={image} alt={name} /> */}
        <div
          className="recipe-image"
          style={{ backgroundImage: "url(" + imgSmall.url + ")" }}
        ></div>
        <div className="recipe-data-container">
          <h3 className="recipe-title">{name}</h3>
          <div className="recipe-split-columns">
            <div className="recipe-column">
              <div>
                <img
                  src={"/images/ingredients.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">
                  {ingredientCount} ingredients
                </p>
              </div>
              <div>
                <img
                  src={"/images/cook-time.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{cookingTime}</p>
              </div>
            </div>
            <div className="recipe-column">
              {/* <p>Diet: {diet}</p> */}
              {/* <p>Difficulty: {difficulty} </p> */}
              <div>
                <img
                  src={"/images/cuisine.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{cuisine}</p>
              </div>
              <div>
                <img
                  src={"/images/likes.png"}
                  className="recipe-icon"
                  alt="recipe icon"
                />
                <p className="recipe-text-small">{likes} likes</p>
              </div>
            </div>
          </div>
          {/* {getDeleteButton(
            this.props.deleteRecipe,
            this.props.id,
            imgSmall.url,
            imgBig.url
          )} */}
        </div>
      </div>
    );
  }
}
