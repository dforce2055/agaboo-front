import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrderController from '../../../controllers/Order.js';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: {
      MuiSvgIcon:{
        colorError:{
          color:'#158e34',
        },
        fontSizeLarge:{
          fontSize:'1.7rem',
          marginRight:'5px',
        },
      },

}});

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  espacio:{
    margin: theme.spacing(3),
  }
}));

export default function CumulativeTotal(props) {
  const classes = useStyles();

  const {handleCloseReload} = props;
  const {reloadCumulativeTotal} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (unpaidMoney) {
      OrderController.totalUnpaidOrders().then(result => setValue(result))
      setUnpaidMoney(false);
    }
    if (reloadCumulativeTotal) {
      OrderController.totalUnpaidOrders().then(result => setValue(result))
      handleCloseReload();
    }    
  });

  const [unpaidMoney,setUnpaidMoney] = React.useState(true);
  const [value,setValue] = React.useState('Calculando...');

  return (
    <MuiThemeProvider theme={theme}>
      <Paper className={classes.espacio}>
        <Typography component="div">
      <Box component="span" fontSize="h4.fontSize" m={2}>
        Total Acumulado: <MonetizationOnIcon fontSize='large' color='error'/>{value} 
      </Box>
    </Typography>

     {/*<TextField
        value={value}
        InputProps={{
          readOnly: true,
          startAdornment: (
            <InputAdornment position="start">
              <MonetizationOnIcon />
            </InputAdornment>
          ),
        }}
      />*/}
      </Paper>
    </MuiThemeProvider>
  );
}
