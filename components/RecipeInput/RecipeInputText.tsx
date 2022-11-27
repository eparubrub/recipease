import theme from "../../styles/theme";

interface RecipeInputTextProps {
  recipeName: string;
  recipePlaceholder: string;
  recipeEvent: (newValue?: string) => any;
}

export default function RecipeInputText({
  recipeName,
  recipePlaceholder,
  recipeEvent,
}: RecipeInputTextProps) {
  const directionsText = recipeName === "Directions" ? true : false;
  return (
    <>
      <div>
        <label>{recipeName}</label>
        {directionsText ? (
          <textarea
            placeholder={recipePlaceholder}
            onChange={(event) => {
              recipeEvent(event.target.value);
            }}
          />
        ) : (
          <input
            placeholder={recipePlaceholder}
            onChange={(event) => {
              recipeEvent(event.target.value);
            }}
          />
        )}
      </div>
      <style jsx>{`
        div {
          width: 35rem;
          margin: 0.6rem 0 0.6rem 0;
        }
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
          margin-top: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0.2rem;
        }
        textarea {
          font-family: "Nunito", sans-serif;
          width: 98.5%;
          height: 5rem;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          div {
            width: 25rem;
          }
          textarea {
            max-width: 25rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          div {
            width: 15rem;
          }
          textarea {
            max-width: 15rem;
          }
        }
      `}</style>
    </>
  );
}
