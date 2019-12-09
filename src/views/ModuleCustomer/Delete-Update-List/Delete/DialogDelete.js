import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import {MenuItem,Grid} from '@material-ui/core';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';

//Imports agregados
import {IconButton, Button } from '@material-ui/core';
import CustomerController from '../../../../controllers/Customer';

const themeMuiProvider = createMuiTheme({
  overrides: {
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        '&:hover': {
          backgroundColor: '#0ce8ca',
          "@media (hover: none)": {
            backgroundColor: "#0ce8ca"
          },
        },
      },
      containedSecondary: {
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  buttonLeft: {
    marginRight:'2px',
    marginLeft:'13px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },
}));

export default function DialogDelete({handleCloseMenuItem,cliente,updateStateArray}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleCloseAceptDelete = () => {
    CustomerController.deleteCustomer(cliente.id)
    updateStateArray()
    handleCloseMenuItem()
    setOpen(false)
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
         <DeleteIcon />
        </ListItemIcon>
        Eliminar cliente
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Eliminar este cliente?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El cliente seleccionado será eliminado del sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <MuiThemeProvider theme={themeMuiProvider}>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item >
              <Button 
              autoFocus 
              className={classes.buttonLeft}
              onClick={handleClose} 
              color="secondary"
              variant='contained'
              >
                cancelar
              </Button>
            </Grid>
          <Grid item>
            <Button 
              className={classes.buttonRight}
              onClick={handleCloseAceptDelete} 
              color="primary"
              variant='contained'
            >
              aceptar
            </Button>
          </Grid>
          </Grid>
        </MuiThemeProvider>

        </DialogActions>
      </Dialog>
    </div>
  );
}