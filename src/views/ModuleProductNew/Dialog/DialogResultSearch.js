import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Paper,Grid,TextField} from '@material-ui/core';
import Draggable from 'react-draggable';
import {
  MuiThemeProvider, 
  createMuiTheme,
   makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function PaperComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export default function DialogResultSearch({search,open,handleClickOpen,handleClose}) {
  // console.log("producto en dialog",productSelect);
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open2, setOpen2] = React.useState(false);

  if (!search) {
    handleClose();
  }
  console.log("dialog",search);
  
  const handleChange = event => {
    setAge(event.target.value);
  };

  const handleCloseSelect = () => {
    setOpen2(false);
  };

  const handleOpenSelect = () => {
    setOpen2(true);
  };
  
  return (
    <div>
    <MuiThemeProvider theme={themeMuiProvider}>
      {/* <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      {
        search !== null ? 
              <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          ¿Desea modificar el producto {search.code} ? 
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Grid container direction="column" justify="space-evenly" alignItems="flex-start">

              <Grid item>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label" style={{width:"150px"}} variant="contained">Estado</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open2}
                      onClose={handleCloseSelect}
                      onOpen={handleOpenSelect}
                      value={age}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>                
              </Grid>
              <TextField></TextField>

              <TextField></TextField>

              <TextField></TextField>

              <TextField></TextField>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Grid container direction="row" justify="space-around" alignItems="center" >
          <Button autoFocus onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Subscribe
          </Button>
          </Grid>
        </DialogActions>
      </Dialog>
      :
      handleClose()
      }
      </MuiThemeProvider>
    </div>
  );
}
