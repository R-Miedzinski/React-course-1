import React, { useState } from "react";

const Input = (props, ref) => {
  const [currentValue, setCurrentValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const inputChangeHandler = (event) => {
    setCurrentValue(event.target.value);

    setIsValid(props.validate(event.target.value));
  };

  const inputBlurHandler = () => {
    setIsTouched(true);

    setIsValid(props.validate(currentValue));
  };

  const inputInvalid = !isValid && isTouched;

  const className = `${props.className} ${inputInvalid ? "invalid" : ""}`;

  return (
    <div className={className}>
      <label htmlFor={props.for}>{props.msg}</label>
      <input
        ref={ref}
        type={props.type}
        id={props.for}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
        value={currentValue}
      />
      {inputInvalid && <p className="error">{props.errMsg}</p>}
    </div>
  );
};

export default React.forwardRef(Input);
