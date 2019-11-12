import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import FormDialog from './DialogUpdateProduct';
import ProductController from '../../../controllers/Product';



const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBox() {
  const classes = useStyles();
  const [dialogOpen, setDialog] = React.useState(false);
  const [product, setProduct] = React.useState();
  const [search, setSearch] = React.useState("");
  const [stateSearch, setStateSearch] = React.useState(false);
  const [goSearch, setGoSearch]= React.useState(false);


  async function getProductBar(code){
    if(goSearch){
      const getProduct = await ProductController.getProductByCode(code);
      setProduct(getProduct);
      setGoSearch(false)
      //setSearch("") 
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

  // function abreDialog(){
  //   setDialog(true);
  //   console.log('abreDialog: ', dialogOpen);
  // };

  function getCode(){
    return search;
  }

  

  return (
    <React.Fragment>
      <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Codigo de producto"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange = {setBox}
        onKeyPress={pushEnter}
        type = "number"
        value = {search}

        

      />
        <FormDialog values = {getProductBar()}
                    setDialog = { setDialog }
                    getCode = {getCode}
                    stateSearch = {stateSearch}
                    setStateSearch = {setStateSearch}
                    dialogOpen = {dialogOpen}
                    setSearch = {setSearch}
                   // abreDialog = {abreDialog}
                    />
      
      <Divider className={classes.divider} orientation="vertical" />  
    </Paper>
    </React.Fragment>
  );
}