import React from 'react';
import { fade,makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import FormDialog from './DialogUpdateProduct';
import ProductController from '../../../controllers/Product';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 270,
    marginTop:theme.spacing(2),
    marginBottom:theme.spacing(2),
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
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

export default function SearchBox() {
  const classes = useStyles();
  const [dialogOpen, setDialog] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [stateSearch, setStateSearch] = React.useState(false);
  const [goSearch, setGoSearch]= React.useState(false);


  async function getProductBar(code){
    if(goSearch){
      await ProductController.getProductByCode(code);
      
      setGoSearch(false)
      setDialog(true);

    }
  }

  function setBox(e){
    setSearch(e.target.value);
    setStateSearch(true);
    console.log('setBox ', search );
  }

  function pushEnter(e){
    if(e.key === 'Enter'){
      setGoSearch(true);
      
    }
  }


  function getCode(){
    return search;
  }

  

  return (
    <React.Fragment>
      {/* <InputBase
        className={classes.input}
        placeholder="Codigo de producto"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange = {setBox}
        onKeyPress={pushEnter}
        type = "number"
        value = {search}
      /> */}

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
          onChange = {setBox}
          onKeyPress={pushEnter}
          type = "number"
          value = {search}
        />
      </div>

        <FormDialog values = {getProductBar(search)}
                    setDialog = { setDialog }
                    getCode = {getCode}
                    stateSearch = {stateSearch}
                    setStateSearch = {setStateSearch}
                    dialogOpen = {dialogOpen}
                    setSearch = {setSearch}
        /> 
    </React.Fragment>
  );
}