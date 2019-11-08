import React from 'react';
import './OrderReady.css';
import Navbar from '../../Header/Navigation'
import EnhancedTable from './OrdersTable';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../../Footer/Footer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    overrides:{
        MuiTypography:{
            overline:{
            fontSize: '0.9rem',
            },
        },
    }
});

function OrderReady(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
      }

    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <header>
                <Navbar/>
            </header>
            <div className='contenido'>
                <EnhancedTable/>
            </div>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
            </MuiThemeProvider>
        </div>
        
    )
}

export default withRouter(OrderReady);