import React, { Component } from 'react';


import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    componentWillMount () {
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query.entries())
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()){
            // console.log(param[0])
            // console.log(param[1])
            if( param[0] === 'price'){
                price = param[1];
            }else {
                ingredients[param[0]] = +param[1];
            }
        }
        console.log(price);
        this.setState({ingredients: ingredients , totalprice:price});
    }
    continueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    cancelHandler = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    continueHandler={this.continueHandler}
                    cancelHandler={this.cancelHandler}
                />
                <Route
                 path={this.props.match.path + "/contact-data"} 
                 render={ (props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalprice} {...props} />)}
                />
            </div>
        );
    }
}

export default Checkout;