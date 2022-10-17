import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/react";
import theme from "../../styles/theme";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

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
          css={override}
          height=".4rem"
          width="100%"
          color={"var(--color-brand)"}
          loading={loading}
          speedMultiplier={1}
        />
      </div>
      <button onClick={() => submitRecipe}>Create Recipe</button>
      <style jsx>{`
        div {
          width: 35rem;
        }
        button {
          color: var(--color-white);
          border-style: solid;
          border-color: var(--color-brand);
          background-color: var(--color-brand);
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
