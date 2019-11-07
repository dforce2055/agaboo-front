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
//ICONOS DE USUARIOS
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
//ICONOS DE CLIENTES
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ContactsIcon from '@material-ui/icons/Contacts';
import PeopleIcon from '@material-ui/icons/People';
//ICONOS DE PRODUCTOS
import StoreIcon from '@material-ui/icons/Store';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import BallotIcon from '@material-ui/icons/Ballot';
//ICONOS DE STOCK
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
// import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
// import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
//ICONOS PEDIDOS
import DoneOtulineIcon from '@material-ui/icons/DoneOutline';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ArchiveIcon from '@material-ui/icons/Archive';
//ICONOS DE ESTADOS DE CUENTA
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
//ICONOS DE MANTENIMIENTO
import BuildIcon from '@material-ui/icons/Build';

const useStyles = makeStyles(theme => ({
    nested: { //CLASE CSS DE BOTON DESPLEGADO
      paddingLeft: theme.spacing(4),
    },
  }));

function ListAdmin(props){
    const classes = useStyles();
    const {history} = props;
    const [visible, setVisible] = React.useState(false);
    const [productos, setProductos] = React.useState(false);
    const [pedidos, setPedidos] = React.useState(false);

    function handleClick() { 
        setVisible(!visible);
      }

    function handleClickProductos() { 
        setProductos(!productos);
      }
    
      function handleClickPedidos() { 
        setPedidos(!pedidos);
      }

    return(
        <>
        {console.log("lista admin")}
        {/* //******************************LISTA USUARIOS********************************** */}
        <List>
        <ListItem button onClick={() => history.push('/usuarios')}>
          <ListItemIcon>
            <UsersIcon />
          </ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      </List>
      {/* //******************************LISTA CLIENTES********************************** */}
      <List>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>         
            <PeopleIcon />
        </ListItemIcon>
      <ListItemText primary="Clientes" />
      {visible ? <ExpandLess /> : <ExpandMore />}      
      </ListItem> 
    <Collapse in={visible} timeout="auto" unmountOnExit> 
      <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick ={ () => history.push('/registrarCliente')}>
          <ListItemIcon>
            <GroupAddIcon />
          </ListItemIcon>
          <ListItemText primary="Crear Cliente"/>
        </ListItem>
      </List>
      
      <List component="div" disablePadding>
        <ListItem button className={classes.nested} onClick ={ () => history.push('/bmUsers')}>
          <ListItemIcon>
            <ContactsIcon/>
          </ListItemIcon>
          <ListItemText primary="Modificar/Eliminar Clientes" />
        </ListItem>
      </List>
    </Collapse>
  </List>
  {/* //******************************LISTA PRODUCTOS********************************** */}
  {/* <List>
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

</List> */}

{/* PRUEBA DE IVAN */}
  <List>
    <ListItem button onClick={handleClickProductos}>
      <ListItemIcon>         
        <StoreIcon/> 
      </ListItemIcon>
    <ListItemText primary="Productos" onClick ={ () => history.push('/tableProduct')} /> 
    </ListItem> 
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
  {/* //******************************LISTA ESTADO DE CUENTA********************************** */}
  <List>
    <ListItem button> 
      <ListItemIcon>      
      <LocalAtmIcon/>
      </ListItemIcon> 
    <ListItemText primary="Estado de cuenta" />      
  </ListItem>

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
export default withRouter(ListAdmin);