import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import ListAdmin from './ListAdmin';
import ListLogistics from './ListLogistics';
import DashboardIcon from '@material-ui/icons/Dashboard';
import firebase from '../../config/firebase';
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
    flexGrow: 1,
    fontFamily: 'Quicksand',
    fontSize: '28px',
  },
}));


const theme2 = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiAppBar: {
      colorPrimary: {
        background: 'linear-gradient(45deg, #2c7369 20%, #3fb5a5 90%)',
        //backgroundColor: '#3fb5a5',
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
}
});

function Navbar(props) {

  React.useEffect(() => {
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []);


  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {history} = props;
  let userRole = checkRoleAdmin();

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  async function checkRoleAdmin(){
    let role = await firebase.getCurrentUserRole();

    if(role==="ADMIN"){
      return true;
    }else if(role==="LOGISTICS"){
      return false;
    }
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
          <Typography variant="h6" align="center" className={classes.title}>
            agaboo
          </Typography>

          {
            (widthWindow > 450) &&
              <IconButton 
                title="Menu Principal" 
                aria-label="display more actions" 
                edge="end" 
                color="inherit"
                onClick ={ () => history.push('/mainMenu')}
              >
                <DashboardIcon fontSize='large'/>
              </IconButton>
          }
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
         {userRole ? <ListAdmin/> : <ListLogistics/>}
      </Drawer>
      <main /*Esta clase, permite que cada vez que abramos el componente Drawer, los componentes que esten dentro de main, se correran al costado. */
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
    </MuiThemeProvider>
  );
}
export default withRouter(Navbar);