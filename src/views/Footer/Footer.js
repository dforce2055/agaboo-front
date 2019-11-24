import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ArrowBackIosTwoToneIcon from '@material-ui/icons/ArrowBackIosTwoTone';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import HttpsTwoToneIcon from '@material-ui/icons/HttpsTwoTone';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import firebase from '../../config/firebase';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2c7369 20%, #3fb5a5 90%)',
    bottom:'0',
    left:'0',
    right:'0',
    position:'fixed',
    zIndex: 1,
    height:'49px',
  },
});

const theme = createMuiTheme({ /* Plantilla de edicion */
    overrides: {
        MuiBottomNavigationAction:{
            root:{
                color: 'rgb(255, 255, 255)',
                maxWidth: '1000px',
                '&$selected':{
                color: '#ffffff',
                }
            },
            label:{
              fontSize: '0.875rem',
            },
        },
        MuiButton:{
          containedSecondary:{
            backgroundColor:'#ff0000d6',
            '&:hover': {
              backgroundColor: '#ff0000',
              "@media (hover: none)": {
                backgroundColor: "#ff0000"
              },
            },
          },
        },

  }});

function SimpleBottomNavigation(props) {

  React.useEffect(() => {
    console.log("useEffect");
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []); //Permite solo ejecutar cuando algun evento se realize

  

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const {history} = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function logOut(){
    try {
        await firebase.logout();
        localStorage.removeItem('userRole')
        props.history.replace('/');
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <div className="footer">
        <MuiThemeProvider theme={theme}>
              {
                (widthWindow < 450) ? 
                  <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    showLabels
                    className={classes.root}
                  >
                <BottomNavigationAction label="Volver" icon={<ArrowBackIosTwoToneIcon />} onClick ={ () => history.goBack()}/>
                <BottomNavigationAction label="Menu Principal" icon={<HomeTwoToneIcon />} onClick ={ () => history.push('/mainMenu')}/>
                <BottomNavigationAction label="Cerrar Sesión" icon={<HttpsTwoToneIcon />} onClick ={handleClickOpen}/>
              
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    maxWidth="xl"
                  >
                    <DialogTitle id="responsive-dialog-title">{"Confirmar cierre de sesión"}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Está seguro que desea cerrar sesión?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Cancelar
                      </Button>
                      <Button variant='contained' onClick={logOut} color="secondary" autoFocus startIcon={<HttpsTwoToneIcon />}>
                        Cerrar Sesion
                      </Button>
                    </DialogActions>
                  </Dialog>
                </BottomNavigation>
              :
              <span></span>
              }
        </MuiThemeProvider>
    </div>
  );
}

export default withRouter(SimpleBottomNavigation);
