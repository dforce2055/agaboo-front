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

import firebase from '../../config/firebase';
import HttpsTwoToneIcon from '@material-ui/icons/HttpsTwoTone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  footer: {
    marginTop: 'auto',
    marginBottom: theme.spacing(2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
}));

function ListLogistics(props){
    const classes = useStyles();
    const {history} = props;
    const [productos, setProductos] = React.useState(false);
    
    function handleClickProductos() { 
        setProductos(!productos);
      }

    var width = window.innerWidth

    async function logOut(){
      try {
          await firebase.logout();
          localStorage.removeItem('userRole')
          props.history.replace('/');
      } catch (error) {
          alert(error.message)
      }
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

    {
        (width > 450) &&
            <List className={classes.footer}>
            <ListItem button onClick={logOut}> 
                <ListItemIcon style={{color:'#fff'}}>      
                    <HttpsTwoToneIcon/>
                </ListItemIcon> 
                <ListItemText primary="Cerrar Sesion" style={{color:'#fff'}}/>
            </ListItem>
            </List>
    }

    </>
    )
}
export default withRouter(ListLogistics);