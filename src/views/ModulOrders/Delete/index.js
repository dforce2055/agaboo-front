import React from 'react';
import './OrderDelete.css';
import Navbar from '../../Header/Navigation'
import CustomizedTables from './OrdersTable';
import Typography from '@material-ui/core/Typography';
import SimpleBottomNavigation from '../../Footer/Footer';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import StickyFooter from './StickyFooter';
const theme = createMuiTheme({
    overrides:{
        MuiTypography:{
            overline:{
            fontSize: '0.9rem',
            },
        },
    }
});

function DeleteOrder(props) {

    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }

    if (sessionStorage.userRole==="LOGISTICS"){ //si tiene rol de usuario de logistica
        alert('No tenes permiso para acceder a esta ventana')
        props.history.goBack();
    }

    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <header>
                <Navbar/>
            </header>
            <div className='contenido'>
                <Typography variant="overline" align="left">
                    Pedidos a eliminar
                </Typography>
                <CustomizedTables/>
            </div>
            <footer>
                <StickyFooter></StickyFooter>
            </footer>
            </MuiThemeProvider>
        </div>
        
    )
}

export default withRouter(DeleteOrder);