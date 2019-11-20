import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Fab from '@material-ui/core/Fab';
import { withRouter } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';


//Agrego imports
import CustomerController from '../../../../controllers/Customer';
import FullScreenDialog from '../Update/UpdateUser';
import AlertDialog from '../Delete/DialogDelete';
import VisibilityClient from '../Visibility/visibility';
import { IconButton,  TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { hideFooter } from './../../../Footer/HideFooter';
import MenuItems from './MenuItems';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComplexGrid from './TableColumn.js';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root: {
    marginBottom: theme.spacing(3),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(12),
    right: theme.spacing(7),
    zIndex: 99,
    backgroundColor: '#3fb5a5',
    '&:hover': {
      backgroundColor: '#0ce8ca',
      "@media (hover: none)": {
        backgroundColor: "#0ce8ca"
      },
    },
  },
}));

function inputSearch(Filter,handleChange,width) {
  let widthInput;
  if (width>415) {
    let widthInput = "width:'300px'";
  }else{
    let widthInput = "width:'100px'";
  }
  return(
    <div>
        <TextField
        onKeyUp={ 
          event =>{
              Filter()
        }} 
        onChange={handleChange('buscar')} 

        style={{widthInput}} 

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
    </div>
  )
}

function customList(items,updateStateArray) {
  return(
    <div>
    {items.map((item,index)=>(
      <div>
      <br/>
      <Divider key={item.id} />
      <ComplexGrid  items={item} i={index+1} updateStateArray={updateStateArray}/>
      <br/>
      </div>
    ))}
    </div>
  )
}

function table(clientes,updateStateArray,width) {
  return(
    <div>
      {
        (width > 473) ? 
            <Table size="small">
            <TableHead>
              <TableRow>
              <TableCell>Opciones</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>CUIT/CUIL</TableCell>
                <TableCell align="right">Localidad</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map(row => (
                <TableRow key={row.id}>
                <TableCell>
                  <MenuItems
                    updateStateArray={updateStateArray}
                    row={row}
                  />
                </TableCell>
                  <TableCell>{row.nombre+' '+row.apellido}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell align="right">{row.localidad}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> 
        :
          customList(clientes,updateStateArray) //Mapeo en columna los datos
      }
    </div>
  )
}

function ClientTable(props) {
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    }

    if (clientes.length === 0) {
        CustomerController.getCustomers()
        .then(value=> {
          setClientes(value);      
      }).catch(error=>{
        console.log("Error al traer el cliente: ",error);
      })
      }else if (search.buscar.length !== 0) { //Verifico que el campo de buscar este vacio
        setValidador(true)
      }else if(search.buscar.length === 0){
        setValidador(false)
      }

      //Paginado de la tabla clientes.
      if(pagination === true){ 
        var lastPosition = clientes[clientes.length-1];
        var customerPag = clientes;        
        CustomerController.getCustomerPagination(lastPosition.id)
          .then(result=>{
              if (result===false) {
                return;
              }
              result.forEach((res) => customerPag.push(res));
              setClientes(customerPag)
              setPagination(false);
          });
    }//Fin de useEffect
    
      hideFooter();
    });

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  React.useEffect(() => {
    console.log("useEffect");
    // creamos una función para actualizar el estado con el clientWidth
    const updateWidth = () => {
      const width = document.body.clientWidth;
      console.log(`updateWidth con ${width}`);
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []);
  
  const {history} = props;
  function updateStateArray(){    
    setStateArray(true)
  }
  
  const classes = useStyles();
  //Coleccion de customers
  const [clientes, setClientes] = React.useState([]);

  //Avisa un cambio
  const [stateArray,setStateArray] = React.useState(false);

  //Buscador 
  const [search,setSearch] = React.useState({
    buscar:''
  });
  //Valido si el campo esta vacio o no.
  const [validador,setValidador] = React.useState(false);


  //Paginado
  const [pagination,setPagination] = React.useState(false);

  //Copia de arreglo de clientes. Para no modificar el original
  const [data,setData] = React.useState([]);
  
  const handleChange = name => event => {
    setSearch({ ...search, [name]: event.target.value });  
  };

  function getPagination(){ 
    setPagination(true);
  }

  function Filter(){  
    //El método filter() crea un nuevo array con todos los elementos que cumplan la condición implementada por la función dada.
    const newData = clientes.filter(function(item){
      //A los campo por el cual voy a buscar los pongo en mayuscula(toUpperCase) y los guardo en una variable.
        const itemDataNombre = item.nombre.toUpperCase()
        const itemDataId = item.id.toUpperCase()
        const itemDataLocalidad = item.localidad.toUpperCase()
        const itemDataApellido = item.apellido.toUpperCase()
        const itemDataRubro = item.rubro.toUpperCase()

        //Uno todos los campos por el cual los voy a filtrar.
        const campo = itemDataNombre+" "+itemDataId+" "+itemDataLocalidad+" "+itemDataApellido+" "+itemDataRubro

        //Pongo en mayuscula en toUpperCase para poder comparar todos los campos.
        const textData = search.buscar.toUpperCase()
        return campo.indexOf(textData) > -1
    })
    setData(newData); //Guardo resultados obtenidos en un nuevo arreglo para no modificar el arreglo clientes.
  }  

  const inputRef = React.createRef(null);

  return (
    <React.Fragment>

    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrarCliente')} inputRef={'/registrarCliente'} ref={inputRef}>
      <AddIcon />
    </Fab>

    {inputSearch(Filter,handleChange,widthWindow)}
    {(!validador) ? 
        table(clientes,updateStateArray,widthWindow) 
      : 
        table(data,updateStateArray,widthWindow) 
    }
      <div className={classes.seeMore}>
        <Link color="primary" onClick={getPagination}>
          Ver mas clientes
        </Link>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ClientTable);
