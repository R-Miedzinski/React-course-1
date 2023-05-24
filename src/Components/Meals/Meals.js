import React from "react";
import MealsSummary from "./MelasSummary";
import AvailableMeals from "./AvailableMeals";

export default function Meals(props) {
  return (
    <>
      <MealsSummary />
      <AvailableMeals />
    </>
  );
}
