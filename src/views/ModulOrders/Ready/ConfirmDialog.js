import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import IconButton from '@material-ui/core/IconButton';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
    MuiIconButton:{
        root:{
          color:'#19a952',
        },
      },
    MuiButton:{
      containedSecondary:{
        backgroundColor:'#19a952',
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
      <IconButton aria-label="Confirmar" onClick={handleClickOpen}>
            <CheckBoxIcon />
        </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Confirmar entrega de pedido"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Está seguro que desea marcar el pedido seleccionado como "Entregado"?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button variant='contained' onClick={handleClose} color="secondary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
    </div>
  );
}
