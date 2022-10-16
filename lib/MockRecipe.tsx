const MockRecipe = () => {
  const recipeId = Math.floor(Math.random() * 100000);
  const defaults = require("../lib/data/recipeDefaults.json");
  const testdata = require("../lib/data/testData.json");
  return {
    cookingTime:
      defaults.cookingTime[
        Math.floor(Math.random() * defaults.cookingTime.length)
      ],
    cuisine:
      defaults.cuisine[Math.floor(Math.random() * defaults.cuisine.length)],
    diet: defaults.diet[Math.floor(Math.random() * defaults.diet.length)],
    difficulty:
      defaults.difficulty[
        Math.floor(Math.random() * defaults.difficulty.length)
      ],
    directions:
      testdata.directions[
        Math.floor(Math.random() * testdata.directions.length)
      ],
    id: recipeId,
    ingredientCount: Math.floor(Math.random() * 20),
    ingredients:
      testdata.ingredients[
        Math.floor(Math.random() * testdata.ingredients.length)
      ],
    likes: Math.floor(Math.random() * 1000),
    name: testdata.name[Math.floor(Math.random() * testdata.name.length)],
    imgSmall: {
      url: "/images/sample-food-image.png",
      path: "/images/sample-food-image.png",
    },
    imgBig: {
      url: "/images/sample-food-image.png",
      path: "/images/sample-food-image.png",
    },
  };
};

export default MockRecipe;
