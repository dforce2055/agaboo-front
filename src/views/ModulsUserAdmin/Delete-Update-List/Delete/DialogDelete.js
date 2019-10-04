import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomerController from '../../../../controllers/Customer';

export default function AlertDialog(props) {
  const {botonEliminar} = props;
  const open = botonEliminar;
  const {handleClickDeleteClose} = props;  
  const [aceptarEliminacion,setAceptarEliminacion]=React.useState(false);
  const {dni} = props;
  console.log(dni);
  function deleteCustomer(){
    const {dni} = props;
    if(aceptarEliminacion === true){
      try {
        
          CustomerController.deleteCustomer(dni);
        
      } catch (error) {
        console.error("Error en front al invocar metodo de deleteCustomer.");      
      }
    }
  }

  const handleClose = () => {
    handleClickDeleteClose();
    deleteCustomer();    
  };

  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Quieres eliminar al usuario?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El cliente no se podra visualizar en el listado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            CANCELAR
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            ACEPTAR
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}