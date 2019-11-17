import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";
//ICONOS DE PRODUCTOS
import StoreIcon from '@material-ui/icons/Store';
//ICONOS PEDIDOS
import DoneOtulineIcon from '@material-ui/icons/DoneOutline';
//ICONOS DE MANTENIMIENTO
import BuildIcon from '@material-ui/icons/Build';

function ListLogistics(props){
    const {history} = props;
    const [productos, setProductos] = React.useState(false);
    
    function handleClickProductos() { 
        setProductos(!productos);
      }

    return(
        <>
    {/* ******************************LISTA PRODUCTOS********************************** */}
    <List>
        <ListItem button onClick={handleClickProductos}>
        <ListItemIcon>         
            <StoreIcon/> 
        </ListItemIcon>
        <ListItemText primary="Productos" onClick ={ () => history.push('/tableProduct')} /> 
        </ListItem>
    </List>
    {/* ******************************LISTA PEDIDOS********************************** */}
        <List component="div" disablePadding>
        <ListItem button onClick ={ () => history.push('/pedidosListos')}>
            <ListItemIcon>
            <DoneOtulineIcon/>
            </ListItemIcon>
            <ListItemText primary="Pedidos listos" />
        </ListItem>
        </List>
    {/* ******************************LISTA MANTENIMIENTOS A REALIZAR********************************** */}
    <List>
    <ListItem button>
        <ListItemIcon>      
        <BuildIcon/>
        </ListItemIcon> 
    <ListItemText primary="Mantenimientos a realizar" />      
    </ListItem>

    </List>
    </>
    )
}
export default withRouter(ListLogistics);