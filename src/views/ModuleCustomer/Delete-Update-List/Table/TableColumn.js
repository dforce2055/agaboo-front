import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItems from './MenuItems';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    margonTop:'555px',
    maxWidth: 300,
  },
}));

export default function ComplexGrid(props) {
  const classes = useStyles();
  const {items} = props;
  const {i} = props;  
  const {updateStateArray} = props;
  
  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  #{i}-{items.nombre+' '+items.apellido}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {items.localidad+' - '+items.calle+': '+items.altura}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {items.id}
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
                  <MenuItems
                    updateStateArray={updateStateArray}
                    row={items}
                  />
            </Grid>
          </Grid>
        </Grid>
    </div>
  );
}
