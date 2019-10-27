import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HttpsTwoToneIcon from '@material-ui/icons/HttpsTwoTone';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import firebase from '../../config/firebase';

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

}});

export default function ResponsiveDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function logOut(){
    try {
        handleClose();
        await firebase.logout();
        props.history.replace('/');
    } catch (error) {
        alert(error.message)
    }
}

  return (
    <div>
    <MuiThemeProvider theme={theme}>
    <BottomNavigationAction label="Cerrar Sesión" icon={<HttpsTwoToneIcon />} onClick ={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirmar cierre de sesión"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro que desea cerrar sesión?.
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
    </MuiThemeProvider>
    </div>
  );
}
