import theme from "../../styles/theme";

interface RecipeInputIngredientsProps {
  recipeName: string;
  inputList: { id: number; name: string }[];
  recipeIngredientAdd: () => any;
  recipeIngredientUpdate: (id?: number, name?: string) => any;
}

export default function RecipeInputIngredients({
  recipeName,
  inputList,
  recipeIngredientAdd,
  recipeIngredientUpdate,
}: RecipeInputIngredientsProps) {
  return (
    <>
      <div className="outer-wrapper">
        <label>{recipeName}</label>
        {inputList.map((obj, index) => {
          return (
            <input
              className="input-full"
              onChange={(event) => {
                recipeIngredientUpdate(index, event.target.value);
              }}
            />
          );
        })}
        <div className="input-wrapper" onClick={recipeIngredientAdd}>
          <img src={"/images/add-recipe.png"} alt="back icon" />
          <input disabled />
        </div>
      </div>
      <style jsx>{`
        label {
          font-family: "Nunito";
          font-weight: 600;
          color: ${theme.color.brand.base};
          font-size: 1.3rem;
        }
        input,
        textarea {
          color: ${theme.color.brand.base};
          border-style: solid;
          border-color: ${theme.color.brand.base};
          height: 2.3rem;
          width: 99%;
          border-radius: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0.2rem;
          margin-top: 0.7rem;
        }
        textarea {
          font-family: "Nunito", sans-serif;
          width: 98.5%;
          height: 5rem;
        }
        img {
          width: 2rem;
          margin-right: 0.5rem;
          margin-top: 0.7rem;
        }
        .input-full {
          animation-name: fadein;
          animation-duration: 0.9s;
        }
        .input-wrapper {
          display: flex;
          align-items: center;
          cursor: pointer;
          opacity: 0.4;
          -webkit-transition: opacity 0.5s;
          transition: "opacity" 0.5s;
        }
        .input-wrapper input {
          cursor: pointer;
        }
        .input-wrapper:hover {
          opacity: 1;
          -webkit-transition: opacity 0.5s;
          transition: "opacity" 0.5s;
        }
        .outer-wrapper {
          width: 35rem;
          margin: 0.6rem 0 0.6rem 0;
        }
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          .outer-wrapper {
            width: 25rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          .outer-wrapper {
            width: 15rem;
          }
        }
      `}</style>
    </>
  );
}
