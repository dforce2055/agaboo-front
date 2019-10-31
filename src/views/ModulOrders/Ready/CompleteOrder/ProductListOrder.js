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

import Chip from './Chip';

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

  const [list_cant,setList_cant] = React.useState({});

  const saveOrder = () =>{

  };

  const handleChange2 = (name,obj) => {    
    /*//ERROOORR==>> Al momento de guardar el baño quimico, me guarda "baño quimico" en vez de "Baño_Quimico_AG1" y lo mismo pasa con el AG2. Entra al case y al if, pero me lo guarda de la misma manera.
    switch (name) { 
      case 'Oficina':
        setList_cant({...list_cant, [name]: obj});
      case 'Baño Quimico':
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

    //Si no es un baño quimico que se guarde
    if (name !== 'Baño Quimico') {
      setList_cant({...list_cant, [name]: obj});
    } else if(name === 'Baño Quimico'){//Si lo es
      //Se guarda con el nombre del modelo que sea
      if (obj.modelo === 'AG1') { 
        setList_cant({...list_cant, ['Baño_Quimico_AG1']: obj});
      }else if(obj.modelo === 'AG2'){
        setList_cant({...list_cant, ['Baño_Quimico_AG2']: obj});
      }else if(obj.modelo === 'AG2'){
        setList_cant({...list_cant, ['Baño_Quimico_AG2']: obj});
      }
    }
  };

  //MUESTRO QUE HAY EN EL LSITADO DE LOS PRODUCTO CON ID'S
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
          color='primary'
          onClick={saveOrder} //Metodo para guardar los id's con el pedido seleccionado
          >guardar</Button>
        </ButtonGroup>
    
    </Container>
    </MuiThemeProvider>
  );
}

export default withRouter(CustomizedTables);