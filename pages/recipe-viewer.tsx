import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Navbar } from "../components/Navbar/Navbar";
import Link from "next/link";
import { BackButton } from "../components/Navbar/BackButton";
import ViewerSection from "../components/RecipeViewer/ViewerSection";
import { db } from "../lib/firebase";
import ViewerImage from "../components/RecipeViewer/ViewerImage";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { NextPageContext } from "next";
import MockRecipe from "../lib/MockRecipe";
import { RecipeDetailsProps } from "../components/Recipe";
import ViewerOverview from "../components/RecipeViewer/ViewerOverview";
import theme from "../styles/theme";
import ViewerIngredient from "../components/RecipeViewer/ViewerIngredient";

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  return { props: { query } };
};

export default function RecipeViewer(props) {
  const { query } = props;
  const [pageData, setPageData] = useState<{
    ingredients: { id: number; name: string }[];
  }>(null);

  const pullData = async (recipeId: string) => {
    if (recipeId === "TEST") {
      const mockTestData = MockRecipe();
      setPageData(mockTestData);
    } else {
      const docRef = doc(db, "recipes", recipeId);
      const docSnap = await getDoc(docRef);
      const docData = docSnap.data();
      const recipeDetails = {
        ingredients: docData.ingredients,
      };
      console.log(recipeDetails);
      setPageData(recipeDetails);
    }
  };

  useEffect(() => {
    if (!query.recipeId) {
      return;
    } else if (query.imgSmall === "/images/sample-food-image.png") {
      pullData("TEST"); // use generated testdata
      return;
    }
    pullData(query.recipeId);
  }, [query]);
  return (
    <div>
      <Navbar pageName={String(query.name)} removeLine>
        <BackButton />
      </Navbar>
      <div className="main-wrapper">
        <div className="container">
          <div className="viewer-column">
            <ViewerImage
              title={String(query.name)}
              imgSmall={String(query.imgSmall)}
              imgBig={String(query.imgBig)}
            />
            <ViewerOverview
              cookingTime={String(query.cookingTime)}
              cuisine={String(query.cuisine)}
              diet={String(query.diet)}
              difficulty={String(query.difficulty)}
            />
          </div>
          <div className="viewer-column right">
            <div className="directions">
              <ViewerSection
                SectionTitle="Ingredients"
                SectionIconPath="/images/ingredients.png"
              >
                {pageData !== null
                  ? pageData.ingredients.map((ing) => (
                      <ViewerIngredient ingredient={ing} />
                    ))
                  : null}
              </ViewerSection>
              <ViewerSection
                SectionTitle="Directions"
                SectionIconPath="/images/cook.png"
              >
                {query.directions}
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
