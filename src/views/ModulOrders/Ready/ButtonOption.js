import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {history} = props;
  const {listado_producto} = props;
  const {obj_pedido} = props;
  console.log(obj_pedido);
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditOrder = () =>{
    setAnchorEl(null);
    return 
  }

  const handleCompleteOrder = () =>{
    console.log("MUESTRO COMPLETAR PEDIDO");
    setAnchorEl(null);
  }

  const handleDeleteOrder = () =>{
    console.log("MUESTRO PANTALLA DE ELIMINAR PEDIDO");
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
          sessionStorage.setItem('listado_producto',JSON.stringify(listado_producto))
          history.push('/rellenarPedido') }}>Completar pedido</MenuItem>
        <MenuItem onClick={handleCompleteOrder}>Editar pedido</MenuItem>
        <MenuItem onClick={handleDeleteOrder}>Eliminar pedido</MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(SimpleMenu);