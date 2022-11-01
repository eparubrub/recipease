import React from "react";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import Link from "next/link";
import { BackButton } from "../components/Navbar/BackButton";
import ViewerSection from "../components/RecipeViewer/ViewerSection";
import ViewerMain from "../components/RecipeViewer/ViewerMain";
import ViewerOverview from "../components/RecipeViewer/ViewerOverview";

export default function RecipeViewer() {
  const router = useRouter();
  const data = router.query;
  console.log(data);
  return (
    <div>
      <Navbar pageName="" removeLine>
        <BackButton />
      </Navbar>
      <div className="main-wrapper">
        <div className="container">
          <div className="viewer-column">
            <ViewerMain title={String(data.name)} image={String(data.imgBig)} />
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
          width: 90%;
        }

        .viewer-column {
          width: 40%;
          float: left;
          height: 50rem;
        }

        .right {
          width: 59%;
          float: right;
        }

        .directions {
          margin-left: 2rem;
        }

        .main-wrapper {
          display: flex;
          height: auto;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          margin-top: 1.5rem;
           {
            /* background-color: #fc7777; */
          }
        }
      `}</style>
    </div>
  );
}
