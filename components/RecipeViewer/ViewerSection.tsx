import React from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme";

interface ViewerSectionProps {
  children: React.ReactNode;
  SectionTitle: string;
  SectionIconPath: string;
}

export default function ViewerSection({
  children,
  SectionTitle,
  SectionIconPath,
}: ViewerSectionProps) {
  return (
    <div>
      <h3>
        {SectionTitle}
        <img src={SectionIconPath}></img>
      </h3>
      <p>{children}</p>
      <style jsx>{`
        div {
          margin-bottom: 4rem;
        }
        img {
          max-height: 1.5rem;
          margin-left: 1rem;
        }
        h3 {
          font-weight: 700;
          font-size: 2rem;
          font-family: ${theme.fontFamily.base};
        }
        p {
          font-weight: 500;
          font-size: 1.7rem;
        }
        .recipe-container {
          width: 90%;
          border: 0.2rem solid blue;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          h3 {
            font-size: 1.7rem;
          }
          p {
            font-size: 1.5rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          h3 {
            font-size: 1.5rem;
          }
          p {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
}
