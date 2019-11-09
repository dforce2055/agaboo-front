import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './clientForm';
import PaymentForm from './orderForm';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
//AGREGADO 
import Review from './FinalPartOrdered/Review';
import OrderController from '../../../controllers/Order.js';

const theme = createMuiTheme({ /* Plantilla de edicion */
    overrides: {
      MuiButton: {
        containedPrimary: {
          backgroundColor: '#3fb5a5',
          '&:hover': {
            backgroundColor: '#0ce8ca',
            "@media (hover: none)": {
              backgroundColor: "#0ce8ca"
            },
          },
        },
        containedSecondary: {
          backgroundColor: '#3fb5a5',
          '&:hover': {
            backgroundColor: '#3fb5a5',
            "@media (hover: none)": {
              backgroundColor: "#3fb5a5"
            },
          },
        },
      },
      MuiStepIcon: {
        root: {
            '&$completed': {
                color: '#0ce8ca'
            },
            '&$active': {
                color: '#3fb5a5'
            },
        },
      },
    }
  });

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(8),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(10),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Detalles de cliente', 'Detalles de pedido','Pedido completo'];

function getStepContent(step) { 
  //LLAMO COMPONENTES
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review/>;
    default:
      throw new Error('Unknown step');
  }
}

function Checkout(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const {history} = props;

  const handleNext = () => {
    setActiveStep(activeStep + 1);

  };

  const handleNexAndSaveOrder = () =>{
    //Avanzo al final del pedido.
    setActiveStep(activeStep + 1);

    //Traigo todos los datos del pedido guardado en sessionStorage
    var cliente = JSON.parse(sessionStorage.getItem('info_cliente_pedido'));
    var listado_producto= JSON.parse(sessionStorage.getItem('arreglo_productos'));
    var detalle_pedido; 
    detalle_pedido=JSON.parse(sessionStorage.getItem('info_detalle_pedido'));
    var monto_calculado = JSON.parse(sessionStorage.getItem('monto_calculado'))


    //Almaceno todos los datos guardados en sessionStorage en un mismo archivo para guardarlo en firestore como un pedido completo. 
    var data ={
      cliente,
      listado_producto,
      detalle_pedido,
      monto_calculado,
      fechaEntrega:detalle_pedido.fechaDeEntregaPedido,
      nombre:cliente.nombre+' '+cliente.apellido,
      id_cliente:cliente.id,
      ciudad:detalle_pedido.ciudad,
      direccion:detalle_pedido.ubicacionDeEntrega,
      celular:cliente.celular,
      eliminado:false
    };   

    //Guardo la informacion del pedido en firestore.
    OrderController.addOrder(data);

  }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MuiThemeProvider theme={theme}>
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Registro de pedido
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Pedido registrado con éxito.
                </Typography>
                <Button variant="contained" color="primary" className={classes.button} onClick ={ () => history.goBack()}>
                    Cerrar
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Volver
                    </Button>
                  )}
                    
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNexAndSaveOrder}
                      className={classes.button}
                    >
                        Registrar pedido
                    </Button>
                    ) : (
                      <Button
                      variant="contained"
                      color="secondary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                        Siguiente
                    </Button>
                    )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
    </MuiThemeProvider>
  );
}
export default withRouter(Checkout);