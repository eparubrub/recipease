import React, { useEffect, useRef, useState } from "react";
import { auth, db, storage } from "../lib/firebase";
import Link from "next/link";
import { Recipe } from "../components/Recipe";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Router from "next/router";
import { signOutWithGoogle } from "../lib/firebase";
import { Navbar } from "../components/Navbar/Navbar";
import MockRecipe from "../lib/MockRecipe";
import { ref, deleteObject } from "firebase/storage";
import { Button } from "../components/Button";
import theme from "../styles/theme";

export default function AllRecipes() {
  const [recipes, setRecipes] = useState<object>({});
  const [showSidebar, setShowSidebar] = useState<boolean>();
  const sidebar = useRef(null);

  const addTestRecipe = async () => {
    const sampleRecipe = MockRecipe();
    const newRecipes = JSON.parse(JSON.stringify(recipes));
    newRecipes[sampleRecipe.id] = sampleRecipe;
    setRecipes(newRecipes);
  };

  const deleteRecipeImage = (imgPath) => {
    return new Promise<void>((resolve, reject) => {
      const newImageRef = ref(storage, imgPath);
      deleteObject(newImageRef)
        .then(() => {
          // console.log("Deleted image at " + imgPath + " successfully")
          resolve();
        })
        .catch((error) => {
          console.error("Image delete failed", error);
          alert("Image delete failed");
          reject("Upload failed");
        });
    });
  };

  const deleteRecipe = async (id, imgSmallPath, imgBigPath) => {
    // if it's not testdata
    if (!imgSmallPath.startsWith("/images")) {
      await deleteRecipeImage(imgSmallPath);
      await deleteRecipeImage(imgBigPath);
      await deleteDoc(doc(db, "recipes", id));
    }
    const newRecipes = JSON.parse(JSON.stringify(recipes));
    delete newRecipes[id];
    setRecipes(newRecipes);
  };

  const populateFromFirebase = async () => {
    const recipesData = await getDocs(collection(db, "recipes"));
    const tempRecipes = {};
    for (let i = 0; i < recipesData.docs.length; i++) {
      let docId = recipesData.docs[i].id;
      tempRecipes[docId] = { ...recipesData.docs[i].data(), id: docId };
    }
    setRecipes(tempRecipes);
  };

  useEffect(() => {
    if (!sessionStorage.getItem("user") && auth) {
      Router.push("/sign-in");
    }
    if (process.env.REACT_APP_DEV_OR_ENV !== "dev") {
      populateFromFirebase();
    }
    const user = sessionStorage.getItem("user");
    if (!showSidebar) return;
    function handleClick(event) {
      if (sidebar.current && !sidebar.current.contains(event.target)) {
        setShowSidebar(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showSidebar]);

  return (
    <>
      <div>
        <Navbar pageName="All Recipes">
          <div className="navbar-option left">
            <img
              onClick={() => setShowSidebar(true)}
              src={"/images/stripes.png"}
              alt="sidebar select"
            ></img>
          </div>
          <div className="navbar-option right">
            <Link href="/add-recipe">
              <img src={"/images/add-recipe.png"} alt="add recipe icon" />
            </Link>
          </div>
        </Navbar>
        <div className="middle-centered-container">
          <div className="all-recipes-middle-wrapper">
            {Object.keys(recipes).map((key) => (
              <Link
                key={key}
                href={{
                  pathname: "/recipe-viewer",
                  query: {
                    ...recipes[key],
                    imgBig: recipes[key].imgBig.url,
                    imgSmall: recipes[key].imgSmall.url,
                  }, // the data
                }}
              >
                <a>
                  <Recipe
                    id={key}
                    details={recipes[key]}
                    deleteRecipe={deleteRecipe}
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="overlay">
        <div className="sidenav" ref={sidebar}>
          <ul>
            <li>
              <div onClick={addTestRecipe}>Test Data</div>
            </li>
            <li>
              <div onClick={populateFromFirebase}>Firebase</div>
            </li>
            <li className="sidenav-bottom">
              <div onClick={signOutWithGoogle}>Sign Out</div>
            </li>
          </ul>
        </div>
      </div>
      <style jsx>{`
        img {
          max-height: 100%;
          max-width: 100%;
          float: right;
        }

        ul {
          padding: 0;
          list-style: none;
        }

        ul li {
          cursor: pointer;
          margin: 2rem;
          transition: all 500ms;
          font-size: 1.7rem;
          color: ${theme.color.brand.base};
          font-weight: 600;
          font-family: ${theme.fontFamily.base};
        }

        .navbar-option {
          width: 3rem;
          height: 3rem;
          position: absolute;
          cursor: pointer;
          margin-top: 2rem;
        }

        .left {
          left: 1.5rem;
        }

        .right {
          right: 1.5rem;
        }

        .overlay {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: ${showSidebar ? "block" : "none"};
        }

        .sidenav {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 15rem;
        }

        .sidenav-bottom {
          position: fixed;
          bottom: 1rem;
        }

        .all-recipes-middle-wrapper {
          display: flex;
          width: 90%;
          height: auto;
          flex-flow: row wrap;
          justify-content: center;
        }

        /* Responsive
        ----------------------------- */
        @media screen and (max-width: ${theme.layout.breakPoints.large}) {
          .navbar-option {
            height: 2.5rem;
            margin-top: 1.5rem;
          }
        }

        @media screen and (max-width: ${theme.layout.breakPoints.medium}) {
          .navbar-option {
            height: 2rem;
            margin-top: 1rem;
          }
          .recipe-input-wrapper {
            width: 25rem;
          }
        }

        @media screen and (max-width: ${theme.layout.breakPoints.small}) {
          .navbar-option {
            height: 1.5rem;
          }
        }
      `}</style>
    </>
  );
}
