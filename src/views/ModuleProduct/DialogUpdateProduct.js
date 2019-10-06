import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
      },
    }));

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
          label: "Boletría",
        }
        
      ];
      

  




export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(props.values)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();


  return (
    <div>
      <IconButton>
          <EditIcon onClick={handleClickOpen}/>
      </IconButton>
      
      
      
      <Dialog open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
        
      >
        <DialogTitle id="form-dialog-title">Modificar Producto</DialogTitle>
        <DialogContent>
            <Grid container spacing = {1} justify = { "center" } className = { "grid"} >
             <Grid item xs = {12} xl = {9} alignItems = {"center"}  >

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
            </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Modifica
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}