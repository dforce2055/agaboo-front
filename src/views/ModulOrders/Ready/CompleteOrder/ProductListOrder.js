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
import firebase from '../../../../config/firebase';

import Chip from './ChipTest';
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

  React.useEffect(()=>{
    if (actualizar) {  
        //Utilizo storage para traer la informacion de la cantidad de productos que tiene un pedido.
        //Por que? ==> Porque no tenia manera de relacionarlo mediante las props.
        setListOrders(JSON.parse(sessionStorage.getItem('listado_producto')));
        setActualizar(false);
    } 
  });

  const {history} = props;
  const [actualizar,setActualizar] = React.useState(true);
  const[listOrders,setListOrders] = React.useState([]);

  const [list_cant,setList_cant] = React.useState([]);

  const verificarDisponibilidadProducto = (e) =>{

  };

  const handleChange= (e) =>{
    verificarDisponibilidadProducto(e)
    setList_cant(e);    
    //array.push(e); //Guardo Chip detectado
    };
    
    console.log(list_cant)    

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
            <StyledTableRow key={row.nombre}>
              <StyledTableCell component="th" scope="row">
                {row.producto}
              </StyledTableCell>
              <StyledTableCell >{row.modelo === '' ? '-': row.modelo}</StyledTableCell>
              <StyledTableCell >{row.cantidad}</StyledTableCell>

              <StyledTableCell align="right">
                <Chip handleChange={handleChange}></Chip>
              </StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>

<ButtonGroup fullWidth aria-label="full width outlined button group">
          <Button 
          variant='contained' 
          color='secondary'
          onClick ={ () => {
          //array = []; //Lo vacio cuando me voy
          history.push('/pedidosListos')}}>volver</Button>

          <Button 
          //array = []; //Lo vacio cuando me voy
          variant='contained'  
          color='primary'>guardar</Button>
        </ButtonGroup>
    
    </Container>
    </MuiThemeProvider>
  );
}

export default withRouter(CustomizedTables);