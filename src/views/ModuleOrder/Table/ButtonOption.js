import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';
import OrderController from '../../../controllers/Order';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DialogDeliveredOrder from './DialogDeliveredOrder';

function ButtonOption(props) {
  
  const {history} = props;

  const {order} = props;
  const {updateArray} = props;
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
  const [open,setOpen] = React.useState(false)
  const [openDialogFinishOrder,setOpenDialogFinishOrder] = React.useState(false)
  
  //Actualiza el ancho de la ventana
  React.useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  }, []);

  let userRole = checkRoleAdmin();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteOrder = () =>{
    if (order.estado !=='PAGADO') {
      OrderController.deleteOrder(order.id_pedido)
    //Cambio estado para actualizar el listado de los pedidos. Cuando uno sea eliminado.
    updateArray();
    setAnchorEl(null);
    }else{
      alert('No se puede eliminar un pedido pagado.')
    }
  }

  function checkRoleAdmin(){
    let role = localStorage.userRole; //me guardo el rol del usuario

    if(role==="ADMIN"){
      return true;
    }else if(role==="LOGISTICS"){
      return false;
    }
  }

  const changeStateOrderENTREGADO = () =>{
    if (order.id_pedido) {
      if (order.estado === 'EN CAMINO') {
         OrderController.changeStateOrder(order.id_pedido,'ENTREGADO')
         handleCloseDialog()
         updateArray()
      }else{
        alert('Su estado es distinto a "En camino" por ende no se puede cambiar su estado a "Entregado".')
      }
    }
  }

  const changeStateOrderFINALIZADO = () =>{
    if (order.id_pedido) {
      if (order.estado === 'ENTREGADO') {
         OrderController.changeStateOrder(order.id_pedido,'FINALIZADO')
         handleCloseDialog()
         updateArray()
      }else{
        alert('Su estado es distinto a "Entregad" por ende no se puede cambiar su estado a "Finalizado".')
      }
    }
  }

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };
  
  return (
    <div>
    <DialogDeliveredOrder 
      open={open} 
      handleClose={handleCloseDialog}
      handleSave={changeStateOrderENTREGADO}
      handleOpenDialog={handleOpenDialog}
    />
    <DialogDeliveredOrder 
      open={open} 
      handleClose={handleCloseDialog}
      handleSave={changeStateOrderFINALIZADO}
      handleOpenDialog={handleOpenDialog}
    />
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon fontSize='large'></MoreHorizIcon>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick ={ () => {

                sessionStorage.setItem('pedido_completo',JSON.stringify(order));
                sessionStorage.setItem('listado_producto',JSON.stringify(order.listado_producto))
                sessionStorage.setItem('order_complete',JSON.stringify(order))
                history.push(/*'/rellenarPedido'*/'/orderdetail')}}>Ver detalle de pedido</MenuItem>
                <MenuItem onClick={handleOpenDialog}>
                 Marcar como entregado
                </MenuItem> 
                <MenuItem onClick={handleOpenDialog}>
                 Marcar como finalizado
                </MenuItem> 
              {
                (userRole) ? 
                <MenuItem onClick={handleDeleteOrder}>
                 Eliminar pedido
                </MenuItem> 
                : 
                ""
              }
     </Menu>
    </div>
        );
}

export default withRouter(ButtonOption);