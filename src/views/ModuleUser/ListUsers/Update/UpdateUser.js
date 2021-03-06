import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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
  const {usuario} = props;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <IconButton onClick={handleClickOpen}>  
        <EditIcon /> 
      </IconButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Modificando datos del usuario: ' {usuario.nombre}{' '}{usuario.apellido} '
            </Typography>
            
          </Toolbar>
        </AppBar>
        <Checkout updateStateArray={updateStateArray} usuario={usuario} handleClose={handleClose}/>
      </Dialog>
    </div>
  );
}
