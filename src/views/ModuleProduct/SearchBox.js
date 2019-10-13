import React , {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import FormDialog from './DialogUpdateProduct';
import ProductController from '../../controllers/Product';



const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
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
  


  async function getProductBar(code){
    const getProduct = await ProductController.getProductByCode(code);
    setProduct(getProduct);
  }

  function setBox(e){
    setSearch(e.target.value);
    setStateSearch(true);
    console.log('setBox ', search );
  }

  function abreDialog(){
    setDialog(!dialogOpen);
    console.log('abreDialog: ', dialogOpen);
  };

  function getCode(){
    console.log('Llego a getCode : ', search)
    return search;
  }

  

  return (
    <Paper className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="Codigo de producto"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange = {setBox}

        

      />
        <FormDialog values = {getProductBar(1)}
                    setDialog = { dialogOpen }
                    onClick = { abreDialog }
                    getCode = {getCode}
                    stateSearch = {stateSearch}
                    setStateSearch = {setStateSearch}
                    />
      
      <Divider className={classes.divider} orientation="vertical" />
      
    </Paper>
  );
}