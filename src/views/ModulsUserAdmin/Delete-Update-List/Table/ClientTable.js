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
import { IconButton,  TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    marginBottom: theme.spacing(3),
  },
}));

export default function ClientTable() {

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
      }else if (search.buscar.length !== 0) { //Verifico que el campo de buscar este vacio
        setValidador(true)
      }else if(search.buscar.length === 0){
        setValidador(false)
      }
    },[]);

  function updateStateArray(){
    setStateArray(true)
  }
  
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
    setSearch({ ...search, [name]: event.target.value });  
  };

  function GetCustomerCant10(){
    var lastPosition = clientes[clientes.length-1];
    var data = CustomerController.getCustomerCant10(lastPosition);
    data.then(result=>{console.log("Lo que llego al front: ",result);
    })
  };

  function Filter(){  
    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    const newData = clientes.filter(function(item){
      //A los campo por el cual voy a buscar los pongo en mayuscula(toUpperCase) y los guardo en una variable.
        const itemDataNombre = item.nombre.toUpperCase()
        const itemDataId = item.id.toUpperCase()
        const itemDataLocalidad = item.localidad.toUpperCase()
        const itemDataApellido = item.apellido.toUpperCase()
        const itemDataEmpleo = item.empleo.toUpperCase()

        //Uno todos los campos por el cual los voy a filtrar.
        const campo = itemDataNombre+" "+itemDataId+" "+itemDataLocalidad+" "+itemDataApellido+" "+itemDataEmpleo

        //Pongo en mayuscula en toUpperCase para poder comparar todos los campos.
        const textData = search.buscar.toUpperCase()
        return campo.indexOf(textData) > -1
    })
    setData(newData); //Guardo resultados obtenidos en un nuevo arreglo para no modificar el arreglo clientes.
  }  

  return (
    <React.Fragment>
    <TextField
        onKeyUp={ 
          event =>{
              Filter()
        }} 
        onChange={handleChange('buscar')} 
        style={{width:'300px'}}
        placeholder="Buscar Cliente"
        variant="outlined"
        InputProps={{
          startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
        }}
        >
          <IconButton 
     style={{ padding: '10'}} 
      aria-label="search">
        <SearchIcon />
        </IconButton>
        
        </TextField>

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
        
          {data.map(row => ( //Utilizo el nuevo arreglo con los parametros encontrados.
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
        <Link color="primary" onClick={GetCustomerCant10}>
          Ver mas clientes
        </Link>
      </div>
    </React.Fragment>
  );
}