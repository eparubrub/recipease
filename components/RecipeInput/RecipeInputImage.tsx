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
        <label className="label-title">Upload Image</label>
        <div className="recipe-img-input">
          <label htmlFor="file-upload" className="choose-file-label">
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
        p {
          height: 1.87rem;
          font-size: 1rem;
          border-radius: 0.47rem;
          margin: 0;
          padding-block-start: 0.47rem;
          padding-block-end: 0.47rem;
          text-align: center;
          cursor: pointer;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 100%;
          white-space: nowrap;
        }
        p:hover {
          background-color: ${theme.color.brand.faded};
          border-radius: 0;
        }
        input[type="file"] {
          display: none;
        }
        .label-title {
          font-family: "Nunito";
          font-weight: 600;
          color: ${theme.color.brand.base};
          font-size: 1.3rem;
        }
        .choose-file-label {
          min-height: 100%;
          display: inline-block;
          width: 100%;
          height: 1.9rem;
          border-radius: 0.8rem;
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
          p {
            height: 1.87rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          div {
            width: 15rem;
          }
          p {
            height: 1.05rem;
            padding-block-start: 0.88rem;
            padding-block-end: 0.88rem;
          }
        }
      `}</style>
    </>
  );
}
