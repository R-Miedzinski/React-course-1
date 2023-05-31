import React, { useEffect, useState } from "react";

import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import useRequest from "../../Hooks/useRequest";
// import MealItemForm from "./MealItem/MealItemForm";

export default function AvailableMeals(props) {
  const [dataMealsList, setDataMealsList] = useState([]);
  const {
    isLoading,
    error: mealsHasError,
    sendRequest: sendMealsRequest,
  } = useRequest();

  useEffect(() => {
    const transformMeals = (data) => {
      if (!data) {
        throw new Error("No meals to load");
      }

      const loadedMeals = [];

      for (const meal in data) {
        loadedMeals.push(data[meal]);
      }

      setDataMealsList(loadedMeals);
    };

    const result = sendMealsRequest(
      {
        url: "https://react-course-c6f1b-default-rtdb.europe-west1.firebasedatabase.app/meals.json",
      },
      transformMeals
    );
  }, []);

  const mealsList = dataMealsList.map((meal) => {
    return <MealItem key={meal.id} id={meal.id} meal={meal}></MealItem>;
  });

  return (
    <section className={classes.meals}>
      <Card>
        {!isLoading && !mealsHasError && <ul>{mealsList}</ul>}
        {!isLoading && mealsHasError && <p>{mealsHasError}</p>}
      </Card>
      {/* <MealItemForm /> */}
    </section>
  );
}
