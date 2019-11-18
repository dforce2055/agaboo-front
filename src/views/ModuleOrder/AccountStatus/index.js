import React from 'react';
import Navbar from '../../Header/Navigation'
import firebase from '../../../config/firebase';
import { withRouter } from 'react-router-dom';
import SimpleBottomNavigation from '../../Footer/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import CumulativeTotal from './CumulativeTotal';
//Import componentes
import TableAccount from './TableAccount';

const useStyles = makeStyles(theme => ({
    espacio:{
      margin: theme.spacing(3),
    }
  }));

function AccountStatus(props) {
    const classes = useStyles();


    //Se utiliza para que cuando un pedido sea eliminado, se pueda actualizar el valor acumulado de los pedidos.
    const [reloadCumulativeTotal,setReloadCumulativeTotal] = React.useState(false);

    //Metodo que se utilizara en CumulativeTotal.js. Sirve para que no se este ejecutando siempre la llamada a la base de datos en CumulativeTotal
    const handleCloseReload = () =>{
        setReloadCumulativeTotal(false)
    }

    //Se llamara cuando un pedido sea cobrado y pondra en verdadero reloadCumulativeTotal.
    const handleOpenReload = () =>{
        setReloadCumulativeTotal(true)
    }

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
            <CumulativeTotal 
                handleCloseReload={handleCloseReload}
                handleOpenReload={handleOpenReload}
                reloadCumulativeTotal={reloadCumulativeTotal}
            />
            <Paper className={classes.espacio}>
            <TableAccount
                handleCloseReload={handleCloseReload}
                handleOpenReload={handleOpenReload}
            />
            </Paper>
            </div>
            <footer>
                <SimpleBottomNavigation/>
            </footer>
        </div>
        
    )
}

export default withRouter(AccountStatus);