import { useEffect, useState } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";
const requestConfig={};
const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals",requestConfig,[]);
  if(error)
  {
    return <Error title='Failed to fetch meals' message={error}/>
  }
  if(isLoading)
  {
    return <h1 className="center">Loading...</h1>
  }
 
  
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};
export default Meals;
