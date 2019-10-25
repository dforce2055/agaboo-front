import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonGroup } from '@material-ui/core/';
import { withRouter } from "react-router-dom";


function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const {history} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push('/mainMenu');
  };

  return (
    <div>
      <ButtonGroup
        variant="text"
        size="large"
        aria-label="large contained  button group"
      >
        <Button
          label={"Registrar Usuario"}
          color="primary"
          variant="contained"
          type = " submit "
          onClick={handleClickOpen}
        >
          Guardar
        </Button>
      </ButtonGroup>
      <Dialog
        // open={mostrarDialog}
        // onClose={handleCloseDialog}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Usuario guardado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se agregó un usuario a la base de datos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            ACEPTAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(AlertDialog);