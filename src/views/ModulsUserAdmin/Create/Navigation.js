import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List'; //https://material-ui.com/es/api/list/ --> Permite listar componentes
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
//Para la utilizacion del boton desplegable
import ExpandLess from '@material-ui/icons/ExpandLess'; //Icono de flecha expandida
import ExpandMore from '@material-ui/icons/ExpandMore'; //Icono de flecha
import Collapse from '@material-ui/core/Collapse'; //https://material-ui.com/components/transitions/ --> Componente que permite desplegar
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Checkout from './Checkout';
import { withRouter } from "react-router-dom";
//ICONOS DE BOTONES
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
  import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
  import AssignmentIcon from '@material-ui/icons/Assignment';
  import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
  //ICONOS PEDIDOS
  import DoneOtulineIcon from '@material-ui/icons/DoneOutline';
  import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
  import ArchiveIcon from '@material-ui/icons/Archive';
  //ICONOS DE ESTADOS DE CUENTA
  import LocalAtmIcon from '@material-ui/icons/LocalAtm';
  //ICONOS DE MANTENIMIENTO
  import BuildIcon from '@material-ui/icons/Build';




const drawerWidth = 240;


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: { //CLASE CSS DE BOTON DESPLEGADO
    paddingLeft: theme.spacing(4),
  },
  title: {
    flexGrow: 0.87,
  },
}));

const theme2 = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#3fb5a5',
      }
    },
    MuiCheckbox:{
      colorSecondary: {
        color: '#42cfd6',
        '&$checked': {
          color: '#42cfd6',
        },
      },
    },
    MuiTypography:{
      overline:{
        fontSize: '0.9rem',
      },
    },
    MuiSvgIcon:{
      colorPrimary:{
        color:'#16984a',
      },
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      fullWidth: {
          width: '200%'
      },
  },
    
}
});

<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
function Navbar(props) {
=======
function NavbarDeleteUpdate(props) {
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {history} = props;

<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
  const [visible, setVisible] = React.useState(true);
  
=======
  const [visible, setVisible] = React.useState(false);
  const [productos, setProductos] = React.useState(false);
  const [stock, setStock] = React.useState(false);
  const [pedidos, setPedidos] = React.useState(false);
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
  /*Hook que permite en clases Function utilizar 
    state y cambiar su estado. Es decir el visible es el estado y 
    el setVisible es sinonimo de this.setState*/

  function handleClick() { 
    setVisible(!visible);
  }

<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
=======
  function handleClickProductos() { 
    setProductos(!productos);
  }

  function handleClickStock() { 
    setStock(!stock);
  }

  function handleClickPedidos() { 
    setPedidos(!pedidos);
  }

>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
=======
  
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
  return (
    <MuiThemeProvider theme={theme2}>
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center" className={classes.title} onClick ={ () => history.push('/mainMenu')}>
            AGABOO
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
        
=======
{/* *********************************** LISTA CLIENTES ****************************************** */}
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
        <List>
        
        <ListItem button onClick={handleClick}>
          <ListItemIcon>         
              <PeopleIcon />
          </ListItemIcon>
        <ListItemText primary="Clientes" />
        {visible ? <ExpandLess /> : <ExpandMore />}      
      </ListItem> 
      <Collapse in={visible} timeout="auto" unmountOnExit> 
<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
        <List component="div" disablePadding> {/*disablePadding-->Si true, el relleno vertical se eliminará de la lista.*/}
          <ListItem button className={classes.nested} onClick ={ () => history.push('/registrarCliente')}>  {/*nested es el CSS que permite que este un poco mas a la izquierda que el boton de padre.*/}
=======
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} >
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
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
{/* *********************************** LISTA PRODUCTOS ****************************************** */}
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
          <ListItem button className={classes.nested} onClick ={ () => history.push('/createProduct')}> 
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Productos"/>
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <BallotIcon/>
            </ListItemIcon>
            <ListItemText primary="Modificar/Eliminar Productos" />
          </ListItem>
        </List>
      </Collapse>

<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
        </List>     
       
      </Drawer>
      <main
=======
      </List>
{/* *********************************** LISTA STOCK ****************************************** */}
      <List>
        <ListItem button onClick={handleClickStock}> 
          <ListItemIcon>      
          <AssignmentIcon/>
          </ListItemIcon> 
        <ListItemText primary="Stock" />  
        {stock ? <ExpandLess /> : <ExpandMore />}      
      </ListItem> 

      <Collapse in={stock} timeout="auto" unmountOnExit> 
        <List component="div" disablePadding> 
          <ListItem button className={classes.nested}> 
            <ListItemIcon>
              <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Disponibles"/>
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AssignmentLateIcon/>
            </ListItemIcon>
            <ListItemText primary="Alquilados" />
          </ListItem>
        </List>
      </Collapse>

      </List> 
{/* *********************************** LISTA PEDIDOS ****************************************** */}
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
          <ListItem button className={classes.nested}>
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
{/* *********************************** LISTA ESTADO DE CUENTA ****************************************** */}
      <List>
        <ListItem button> 
          <ListItemIcon>      
          <LocalAtmIcon/>
          </ListItemIcon> 
        <ListItemText primary="Estado de cuenta" />      
      </ListItem>

      </List>
{/* *********************************** LISTA MANTENIMIENTOS A REALIZAR ****************************************** */}
      <List>
        <ListItem button> 
          <ListItemIcon>      
          <BuildIcon/>
          </ListItemIcon> 
        <ListItemText primary="Mantenimientos a realizar" />      
      </ListItem>

      </List>
       
      </Drawer>
      <main /*Esta clase, permite que cada vez que abramos el componente Drawers, los componentes que esten dentro de main, se correran al costado. */
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js
        <Checkout></Checkout>
=======
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
      </main>
    </div>
    </MuiThemeProvider>
  );
}
<<<<<<< HEAD:src/views/ModulsUserAdmin/Create/Navigation.js

export default withRouter(Navbar);
=======
export default withRouter(NavbarDeleteUpdate);
>>>>>>> Pedidos:src/views/ModulOrders/Ready/Navigation.js
