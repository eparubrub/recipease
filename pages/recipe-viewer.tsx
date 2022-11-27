import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import Link from "next/link";
import { BackButton } from "../components/Navbar/BackButton";
import ViewerSection from "../components/RecipeViewer/ViewerSection";
import { db } from "../lib/firebase";
import ViewerImage from "../components/RecipeViewer/ViewerImage";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

import ViewerOverview from "../components/RecipeViewer/ViewerOverview";
import theme from "../styles/theme";

export default function RecipeViewer() {
  const [pageData, setPageData] = useState<object>({});
  const router = useRouter();
  const data = router.query;

  const pullData = async (recipeId) => {
    const docRef = await doc(db, "recipes", recipeId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    setPageData(docData);
  };

  useEffect(() => {
    if (!router.query.recipeId) {
      return;
    }
    pullData(router.query.recipeId);
  }, [router]);
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
              imgSmall={String(data.imgSmall)}
              imgBig={String(data.imgBig)}
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
