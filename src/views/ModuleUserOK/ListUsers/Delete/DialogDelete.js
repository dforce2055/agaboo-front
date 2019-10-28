import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

//Imports agregados
import {IconButton, Button } from '@material-ui/core';
import UserController from '../../../../controllers/User';
import { withRouter } from "react-router-dom";

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {history} = props;
  const {usuario} = props;
  const {updateStateArray} = props;
  //const {setUpdateList} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseAceptDelete = () => {
    UserController.deleteUser(usuario);
    updateStateArray();
    setOpen(false);
    history.push('/usuarios')
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>      
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea eliminar el usuario seleccionado?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El usuario seleccionado será eliminado del sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleCloseAceptDelete} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default withRouter(AlertDialog);