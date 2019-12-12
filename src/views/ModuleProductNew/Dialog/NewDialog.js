import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useMediaQuery,Grid,TextField,MenuItem } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ProductController from '../../../controllers/Product';

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

export default function ResponsiveDialog({value,open,handleClickOpen,handleClose}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs')); //Se regula el tamaño el cual se mostrara fullScreen
  const [product,setProduct] = useState();
  // const [load,setLoad] = useState(true)

  // useEffect(()=>{
  //   if (open && load) {
  //     ProductController.getProductByCode(value)
  //     .then(result=>{
  //       if (result) {
  //         setProduct(result)
  //       }
  //     })
  //     console.log("product",product);
  //     setLoad(false)
  //   }
  // });

  const handleChange =name=> (event) =>{
    setProduct({...product,[name]:event.target.value})
  }

  const deleteProduct= () =>{
    ProductController.deleteProduct(value.code)
    handleClose()
  }

  if (!value) { //Si no existe los datos se cierra
    handleClose();
  }
  
  return (
    <div>
      {
        (value) ? 
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"Modificar Producto"}</DialogTitle>
            <DialogContent>
              <Grid container direction="column" justify="space-evenly" alignItems="flex-start">
                <Grid item>
                  <DialogContentText>
                    Codigo producto:<TextField disabled={true} value={value.code}/>
                  </DialogContentText>
                </Grid>
                <Grid item>
                  <DialogContentText>
                    Codigo tipo:<TextField value={value.type}/>
                  </DialogContentText>
                </Grid>
                <Grid item>
                  <DialogContentText>
                    Codigo descripcion:<TextField value={value.description}/>
                  </DialogContentText>
                </Grid>
                <Grid item>
                  <DialogContentText>
                    Codigo estado:
                    <TextField 
                      id="standard-select-currency"
                      select
                      style={{width:"150px"}}
                      product={value.state}
                      onChange={handleChange("state")}
                    >
                    {typeState.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
            <Grid container direction="row" justify="space-around" alignItems="flex-end" style={{marginBottom:"25px"}}>
              <Grid item>
                <Button color="secondary" variant="contained" onClick={handleClose}>cancelar</Button>
              </Grid>

              <Grid item>
                <Button color="inherit" variant="contained">modificar</Button>
              </Grid>

              <Grid item>
                <Button color="secondary" variant="contained">eliminar</Button>
              </Grid>
            </Grid>
          </Dialog>
          :
          handleClose()
      }
    </div>
  );
}
