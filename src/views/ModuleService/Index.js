import React from 'react';
import Navbar from '../Header/Navigation'
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

//Import componentes
import TableService from './TableService.js';
import DenseTable from './NewTable.js';

const useStyles = makeStyles(theme => ({
    espacio:{
      margin: theme.spacing(3)
    }
  }));

function Service(props) {
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

            <div>
            <h1>Informacion</h1>
             <Paper className={classes.espacio}>
            <DenseTable/>
            </Paper>

            
            </div>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(Service);