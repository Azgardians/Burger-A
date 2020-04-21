import React from 'react';

import classes from "./Logo.css";
import imageData from "../../assets/images/original.png";
const logo = (props) => (
    <div className= {classes.Logo}>
        <img src = {imageData} alt="My Burger"/>
    </div>
);

export default logo;