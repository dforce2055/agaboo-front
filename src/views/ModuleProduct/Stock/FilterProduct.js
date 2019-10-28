import React , {  useState }from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";



const typeState = [
  {
    value: "DISPONIBLE",
    label: "DISPONIBLE",
  },
  {
    value: "ALQUILADO",
    label: "ALQUILADO",
  },
  {
    value: "EN MANTENIMIENTO",
    label: "EN MANTENIMIENTO",
  },
  {
    value: "EN TRANSITO",
    label: "EN TRANSITO",
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




  export default function FilterProduct(props){
    const {value, setValue, setUpdate} = props;
    const classes = useStyles();  

    
    const handleChange = event => {
        if(value !== event.target.value){
            setValue(event.target.value);
            setUpdate(true);
        }
        
      };
    



    return(
    <TextField
        id="type-product"
        select
        label="Estado"
        className={classes.textField}
        value={value }
        
        
        onChange={handleChange}
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
)
    


  }


