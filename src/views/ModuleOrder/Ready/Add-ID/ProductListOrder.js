import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//ARCHIVOS IMPORTANTES FIRESTORE Y BACKEND
import firebase from '../../../../config/firebase';
import OrderController from '../../../../controllers/Order';

//Componentes propios
import Chip from './Chip';
import AlertDialog from './AlertDialog';

const theme = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiSvgIcon:{
      colorPrimary:{
        color:'#16984a',
      },
    },
}
});

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#3fb5a5',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 250,
  },
}));

//let array = []; //Utilizo para meter todos los chips dentro de un array

 function CustomizedTables(props) {  
   
  const classes = useStyles();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if (actualizar) {  
        //Utilizo storage para traer la informacion de la cantidad de productos que tiene un pedido.
        setListOrders(JSON.parse(sessionStorage.getItem('listado_producto')));
        //Traigo el pedido completo guardado en la storage
        setOrderId(JSON.parse(sessionStorage.getItem('pedido')));
        setActualizar(false);
    } 
  });

  const {history} = props;
  const [actualizar,setActualizar] = React.useState(true); //Para utilizar en el useEffect
  const[listOrders,setListOrders] = React.useState([]); //State para almacenar el listado de productos del pedido. 
  const [orderId,setOrderId] = React.useState([]); //State para almacenar el id del pedido
  const [list_cant,setList_cant] = React.useState({}); //State para almacenar los id's
  const [open, setOpen] = React.useState(false); //State para el dialog

  //Metodo para abrir el dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  //Metodo para cerrar DIALOG
  const handleClose = () => {
    setOpen(false);
  };

  //Metodo para guardar list_cant en el pedido.
  const saveOrder = () =>{
    //Llamo metodo para guardar listado con id's
    OrderController.saveOrderProductIds(orderId,list_cant);
    handleClose(); //Cierro el dialog
    
    history.push('/pedidosListos');
  };
  

  const handleChange2 = (name,obj) => {    
    /*//ERROOORR==>> Al momento de guardar el Baño Químico, me guarda "Baño Químico" en vez de "Baño_Quimico_AG1" y lo mismo pasa con el AG2. Entra al case y al if, pero me lo guarda de la misma manera.
    switch (name) { 
      case 'Oficina':
        setList_cant({...list_cant, [name]: obj});
      case 'Baño Químico':
        if (obj.modelo === 'AG1') {
          console.log("entro a ag1");
          setList_cant({...list_cant, ['Baño_Quimico_AG1']: obj});
        }else if(obj.modelo === 'AG2'){
          console.log("entro a ag2");
          setList_cant({...list_cant, ['Baño_Quimico_AG2']: obj});
        }else if(obj.modelo === 'discapacitado'){
          setList_cant({...list_cant, ['Baño_Quimico_Discapacitado']: obj});
        }
      case 'Boleteria':
        setList_cant({...list_cant, [name]: obj});
      case 'Oficina':
        setList_cant({...list_cant, [name]: obj});
      default:        
    }*/

    //Si no es un Baño Químico que se guarde
    if (name !== 'Baño Químico') {
      setList_cant({...list_cant, [name]: obj});
    } else if(name === 'Baño Químico'){//Si lo es
      //Se guarda con el nombre del modelo que sea
      if (obj.modelo === 'AG1') { 
        setList_cant({...list_cant, ['Baño_Quimico_AG1']: obj});
      }else if(obj.modelo === 'AG2'){
        setList_cant({...list_cant, ['Baño_Quimico_AG2']: obj});
      }
    }
  };

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert('Por favor inicie sesión para acceder')
    props.history.replace('/login')
    return null
  }
  
  return (
    <MuiThemeProvider theme={theme}>
    <Container >
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead justify='center'>
          <TableRow>
            <StyledTableCell>Producto</StyledTableCell>
            <StyledTableCell>Modelo</StyledTableCell>
            <StyledTableCell >Cantidad</StyledTableCell>
            <StyledTableCell align="right">Identificador</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {listOrders.map(row => (
            <StyledTableRow key={row.id_producto}>
              <StyledTableCell component="th" scope="row">
                {row.producto}
              </StyledTableCell>
              <StyledTableCell >{row.modelo === '' ? '-': row.modelo}</StyledTableCell>
              <StyledTableCell >{row.cantidad}</StyledTableCell>

              <StyledTableCell align="right">
                <Chip 
                //Metodo para agregar la cantidad
                handleChange={handleChange2}
                //Metodo para agregar el objeto
                obj={row}
                ></Chip>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

    <AlertDialog
      open={open}
      handleClose={handleClose}
      saveOrder={saveOrder}
    />

    <ButtonGroup fullWidth aria-label="full width outlined button group">
      <Button variant='contained' color='secondary'onClick ={ () => {history.push('/pedidosListos')}}>volver</Button>
      <Button variant='contained'  color='primary' onClick={handleClickOpen} //Metodo para guardar los id's con el pedido seleccionado
      >guardar</Button>
    </ButtonGroup>
    
    </Container>
    </MuiThemeProvider>
  );
}

export default withRouter(CustomizedTables);