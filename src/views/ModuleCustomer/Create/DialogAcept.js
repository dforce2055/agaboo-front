/* eslint-disable */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core'
import { withRouter } from "react-router-dom";

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

function DialogAcept(props) {

  const {mostrarDialog} = props;
  const {handleCloseDialog} = props;
  const {history} = props;



  return (
    <div>
      <Dialog
        open={mostrarDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Cliente guardado"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Se agrego un cliente a la base de datos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <MuiThemeProvider theme={themeMuiProvider}>
        <Grid container direction="row" justify="space-evenly" alignItems="center">
          <Button 
          onClick={()=>{
            handleCloseDialog
            history.push('tablaClientes')}
          } 
          color="primary"
          variant='contained'
          >
            ACEPTAR
          </Button>
          </Grid>
          </MuiThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(DialogAcept)
