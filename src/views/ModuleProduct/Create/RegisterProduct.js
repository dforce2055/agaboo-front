import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './ModuleProduct.css';
// import Button from './Button' ;
import { Button, ButtonGroup } from '@material-ui/core/';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import {withRouter} from 'react-router-dom' ;
import Paper from '@material-ui/core/Paper';
import ProductController from '../../../controllers/Product';


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



let typeProduct = [];
//'ALQUILADO', 'DISPONIBLE', 'EN MANTENIMIENTO', 'EN TRANSITO', 'ELIMINADO'
const typeState = [
  {
    value: "DISPONIBLE",
    label: "DISPONIBLE",
  },
  {
    value: "EN MANTENIMIENTO",
    label: "EN MANTENIMIENTO",
  },
  
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    border: "1px" ,
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(9),
    margin: 'auto',
    maxWidth: 500,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width : 194 
    
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200,
  },
  buttonLeft: {
    marginRight:'2px',
    marginLeft:'10px',
    marginTop: theme.spacing(3),
  },
  buttonRight: {
    marginLeft:'20px',
    marginTop: theme.spacing(3),
  },
}));


 function ProductForm(props) {
  const {history} = props;
  const classes = useStyles();
  const [values, setValues] = React.useState({
    code: "",
    typeProduct: "Baño Químico",
    state: "DISPONIBLE",
    description:""
  });

   const [tiposDeProductos, setTiposDeProductos] = React.useState([]);

   React.useEffect(() => {
    if (tiposDeProductos.length === 0) {
      getTypesOfProducts();
    }
   }); 

   function getTypesOfProducts() {
     ProductController.getTypesOfProducts()
       .then(tiposDeProducto => {
         setTiposDeProductos(tiposDeProducto);

         typeProduct = [];
         tiposDeProducto.forEach(producto => {
           typeProduct.push({ value: producto, label: producto });
         })
       })
   }
   
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  function registerProduct(){
    console.log("llegue a register Product")


    const product = {
      type : values.typeProduct,
      code : values.code,
      description : values.description,
      state : values.state,
    };
    
    console.log("product : ", product);
    ProductController.addProduct(product);
    alert("El producto está registrado");
    setValues({
      code: "",
      typeProduct: "Baño Químico",
      state: "DISPONIBLE",
      description:""
    })

  } 


  return (
    <React.Fragment>
      <div style={{marginTop:'20px'}}>
      <MuiThemeProvider theme={themeMuiProvider}>
      <Paper className={classes.paper} > 
        <Grid container justify = { "center" } className = { "grid"} >
          <Grid item xs = {12} sm = {6}>
              <h1 >Registro de productos</h1>
              <form className={classes.container} noValidate autoComplete="off" >
                <Grid item xs = {12} alignItems = {"center"}  >
                  
                  <TextField
                    id="type-product"
                    select
                    label="Producto"
                    className={classes.textField}
                    value={values.typeProduct}
                    onChange={handleChange("typeProduct")}
                    onClick={getTypesOfProducts}
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
                          {option.value}
                      </option>
                    ))}
                    
                  </TextField>  
                  
                  <TextField
                    required
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
            <Grid item xs = {12} alignItems = {"center"}>
            <ButtonGroup
                variant="text"
                size="large"
                aria-label="large contained  button group"
            >
               <Button
                  className={classes.buttonLeft}
                  color="secondary"
                  variant="contained"
                  onClick={ () => history.goBack()  }
                >
                  Cancelar
                </Button>
                <Button
                  className={classes.buttonRight}
                  label={"Registrar Usuario"}
                  color="primary"
                  variant="contained"
                  type=" submit "
                  onClick = { registerProduct }
                >
                  Guardar
                </Button>
            </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      </MuiThemeProvider>
      </div>
    </React.Fragment>

  );
}

export default withRouter(ProductForm);