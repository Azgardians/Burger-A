import React,{Component} from 'react';
import Aux from '../../Hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

class Burgerbuilder extends Component{
    state = {
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable:false,
        purchasing: false
    }
    updatePurchaseState =(ingredients)=> {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum,el) => {
                return sum+el;
            },0);
            console.log(sum);
        this.setState({purchasable: sum > 0 });
        console.log(this.state.purchasable);
    }
    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeletion = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeletion;
        this.setState({totalPrice: newPrice , ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler= () => {
        this.setState({purchasing: true});
    }
    removePurchaseHandler = () => {
        this.setState({purchasing: false}); 
    }
    continuePurchaseHandler = () => {
        alert('your order has been registered');
        this.setState({purchasing: false , 
                ingredients:{salad:0,bacon:0,cheese:0,meat:0},
                totalPrice: 4,
                purchasable: false});
    }
    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}>
                    <OrderSummary 
                    ingredients = {this.state.ingredients}
                    price = {this.state.totalPrice} 
                    purchaseCancelled = {this.removePurchaseHandler}
                    purchaseContinued = {this.continuePurchaseHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                    purchasable={this.state.purchasable} />
            </Aux>
        );
    }
}

export default Burgerbuilder;