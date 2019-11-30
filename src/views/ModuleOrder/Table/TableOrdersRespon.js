import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import ButtonOption from './ButtonOption.js';
import ButtonColorStatus from './ButtonColorStatus.js';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function TableOrdersRespon(props) {
  const classes = useStyles();
  const {order} = props;
  const {i} = props;  
  const {updateArray} = props;
  
  return (
    <div className={classes.root}>
        <Grid container spacing={2} key={i}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" >
                  <Box fontSize="h5.fontSize" m={1}>
                    {order.nombre}
                  </Box>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Box fontSize="h6.fontSize" m={1}>
                   {order.detalle_pedido.ciudad+'/'+order.detalle_pedido.ubicacionDeEntrega}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Box fontSize="h6.fontSize" m={1}>
                   Fecha de entrega: {order.fecha_entrega}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID:{order.id_pedido}
                </Typography>
              </Grid>
            </Grid>
            <Grid >
              <ButtonOption
                updateArray={updateArray}
                order={order}
                estado = {order.estado}
              />
            </Grid>
            <Grid 
              container 
              direction="column" 
              className={classes.menuButton}
            >
              <ButtonColorStatus
                
                status ={order.estado}
              />
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}
