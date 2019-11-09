import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CustomizedSelects from './SelectCantProduct';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';

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

  React.useEffect(()=>{
    if(stateArray){
      //Elimino elemento seleccionado.
      var indexDelete = arrayProduct.indexOf(deletePosition)
      arrayProduct.splice(indexDelete,1)
      setStateArray(false)
    }
  });
  const classes = useStyles();

    //Objeto el cual almacenare en sessionStorage
    const [cant_prodt_select, setCant_prodt_select] = React.useState({
      producto:'',
      precio_X_unidad:'',
      modelo:'',
      cantidad:'',
      id_producto:''
    });
  
  //Arreglo donde guardare los productos guardados en el listad.
  const [arrayProduct,setArrayProduct] = React.useState([]);
  let [deletePosition,setDeletePosition] = React.useState({});
  const [stateArray,setStateArray] = React.useState(false);
/*
 Para evitar el error ==> index.js:1375 Warning: validateDOMNesting(...): <form> cannot appear as a descendant of <form>.

 SOLUCION ==> const arrayProduct = [];

 PROBLEMA==> No guarda mas de un valor al momento de agregar un producto
*/
  const handleChange = name => event => {    
    setCant_prodt_select({ ...cant_prodt_select, [name]: event.target.value });  
  };
    
  //Vacia el campo, luego de completar las 3 etapoas de un pedido.
  const clearObj = () => {
    setCant_prodt_select({producto:' ',modelo:' ',cantidad:' ',id_producto:' ','precio_X_unidad':''});
  }

  const addArrayProduct = () =>{
    //Guardo en un arreglo los producto con su respectiva cantidad
    arrayProduct.push(cant_prodt_select);

    //Guardo en session storage el arreglo de productos con cantidad.
    sessionStorage.setItem('arreglo_productos',JSON.stringify(arrayProduct));

    //MUESTRO EL ARRAY DE PRODUCTOS Y CNATIDAD.
    var data = sessionStorage.getItem("arreglo_productos");
    console.log("MUESTRO ARREGLO GUARDADO EN SESSIONSTORAGE:",JSON.parse(data));

    //MUESTRO EL CLIENTE SELCCIONADO
    var cliente = JSON.parse(sessionStorage.getItem("info_cliente_pedido"));
    console.log("MUESTRO EL CLIENTE GUARDADO EN SESSION STORAGE: ",
    cliente);

    var infoDetalle = sessionStorage.getItem('info_detalle_pedido');
    
    console.log("MUESTRO INFORMACION DE DETALLE GUARDADA EN SESSION STORAGE:",JSON.parse(infoDetalle));
    
    clearObj();
  } 

  //Metodo para eliminar una tupla de la tabla producto con cantidad.
  const handleDelete = (row) => {
    setDeletePosition(row)
    setStateArray(true);
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
            <TableCell>Eliminar</TableCell>
            <TableCell>Producto</TableCell>
            <TableCell>Precio/u</TableCell>
            <TableCell align="right">Modelo</TableCell>
            <TableCell align="right">Cantidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayProduct.map(row => (
            <TableRow key={arrayProduct.producto}>
              <TableCell>
                <Fab size="small" color="secondary" aria-label="add" className={classes.margin}
                onClick={()=>handleDelete(row)}>
                  <ClearIcon />
                </Fab>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.producto}
              </TableCell>
              <TableCell align="right">{row.precio_X_unidad}</TableCell>
              <TableCell align="right">{row.modelo}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}