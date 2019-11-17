import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DialogDelete from '../Delete/DialogDelete';
import UpdateUser from '../Update/UpdateUser';
import VisibilityClient from '../Visibility/visibility.js';

function MenuItems(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const updateStateArray=props.updateStateArray
  const row=props.row  
  
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

  const [open, setOpen] = React.useState(false);

  const dialogOpen = () => {
    console.log("abierto(como tu culo)");
    setOpen(true);
  };

  const dialogClose = () => {
    console.log("cerrado");
    setOpen(false);
  };

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
{/* LLAMO A DIALOG DE MODIFICAR CLIENTE */}
        <UpdateUser
              updateStateArray={updateStateArray}
              valor={row}
        />
{/* LLAMO A DIALOG DE VER CLIENTE */}
        <VisibilityClient
            cliente={row}
            open = {open} //Estado 
            handleClose={dialogClose} 
        />
{/* LLAMO A DIALOG DE ELIMINAR CLIENTE */}       
        <DialogDelete
            updateStateArray={updateStateArray}
            cliente={row}
        />
      </Menu>
    </div>
  );
}

export default withRouter(MenuItems);