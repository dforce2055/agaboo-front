import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from '@material-ui/icons/Store';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import CreateIcon from '@material-ui/icons/Create';
import {withRouter } from 'react-router-dom';




const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

 function CustomizedMenus(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { history } = props;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Productos
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
          <StoreIcon/> 
          </ListItemIcon>
          <ListItemText primary="Crear" onClick ={ () => history.push('/createProduct')} />
        </StyledMenuItem>   
        <StyledMenuItem>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Modificar" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Eliminar" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}

export default withRouter(CustomizedMenus);
