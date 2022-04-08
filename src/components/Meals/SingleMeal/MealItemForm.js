import Input from "../../UI/Input";
import { useState, useRef } from "react";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const quantityInputRef = useRef();
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const submitHandler = (e) => {
    e.preventDefault();
    const enteredQuantity = quantityInputRef.current.value;
    const enteredQuantityNumber = +enteredQuantity;

    if (
      enteredQuantity.trim().length === 0 ||
      enteredQuantity < 1 ||
      enteredQuantity > 5
    ) {
        setQuantityIsValid(false);
      return;
    }

    props.onAddToCart(enteredQuantityNumber);
  };
  // console.log(props.meal);
  return (
    <form className={classes.form}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: "quantity",
          type: "number",
          min: "1",
          max: "5",
          defaultValue: "1",
          step: "1",
        }}
      />
      {!quantityIsValid && <p>Enter a valid quantity</p>}
      <button onClick={submitHandler}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
