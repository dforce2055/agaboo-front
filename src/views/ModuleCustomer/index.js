import React,{useState,useEffect } from 'react';
import Navbar from '../Header/Navigation'
import IndexTable from './Delete-Update-List/Table/Index';
import SimpleBottomNavigation from '../Footer/Footer';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import { Container,Grid,Paper,CardHeader,Fab } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme,makeStyles} from '@material-ui/core/styles';
import InputSearch from './Delete-Update-List/Search';
import CSS from './CSS';
import CustomerController from '../../controllers/Customer';
import AddIcon from '@material-ui/icons/Add';
import { hideFooter } from '../Footer/HideFooter';

const useStyles = makeStyles(theme => ({
    espacio:{
      marginTop: theme.spacing(2),
      boxShadow: CSS.borderShadow
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

function DeleteUpdateUserAdmin(props) {
    const classes = useStyles();
    const [search,setSearch] = useState("");
    const {history} = props
    const [customers, setCustomers] = useState([]);  //todos los customers
    const [temporalCustomers,setTemporalCustomers] = useState([]); //guardo temporalmente
    const [validador,setValidador] = useState(false); //Atento a busqueda
    const [pagination,setPagination] = React.useState(false);
    const [stateArray,setStateArray] = useState(false);//Estado de la actualizacion de la lista

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
      if(stateArray){
        console.log("customers",customers);
        CustomerController.getCustomers()
          .then(value=> {
              setCustomers(value);
              setStateArray(false); //Finalizo el cambio
          }).catch(error=>{
              console.log("Error al traer el cliente: ",error);
          })
      }
      if (customers.length === 0) {
        console.log("customers.length === 0");
        CustomerController.getCustomers()
        .then(value=> {
            setCustomers(value);      
        }).catch(error=>{
          console.log("Error al traer el cliente: ",error);
        })
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
        }

        
        hideFooter();
    })


    let userRole = firebase.getCurrentUserRole();
    if (!firebase.getCurrentUsername()) {
        // not logged in
        alert('Por favor inicie sesión para acceder')
        props.history.replace('/login')
        return null
    }
    if (userRole==="LOGISTICS"){ //si tiene rol de usuario de logistica
      alert('No tenes permiso para acceder a esta ventana')
      props.history.goBack();
    }

  const updateStateArray = () => {  //Permite la actualizacion la lista
    console.log("se ejecuto");
    setStateArray(true)
  }

  const handleChangeCustomer = items =>{
    console.log("handleChangeCustomer= ",items);
    setCustomers(items)
  }

  const Typeahead = (event) =>{
    if (event) { //Al detectar un cambio. Va a buscar
     CustomerController.Typeahead(event)
      .then((result)=>{
        setTemporalCustomers(result)
        setValidador(true) //Si es verdadero muestra lo encontrado en la db
      })
      return
    }else{
      setValidador(false) //Si es falso muestra el customers original
    }
  }

  const Pagination = () => {
    setPagination(true)
  }
    return (
        <div>
            <Navbar/>
            <Container maxWidth='xl'>

            <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/registrarCliente')}>
              <AddIcon />
            </Fab>
                <Paper className={classes.espacio}>
                    <h1>
                        <CardHeader title="Clientes" />
                    </h1>
                </Paper>
                <Grid item container justify="flex-end" alignItems="baseline">
                    <InputSearch
                        Typeahead={Typeahead}
                        search={search}
                    />
                </Grid>
                <br/>
                <Grid item>
                  {
                    (!validador) ? 
                    <IndexTable
                        Pagination={Pagination}
                        handleChangeCustomer={handleChangeCustomer}
                        updateStateArray={updateStateArray}
                        customers={customers}
                    />
                    :
                    <IndexTable
                        Pagination={Pagination}
                        handleChangeCustomer={handleChangeCustomer}
                        updateStateArray={updateStateArray}
                        customers={temporalCustomers}
                    />
                  }
                </Grid>
            </Container>
            <footer style={{marginTop:'65px'}}>
              <SimpleBottomNavigation/>
            </footer>
        </div>
    )
}

export default withRouter(DeleteUpdateUserAdmin);