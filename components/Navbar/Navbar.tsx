import React from "react";
import theme from "../../styles/theme";

interface NavbarProps {
  pageName: string;
  children: React.ReactNode;
  removeLine?: boolean;
}

export function Navbar({ pageName, children, removeLine }: NavbarProps) {
  return (
    <>
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-center-text">{pageName}</div>
          {children}
        </div>
        {removeLine ? null : <div className="navbar-bottom" />}
      </div>
      <style jsx>{`
        .navbar-container {
          height: 7rem;
          position: -webkit-sticky;
          position: sticky;
        }
        .navbar-top {
          background-color: ${theme.color.background.base};
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
          font-size: 2.5rem;
          color: ${theme.color.brand.base};
        }
        .navbar-bottom {
          background-color: ${theme.color.brand.base};
          height: 0.6vh;
          bottom: 0;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          .navbar-container {
            height: 6rem;
          }
          .navbar-center-text {
            font-size: 2rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          .navbar-container {
            height: 5rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          .navbar-container {
            height: 4rem;
          }
          .navbar-center-text {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </>
  );
}
