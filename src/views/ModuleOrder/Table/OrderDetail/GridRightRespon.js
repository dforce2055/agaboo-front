import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
// import ButtonOption from './ButtonOption.js';
// import ButtonColorStatus from './ButtonColorStatus.js';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
}));

export default function GridRightResponsive(props) {
  const classes = useStyles();
  const {data} = props;
  const {i} = props;  
  
  return (
    <div className={classes.root}>
        <Grid container spacing={2} key={i}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1" >
                  <Box fontSize="h5.fontSize" m={1}>
                    {data.Producto}
                  </Box>
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <Box fontSize="h6.fontSize" m={1}>
                   {data.id_pedido}
                  </Box>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  <Box fontSize="h6.fontSize" m={1}>
                   Fecha de entrega: {data.modelo}
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Grid >
              Holaaaaaaa
            </Grid>
            <Grid 
              container 
              direction="column" 
              className={classes.menuButton}
            >
              hooola
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}
