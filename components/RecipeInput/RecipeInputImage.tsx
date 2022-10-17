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
          color: var(--color-brand);
          font-size: 1.3rem;
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 0.8rem;
        }
        p {
          font-size: 0.8rem;
          border-radius: 0.47rem;
          margin: 0;
          padding-block-start: 0.46rem;
          padding-block-end: 0.46rem;
          text-align: center;
          cursor: pointer;
        }
        p:hover {
          background-color: var(--color-brand-30-transparent);
          border-radius: 0px;
        }
        input[type="file"] {
          display: none;
        }
        .recipe-img-input {
          color: var(--color-brand);
          border-style: solid;
          border-color: var(--color-brand);
          height: 2.8rem;
          width: 100%;
          border-radius: 0.5rem;
          margin-top: 0.5rem;
          font-size: 1rem;
          border-width: 0.13rem;
          text-indent: 0;
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
          p {
            padding-block-start: 0.88rem;
            padding-block-end: 0.88rem;
          }
        }
      `}</style>
    </>
  );
}
