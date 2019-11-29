import React from 'react';
import Navbar from '../../../Header/Navigation'
import firebase from '../../../../config/firebase';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SimpleBottomNavigation from '../../../Footer/Footer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { CardHeader } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import CSSGrid from './CSSGrid';

const useStyles = makeStyles(theme => ({
    espacio:{
      margin: theme.spacing(3),
    }
  }));

function OrderReady(props) {
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
                <h1>HOAA</h1>
              </Paper>
              <div className={classes.espacio}>
                <CSSGrid/>
              </div>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderReady);