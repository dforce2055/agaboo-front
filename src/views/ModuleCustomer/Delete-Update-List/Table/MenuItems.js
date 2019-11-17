import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { withRouter } from 'react-router-dom';
import SendIcon from '@material-ui/icons/Send';
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
    console.log("abierto");
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
        <MenuItem >
          <ListItemIcon>
            <UpdateUser
              updateStateArray={updateStateArray}
              valor={row}
            />
          </ListItemIcon>
          Modificar cliente</MenuItem>

        <MenuItem button onClick={dialogOpen} /*Metodo de abrir*/> 
        <ListItemIcon>
          <VisibilityClient
            cliente={row}
            open = {open} //Estado 
            handleClose={dialogClose} //Metodo de cerrar
          />
        </ListItemIcon>
        Ver cliente
        </MenuItem>
        
        <MenuItem >
         <ListItemIcon>
          <DialogDelete
            updateStateArray={updateStateArray}
            cliente={row}
          />
        </ListItemIcon>
        Eliminar pedido
        </MenuItem>
      </Menu>
    </div>
  );
}

export default withRouter(MenuItems);