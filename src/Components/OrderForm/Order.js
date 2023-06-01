import React, { useRef, useState } from "react";

import classes from "./Order.module.css";
import Input from "./Input";

// const initialValidity = {
//   name: false,
//   email: false,
//   address: false,
//   city: false,
// };

// const dispatchValidity = (prevState, action) => {
// if (action.type === "VALIDATE") {
// return { ...prevState };
// }
//
// return initialValidity;
// };

export default function Order(props) {
  // const [validity, dispatch] = useReducer(dispatchValidity, initialValidity);
  const [formInvalid, setFormInvalid] = useState(true);
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
      /^([a-zA-Z,]+\s)+\d{1,4}\/\d{1,4}|[a-zA-Z,]+\s+\d{1,4}\/\d{1,4}|[a-zA-Z,]+\s+\d{1,4}|([a-zA-Z,]+\s)+\d{1,4}$/;
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

  const checkFormValidity = () => {
    setFormInvalid(
      !validateName(nameRef.current ? nameRef.current.value : "") ||
        !validateMail(emailRef.current ? emailRef.current.value : "") ||
        !validateAddress(addressRef.current ? addressRef.current.value : "") ||
        !validateCity(cityRef.current ? cityRef.current.value : "")
    );
  };

  return (
    <form className={classes.form} onSubmit={onOrder}>
      <Input
        for="name"
        type="text"
        msg="Name"
        errMsg="Insert correct name"
        validate={validateName}
        onCheck={checkFormValidity}
        ref={nameRef}
        className={classes.Input}
        classNameInvalid={classes.invalid}
      />
      <Input
        for="email"
        type="text"
        msg="E-mail"
        errMsg="Insert correct email"
        validate={validateMail}
        onCheck={checkFormValidity}
        ref={emailRef}
        className={classes.Input}
        classNameInvalid={classes.invalid}
      />
      <Input
        for="address"
        type="text"
        msg="Street address"
        errMsg="Insert correct street address"
        validate={validateAddress}
        onCheck={checkFormValidity}
        ref={addressRef}
        className={classes.Input}
        classNameInvalid={classes.invalid}
      />
      <Input
        for="city"
        type="text"
        msg="City"
        errMsg="Insert correct city name"
        validate={validateCity}
        onCheck={checkFormValidity}
        ref={cityRef}
        className={classes.Input}
        classNameInvalid={classes.invalid}
      />
      <div className={classes.actions}>
        <button disabled={formInvalid} className={classes["button--alt"]}>
          Place order
        </button>
        <button
          type="button"
          onClick={props.onCancel}
          className={classes.button}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
