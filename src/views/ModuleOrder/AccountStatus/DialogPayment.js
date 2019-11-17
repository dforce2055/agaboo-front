import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

//Importo componente
import OrderController from '../../../controllers/Order.js';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiBottomNavigationAction:{
          root:{
              color: 'rgb(255, 255, 255)',
              maxWidth: '1000px',
              '&$selected':{
              color: '#ffffff',
              }
          },
          label:{
            fontSize: '0.875rem',
          },
      },
      MuiButton:{
        containedSecondary:{
          backgroundColor: '#139641',
          '&:hover': {
            backgroundColor: '#16cc57',
            "@media (hover: none)": {
              backgroundColor: "#16cc57"
            },
          },
        },
      },

}});

export default function DialogPayment(props) {

  const {id_pedido} = props;
  const {handleOpenReload}=props;
  const {handlesetLoadOrder} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (confirmPayment) {
      console.log(id_pedido);
      OrderController.changeOrderPayment(id_pedido);
      setConfirmPayment(false);
      handleOpenReload();
      handlesetLoadOrder();
    }
  });

  const [open, setOpen] = React.useState(false);
  const [confirmPayment,setConfirmPayment] = React.useState(false);

  const confirmPay = () =>{
    setConfirmPayment(true);
    handleClose();
  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <MuiThemeProvider theme={theme}>
    <IconButton onClick={handleClickOpen} color="primary">
      <ShoppingCartIcon/>
    </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'¿Desea marcar el pedido seleccionado como cobrado?'}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmPay} variant='contained' color="secondary" autoFocus startIcon={<AttachMoneyIcon />}>
            Confirmar pago
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
    </div>
  );
}
