import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useMediaQuery,Grid,TextField,MenuItem,Checkbox,FormControlLabel} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import ProductController from '../../../controllers/Product';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';

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

const currencies = [
  {
    value: 'Baño Quimico',
    label: 'Baño Quimico',
  },
  {
    value: 'Oficina',
    label: 'Oficina',
  },
  {
    value: 'Boletería',
    label: 'Boletería',
  },
  {
    value: 'Garita',
    label: 'Garita',
  },
];

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

export default function DialogUpdateProduct({clearField,value,open,handleChangeProduct,handleClose}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs')); //Se regula el tamaño el cual se mostrara fullScreen
  const [Delete,setDelete] = useState(false);
  const [confirm,setConfirm] = useState(false)


  const Confirm = () =>{
    if (Delete) {
      ProductController.deleteProduct(value.code)
      setDelete(false)
      alert("Eliminado con exito.")
    }else{
      ProductController.editProduct(value);
      alert("Modificado con exito.")
    }
    handleClose();
  }

  const handleDelete = (event) =>{
    setDelete(event.target.checked)
  }
  
  return (
    <div>
      {
        (value) ? //Si el producto existe muestra el dialog
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
                    Codigo producto:<br/><TextField disabled={true} value={value.code}/>
                  </DialogContentText>
                </Grid>

                <Grid item>
                  <DialogContentText>
                    Tipo: <br/>
                    <TextField 
                    style={{width:"200px"}}
                    select
                    value={value.type} 
                    onChange={handleChangeProduct("type")}>

                      {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                        ))
                      }
                    </TextField>
                  </DialogContentText>
                </Grid>

                <Grid item>
                  <DialogContentText>
                    Descripcion: <br/><TextField value={value.description} onChange={handleChangeProduct('description')}/>
                  </DialogContentText>
                </Grid>
                <Grid item>
                  <DialogContentText>
                    Estado:<br/><TextField
                      select
                      fullWidth={true}
                      value={value.state}
                      onChange={handleChangeProduct("state")} >
                    {typeState.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br/>
                  <Grid container direction="row" justify="flex-start" alignItems="flex-end" >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={Delete}
                        onChange={handleDelete}
                      />
                    }
                    label="Eliminar"
                  />
                  </Grid>
                  </DialogContentText>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
            </DialogActions>
             <MuiThemeProvider theme={themeMuiProvider}>
            <Grid container direction="row" justify="space-around" alignItems="flex-end" style={{marginBottom:"25px"}}>
              <Grid item>
                <Button color="primary" variant="contained" onClick = {Confirm}>Aceptar</Button>
              </Grid>

              <Grid item>
                <Button color="secondary" variant="contained" onClick={handleClose}>cancelar</Button>
              </Grid>
            </Grid>
            </MuiThemeProvider>
          </Dialog>
          :
          handleClose()
      }
    </div>
  );
}
