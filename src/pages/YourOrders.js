import React, {Component} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';
import LoginButton from './components/LoginButton';
import OrderSummary from "./components/OrderSummary";
import {firestoreConnect} from 'react-redux-firebase';
import {compose} from "redux";
import {connect} from "react-redux";
var css = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft:-12,
      marginRight: 20,
    },
};

class YourOrders extends Component{


        state = {
            pageTitle:'Your Orders'
        }


    render(){
        // var data = {
        //     discount: true,
        //     discountAmount: 100,
        //     discountPercentage: 2,
        //     grandTotal: 1200,
        //     order: [
        //         {
        //         amount: 1200,
        //         itemCode: "SSS",
        //         itemName: "NO2",
        //         quantity: 5,
        //         rate: 240
        //         }
        //     ],
        //     orderedBy: "",
        //     shop: "MM TRADERS",
        //     priceListCode: "JITHU",
        //     timestamp: "April 27, 2019"
        // };
        const {state,props} = this;
        console.log(props)
        return(
            <div className={props.classes.root}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton className={props.classes.menuButton} color="inherit" aria-label="Menu"  onClick={props.toggleSideMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={props.classes.grow}>
                        {state.pageTitle}
                    </Typography>
                    <LoginButton/>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    {(props.orders)?props.orders.map((order,key)=><OrderSummary data={order} key={key}/>):"Loading..."}
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        orders:state.firestore.ordered.orders
    }
}

export default compose(connect(mapStateToProps),firestoreConnect([
    {
        collection:"orders"
    }
]) ,withStyles(css))(YourOrders)