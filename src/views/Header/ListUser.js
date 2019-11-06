import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess'; //Icono de flecha expandida
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withRouter } from "react-router-dom";
//ICONOS DE PRODUCTOS
import StoreIcon from '@material-ui/icons/Store';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BallotIcon from '@material-ui/icons/Ballot';
//ICONOS DE STOCK
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import AssignmentIcon from '@material-ui/icons/Assignment';
//ICONOS PEDIDOS
import DoneOtulineIcon from '@material-ui/icons/DoneOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArchiveIcon from '@material-ui/icons/Archive';
//ICONOS DE MANTENIMIENTO
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
    nested: { //CLASE CSS DE BOTON DESPLEGADO
      paddingLeft: theme.spacing(4),
    },
  }));

function ListUser(props){
    const classes = useStyles();
    const {history} = props;
    const [productos, setProductos] = React.useState(false);
    const [pedidos, setPedidos] = React.useState(false);
    
    function handleClickProductos() { 
        setProductos(!productos);
      }
    
      function handleClickPedidos() { 
        setPedidos(!pedidos);
      }

    return(
        <>
        {/* //******************************LISTA PRODUCTOS********************************** */}
        <List>
        <ListItem button onClick={handleClickProductos}>
            <ListItemIcon>
            <StoreIcon/>
            </ListItemIcon>
        <ListItemText primary="Productos" /> 
        {productos ? <ExpandLess /> : <ExpandMore />}     
        </ListItem> 

        <Collapse in={productos} timeout="auto" unmountOnExit> 
        
        <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick ={ () => history.push('/stock')}>
            <ListItemIcon >
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Stock"  />
            </ListItem>
        </List>
        <List component="div" disablePadding> 
            <ListItem button className={classes.nested} onClick ={ () => history.push('/createProduct')}> 
            <ListItemIcon>
                <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Productos"/>
            </ListItem>
        </List>

        <List component="div" disablePadding>
            <ListItem button className={classes.nested} onClick ={ () => history.push('/tableProduct')}>
            <ListItemIcon >
                <BallotIcon/>
            </ListItemIcon>
            <ListItemText primary="Modificar/Eliminar Productos"  />
            </ListItem>
        </List>

        </Collapse>

        </List>
        <List>
    <ListItem button onClick={handleClickPedidos}> 
      <ListItemIcon>      
      <LocalShippingIcon/>
      </ListItemIcon> 
    <ListItemText primary="Pedidos" />  
    {pedidos ? <ExpandLess /> : <ExpandMore />}      
  </ListItem> 

  <Collapse in={pedidos} timeout="auto" unmountOnExit> 
    <List component="div" disablePadding> 
      <ListItem button className={classes.nested} onClick ={ () => history.push('/registrarPedido')}> 
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Registrar pedido"/>
      </ListItem>
    </List>

    <List component="div" disablePadding>
      <ListItem button className={classes.nested} onClick ={ () => history.push('/eliminarPedidos')}>
        <ListItemIcon>
          <DeleteOutlineIcon/>
        </ListItemIcon>
        <ListItemText primary="Eliminar pedido" />
      </ListItem>
    </List>

    <List component="div" disablePadding>
      <ListItem button className={classes.nested} onClick ={ () => history.push('/pedidosListos')}>
        <ListItemIcon>
          <DoneOtulineIcon/>
        </ListItemIcon>
        <ListItemText primary="Pedidos listos" />
      </ListItem>
    </List>
  </Collapse>

  </List>
  {/* //******************************LISTA PEDIDOS********************************** */}
    <List>
        <ListItem button onClick={handleClickPedidos}> 
        <ListItemIcon>      
        <LocalShippingIcon/>
        </ListItemIcon> 
        <ListItemText primary="Pedidos" />  
        {pedidos ? <ExpandLess /> : <ExpandMore />}      
    </ListItem> 

    <Collapse in={pedidos} timeout="auto" unmountOnExit> 
        <List component="div" disablePadding> 
        <ListItem button className={classes.nested} onClick ={ () => history.push('/registrarPedido')}> 
            <ListItemIcon>
            <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Registrar pedido"/>
        </ListItem>
        </List>

        <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick ={ () => history.push('/eliminarPedidos')}>
            <ListItemIcon>
            <DeleteOutlineIcon/>
            </ListItemIcon>
            <ListItemText primary="Eliminar pedido" />
        </ListItem>
        </List>

        <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick ={ () => history.push('/pedidosListos')}>
            <ListItemIcon>
            <DoneOtulineIcon/>
            </ListItemIcon>
            <ListItemText primary="Pedidos listos" />
        </ListItem>
        </List>
    </Collapse>

    </List>
    {/* //******************************LISTA MANTENIMIENTOS A REALIZAR********************************** */}
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
export default withRouter(ListUser);