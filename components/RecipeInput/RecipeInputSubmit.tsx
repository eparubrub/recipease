import BarLoader from "react-spinners/BarLoader";
import theme from "../../styles/theme";

interface RecipeInputSubmitProps {
  loading: boolean;
  submitRecipe: () => any;
}

export default function RecipeInputSubmit({
  loading,
  submitRecipe,
}: RecipeInputSubmitProps) {
  return (
    <>
      <div>
        <BarLoader
          css={"display: block; margin: 0 auto; border-color: red"}
          height=".4rem"
          width="100%"
          color={theme.color.brand.base}
          loading={loading}
          speedMultiplier={1}
        />
      </div>
      <button onClick={submitRecipe}>Create Recipe</button>
      <style jsx>{`
        div {
          width: 35rem;
        }
        button {
          color: ${theme.color.background.white};
          border-style: solid;
          border-color: ${theme.color.brand.base};
          background-color: ${theme.color.brand.base};
          width: 11.25rem;
          height: 2.5rem;
          border-radius: 0.6rem;
          margin: 0.6rem;
          font-size: 0.9rem;
          margin-top: 1.5rem;
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
