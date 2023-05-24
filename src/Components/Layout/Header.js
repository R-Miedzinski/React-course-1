import React from "react";

import backgroundImg from "../../Assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

export default function Header(props) {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onCartShow}>
          Your Cart
        </HeaderCartButton>
      </header>
      <div className={classes["main-image"]}>
        <img src={backgroundImg} alt="Table full of food" />
      </div>
    </>
  );
}
