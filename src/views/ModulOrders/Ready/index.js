import React from 'react';
import './OrderReady.css';
import NavbarDeleteUpdate from './Navigation'
//import CustomizedTables from './OrdersTable';
import EnhancedTable from './OrdersTable2';
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

export default function OrderReady() {

    return (
        <div>
            <MuiThemeProvider theme={theme}>
            <header>
                <NavbarDeleteUpdate/>
            </header>
            <div className='contenido'>
                {/* <Typography variant="overline" align="left">
                    Pedidos pendientes de confirmación
                </Typography> */}
                {/* <CustomizedTables/> */}
                <EnhancedTable/>
            </div>
            </MuiThemeProvider>
        </div>
        
    )
}