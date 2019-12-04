import React,{useState,useEffect } from 'react';
import Navbar from '../Header/Navigation'
import IndexTable from './Delete-Update-List/Table/Index';
import SimpleBottomNavigation from '../Footer/Footer';
import firebase from '../../config/firebase';
import { withRouter } from 'react-router-dom';
import { Container,Grid,Paper,CardHeader } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme,makeStyles} from '@material-ui/core/styles';
import InputSearch from './Delete-Update-List/Search';
import CSS from './CSS';
import CustomerController from '../../controllers/Customer';


const useStyles = makeStyles(theme => ({
    espacio:{
      marginTop: theme.spacing(2),
      boxShadow: CSS.borderShadow
    }
  }));

const Filter = (word,customers) =>{  
    const newData = customers.filter(function(item){
        const itemDataNombre = item.nombre.toUpperCase()
        const itemDataId = item.id.toUpperCase()
        const itemDataLocalidad = item.localidad.toUpperCase()
        const itemDataApellido = item.apellido.toUpperCase()
        const itemDataRubro = item.rubro.toUpperCase()

        const campo = itemDataNombre+" "+itemDataId+" "+itemDataLocalidad+" "+itemDataApellido+" "+itemDataRubro

        const textData = word.toUpperCase()
        return campo.indexOf(textData) > -1
    })

    return newData;
  }  

function DeleteUpdateUserAdmin(props) {
    const classes = useStyles();
    const [search,setSearch] = useState("");
    
    const [customers, setCustomers] = useState([]);  //todos los customers
    const [temporalCustomers,setTemporalCustomers] = useState([]); //guardo temporalmente
    const [validador,setValidador] = useState(true); //Atento a busqueda

    const [stateArray,setStateArray] = useState(false);//Estado de la actualizacion de la lista

    useEffect(()=>{
      console.log("customers.length === 0");
        CustomerController.getCustomers()
        .then(value=> {
          setCustomers(value);      
      }).catch(error=>{
        console.log("Error al traer el cliente: ",error);
      })
    },[])
    
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

    if (search.length !== 0) {
      setValidador(true)
    }else{
      setValidador(false)
    }
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

  const handleChangeFilter = (event) =>{
        setSearch(event.target.value)
  }

  const methodTypeahead = (inf) => {
    let arr = []
    if (inf) {
     CustomerController.Typeahead(inf)
      .then((result)=>{
        console.log("result",result);
        setTemporalCustomers(result)
      })
      console.log("temporalCustomers",temporalCustomers);
      return
    }
    return arr;
  }

    return (
        <div>
            <Navbar/>
            <Container maxWidth='xl'>
                <Paper className={classes.espacio}>
                    <h1>
                        <CardHeader titleTypographyProps = {'titulo'} title="Clientes" />
                    </h1>
                </Paper>
                <Grid item container justify="flex-end" alignItems="baseline">
                    <InputSearch
                        handleChangeFilter={handleChangeFilter}
                        methodTypeahead={methodTypeahead}
                        search={search}
                    />
                </Grid>
                <br/>
                <Grid item>
                  {
                    (!validador) ? 
                    <IndexTable
                        handleChangeCustomer={handleChangeCustomer}
                        updateStateArray={updateStateArray}
                        customers={customers}
                    />
                    :
                    <IndexTable
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