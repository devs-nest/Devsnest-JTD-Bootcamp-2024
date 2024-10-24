import React, { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then(({ recipes }) => {
        setRecipes(recipes);
      });
  }, []);
  return recipes.map(({ name, instructions, id }) => (
    <article className="recipe" key={id}>
      <h1 className="title">{name}</h1>
      <p className="instructions">{instructions}</p>
    </article>
  ));
}
