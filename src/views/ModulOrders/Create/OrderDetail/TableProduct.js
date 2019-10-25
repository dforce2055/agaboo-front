import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomizedSelects from './SelectCantProduct';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

export default function SimpleTable() {
  const classes = useStyles();

    //Objeto el cual almacenare en sessionStorage
    const [cant_prodt_select, setCant_prodt_select] = React.useState({
      producto:'',
      modelo:'',
      //cantidad:'',
      id_producto:''
    });
  
  //Arreglo donde guardare los productos guardados en el listad.
  const [arrayProduct,setArrayProduct] = React.useState([]);


  const handleChange = name => event => {    
    setCant_prodt_select({ ...cant_prodt_select, [name]: event.target.value });  
  };
    
  const clearObj = () => {
    setCant_prodt_select({producto:'',modelo:'',id_producto:''});
  }

  const addArrayProduct = () =>{
    arrayProduct.push(cant_prodt_select);

    sessionStorage.setItem('arreglo_productos',JSON.stringify(arrayProduct));

    var data = sessionStorage.getItem("arreglo_productos");
    console.log("MUESTRO ARREGLO GUARDADO EN SESSIONSTORAGE:",JSON.parse(data));

    var cliente = sessionStorage.getItem("cliente_pedido");
    console.log("MUESTRO EL CLIENTE SELECCIONADO EN PEDIDOS: ",
    JSON.stringify(cliente));
    

    clearObj();
  } 

  return (
    <Paper className={classes.root}>

    <CustomizedSelects
      handleChange={handleChange}
      cant_prodt_select={cant_prodt_select}
      addArrayProduct={addArrayProduct}
    ></CustomizedSelects>

      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell align="right">Modelo</TableCell>
            <TableCell align="right">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayProduct.map(row => (
            <TableRow key={arrayProduct.id_producto}>
              <TableCell component="th" scope="row">
                {row.producto}
              </TableCell>
              <TableCell align="right">{row.modelo}</TableCell>
              <TableCell align="right">{row.id_producto}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}