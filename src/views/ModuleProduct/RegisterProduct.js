import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './ModuleProduct.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Button from './Button' ;

import NavBar from '../Header';




const typeProduct = [
  {
    value: "Baño Quimico",
    label: "Baño Quimico"
  },
  {
    value: "Oficina",
    label: "Oficina"
  },
  {
    value: "Boletería",
    label: "Boletría",
  }
  
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    align: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  dense: {
    marginTop: theme.spacing(2)
  },
  menu: {
    width: 200
  }
}));
const theme2 = createMuiTheme({ /* Plantilla de edicion */
  overrides: { 
    MuiTextField: {
      colorPrimary: {
        backgroundColor: '#3fb5a5',
        align: 'center', 
        
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#3fb5a5',
        }
    },
    
    
}
});

export default function ProductForm() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    code: "",
    typeProduct: "",
    description: "",
  });

  const handleChange = name => event => {
    
    
    setValues({ ...values, [name]: event.target.value });
    console.log(event.target  );
  };

  return (
    <MuiThemeProvider theme={theme2}>
      <NavBar/>
    
    <form className={classes.container} noValidate autoComplete="off">
      <h1 >Registro de productos</h1>
      <div  ><TextField
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
      
      <TextField
        id="outlined-name"
        label="Descripcion"
        className={classes.textField}
        value={values.description}
        onChange={handleChange("description")}
        margin="normal"
        variant="outlined"
      /></div>
    </form>
    <Button label ={"Registrar Producto"} ></Button>
    <Button label ={"Cancelar"}></Button>
    </MuiThemeProvider>
  );
}
