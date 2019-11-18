import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';

//Imports agregados
import {IconButton, Button } from '@material-ui/core';
import CustomerController from '../../../../controllers/Customer';

export default function DialogDelete(props) {
  const [open, setOpen] = React.useState(false);
  const {cliente} = props; //Cliente el cual selecciono para eliminar
  const {updateStateArray} = props; //Si se elimina, se actualiza el array de clientes
  //const {setUpdateList} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseAceptDelete = () => {
    CustomerController.deleteCustomer(cliente.id);
    updateStateArray();
    setOpen(false);
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
         <DeleteIcon />
        </ListItemIcon>
        Eliminar pedido
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea eliminar el cliente seleccionado?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El cliente seleccionado será eliminado del sistema.
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