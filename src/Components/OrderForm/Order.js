import React, { useRef } from "react";

import classes from "./Order.module.css";
import Input from "./Input";

export default function Order(props) {
  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const validateMail = (email) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return emailRegex.test(email);
  };

  const validateAddress = (address) => {
    const addressRegex =
      /^([a-zA-Z]+\s)+\d{1,4}\/\d{1,4}|[a-zA-Z]+\s+\d{1,4}\/\d{1,4}|[a-zA-Z]+\s+\d{1,4}|([a-zA-Z]+\s)+\d{1,4}$/;
    return addressRegex.test(address.trim());
  };

  const validateCity = (city) => {
    return city.trim().length > 0;
  };

  const onOrder = (event) => {
    event.preventDefault();

    const currentTime = new Date();

    const order = {
      id: `${currentTime.getTime()}${addressRef.current.value.trim()}`,
      name: nameRef.current.value,
      email: emailRef.current.value,
      totalAmount: props.totalAmount,
      address: addressRef.current.value,
      city: cityRef.current.value,
      time: currentTime.toJSON(),
    };

    props.onSend(order);
  };

  return (
    <form className={classes.form} onSubmit={onOrder}>
      <Input
        for="name"
        type="text"
        msg="Name"
        errMsg="Insert correct name"
        validate={validateName}
        ref={nameRef}
        className={classes.Input}
      />
      <Input
        for="email"
        type="text"
        msg="E-mail"
        errMsg="Insert correct email"
        validate={validateMail}
        ref={emailRef}
        className={classes.Input}
      />
      <Input
        for="address"
        type="text"
        msg="Street address"
        errMsg="Insert correct street address"
        validate={validateAddress}
        ref={addressRef}
        className={classes.Input}
      />
      <Input
        for="city"
        type="text"
        msg="City"
        errMsg="Insert correct city name"
        validate={validateCity}
        ref={cityRef}
        className={classes.Input}
      />
      <button>Place order</button>
      <button type="button" onClick={props.onCancel}>
        Cancel
      </button>
    </form>
  );
}
