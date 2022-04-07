import React from "react";
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>CozzyMeals</h1>
            <button>Cart</button>
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="Amazing meals"></img>
        </div>
    </React.Fragment>
};

export default Header;