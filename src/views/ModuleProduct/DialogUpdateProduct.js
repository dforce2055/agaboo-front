import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles , useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProductController from '../../controllers/Product';


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
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(props.values);
  //const [products, setProducts] = useState(props.products);
  //const [position, setPosition] = useState(-1);
  let products = props.products;
  let position = -1 ;
  
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  


  const handleClickOpen = () => {
    setOpen(true);
  };

   function updateProduct(){
    console.log("llegue a register Product", values);


    const newProduct = {
      type : values.type,
      code : values.code,
      description : values.description,
      state : values.state,
    };


    console.log("product : ", newProduct);
    ProductController.editProduct(newProduct);
    console.log('Products before: ', products);
    position = products.findIndex(product => product.code === values.code);
    console.log('Position--------------------------- :' , position );
    alert("El producto ha sido aculizado");
    products[position] = newProduct;


    //products[0] = newProduct;
    console.log('Products after: ', products);
    props.setRows([])
    updateArray(products); 
    setOpen(false);

  }
  
  
  function updateArray(newArray){
    console.log('Llego con newArray dialog:' , newArray);
    props.getArray(newArray);

  }



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
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}

      >
        <DialogTitle id="form-dialog-title">Modificar Producto</DialogTitle>
        <DialogContent>
            <Grid container spacing = {1} justify = { "center" } className = { "grid"} >
             <Grid item xs = {6} xl = {6} alignItems = {"center"}  >

                <TextField
                    id="type-product"
                    select
                    label="Producto"
                    className={classes.textField}
                    value={values.typeProduct }
                    disabled = "true"
                    
                    onChange={handleChange("type")}
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
                    disabled = "true"

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
          <Button onClick={updateProduct} color="primary">
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