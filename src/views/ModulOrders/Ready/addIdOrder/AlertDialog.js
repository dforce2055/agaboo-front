import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
  const {open} = props;
  const {handleClose} = props;
  const {saveOrder} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Estas seguro de querer guardar estos datos?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El listado de productos insertado se almacenara en la base de datos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            cancelar
          </Button>
          <Button onClick={saveOrder} color="primary" autoFocus>
            aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
