import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
    MuiIconButton:{
        root:{
          color:'#ff2f20',
        },
      },
    MuiButton:{
      containedSecondary:{
        backgroundColor:'#f13f32',
        '&:hover': {
          backgroundColor: '#f11c0c',
          "@media (hover: none)": {
            backgroundColor: "#f11c0c"
          },
        },
      },
      textPrimary:{
          color:'#ff0000',
      },
    },
    
}
});

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <MuiThemeProvider theme={theme}>
      <IconButton aria-label="Eliminar" onClick={handleClickOpen}>
          <DeleteForeverIcon />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirmar eliminación de pedido"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro que desea eliminar el pedido seleccionado?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleClose} color="secondary" autoFocus startIcon={<DeleteForeverIcon />}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
    </div>
  );
}
