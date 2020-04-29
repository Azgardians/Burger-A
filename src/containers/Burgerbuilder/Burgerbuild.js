import React,{Component} from 'react';
import Aux from '../../Hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';



const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

class Burgerbuilder extends Component{
    state = {
        ingredients:null,
            // salad:0,
            // bacon:0,
            // cheese:0,
            // meat:0
        totalPrice: 4,
        purchasable:false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('https://burger-app-52ae3.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data});
            });
    }
    
    updatePurchaseState =(ingredients)=> {
        const sum = Object.keys(ingredients)
            .map(igkey => {
                return ingredients[igkey];
            })
            .reduce((sum,el) => {
                return sum+el;
            },0);
          
        this.setState({purchasable: sum > 0 });
       
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
        
        this.setState({loading : true});
        const order = {
            ingredients : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : "Keaton",
                age : "21",
                address : "First Street 20 Avenue",
                email : "keaton21@gmail.com"
            },
            deliveryMode : "Fastest"
        }
        axios.post('/orders.json' , order)
            .then(response => {
                console.log (response);
                this.setState({purchasing: false , 
                    ingredients:{salad:0,bacon:0,cheese:0,meat:0},
                    totalPrice: 4,
                    purchasable: false,
                    loading:false});
            })
            .catch(error => console.log(error));
                
    }
    render(){

        const disabledInfo={
            ...this.state.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = <Spinner />;
        let orderSummary = null;
        if(this.state.ingredients){
            burger = (
                <Aux>
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
            orderSummary = <OrderSummary 
            ingredients = {this.state.ingredients}
            price = {this.state.totalPrice} 
            purchaseCancelled = {this.removePurchaseHandler}
            purchaseContinued = {this.continuePurchaseHandler}/>;
        }
        if (this.state.loading){
            orderSummary = <Spinner/>;
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.removePurchaseHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default Burgerbuilder;