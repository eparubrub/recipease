import css from "styled-jsx/css";
import theme from "./theme";

export default css.global`
  :root {
    --color-brand: ${theme.color.brand.base};
    --color-brand-light: ${theme.color.brand.alt};
    --color-brand-30-transparent: ${theme.color.brand.faded};
    --color-background: ${theme.color.background.base};
    --color-white: ${theme.color.background.white};
  }

  input {
    padding: 0;
    border-width: 0;
  }

  * {
    background-color: ${theme.color.background.base};
  }

  body {
    margin: 0px;
    padding: 0px;
  }

  h1,
  h2,
  h3,
  h4,
  label {
    font-family: "Nunito Sans", sans-serif;
    font-weight: bold;
    color: var(--color-brand);
  }

  button:hover {
    border-color: var(--color-brand-light);
    background-color: var(--color-brand-light);
    cursor: pointer;
  }

  p {
    font-family: "Nunito", sans-serif;
    color: var(--color-brand);
    font-size: 1.1em;
  }

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: var(--color-brand);
    opacity: 0.3; /* Firefox */
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: var(--color-brand);
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: var(--color-brand);
  }

  .middle-centered-container {
    /* position: fixed; */
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    /* this is what centers your element in the fixed wrapper*/
    display: flex;
    /* flex-flow: column nowrap; */
    justify-content: center; /* aligns on vertical for column */
    align-items: center; /* aligns on horizontal for column */

    /* just for styling to see the limits */
    /* border: 2px dashed red;
    box-sizing: border-box; */
  }
`;
