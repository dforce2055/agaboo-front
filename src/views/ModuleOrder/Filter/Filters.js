import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {FormControl,Paper,TextField,InputBase,Grid } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import SearchIcon from '@material-ui/icons/Search';
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

export default function NativeSelects() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  return (
    <Paper style={{backgroundColor:'#fff',padding:10,marginTop:10}}>
    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
    <Grid item>
      <div className={classes.search} style={{backgroundColor:'#E0E0E0'}}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Buscar..."
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </Grid>
    <Grid item>      
      <FormControl 
      variant="outlined" 
      className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
          Filtrado por estado
        </InputLabel>
        <Select
          native
          value={state.age}
          onChange={handleChange('age')}
          labelWidth={labelWidth}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
          <option value="" />
          <option value={10}>Inicial</option>
          <option value={20}>Pagado</option>
          <option value={30}>Adeudado</option>
        </Select>
      </FormControl>
      </Grid>
    </Grid>
    </Paper>
  );
}
