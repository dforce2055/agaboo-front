import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";
//ICONOS DE USUARIOS
import UsersIcon from '@material-ui/icons/SupervisedUserCircle';
//ICONOS DE CLIENTES
import PeopleIcon from '@material-ui/icons/People';
//ICONOS DE PRODUCTOS
import StoreIcon from '@material-ui/icons/Store';
//ICONOS DE STOCK
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
//ICONOS DE ESTADOS DE CUENTA
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
//ICONOS DE MANTENIMIENTO
import BuildIcon from '@material-ui/icons/Build';

function ListAdmin(props){
    const {history} = props;
    const [productos, setProductos] = React.useState(false);

    function handleClickProductos() { 
        setProductos(!productos);
      }

    return(
        <>
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
        <ListItem button onClick={() => history.push('/tablaClientes')}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Clientes" />
        </ListItem>
      </List>
  
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
            <ListItem button onClick={() => history.push('/pedidosListos')}>
              <ListItemIcon>
                <LocalShippingIcon />
              </ListItemIcon>
              <ListItemText primary="Pedidos" />
            </ListItem>
          </List>
          
  {/* //******************************LISTA ESTADO DE CUENTA********************************** */}
  <List>
    <ListItem button onClick={() => history.push('/EstadoDeCuenta')}> 
      <ListItemIcon>      
      <LocalAtmIcon/>
      </ListItemIcon> 
    <ListItemText primary="Estado de cuenta" />      
  </ListItem>

  </List>
  {/* //******************************LISTA MANTENIMIENTOS A REALIZAR********************************** */}
  <List>
    <ListItem button onClick={() => history.push('/servicios')}> 
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