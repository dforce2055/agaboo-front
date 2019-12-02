import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Paper,Grid} from '@material-ui/core';
import Draggable from 'react-draggable';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import OrderController from '../../../../controllers/Order';

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

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogDeliveredState({order,updateArray,handleCloseAnchor}) {
  const classes = useStyles()
  const [open,setOpen] = React.useState(false)


  const changeStateOrder = () =>{
    if (order.id_pedido) {
      if (order.estado === 'EN CAMINO') {
         OrderController.changeStateOrder(order.id_pedido,'ENTREGADO')
         handleClose()
         handleCloseAnchor()
         updateArray()
      }else{
        alert('No se puede poner su estado como "Entregado".')
        handleClose()
      }
    }
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
    <MenuItem onClick={handleOpen}>
        <ListItemIcon>
         <AssignmentLateIcon />
        </ListItemIcon>
        Pedido Entregado
      </MenuItem>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          ¿Estas seguro de poner entregado al pedido?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si acepta,no se volvera a cambiar hasta que este finalizado. 
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
              onClick={changeStateOrder} 
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
