import React , {Component} from "react";

import Order from "../../../components/Order/Order"
import axios from "../../../axios-orders"
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"
class Orders extends Component{
    state= {
        orders: [],
        loading:false
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then( res => {
                const fetchedOrders=[];
                for ( let key in res.data ){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({loading:true , orders: fetchedOrders});
            })
    }
    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order
                        price={order.price}
                        key={order.id}
                        ingredients={order.ingredients}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios);