import React from "react";
import theme from "../styles/theme";

const getDeleteButton = (
  deleteFunction: Function,
  id: string,
  imgSmallUrl: string,
  imgBigUrl: string
) => {
  if (process.env.REACT_APP_DEV_OR_ENV === "dev") {
    return (
      <>
        <button onClick={() => deleteFunction(id, imgSmallUrl, imgBigUrl)}>
          Delete Recipe
        </button>
        <style jsx>{`
          button {
            font-size: 0.5em;
            border-radius: 20px;
          }
        `}</style>
      </>
    );
  }
};

interface RecipeProps {
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
  deleteRecipe: Function;
  id: string;
}

export function Recipe({ details, id, deleteRecipe }: RecipeProps) {
  return (
    <>
      <div className="recipe-container-small">
        <div
          className="recipe-image"
          style={{ backgroundImage: "url(" + details.imgSmall.url + ")" }}
        ></div>
        <div className="recipe-data-container">
          <h3>{details.name}</h3>
          <div className="recipe-split-columns">
            <div className="recipe-column">
              <div>
                <img src={"/images/ingredients.png"} alt="recipe icon" />
                <p>{details.ingredientCount} ingredients</p>
              </div>
              <div>
                <img src={"/images/cook-time.png"} alt="recipe icon" />
                <p>{details.cookingTime}</p>
              </div>
            </div>
            <div className="recipe-column">
              {/* <p>Diet: {diet}</p> */}
              {/* <p>Difficulty: {difficulty} </p> */}
              <div>
                <img src={"/images/cuisine.png"} alt="recipe icon" />
                <p>{details.cuisine}</p>
              </div>
              <div>
                <img src={"/images/likes.png"} alt="recipe icon" />
                <p>{details.likes} likes</p>
              </div>
            </div>
          </div>
          {getDeleteButton(
            deleteRecipe,
            id,
            details.imgSmall.url,
            details.imgBig.url
          )}
        </div>
      </div>
      <style jsx>{`
        h3 {
          margin-top: 7px;
          margin-bottom: 0px;
        }

        img {
          width: 25px;
          height: 25px;
          position: relative;
          top: 5px;
        }

        p {
          font-size: 1em;
          position: relative;
          left: 10px;
          display: inline-block;
        }
        .recipe-container-small {
          height: 200px;
          width: 550px;
          min-height: 200px;
          min-width: 550px;
          border-radius: 20px;
          border: 3.5px solid ${theme.color.brand.base};
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
          border-right: 5px solid ${theme.color.brand.base};
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
        .recipe-split-columns {
          display: flex;
        }
        .recipe-column {
          flex: 50%;
          margin-left: 10px;
        }
        @media screen and (max-width: 1150px) {
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          h3 {
            font-size: 0.8em;
            margin-top: 3.5px;
            margin-bottom: 0px;
          }
          img {
            width: 12.5px;
            height: 12.5px;
            top: 2.5px;
          }
          p {
            font-size: 0.5em;
            left: 5px;
          }
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
            border-right: 2.5px solid ${theme.color.brand.base};
          }
          .recipe-data-container {
            width: 162.5px;
            height: 100%;
            right: 5px;
            border-radius: 0px 15px 15px 0px;
          }
          .recipe-column {
            margin-left: 5px;
          }
        }
      `}</style>
    </>
  );
}
