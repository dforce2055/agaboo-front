import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';

//Importo
import EditIcon from '@material-ui/icons/Edit';
import Checkout from './Checkout';

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UpdateUser(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  
  const{updateStateArray} = props;
  const {valor} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
            <EditIcon/>
        </ListItemIcon>
        Modificar cliente
      </MenuItem>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Modificar datos de cliente: ' {valor.nombre}{' '}{valor.apellido} '
            </Typography>
            
          </Toolbar>
        </AppBar>
        {/*CHECKOUT*/}
        <Checkout updateStateArray={updateStateArray} cliente={valor} handleClose={handleClose}/>
      </Dialog>
    </div>
  );
}
