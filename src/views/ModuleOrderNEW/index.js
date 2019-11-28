import React from 'react';
import Navbar from '../Header/Navigation'
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../Footer/Footer';
import LatestOrders from './components/LatestOrders';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
const useStyles = makeStyles(theme => ({
    espacio:{
      margin: theme.spacing(3),
    }
  }));


function OrderNEW(props) {
    const classes = useStyles();
    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }

    return (
        <div>
            <header>
                <Navbar/>
            </header>
                
                <Paper className={classes.espacio}>
                    <h1>
                        <CardHeader titleTypographyProps = {'titulo'}title="Pedidos" />
                    </h1>
                </Paper>
                <Paper className={classes.espacio}>
                    <LatestOrders/>
                </Paper>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderNEW);