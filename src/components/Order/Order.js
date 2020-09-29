import React from "react"

import classes from "./Order.css"
const order = (props) => {

    const ingredients = [];
    for (let ingredientName in props.ingredients){
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]        
        })
    }
    const orderSummary = ingredients.map(ig => {
        return(
            <span 
            key={ig.name}
            style={{
                textTransform:"capitalize",
                display:"inline-block",
                boxShadow:"0 2px 3px #eee",
                border:"2px solid #ccc",
                margin:"0 8px",
            }}>
                {ig.name} ({ig.amount})
            </span>
        )
    })
    return(
        <div className={classes.Order} >
            <p>Ingredients : {orderSummary} </p>
            <p>Price : <strong>USD {props.price} </strong> </p>

        </div>
    )
}

export default order;