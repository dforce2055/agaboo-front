import React from 'react';
import Navbar from '../../../Header/Navigation'
import firebase from '../../../../config/firebase';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import SimpleBottomNavigation from '../../../Footer/Footer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Paper,Typography,Grid,CardHeader } from '@material-ui/core';
import GridFather from './GridFather';

const useStyles = makeStyles(theme => ({
    espacio:{
      margin: theme.spacing(1),
    },
    tittle: {
    width:'300px',
    margin: theme.spacing(1),
    },
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
              {/* <Grid container justify='center'>
                <Paper className={classes.tittle} >
                  <Typography 
                    style={{background:'#318377',color:'#fff'}}
                    align='center'
                    variant='h5'
                    >Codigo de productos
                  </Typography>
                </Paper>
              </Grid> */}
              <Paper className={classes.espacio}>
                    <h1>
                        <CardHeader titleTypographyProps = {'titulo'}title="Detalle de pedido" />
                    </h1>
                </Paper>
                
              <div>
                <GridFather/>
              </div>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(OrderReady);