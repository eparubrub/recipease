import React from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme";

interface ViewerImageProps {
  title: string;
  image: string;
}

export default function ViewerImage({ title, image }: ViewerImageProps) {
  return (
    <div>
      <h2>{title}</h2>
      <img style={{ backgroundImage: "url(" + image + ")" }}></img>
      <style jsx>{`
        div {
          margin: 1rem 3rem 1rem 3rem;
        }
        img {
          height: 30rem;
          width: 100%;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          border-radius: ${theme.borderRadius.md};
          margin-left: 0.2rem;
        }
        h2 {
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 2rem;
          font-family: ${theme.fontFamily.base};
        }
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          img {
            height: 25rem;
          }
          h2 {
            font-size: 1.7rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          div {
            margin: 0rem 1.5rem 1rem 1.5rem;
          }
          img {
            height: 30rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          img {
            height: 20rem;
          }
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
