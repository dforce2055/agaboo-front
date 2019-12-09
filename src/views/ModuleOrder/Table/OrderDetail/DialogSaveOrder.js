import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

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

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogSave(props) {
  const {open,handleClose,handleSave} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          ¿Estas seguro de querer guardar?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Al momento de guardar no se podra modificar o eliminar los codigos de los producto introducidos.
          </DialogContentText>
        </DialogContent>
        <DialogActions>

          <MuiThemeProvider theme={themeMuiProvider}>
          <Grid container direction="row" justify="space-around" alignItems="center">
            <Grid item >
          <Button autoFocus onClick={handleClose} color="secondary" variant='contained'>
            cancelar
          </Button>
          </Grid>
          <Grid item>
          <Button variant='contained' onClick={handleSave} color="primary">
            aceptar
          </Button>
          </Grid>
          </Grid>
        </MuiThemeProvider>
        </DialogActions>
      </Dialog>
    </div>
  );
}
