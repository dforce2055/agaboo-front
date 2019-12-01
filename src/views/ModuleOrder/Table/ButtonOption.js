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

function ButtonOption(props) {
  
  const {history} = props;

  const {order} = props;
  const {updateArray} = props;
  const {estado} = props;
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  //Actualiza el ancho de la ventana
  React.useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
  }, []);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteOrder = () =>{
    if (estado !=='PAGADO') {
      OrderController.deleteOrder(order.id_pedido)
    //Cambio estado para actualizar el listado de los pedidos. Cuando uno sea eliminado.
    updateArray();
    setAnchorEl(null);
    }else{
      alert('No se puede eliminar un pedido pagado.')
    }
  }
  
  return (
    <div>
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
                sessionStorage.setItem('id_pedido',JSON.stringify(order.id_pedido));
                sessionStorage.setItem('listado_producto',JSON.stringify(order.listado_producto))
                sessionStorage.setItem('order_complete',JSON.stringify(order))
                history.push(/*'/rellenarPedido'*/'/orderdetail')}}>Ver detalle de pedido</MenuItem>
              <MenuItem onClick={handleDeleteOrder}>Eliminar pedido</MenuItem>
            </Menu>
    </div>
  );
}

export default withRouter(ButtonOption);