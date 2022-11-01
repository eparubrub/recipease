import React from "react";
import { useRouter } from "next/router";
import theme from "../../styles/theme";
import { DataList } from "../DataList";

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
      <DataList grid gapLarge="1.5rem .5rem" gridWidth="100%" gridHeight="2rem">
        <ViewerOverviewData
          data={cookingTime}
          iconPath={"/images/cook-time.png"}
        />
        <ViewerOverviewData data={cuisine} iconPath={"/images/cuisine.png"} />
        <ViewerOverviewData data={diet} iconPath={"/images/pork.png"} />
        <ViewerOverviewData
          data={difficulty}
          iconPath={"/images/chef-hat.png"}
        />
      </DataList>
      <style jsx>{`
        div {
          margin: 2rem 3rem 1rem 3rem;
        }
        h2 {
          margin-bottom: 1rem;
          font-weight: 700;
          font-size: 1.4rem;
          font-family: ${theme.fontFamily.base};
        }
      `}</style>
    </div>
  );
}

interface ViewerOverviewDataProps {
  data: string;
  iconPath: string;
}

export function ViewerOverviewData({
  data,
  iconPath,
}: ViewerOverviewDataProps) {
  return (
    <>
      <div>
        <img src={iconPath}></img>
        <p>{data}</p>
      </div>
      <style jsx>{`
        div {
          display: flex;
          align-items: center;
        }
        img {
          width: 1.6rem;
          margin-right: 0.5rem;
        }
        p {
          margin: 0rem;
          text-align: center;
          font-size: 1.2rem;
          font-family: ${theme.fontFamily.base};
        }
      `}</style>
    </>
  );
}