import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton';
import { makeStyles , useTheme, MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ProductController from '../../../controllers/Product';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(theme => ({
  
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width : 200 , 
    },
  

   buttonsDialogDelete :{
    backgroundColor : '#e41313' ,
    color : '#f5f5f5'
  },
  buttonsDialogUpdate :{
    backgroundColor : '#3fb5a5' ,
    color : '#f5f5f5'
  },
  dialogActions : {
    justifyContent : 'center' ,
    marginTop : 50
  }
    
    }));


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
        value: "EN MANTENIMIENTO",
        label: "EN MANTENIMIENTO",
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


export default function DialogUpdateProduct(props) {
  const [open, setOpen] = useState(props.setDialog);
  const [openAlert, setOpenAlert] = useState(false);
  const [openEmpty, setOpenEmpty] = useState(false); 
  const [values, setValues] = useState(props.values);
  const [code, setCode] = useState(-1);
  const {getCode} = props;  
  const {stateSearch, setStateSearch, setSearch} = props;
  const {dialogOpen, setDialog  } = props;
  const [openDelete, setOpenDelete] = useState(false);


  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(()=>{

    if(code !== getCode && stateSearch){
      getCodeUse();
      setStateSearch(false);
    }
    if(dialogOpen){
      handleClickOpen();
      setDialog(false);
    } 
  })

  function getCodeUse(){
    setCode(getCode);

  }
  


  async function  handleClickOpen (){
    setCode(getCode);
    const product = await ProductController.getProductByCode(code);
    setValues(product);
    if( product === -1) {
      setOpenEmpty(true);
    }else
    if(  product !== 1  ) {
      setOpen(true)
    } else {
      setOpenAlert(true); 
    }
  }


   function updateProduct(){
    console.log("llegue a register Product", values);

    const newProduct = {
      type : values.type,
      code : values.code,
      description : values.description,
      state : values.state,
    };
    ProductController.editProduct(newProduct);
    //alert("El producto ha sido aculizado");
    setOpen(false);
    setSearch("");
  }

  function deleteProduct() {

    ProductController.deleteProduct(values.code);
    setOpenDelete(false);
    setOpen(false);
    setSearch("");
  }


  const handleClose = () => {
    setOpen(false);
    setSearch("");
  };

  

  const handleCloseAlert = () =>{
    setSearch("");
    setOpenEmpty(false);
    setOpenAlert(false);
  };

  const handleOpenDelete  = () => {
    setOpenDelete(true);
  };
  

  const handleCloseDelete = () => {
    setSearch("");
    setOpenDelete(false);
  };
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const classes = useStyles();


  return (
    <div>
      <IconButton onClick={handleClickOpen}>
          <SearchIcon />
      </IconButton>
      
      <Dialog open={open} aria-labelledby="form-dialog-title" onClose={handleClose} fullScreen={fullScreen} >
        <DialogTitle id="form-dialog-title" alignItems = {"center"} >Modificar Producto</DialogTitle>
        <DialogContent>
            <Grid container direction="column" justify="center" alignItems="center" >
              <Grid item>
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
                  variant="outlined" >
                    {typeProduct.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>  
              </Grid>
              
              <Grid item>
                <TextField
                  id="Code"
                  label="Codigo"
                  className={classes.textField}
                  type= "number"
                  value={values.code}
                  onChange={handleChange("code")}
                  margin="normal"
                  variant="outlined"
                  disabled = "true" />   
              </Grid>          
              
              <Grid item>
                <TextField
                  id="outlined-name"
                  label="Descripcion"
                  className={classes.textField}
                  value={values.description}
                  onChange={handleChange("description")}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>

              <Grid item>
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
                  variant="outlined" >
                  {typeState.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                 </TextField>
              </Grid>
            </Grid>
        </DialogContent>
        
        <Grid container direction="row" justify="center" alignItems="flex-end" >
          <Grid item>
            <Button  onClick = {updateProduct}color="primary">
              Modificar
            </Button>
          </Grid>

          <Grid item>
            <Button onClick = {handleOpenDelete} color="primary">
              Eliminar
            </Button>
          </Grid>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
          </Grid>
        
      </Dialog>

{/* ------------------------------------------DIALOG PRODUCT NOT FOUND------------------------------------------------- */}

      <Dialog
        open={openAlert}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Busqueda fallida"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El producto no existe intente de nuevo.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>

{/* -------------------------------------------------------------DIALOG EMPTY FIELD---------------------------------------------- */}      
      <Dialog
        open={openEmpty}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Campo vacío"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Debe ingresar un código.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert} color="primary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
{/* -------------------------------------------------------------DIALOG DO YOU WANT DELETE---------------------------------------------- */}
      <Dialog
        open={openDelete}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Eliminar"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Esta seguro que desea eliminar el producto {values.code}?.         
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteProduct} color="primary" autoFocus>
            Aceptar
          </Button>
          <Button onClick={handleCloseDelete} color="primary" autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}