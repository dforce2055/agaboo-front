import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogAcept(props) {
  const {mostrarDialog} = props;
  const {handleClose} = props;

  function handleCloseDialog(){
    handleClose();
  }

  return (
    <div>
      <Dialog
        open={mostrarDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cliente modificado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se modifico el cliente en la base de datos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            ACEPTAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
