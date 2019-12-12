import React, { useState,useEffect }from 'react';
import { withRouter } from 'react-router-dom';
import NavBar from '../Header/Navigation';
import SimpleBottomNavigation from '../Footer/Footer';
import firebase from '../../config/firebase';
import { Paper,CardHeader,Grid,Container,CardContent } from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme ,makeStyles } from '@material-ui/core/styles';
import TableProduct from './Table';
import ProductController from '../../controllers/Product';
import Filters from './Filter';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ResponsiveDialog from './Dialog/NewDialog.js'

const useStyles = makeStyles(theme => ({
    root:{
        flexGrow: 1,
    },
    espacio:{
      margin: theme.spacing(3),
    },
    espacioArribaFooter:{
        margin: theme.spacing(3),
        paddin:theme.spacing(2),
        marginBottom:'75px'
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

async function checkRoleAdmin(){
    let role = await firebase.getCurrentUserRole();
  
    if(role==="ADMIN"){
      return false;
    }else if(role==="LOGISTICS"){
      return false;
    }
  }


const ModuleProduct = (props) =>{
  const classes = useStyles();
  const [products,setProducts] = useState([]);//Almaceno todos los pedidos
  let userRole = checkRoleAdmin();
  const {history} = props;
  const [search,setSearch] = useState({
    input:'',
    select:""
  });
  const [productSelect,setProductSelect] = useState({});
  const [open, setOpen] = useState(false);
  const [optionAutocomplete,setOptionAutocomplete] = useState([]);


  console.log(search);
  useEffect(()=>{ //Se ejecuta solamente cuando se renderiza
    ProductController.cantidad_sin_Alquilar()
      .then(result=>{
        if (result) {
          setProducts(result);
        }
      })
  },[]);

  if (!firebase.getCurrentUsername()) {
    // not logged in
    alert('Por favor inicie sesión para acceder')
    props.history.replace('/login')
    return null
  }

  const handleChangeFilter = name => (event) => {
    if (event.target.value !== "") { //Si el seleccionar cambia de estado busco por estado seleccionado
      setSearch({...search,[name]:event.target.value});
      console.log(event.target.value);
      
      ProductController.cantidad_sin_Alquilar_state(event.target.value)
      .then(result=>{
        if (result) {
          setProducts(result)
        }
        console.log("selecciono los en transi",result);
      })
    }else if(event.target.value === ""){ //Si esta vacio el campo de buscar, vuelvo la tabla normal
      setSearch({...search,[name]:event.target.value});
      ProductController.cantidad_sin_Alquilar_state("DISPONIBLE")
      .then(result=>{
        if (result) {
          setProducts(result)
        }
      })
    }
  }

  const handleChangeInput = (value) =>{
    console.log("Muestro valor en index=",value);
    setSearch({...search,['input']:value})
  }

  const Typeahead = (string) =>{
    if (string !== "") {
      ProductController.Typeahead(string)
      .then(result=>{
        setOptionAutocomplete(result)
      })
    }
  }

  const handleClickOpen = () => {
    if (search.input !== null) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <div className={classes.root}>

    <header>
      <NavBar/>
    </header>

    <ResponsiveDialog
      value={search.input}
      open = {open}
      handleClickOpen={handleClickOpen}
      handleClose={handleClose}
    />

    <Paper className={classes.espacio}>
      <h1>
        <CardHeader title="Productos" />
      </h1>
    </Paper>

    <div className={classes.espacio}>
      <Grid container direction="row" justify="flex-end" alignItems="baseline">
        <Filters
          setProductSelect={setProductSelect}
          handleClickOpen={handleClickOpen}
          optionAutocomplete={optionAutocomplete}
          search={search}
          handleChangeInput={handleChangeInput}
          Typeahead={Typeahead}
          handleChangeFilter={handleChangeFilter}
        />
      </Grid>
    </div>

    <Paper className={classes.espacioArribaFooter}>
    <CardContent>
      <TableProduct 
        product={products}
      />
      </CardContent>
    </Paper>

    {userRole ?
              <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => history.push('/createProduct')} >
                <AddIcon />
              </Fab> : ""
            }
    <footer>
    <SimpleBottomNavigation/>
    </footer>
    </div>
  );
}

export default withRouter(ModuleProduct);