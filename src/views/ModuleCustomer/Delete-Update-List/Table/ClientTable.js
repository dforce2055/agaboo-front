import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles,withStyles,MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
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
import VisibilityClient from '../Visibility/VisibilityClient';
import { IconButton,  TextField,Button, Typography} from '@material-ui/core';
import { hideFooter } from './../../../Footer/HideFooter';
import MenuItems from './MenuItems';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ComplexGrid from './TableColumn.js';
import Divider from '@material-ui/core/Divider';

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
    boxShadow: "1px 6px 15px #9E9E9E"
  },
}));

function customList(items,updateStateArray) {
  return(
    <div>
    <Grid
      style={{backgroundColor:'#318377'}}
      container 
      direction="row" 
      justify="space-around" 
      alignItems="center"
      spacing={2}
      >
        <Grid item>
       <Typography 
        style={{background:'#318377'}}
        align='center'
        variant='h6'>
        <spam style={{color:'#fff'}}>Informacion</spam>
      </Typography>
      </Grid>
      </Grid>
    {items.map((item,index)=>(
      <div>
      <br/>
      <Divider/>
      <ComplexGrid  items={item} i={index} updateStateArray={updateStateArray}/>
      <br/>
      </div>
    ))}
    </div>
  )
}

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#318377',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

function table(customers,updateStateArray,width) {
  return(
    <div>
      {
        (width > 450) ? 
            <Table size="small">
            <TableHead>
              <TableRow>
              <StyledTableCell>Opciones</StyledTableCell>
                <StyledTableCell>Nombre</StyledTableCell>
                <StyledTableCell>CUIT/CUIL</StyledTableCell>
                <StyledTableCell align="right">Localidad</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((row,index) => (
                <TableRow key={index}>
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
          customList(customers,updateStateArray) //Mapeo en columna los datos
      }
    </div>
  )
}

function ClientTable({customers,updateStateArray,handleChangeCustomer,history}) {
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
     if (search.buscar.length !== 0) { //Verifico que el campo de buscar este vacio
        setValidador(true)
      }else if(search.buscar.length === 0){
        setValidador(false)
      }

      //Paginado de la tabla clientes.
      if(pagination === true){ 
        var lastPosition = customers[customers.length-1];
        var customerPag = customers;        
        if (lastPosition) {
          CustomerController.getCustomerPagination(lastPosition.id)
          .then(result=>{
              if (result===false) {
                return;
              }
              result.forEach((res) => customerPag.push(res));
              handleChangeCustomer(customerPag)
              setPagination(false);
          });
        }else{
          setPagination(false);
          alert("Por favor establezca conexion a internet.")
        }
    }//Fin de useEffect
    
      hideFooter();
    });

  const [widthWindow, setWidthWindows] = React.useState(0); //Ancho de la ventana

  React.useEffect(() => {
    const updateWidth = () => {
      const width = document.body.clientWidth;
      setWidthWindows(width);
    };

    // actualizaremos el width al montar el componente
    updateWidth();

    // nos suscribimos al evento resize de window
    window.addEventListener("resize", updateWidth);
  }, []);
  
  const classes = useStyles();
  

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

  const inputRef = React.createRef(null);

  return (
    <React.Fragment>
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrarCliente')} inputRef={'/registrarCliente'} ref={inputRef}>
      <AddIcon />
    </Fab>
    {(!validador) ? 
        table(customers,updateStateArray,widthWindow) 
      : 
        table(data,updateStateArray,widthWindow) 
    }
      <div className={classes.seeMore}>
      <MuiThemeProvider theme={themeMuiProvider}>
          <Button 
            onClick={getPagination}
            color='primary'
            variant='contained'>
            Ver mas clientes
          </Button>
        </MuiThemeProvider>
      </div>
    </React.Fragment>
  );
}

export default withRouter(ClientTable);
