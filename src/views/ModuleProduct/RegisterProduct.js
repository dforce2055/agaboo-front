import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import './ModuleProduct.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

// const StyledTextField = styled(TextField)
//   label.focused {
//     color: green; 💚
//   }
//   .MuiOutlinedInput-root {
//     fieldset {
//       border-color: red; 💔
//     }
//     &:hover fieldset {
//       border-color: yellow; 💛
//     }
//     &.Mui-focused fieldset {
//       border-color: green; 💚
//     }
//   }
// ;


const currencies = [
  {
    value: "Baño Quimico",
    label: "Baño Quimico"
  },
  {
    value: "Oficina",
    label: "Oficina"
  }
];

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#3fb5a5',
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
    name: "Cat in the Hat",
    age: "",
    multiline: "Controlled",
    currency: "EUR"
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <MuiThemeProvider theme={theme2}>
    
    <form className={classes.container} noValidate autoComplete="off">
      <h1>Registro de productos</h1>
      <div className = {"form"}><TextField
        id="outlined-select-currency-native"
        select
        label="Producto"
        className={classes.textField}
        value={values.currency}
        onChange={handleChange("currency")}
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
        {currencies.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
        
      </TextField>
      <TextField
        id="outlined-name"
        label="Codigo"
        className={classes.textField}
        value={""}
        onChange={handleChange("name")}
        margin="normal"
        variant="outlined"
      />
      
      <TextField
        id="outlined-name"
        label="Descripcion"
        className={classes.textField}
        value={""}
        onChange={handleChange("name")}
        margin="normal"
        variant="outlined"
      /></div>
    </form>
    </MuiThemeProvider>
  );
}
