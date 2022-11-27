import React from "react";
import theme from "../styles/theme";
import Image from "next/image";

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

export interface RecipeDetailsProps {
  cuisine: string;
  cookingTime: string;
  diet: string;
  difficulty: string;
  directions: string;
  ingredients: { id: number; name: string }[];
  ingredientCount: number;
  likes: string;
  name: string;
  imgSmall: { url: string; path: string };
  imgBig: { url: string; path: string };
}

interface RecipeProps {
  details: RecipeDetailsProps;
  deleteRecipe: Function;
  id: string;
}

export default function Recipe({ details, id, deleteRecipe }: RecipeProps) {
  return (
    <>
      <div className="recipe-container">
        <div className="img-container">
          <Image
            src={details.imgSmall.url}
            alt="recipe-image"
            objectFit="cover"
            layout="fill"
          />
        </div>
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
        .recipe-container {
          height: 12rem;
          width: 35rem;
          border-radius: 1rem;
          border: 0.35rem solid ${theme.color.brand.base};
          margin: 0.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }
        .recipe-container:hover,
        .recipe-container:hover * {
          cursor: pointer;
          background-color: ${theme.color.brand.faded};
        }
        .img-container {
          height: 100%;
          width: 14.3rem;
          position: relative;
          overflow: hidden;
          border-radius: 0.45rem 0 0 0.45rem; /* top left, top right, bottom right, bottom left */
        }
        .recipe-data-container {
          /* display: flex;
          flex-direction:column; */
          padding-left: 1rem;
          position: absolute;
          width: 20rem;
          height: 100%;
          right: 0.5rem;
          border-radius: 0 1rem 1rem 0;
          border-left: 0.3rem solid ${theme.color.brand.base};
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
          .img-container {
            width: 7.5rem;
            border-radius: 0.6rem 0 0 0.6rem;
          }
          .recipe-container {
            height: 6rem;
            width: 18rem;
            border: 0.25rem solid ${theme.color.brand.base};
          }
          .recipe-data-container {
            width: 9rem;
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
