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
    background-color: var(--color-background);
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

  /* Navbar
  ----------------------------- */
  .navbar-container {
    height: 10vh;
    position: -webkit-sticky;
    position: sticky;
  }

  .navbar-top {
    background-color: var(--color-background);
    height: 90%;
    position: relative;
  }

  .navbar-center-text {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    font-family: "Nunito";
    font-weight: 600;
    font-size: 2.5em;
    color: var(--color-brand);
  }

  .navbar-bottom {
    background-color: var(--color-brand);
    height: 0.6vh;
    bottom: 0px;
  }

  .navbar-add-recipe {
    height: 40%;
    top: 0;
    bottom: 0;
    margin: auto;
    right: 20px;
    position: absolute;
  }

  .navbar-back {
    height: 40%;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 20px;
    position: absolute;
  }

  .navbar-button {
    border-radius: 20px;
    border-style: solid;
    border-color: var(--color-brand);
    background-color: var(--color-brand);
    min-height: 40px;
    height: 40%;
    max-width: 100px;
    width: 30%;
    top: 0;
    bottom: 0;
    left: 20px;
    margin: auto;
    position: absolute;
    text-align: center;
    font-weight: 400;
    font-size: 1.2em;
    color: var(--color-white);
    display: flex;
    font-family: "Nunito";
    flex-direction: column;
    justify-content: center;
  }

  /* Responsive
  ----------------------------- */
  @media screen and (max-width: 1150px) {
  }

  @media screen and (max-width: 800px) {
    .navbar-center-text {
      font-size: 1.5em;
    }
    .navbar-button {
      height: 15px;
      width: 70px;
      left: 10px;
      font-weight: 400;
      font-size: 0.9em;
    }
    .navbar-add-recipe {
      height: 30%;
      right: 10px;
    }
    .navbar-back {
      height: 30%;
      left: 10px;
    }
  }

  @media screen and (max-height: 600px) {
    .navbar-center-text {
      font-size: 1.5em;
    }
    .navbar-button {
      height: 15px;
      width: 70px;
      left: 10px;
      font-weight: 400;
      font-size: 0.9em;
    }
    .navbar-add-recipe {
      height: 30%;
      right: 10px;
    }
    .navbar-back {
      height: 30%;
      left: 10px;
    }
  }

  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200;400;600;800&family=Roboto&display=swap");
`;
