/* eslint-disable no-script-url */

import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Agrego imports
import CustomerController from '../../../../controllers/Customer';
import FullScreenDialog from '../Update/UpdateUser';
import AlertDialog from '../Delete/DialogDelete';
import VisibilityClient from '../Visibility/visibility';
import { Input } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function ClientTable() {
  const classes = useStyles();
  //Coleccion de customers
  const [clientes, setClientes] = React.useState([]);

  //Avisa un cambio
  const [stateArray,setStateArray] = React.useState(false);

  //Buscador 
  //{/*
  const [search,setSearch] = React.useState({
    buscar:''
  });
  //Valido si el campo esta vacio o no.
  const [validador,setValidador] = React.useState(false);

  //Copia de arreglo de clientes. Para no modificar el original
  const [data,setData] = React.useState([]);
  
  const handleChange = name => event => {
    console.log(event.target.value);
    setSearch({ ...search, [name]: event.target.value });  
  };

  //Metodo de filtrado por un arreglo.
  function Filter(){  
    console.log("veo DATA==> ",clientes); //Veo el arreglo en el cual voy a buscar
    const newData = clientes.filter(function(item){
        const itemDataNombre = item.nombre.toUpperCase()
        const itemDataId = item.id.toUpperCase()
        const itemDataLocalidad = item.localidad.toUpperCase()
        const itemDataApellido = item.apellido.toUpperCase()
        const itemDataEmpleo = item.empleo.toUpperCase()

        //Agrego por todos los campos que quiero realizar la busqueda
        const campo = itemDataNombre+" "+itemDataId+" "+itemDataLocalidad+""+itemDataApellido+" "+itemDataEmpleo

        const textData = search.buscar.toUpperCase()
        return campo.indexOf(textData) > -1
    })
    setData(newData); //Guardo resultados obtenidos en el nuevo arreglo.
    console.log("VEO NEW DATA==>",newData); //Muestro el resultado encontrado.
  }
//*/}
  React.useEffect(()=>{
    //Si se realizo un cambio
    if(stateArray){
      CustomerController.getCustomers()
      .then(value=> {
        setClientes(value);
        setStateArray(false); //Finalizo el cambio
    }).catch(error=>{
      console.log("Error al traer el cliente: ",error);
    })
    }else if (clientes.length === 0) {
        CustomerController.getCustomers()
        .then(value=> {
          //setData(value); //Seteo el 
          setClientes(value);      
      }).catch(error=>{
        console.log("Error al traer el cliente= ",error);
      })
      }
      //Verifico que el campo de buscar este vacio
      if (search.buscar.length != 0) {
        setValidador(true)
      }else if(search.buscar.length == 0){
        setValidador(false)
      }

    });

  function updateStateArray(){
    setStateArray(true)
  }

  return (
    <React.Fragment>
    <Input
        onKeyPress={ 
          event =>{
            if(event.keyCode===13 || event.key ==='Enter'){
              Filter()
            }
        }} 
        onChange={handleChange('buscar')} 

        style={{width:'300px'}}
        placeholder="Buscar Cliente"></Input>

        { !validador ? <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Eliminar</TableCell>
            <TableCell>Modificar</TableCell>
            <TableCell>Ver</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>CUIT/CUIL</TableCell>
            <TableCell align="right">Localidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map(row => (
            <TableRow key={row.id}>

            {/*Dialog de ELIMINAR cliente*/}
            <TableCell>   
              <AlertDialog
                 updateStateArray={updateStateArray}
                 cliente={row}/>
            </TableCell>

              {/*Dialog de MODIFICAR cliente*/}
              <TableCell>
                <FullScreenDialog 
                  updateStateArray={updateStateArray}
                  valor={row}/>  
              </TableCell>
              
              {/*Dialog de VER cliente*/}
              <TableCell>              
                <VisibilityClient 
                  cliente = {row}/>
              </TableCell>

              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell>
              <TableCell>{row.id}</TableCell>
              {/*<TableCell>{row.paymentMethod}</TableCell>*/}
              <TableCell align="right">{row.localidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> 
      :
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell>Eliminar</TableCell>
            <TableCell>Modificar</TableCell>
            <TableCell>Ver</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Apellido</TableCell>
            <TableCell>CUIT/CUIL</TableCell>
            <TableCell align="right">Localidad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>

            {/*Dialog de ELIMINAR cliente*/}
            <TableCell>   
              <AlertDialog
                 updateStateArray={updateStateArray}
                 cliente={row}/>
            </TableCell>

              {/*Dialog de MODIFICAR cliente*/}
              <TableCell>
                <FullScreenDialog 
                  updateStateArray={updateStateArray}
                  valor={row}/>  
              </TableCell>
              
              {/*Dialog de VER cliente*/}
              <TableCell>              
                <VisibilityClient 
                  cliente = {row}/>
              </TableCell>

              <TableCell>{row.nombre}</TableCell>
              <TableCell>{row.apellido}</TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell align="right">{row.localidad}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          Ver mas clientes
        </Link>
      </div>
    </React.Fragment>
  );
}