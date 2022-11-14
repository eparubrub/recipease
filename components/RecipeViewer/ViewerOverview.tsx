import React from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme";
import { DataList } from "../DataList";
import { TextAndIcon } from "../TextAndIcon";

interface ViewerOverviewProps {
  cookingTime: string;
  cuisine: string;
  diet: string;
  difficulty: string;
}

export default function ViewerOverview({
  cookingTime,
  cuisine,
  diet,
  difficulty,
}: ViewerOverviewProps) {
  return (
    <div>
      <h2>Overview</h2>
      <DataList grid gap="1.5rem .5rem" gridWidth="100%" gridHeight="2rem">
        <TextAndIcon text={cookingTime} iconPath={"/images/cook-time.png"} />
        <TextAndIcon text={cuisine} iconPath={"/images/cuisine.png"} />
        <TextAndIcon text={diet} iconPath={"/images/pork.png"} />
        <TextAndIcon text={difficulty} iconPath={"/images/chef-hat.png"} />
      </DataList>
      <style jsx>{`
        div {
          margin: 2rem 3rem 1rem 3rem;
          height: 8rem;
        }
        h2 {
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 2rem;
          font-family: ${theme.fontFamily.base};
        }
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          h2 {
            font-size: 1.7rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          div {
            margin: 2rem 1.5rem 1rem 1.5rem;
          }
        }
        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
