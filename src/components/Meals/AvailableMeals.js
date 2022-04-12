import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./SingleMeal/MealItem";
import { useEffect } from "react";
import { useState} from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-request-c314b-default-rtdb.firebaseio.com/meals.json"
      );
      const data = await response.json();
      const fetchedMeals = [];
      for (const key in data) {
        const meal = {
          id: [key],
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        };
        fetchedMeals.push(meal);
      }
      setMeals(fetchedMeals);
    };
    fetchMeals();
  }, []);
  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
