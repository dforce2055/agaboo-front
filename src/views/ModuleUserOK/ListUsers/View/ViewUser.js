import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import Visibility from '@material-ui/icons/Visibility';

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

export default function VisibilityClient(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {usuario} = props;
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <IconButton onClick={handleClickOpen} >
      <Visibility/>  
    </IconButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" className={classes.title}>
            {usuario.nombre}{' '}{usuario.apellido}
            </Typography>
            <Button color="inherit" onClick={handleClose}>
              VISTO
            </Button>
          </Toolbar>
        </AppBar>
        <List>

        {/*-------------DNI--------------*/}
        <ListItem >
          <Typography variant="h6" className={classes.title}>
            {'Num. de D.N.I: '}{usuario.cuit}
            </Typography>
        </ListItem>
        <Divider />

        {/*-------------CELULAR--------------*/}
        <ListItem>
        <Typography variant="h6" className={classes.title}>
            {'Celular: '}{usuario.celular}
            </Typography>
        </ListItem>
        <Divider />

          {/*-------------UBICACION--------------*/}
          <ListItem >
          <Typography variant="h6" className={classes.title}>
            {'En la localida de: '} {usuario.localidad}
            </Typography>
            <Typography variant="h6" className={classes.title}>
            {'Calle: '}{usuario.calle}{' al '}{usuario.altura}
            </Typography>                        
          </ListItem>
          <Divider />

          {/*-------------EMAIL--------------*/}
          <ListItem >
            <Typography variant="h6" className={classes.title}>
            {'E-mail: '} {usuario.email}
            </Typography>    
          </ListItem>
          <Divider />

          {/*-------------ROL--------------*/}
          <ListItem >
            <Typography variant="h6" className={classes.title}>
            {'Empleo: '} {usuario.empleo}
            </Typography>    
          </ListItem>
          <Divider />

        
        </List>
      </Dialog>
    </div>
  );
}
