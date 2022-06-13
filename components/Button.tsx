import React from "react";
import theme from "../styles/theme";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  customLeft?: string;
  onClickFunction;
}

export function Button({ children, onClickFunction, customLeft }: ButtonProps) {
  return (
    <>
      <div>
        <button className="middle-centered-container" onClick={onClickFunction}>
          {children}
        </button>
      </div>
      <style jsx>{`
        button {
          border-radius: 20px;
          border-style: solid;
          border-color: ${theme.color.brand.base};
          background-color: ${theme.color.brand.base};
          min-height: 2.5rem;
          height: 40%;
          max-width: 6.5rem;
          width: 30%;
          top: 0;
          bottom: 0;
          left: ${customLeft ? customLeft : "1rem"};
          margin: auto;
          position: absolute;
          text-align: center;
          font-weight: 400;
          font-size: 1.2rem;
          color: ${theme.color.background.white};
          display: flex;
          font-family: ${theme.fontFamily.base};
          flex-direction: column;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
