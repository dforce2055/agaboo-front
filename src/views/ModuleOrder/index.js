import React from 'react';
import Navbar from '../Header/Navigation'
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import { fade,makeStyles } from '@material-ui/core/styles';
import SimpleBottomNavigation from '../Footer/Footer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Paper,CardHeader,Grid } from '@material-ui/core';
import IndexTable from './Table/index.js';
import Filter from './Filter/index.js';

const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1,
    },
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
        <div className={classes.root}>
            <header>
                <Navbar/>
            </header>
            <Paper className={classes.espacio}>
                <h1>
                    <CardHeader titleTypographyProps = {'titulo'}title="Pedidos" />
                </h1>
            </Paper>

            <div className={classes.espacio}>
            <Grid
                container 
                direction="row" 
                justify="flex-end" 
                alignItems="baseline" 
            >
                <Filter/>
            </Grid> 
            </div>         

            <Paper className={classes.espacio}>
                <IndexTable/>
            </Paper>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderReady);