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
          color: var(--color-brand);
          font-size: 1.3rem;
        }
        input,
        textarea {
          color: var(--color-brand);
          border-style: solid;
          border-color: var(--color-brand);
          height: 2rem;
          width: 100%;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0.2rem;
        }
        textarea {
          font-family: "Nunito", sans-serif;
          width: 98%;
          height: 5rem;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          div {
            width: 25rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          div {
            width: 15rem;
          }
        }
      `}</style>
    </>
  );
}
