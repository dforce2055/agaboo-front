import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';

//Imports agregados
import {IconButton, Button } from '@material-ui/core';
import CustomerController from '../../../../controllers/Customer';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {cliente} = props;
  //const {setUpdateList} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseAceptDelete = () => {    
    let valor=CustomerController.deleteCustomer(cliente);
    console.log("muestro que devuelve en compoente => ",valor)
    //setUpdateList(true);
    setOpen(false);
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
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro de querer eliminar el cliente?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se eliminira el cliente de la base de datos.
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