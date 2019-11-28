import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Visibility from '@material-ui/icons/Visibility';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function VisibilityClient(props) {
    const [open, setOpen] = React.useState(false);
    const { cliente } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <MenuItem onClick={handleClickOpen}>
        <ListItemIcon>
            <Visibility />
        </ListItemIcon>
        Info. del cliente
      </MenuItem>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Informacion del Cliente
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Nombre:</b> {cliente.nombre + ' ' + cliente.apellido}<br />
                        <b>Teléfono:</b> {cliente.celular}<br />
                        <b>E-mail:</b> {cliente.email}<br />
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                        <br />
                            <b>Domicilio:</b> <br />{cliente.localidad+', '+cliente.calle+'-'+cliente.altura}
                        <br />
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                    <br />
                        <b>Rubro:</b> <br />{cliente.rubro}
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                    <br />
                        <b>Id Cliente:</b><br />{cliente.id}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}