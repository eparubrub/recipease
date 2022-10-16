import React from "react";

interface RecipeInputDropdownProps {
  recipeName: string;
  recipeOptions: [string];
  recipeEvent: (newValue?: string) => any;
  currentVal: string;
}

export default function RecipeInputDropdown({
  recipeName,
  recipeOptions,
  recipeEvent,
  currentVal,
}: RecipeInputDropdownProps) {
  return (
    <>
      <div>
        <label>{recipeName}</label>
        <select
          value={currentVal}
          onChange={(e) => recipeEvent(e.target.value)}
        >
          <option value="">- Select {recipeName} -</option>
          {recipeOptions.map((val) =>
            React.createElement("option", { value: val, key: val }, val)
          )}
        </select>
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
        select {
          color: var(--color-brand);
          border-style: solid;
          border-color: var(--color-brand);
          min-height: 2rem;
          width: 100%;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0.2rem;
          appearance: none;
          text-indent: 5px;
          background-image: linear-gradient(
              45deg,
              transparent 50%,
              var(--color-brand) 50%
            ),
            linear-gradient(135deg, var(--color-brand) 50%, transparent 50%),
            linear-gradient(
              to right,
              var(--color-brand-30-transparent),
              var(--color-brand-30-transparent)
            );
          background-position: calc(100% - 1.21rem) calc(0.8rem),
            calc(100% - 0.9rem) calc(0.8rem), 100% 0;
          background-size: 0.32rem 0.32rem, 0.32rem 0.32rem, 2.5em 2.5em;
          background-repeat: no-repeat;
        }
        select:focus {
          background-image: linear-gradient(
              45deg,
              var(--color-white) 50%,
              transparent 50%
            ),
            linear-gradient(135deg, transparent 50%, var(--color-white) 50%),
            linear-gradient(
              to right,
              var(--color-brand-30-transparent),
              var(--color-brand-30-transparent)
            );
          background-position: calc(100% - 0.9rem) 0.8rem,
            calc(100% - 1.21rem) 0.8rem, 100% 0;
          background-size: 0.3rem 0.3rem, 0.3rem 0.3rem, 2.5em 2.5em;
          background-repeat: no-repeat;
          border-color: rgb(0, 133, 84);
          outline: 0;
        }
        @media screen and (max-width: 1150px) {
          div {
            width: 25rem;
          }
        }
        @media screen and (max-width: 800px) {
          div {
            width: 15rem;
          }
        }
      `}</style>
    </>
  );
}
