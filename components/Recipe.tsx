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
            font-size: 0.5rem;
            border-radius: 1.25rem;
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
          margin-top: 0.5rem;
          margin-bottom: 0;
        }

        img {
          width: 1.5rem;
          height: 1.5rem;
          position: relative;
          top: 0.5rem;
        }

        p {
          font-size: 1rem;
          position: relative;
          left: 0.5rem;
          display: inline-block;
        }
        .recipe-container-small {
          height: 12.5rem;
          width: 34.5rem;
          min-height: 12.5rem;
          min-width: 34.5rem;
          border-radius: 1.25rem;
          border: 0.2rem solid ${theme.color.brand.base};
          margin: 0.5rem;
          display: flex;
          /* justify-content: center; */
          flex-direction: column;
          position: relative;
        }
        .recipe-image {
          height: 11.5rem;
          width: 11.5rem;
          position: absolute;
          left: 0;
          top: 0;
          padding: 0.5rem;
          border-radius: 1rem 0 0 1rem; /* top left, top right, bottom right, bottom left */
          border-right: 0.3rem solid ${theme.color.brand.base};
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .recipe-data-container {
          /* display: flex;
          flex-direction:column; */
          position: absolute;
          width: 20rem;
          height: 100%;
          right: 0.5rem;
          border-radius: 0 1rem 1rem 0;
        }
        .recipe-split-columns {
          display: flex;
        }
        .recipe-column {
          flex: 50%;
          margin-left: 0.5rem;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          h3 {
            font-size: 0.8rem;
            margin-top: 0.25rem;
            margin-bottom: 0;
          }
          img {
            width: 0.75rem;
            height: 0.75rem;
            top: 0.25rem;
          }
          p {
            font-size: 0.5rem;
            left: 0.25rem;
          }
          .recipe-container-small {
            height: 6.25rem;
            width: 17.25rem;
            min-height: 6.25rem;
            min-width: 17.25rem;
          }
          .recipe-image {
            height: 5.75rem;
            width: 5.75rem;
            padding: 0.25rem;
            border-right: 0.15rem solid ${theme.color.brand.base};
          }
          .recipe-data-container {
            width: 10rem;
            height: 100%;
            right: 0.25rem;
          }
          .recipe-column {
            margin-left: 0.25rem;
          }
        }
      `}</style>
    </>
  );
}
