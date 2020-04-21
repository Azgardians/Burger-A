import React,{Component} from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Aux from "../../Hoc/Aux";
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
class Layout extends Component {
    state={
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }
    sideDrawerOpenHandler = () => {
        // this.setState({showSideDrawer: true})
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
        
    }
    render(){
        return(
            <Aux>
                <Toolbar show={this.sideDrawerOpenHandler}/>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </Aux>
        )    
    }   
}

export default Layout;