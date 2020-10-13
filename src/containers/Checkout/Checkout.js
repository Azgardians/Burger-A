import React, { Component } from 'react';

import {connect} from "react-redux"
import { Route } from 'react-router-dom'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
   
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
                    ingredients={this.props.ings}
                    continueHandler={this.continueHandler}
                    cancelHandler={this.cancelHandler}
                />
                <Route
                 path={this.props.match.path + "/contact-data"}
                 component={ContactData} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        ings : state.ingredients,
    }
}
export default connect(mapStateToProps)(Checkout);