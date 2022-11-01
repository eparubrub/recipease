import React from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme";

interface ViewerMainProps {
  title: string;
  image: string;
}

export default function ViewerMain({ title, image }: ViewerMainProps) {
  return (
    <div>
      <h2>{title}</h2>
      <img style={{ backgroundImage: "url(" + image + ")" }}></img>
      <style jsx>{`
        div {
          margin: 1rem 3rem 1rem 3rem;
        }
        img {
          height: 20rem;
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
          font-size: 1.7rem;
          font-family: ${theme.fontFamily.base};
        }
      `}</style>
    </div>
  );
}
