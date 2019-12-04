import React,{ useEffect } from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import {FormControl,Paper,TextField,InputBase,Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CustomerController from '../../../../controllers/Customer';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export default function Filters({Typeahead,methodTypeahead,search}) {
  const classes = useStyles();  

  const inputLabel = React.useRef(null);
  return (
    <Paper style={{backgroundColor:'#fff',padding:10,marginTop:10,boxShadow: "1px 6px 15px #9E9E9E"}}>
    <Grid container direction="row" justify="flex-end" alignItems="center" spacing={2}>
    <Grid item>
      <div className={classes.search} style={{backgroundColor:'#E0E0E0'}}>
        <div className={classes.searchIcon}>
          <SearchIcon style={{color:'#949494'}}/>
        </div>
        <InputBase
          placeholder="Buscar..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={Typeahead}
          // onKeyUp={
          //   event =>{
          //     methodTypeahead(search);
          // }}
        />
      </div>
    </Grid>
    </Grid>
    </Paper>
  );
}
