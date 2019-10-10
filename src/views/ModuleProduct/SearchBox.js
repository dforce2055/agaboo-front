import React from 'react';
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

  async function getProductBar(code){
    const product = await ProductController.getProductByCode(code);

  }
  

  return (
    <Paper className={classes.root}>
      
      <InputBase
        className={classes.input}
        placeholder="Codigo de producto"
        inputProps={{ 'aria-label': 'search google maps' }}

      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon/>
        <FormDialog values = {getProductBar(1)}/>
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      
    </Paper>
  );
}