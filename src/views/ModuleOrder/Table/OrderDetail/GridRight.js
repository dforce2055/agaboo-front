import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  ButtonGroup} from '@material-ui/core';
import {
  MuiThemeProvider, 
  createMuiTheme} from '@material-ui/core/styles';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
}))(TableCell);

const themeMuiProvider = createMuiTheme({
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
        backgroundColor: '#b53f3f',
        '&:hover': {
          backgroundColor: '#f30b0b',
          "@media (hover: none)": {
            backgroundColor: "#f30b0b"
          },
        },
      },
    }, 
  }
})

const useStyles = makeStyles(theme => ({
  TextField:{
    width:'125px'
  },
  buttonLeft: {
    marginRight:'2px',
    marginLeft:'13px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },
}));

//Este metodo le llegan como parametro un conjunto de objetos y los recorre, luego se fija su respectiva cantidad y lo mapea
const onlyProduct = (order) => {
  let result = []; 
  order.forEach(element => {
    for (let i = 0; i < element.cantidad; i++) {
      result.push({
        producto:element.producto,
        precio_X_unidad:element.precio_X_unidad,
        modelo:element.modelo,
        id_producto:''
      })
    } 
  });
  return result
}

export default function GridRight() {
  const classes = useStyles();
  const [arrayOnlyProduct] = React.useState([]);
  const [order,setOrder] = React.useState([]); //Guardo listado de productos con su cantidad
  const [load,setLoad] = React.useState(true); //Lo utilizo para cuando se renderize
  
  React.useEffect(()=>{
    if (load) {  
        setOrder(JSON.parse(sessionStorage.getItem('listado_producto')));     
        setLoad(false);
    }
    if (arrayOnlyProduct.length == 0) {
      
    }
  });

  React.useEffect(()=>{
    onlyProduct(order).forEach(element => {
      arrayOnlyProduct.push(element)
    });
    console.log("Array: ",arrayOnlyProduct);
  },[order]);

  const handleChange = (event)=>{
    console.log(event.target.value);
  }

  return (
      <div className={classes.root}>
        <Table>
          <TableHead >
            <TableRow hover={true}>
              <StyledTableCell>Producto</StyledTableCell>
              <StyledTableCell align="right">Modelo</StyledTableCell>
              <StyledTableCell align="right">Codigo</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {onlyProduct(order).map((row,index) => (
                <TableRow key={index}>
                <TableCell 
                  component="th" 
                  scope="row"
                >
                  {row.producto}
                </TableCell>
                <TableCell align="right">
                {row.modelo}</TableCell>
                <TableCell align="right">
                  <TextField 
                  className={classes.TextField} 
                  variant="outlined" 
                  label="Codigo" 
                  multiline 
                  rowsMax="4"
                  onChange={handleChange}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <MuiThemeProvider theme={themeMuiProvider}>
          <ButtonGroup variant="text" size="large" aria-label="large contained secondary button group" >
            <Button 
            className={classes.buttonLeft} 
            color="secondary" variant="contained" >
                  Cancelar
            </Button>
            
            <Button className={classes.buttonRight} color="primary" variant="contained" type = " submit " > 
              Guardar 
            </Button>
          </ButtonGroup>
        </MuiThemeProvider>
      </div>
  );
}
