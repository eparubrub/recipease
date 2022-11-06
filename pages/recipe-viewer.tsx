import React from "react";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import Link from "next/link";
import { BackButton } from "../components/Navbar/BackButton";
import ViewerSection from "../components/RecipeViewer/ViewerSection";
import ViewerImage from "../components/RecipeViewer/ViewerImage";
import ViewerOverview from "../components/RecipeViewer/ViewerOverview";
import theme from "../styles/theme";

export default function RecipeViewer() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  return (
    <div>
      <Navbar pageName={String(data.name)} removeLine>
        <BackButton />
      </Navbar>
      <div className="main-wrapper">
        <div className="container">
          <div className="viewer-column">
            <ViewerImage
              title={String(data.name)}
              image={String(data.imgBig)}
            />
            <ViewerOverview
              cookingTime={String(data.cookingTime)}
              cuisine={String(data.cuisine)}
              diet={String(data.diet)}
              difficulty={String(data.difficulty)}
            />
          </div>
          <div className="viewer-column right">
            <div className="directions">
              <ViewerSection
                SectionTitle="Ingredients"
                SectionIconPath="/images/ingredients.png"
              >
                {data.ingredients}
              </ViewerSection>
              <ViewerSection
                SectionTitle="Directions"
                SectionIconPath="/images/cook.png"
              >
                {data.directions}
              </ViewerSection>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          width: 95%;
        }

        .viewer-column {
          width: 50%;
          float: left;
          height: auto;
        }

        .right {
          float: right;
        }

        .directions {
          margin: 2rem 3rem 1rem 3rem;
        }

        .main-wrapper {
          display: flex;
          height: auto;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-top: 1.5rem;
        }
        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          .main-wrapper {
            margin-top: 0rem;
          }
          .viewer-column {
            width: 100%;
          }
          .directions {
            margin: 3rem 1.5rem 1rem 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
