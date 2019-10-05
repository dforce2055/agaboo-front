import React from 'react';
import './OrderDelete.css';
import Navbar from '../../Header/Navigation'
import CustomizedTables from './OrdersTable';
import Typography from '@material-ui/core/Typography';
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

export default function DeleteOrder() {

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
            </MuiThemeProvider>
        </div>
        
    )
}