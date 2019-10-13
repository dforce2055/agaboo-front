import React , { useEffect }from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './ModuleProduct.css';
import Button from './Button' ;
import Grid from '@material-ui/core/Grid'
import NavBar from '../Header/Navigation';
import {withRouter} from 'react-router-dom' ;
import Paper from '@material-ui/core/Paper';
import ProductController from '../../controllers/Product';


const usuario={
  usuario: "Ivan",
  rol: "Esclavo"

}


const typeProduct = [
  {
    value: "Baño Químico",
    label: "Baño Químico"
  },
  {
    value: "Oficina",
    label: "Oficina"
  },
  {
    value: "Boletería",
    label: "Boletería",
  },
  {
    value: "Garita",
    label: "Garita de Seguridad",
  }
  
];
const typeState = [
  {
    value: "Disponible",
    label: "Disponible",
  },
  {
    value: "Alquilado",
    label: "Alquilado",
  },
  {
    value: "Averiado",
    label: "Averiado",
  }
  
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px" ,
   
  },
  paper: {
    padding: theme.spacing(1),
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200,
  }
}));


 function ProductForm(props) {
  const {history} = props;

  useEffect(() => {
    if(usuario.rol !== "Esclavo"){
      history.push('/')
      console.log('useEffect')
    }
    
  });



  const classes = useStyles();
  const [values, setValues] = React.useState({
    code: "",
    typeProduct: "Baño Químico",
    state: "Disponible",
    description:""
  });

  const handleChange = name => event => {
    
    
    setValues({ ...values, [name]: event.target.value });
  };

  function registerProduct(){
    console.log("llegue a register Product")


    const product = {
      typeProduct : values.typeProduct,
      code : values.code,
      description : values.description,
      state : values.state,
    };
    
    console.log("product : ", product);
    ProductController.addProduct(product);




  } 


  

  return (
      <div style={{marginTop:'20px'}}>
      <NavBar/>
      <Paper className={classes.paper} > 
        <Grid container spacing = {1} justify = { "center" } className = { "grid"} >
          
          <Grid item xs = {6} lg = {9}>
              <h1 >Registro de productos</h1>
              <form className={classes.container} noValidate autoComplete="off" >
                <Grid item xs = {12} alignItems = {"center"}  >
                  
                  <TextField
                    id="type-product"
                    select
                    label="Producto"
                    className={classes.textField}
                    value={values.typeProduct   }
                    
                    onChange={handleChange("typeProduct")}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    helperText="Tipo de producto a registrar "
                    margin="normal"
                    variant="outlined"
                  >
                    {typeProduct.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    
                  </TextField>  
                  
                  <TextField
                    
                  
                    id="Code"
                    label="Codigo"
                    className={classes.textField}
                    type= "number"
                    value={values.code}
                    onChange={handleChange("code")}
                    margin="normal"
                    variant="outlined"
                  />              
                </Grid>
                

                <Grid item xs = {12} alignItems = {"center"}>
                  <TextField
                    id="outlined-name"
                    label="Descripcion"
                    className={classes.textField}
                    value={values.description}
                    onChange={handleChange("description")}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                  id="type-product"
                  select
                  label="Estado"
                  className={classes.textField}
                  value={values.state }
                  
                  onChange={handleChange("state")}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  
                  margin="normal"
                  variant="outlined"
                >
                  {typeState.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                  
                </TextField>
              </Grid>
                
                
            </form>
            <Button label ={"Registrar Producto"} onClick = { registerProduct } ></Button>
            <Button label = {"Cancelar"} onClick ={ () => history.push('/mainMenu')  } ></Button>

          </Grid> 
        </Grid>
     
      </Paper>
        
      </div>
      

  );
}

export default withRouter(ProductForm);