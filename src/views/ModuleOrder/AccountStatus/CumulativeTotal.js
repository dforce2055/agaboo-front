import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import OrderController from '../../../controllers/Order.js';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import TotalProgress from './TablesInformative/TotalProgress';
import TotalPaid from './TablesInformative/TotalPaid';
import TotalUnpaid from './TablesInformative/TotalUnpaid';

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
    padding: theme.spacing(1),
    margin: theme.spacing(1),
  },
  espacioMin:{
    padding: theme.spacing(1),
  },
  root2:{
    margin: theme.spacing(3),
    padding: theme.spacing(1)
  }
}));

//Redondea un un porcentaje
function roundDecimals(numero, decimales) {
    let numeroRegexp = new RegExp('\\d\\.(\\d){' + decimales + ',}');   // Expresion regular para numeros con un cierto numero de decimales o mas
    if (numeroRegexp.test(numero)) {         // Ya que el numero tiene el numero de decimales requeridos o mas, se realiza el redondeo
        return Number(numero.toFixed(decimales));
    } else {
        return Number(numero.toFixed(decimales)) === 0 ? 0 : numero;  // En valores muy bajos, se comprueba si el numero es 0 (con el redondeo deseado), si no lo es se devuelve el numero otra vez.
    }
}
//Devuelve el porcentaje
function getPercentage(sum_paid,sum_unpaid) {
  let value_total = (sum_paid+sum_unpaid);
  let porc = ((sum_unpaid*100)/value_total);
  let result = roundDecimals(porc,1);

  return result;
}

export default function CumulativeTotal(props) {
  const classes = useStyles();

  const {handleCloseReload} = props;
  const {reloadCumulativeTotal} = props;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (unpaidMoney) {

      OrderController.paid_UnpaidOrders().then(result =>{

        setValueUnpaid(result.sum_unpaid) //Guardo el valor sin cobrar

        setValuePaid(result.sum_paid) //Guardo el valor cobrado
        
        let porcentaje = getPercentage(result.sum_paid,result.sum_unpaid);//Metodo que devuelve el porcentaje

        setPercentage(porcentaje) //Guardo el porcentaje dado    

      })  

      setUnpaidMoney(false); //Finalizo la actualizacion de precios
    }
    if (reloadCumulativeTotal) { //Actualizo los valores
      OrderController.paid_UnpaidOrders().then(result =>{

        setValueUnpaid(result.sum_unpaid)

        setValuePaid(result.sum_paid)

        let porcentaje = getPercentage(result.sum_paid,result.sum_unpaid); //Metodo que devuelve el porcentaje

        setPercentage(porcentaje) 

      })
      handleCloseReload();
    }    
  });

  const [unpaidMoney,setUnpaidMoney] = React.useState(true);
  const [value_unpaid,setValueUnpaid] = React.useState('Calculando...'); //Contiene la suma de los impagos
  const [value_paid,setValuePaid] = React.useState('Calculando...'); //Contiene la suma de los pagos
  const [percentage,setPercentage] = React.useState(0); //Contiene el porcentaje de los pagos e impagos.

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root2}>
        <Grid container spacing={2} direction="row" justify="space-around" alignItems="center">

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalProgress values={percentage}/>
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12} >
            <TotalPaid value_paid={value_paid}/>
          </Grid>

          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUnpaid value_unpaid={value_unpaid}/>
          </Grid>

      </Grid>
      </div>
    </MuiThemeProvider>
  );
}
