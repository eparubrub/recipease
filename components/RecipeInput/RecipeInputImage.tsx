import theme from "../../styles/theme";

interface RecipeInputImageProps {
  chooseFileId: string;
  /* TODO: find what the type is for selectImage */
  setImage: (selectImage?: any) => any;
}

export default function RecipeInputImage({
  chooseFileId,
  setImage,
}: RecipeInputImageProps) {
  return (
    <>
      <div>
        <label>Upload Image</label>
        <div className="recipe-img-input">
          <label htmlFor="file-upload">
            <p id={chooseFileId}>Choose a file...</p>
          </label>
          <input id="file-upload" type="file" onChange={setImage} />
        </div>
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
          display: inline-block;
          width: 100%;
          height: 1.9rem;
          border-radius: 0.8rem;
        }
        p {
          height: 1.9rem;
          font-size: 0.8rem;
          border-radius: 0.47rem;
          margin: 0;
          padding-block-start: 0.46rem;
          padding-block-end: 0.46rem;
          text-align: center;
          cursor: pointer;
        }
        p:hover {
          background-color: ${theme.color.brand.faded};
          border-radius: 0;
        }
        input[type="file"] {
          display: none;
        }
        .recipe-img-input {
          color: ${theme.color.brand.base};
          border-style: solid;
          border-color: ${theme.color.brand.base};
          height: 2.8rem;
          width: 100%;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0;
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
          p {
            padding-block-start: 0.88rem;
            padding-block-end: 0.88rem;
          }
        }
      `}</style>
    </>
  );
}
