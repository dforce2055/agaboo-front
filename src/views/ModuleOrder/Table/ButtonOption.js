import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';
import OrderController from '../../../controllers/Order';
import firebase from '../../../config/firebase';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';
import { IconButton } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import DialogDeliveredOrder from './Dialog/DialogDeliveredOrder';
import DialogFinishOrder from './Dialog/DialogFinishOrder';
import DialogDeleteOrder from './Dialog/DialogDeleteOrder';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';


function ButtonOption(props) {
  
  const {history} = props;

  const {order} = props;
  const {updateArray} = props;
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana
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

  async function checkRoleAdmin(){
    let role = await firebase.getCurrentUserRole();

    if(role==="ADMIN"){
      return true;
    }else if(role==="LOGISTICS"){
      return false;
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
        <MenuItem
        onClick ={()=>{
          sessionStorage.setItem('pedido_completo',JSON.stringify(order))
          
          sessionStorage.setItem('listado_producto',JSON.stringify(order.listado_producto))
          
          sessionStorage.setItem('order_complete',JSON.stringify(order))
          
          history.push(/*'/rellenarPedido'*/'/orderdetail')
        }}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          Ver detalle de pedido
        </MenuItem>
        
        <DialogDeliveredOrder 
        order={order} 
        updateArray={updateArray}
        handleCloseAnchor={handleClose}
        />

        <DialogFinishOrder 
        order={order} 
        updateArray={updateArray}
        handleCloseAnchor={handleClose}
        />

        {
          (userRole) ?
            <DialogDeleteOrder 
            order={order} 
            updateArray={updateArray}
            handleCloseAnchor={handleClose}
            />
          : 
            ""
        }
     </Menu>
    </div>
        );
}

export default withRouter(ButtonOption);