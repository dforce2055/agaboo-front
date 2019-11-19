import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SelectCantProduct from './SelectCantProduct';
import ClearIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';

import { hideFooter } from './../../../Footer/HideFooter';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
});

export default function TableProduct(props) {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if(stateArray){
      //Elimino elemento seleccionado.
      var indexDelete = arrayProduct.indexOf(deletePosition)
      arrayProduct.splice(indexDelete,1)
      if (arrayProduct.length === 0 ) {
        setButtonState(true);
        sessionStorage.removeItem('arreglo_productos');
      }
      setStateArray(false);
    }

    hideFooter();
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
  
  const [arrayProduct,setArrayProduct] = React.useState([]); //Arreglo donde guardare los productos guardados en el listad.
  let [deletePosition,setDeletePosition] = React.useState({});
  const [stateArray,setStateArray] = React.useState(false); //Se utiliza para iniciar la carga cuando se renderiza el componente

  const { setButtonState } = props; 
  const { alquilables } = props; //Cantidad alquilable de productos

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


    let infoDetalleValidation = JSON.parse(infoDetalle);
    let incomplete;
    if (infoDetalleValidation) {
      if (!infoDetalleValidation.ContactoEnTrabajo) incomplete = true;     
      if (!infoDetalleValidation.ciudad) incomplete = true;     
      if (!infoDetalleValidation.fecha_entrega) incomplete = true;     
      if (!infoDetalleValidation.fecha_finalizacion) incomplete = true;     
      if (!infoDetalleValidation.formaDePago) incomplete = true;     
      if (!infoDetalleValidation.lugarDePago) incomplete = true;     
      if (!infoDetalleValidation.responsableDelPago) incomplete = true;     
      if (!infoDetalleValidation.ubicacionDeEntrega) incomplete = true;     
      
      if (!incomplete) setButtonState(false);
    }
    
  } 

  //Metodo para eliminar una tupla de la tabla producto con cantidad.
  const handleDelete = (row) => {
    setDeletePosition(row)
    console.log(row);

    alquilables.forEach(element => {//Recorro y busco el elemento borrado para sumarle la cantidad del que se esta borrando
      if (element.type === row.producto) {        
        element.cantidad += parseInt(row.cantidad);
      }
    });
    setStateArray(true);
  }

  return (
    <Paper className={classes.root}>

    <SelectCantProduct
      handleChange={handleChange}
      cant_prodt_select={cant_prodt_select}
      addArrayProduct={addArrayProduct}
      alquilables={alquilables}//Paso la cantidad de productos disponibles
    />

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