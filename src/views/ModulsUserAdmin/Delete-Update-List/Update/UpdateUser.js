import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

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

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const {handleClickDebotonEditarCerrar} = props;
  const {botonEditar} = props;

  const {cliente} = props;

  const handleClose = () => {
    handleClickDebotonEditarCerrar();
  };



  return (
    <div>
      <Dialog fullScreen open={botonEditar} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Modificar Cliente
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              Guardar
            </Button>
          </Toolbar>
        </AppBar>
          <Checkout cliente={cliente}/>
      </Dialog>
    </div>
  );
}
