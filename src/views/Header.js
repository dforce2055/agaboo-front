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
//ICONOS DE BOTONES
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import ContactsIcon from '@material-ui/icons/Contacts';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import StoreIcon from '@material-ui/icons/Store';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
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
}));

const theme2 = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#3fb5a5',
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        }
    },
    MuiCheckbox:{
      colorSecondary: {
        color: '#42cfd6',
        '&$checked': {
          color: '#42cfd6',
        },
      }
    },
    
}
});

export default function Navbar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen, hide] = React.useState(false);

  const [visible , setVisible] = React.useState(false);
  const [visibleProduct , setVisibleProduct] = React.useState(false);
  /*Hook que permite en clases Function utilizar 
    state y cambiar su estado. Es decir el visible es el estado y 
    el setVisible es sinonimo de this.setState*/


  function handleClick() { 
    setVisible(!visible);
  }

  function handleClickProduct () { 
    setVisibleProduct(!visibleProduct);
  }

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


  
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
          <Typography align = {"center"} variant="h6" noWrap>
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
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : 
            <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />

        <List>
        
        <ListItem button onClick={handleClick}> {/*Sub boton en forma de List*/}
          <ListItemIcon> {/*Se utiliza para encerrar el icono que contrenda al lado el boton -->>ABRIENDO*/}          
              <PeopleIcon /> {/*IMAGEN DEL BOTON*/}
          </ListItemIcon> {/*Se utiliza para encerrar el icono que contrenda al lado el boton -->>CERRANDO*/}
        <ListItemText primary="Clientes" />  {/*Nombre del boton*/}
        {visible ? <ExpandLess /> : <ExpandMore />} {/*Si el valor visible es verdadero toma el icono ExpandLess. En cambio si el valor es false toma el icono ExpandMore*/}      
      </ListItem> 
{/*Collapse permite generar desplegables. Para mas informacion leer URL ubicada en import*/}
      <Collapse in={visible} timeout="auto" unmountOnExit> 
        <List component="div" disablePadding> {/*disablePadding-->Si true, el relleno vertical se eliminará de la lista.*/}
          <ListItem button className={classes.nested}> {/*nested es el CSS que permite que este un poco mas a la izquierda que el boton de padre.*/}
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Cliente" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar Cliente" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PersonAddDisabledIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar Cliente" />
          </ListItem>
        </List>
        
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ContactsIcon/>
            </ListItemIcon>
            <ListItemText primary="Listar Clientes" />
          </ListItem>
        </List>
      </Collapse>

      <ListItem button onClick={ handleClickProduct}> {/*Sub boton en forma de List*/}
          <ListItemIcon> {/*Se utiliza para encerrar el icono que contrenda al lado el boton -->>ABRIENDO*/}          
              <StoreIcon /> {/*IMAGEN DEL BOTON*/}
          </ListItemIcon> {/*Se utiliza para encerrar el icono que contrenda al lado el boton -->>CERRANDO*/}
        <ListItemText primary="Productos" />  {/*Nombre del boton*/}
        {visibleProduct ? <ExpandLess /> : <ExpandMore />} {/*Si el valor visible es verdadero toma el icono ExpandLess. En cambio si el valor es false toma el icono ExpandMore*/}      
      </ListItem> 
      

      <Collapse in={visibleProduct} timeout="auto" unmountOnExit> 
        <List component="div" disablePadding> {/*disablePadding-->Si true, el relleno vertical se eliminará de la lista.*/}
          <ListItem button className={classes.nested}> {/*nested es el CSS que permite que este un poco mas a la izquierda que el boton de padre.*/}
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Crear Cliente" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Modificar Cliente" />
          </ListItem>
        </List>

        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PersonAddDisabledIcon />
            </ListItemIcon>
            <ListItemText primary="Eliminar Cliente" />
          </ListItem>
        </List>
        
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ContactsIcon/>
            </ListItemIcon>
            <ListItemText primary="Listar Clientes" />
          </ListItem>
        </List>
      </Collapse>

        </List>         
       
      </Drawer>
      
      <main /*Esta clase, permite que cada vez que abramos el componente Drawers, los componentes que esten dentro de main, se correran al costado. */
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />        
        {/*ACA METO TODOS LOS COMPONENTES*/}

      </main>
    </div>
    </MuiThemeProvider>
  );
}