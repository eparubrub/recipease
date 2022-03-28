const diet = ["has meat", "vegetarian", "vegan", "pescatarian"]
const difficulty = ["very hard", "hard", "medium", "easy", "very easy"]
const cuisine = [
    "Hawaiian", "Chinese", "Japansese", "French",
    "American", "Italian", "Thai", "Korean"
]
const cookingTime = [
    "5 minutes", "10 minutes", "15 minutes", "25 minutes", 
    "20 minutes", "30 minutes", "45 minutes", "1 hour"
]
const directions = [
    "Stir fry ingredients and serve on a plate", "Mix ingredients in a bowl and refrigerate", 
    "Broil ingredients on a pan sheet and serve", "Par-boil ingredients and serve", "Deep fry ingredients"
]
const ingredients = [
    "Chicken, Soy Sauce, Sugar", "Coconut milk, gelatin", 
    "White Rice, carrots, spam, onions, soy sauce, green oninon", 
    "Garbanzo beans, garlic, sesame seeds, olive oil", "Rice, vanilla, sugar, heavy cream", 
    "Banana, coconut milk, ice, sugar"
]
const name = [
    "Teriyaki Chicken", "Haupia", "Fried Rice", "Garlic potatoes", 
    "Falafel", "Mochi Ice Cream", "Banana smoothie"
]

const MockRecipe = () => {
  const recipeId = Math.floor(Math.random() *  100000);
  return {
    cookingTime: cookingTime[Math.floor(Math.random() * cookingTime.length)],
    cuisine: cuisine[Math.floor(Math.random() * cuisine.length)],
    diet: diet[Math.floor(Math.random() * diet.length)],
    difficulty: difficulty[Math.floor(Math.random() * difficulty.length)],
    directions: directions[Math.floor(Math.random() * directions.length)],
    id: recipeId,
    ingredientCount: Math.floor(Math.random() *  20),
    ingredients: ingredients[Math.floor(Math.random() * ingredients.length)],
    likes: Math.floor(Math.random() *  1000),
    name: name[Math.floor(Math.random() * name.length)]
  }
}

export default MockRecipe;
