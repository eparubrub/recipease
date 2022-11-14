import theme from "../styles/theme";

interface TextAndIconProps {
  text: string;
  iconPath: string;
  onClickFunction?;
}

export function TextAndIcon({
  text,
  iconPath,
  onClickFunction,
}: TextAndIconProps) {
  return (
    <>
      <div onClick={onClickFunction}>
        <img src={iconPath}></img>
        <p>{text}</p>
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 2rem;
          margin-right: 0.5rem;
        }
        p {
          margin: 0rem;
          text-align: center;
          font-size: 1.7rem;
          font-family: ${theme.fontFamily.base};
        }
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          img {
            width: 1.7rem;
          }
          p {
            font-size: 1.5rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          img {
            width: 1.5rem;
          }
          p {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
}
