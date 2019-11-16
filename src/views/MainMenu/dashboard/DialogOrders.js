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

export default function DialogOrders(props) {
    const [open, setOpen] = React.useState(false);
    const { pedido } = props;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <Visibility />
            </IconButton>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Detalles del Pedido
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <b>Cliente:</b> {pedido.cliente.nombre + ' ' + pedido.cliente.apellido}<br />
                        <b>Teléfono:</b> {pedido.cliente.celular}<br />
                        <b>E-mail:</b> {pedido.cliente.email}<br />
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                        <b>Responsable del pago:</b> {pedido.detalle_pedido.responsableDelPago}<br />
                        <b>Forma de pago:</b> {pedido.detalle_pedido.formaDePago}<br />
                        <b>Valor:</b> $ {pedido.monto_calculado}<br />
                        <b>Fecha de Entrega:</b>  {pedido.fecha_entrega}<br />
                        <b>Localidad:</b> {pedido.detalle_pedido.ciudad}<br />
                        <b>Dirección:</b> {pedido.direccion}<br />
                    </Typography>
                    <Divider />
                    <Typography gutterBottom>
                        <b>Productos:</b><br />
                        {pedido.listado_producto.map(producto => (
                            <span key={producto.producto}>{producto.producto}: <b>({producto.cantidad} u.)</b><br /></span>
                        ))}
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