import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';
import OrderController from '../../../controllers/Order';

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {history} = props;
  const {listado_producto} = props;
  const {updateArray} = props;
  //Pedido entero, asi lo puedo mapear en ProductListOrder.js. El cual es la pantalla para mostrar todos los productos y su cantidad, asi el empleado puede agregar un id's.
  const {id_pedido} = props;

  //Guardo state para actualizar el listado en OrdersTable. Es decir, actualizar la tabla cada vez que se elimine un usuario.
  const {setA} = props;
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCompleteOrder = () =>{
    console.log("MUESTRO COMPLETAR PEDIDO");
    setAnchorEl(null);
  }

  const handleDeleteOrder = () =>{
    OrderController.deleteOrder(id_pedido)
    //Cambio estado para actualizar el listado de los pedidos. Cuando uno sea eliminado.
    updateArray();
    setAnchorEl(null);
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon></MoreHorizIcon>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick ={ () => {
          sessionStorage.setItem('pedido',JSON.stringify(id_pedido));
          sessionStorage.setItem('listado_producto',JSON.stringify(listado_producto))
          history.push('/rellenarPedido') }}>Completar pedido</MenuItem>
        <MenuItem onClick={handleCompleteOrder}>Editar pedido</MenuItem>
        <MenuItem onClick={handleDeleteOrder}>Eliminar pedido</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);