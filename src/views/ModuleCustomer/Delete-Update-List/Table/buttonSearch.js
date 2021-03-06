import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CustomerController from '../../../../controllers/Customer';
import { hideFooter } from './../../Footer/HideFooter';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
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

export default function ButtonSearch(props) {
  const classes = useStyles();

  const [values,setValues] = React.useState({
    buscar:'',
  });
  const [handleFounDb,setHandleFounDb] = React.useState([]);

  const handleChange = name => event => {
    console.log(event.target.value);    
    setValues({ ...values, [name]: event.target.value });  
  };

  function Search(e) {
    CustomerController.searchCustomer(e)
     .then(result=>{
       setHandleFounDb(result);
      });
  }

  React.useEffect(() => {
    hideFooter();
  }); 

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        onChange={handleChange('buscar')}
        onKeyPress={ 
                    event =>{
                    if(event.keyCode===13 || event.key === 'Enter'){
                      Search(values.buscar);
                    }
                  }}  

        placeholder="Buscar Cliente"
        inputProps={{ 'aria-label': 'Buscar en la base de datos' }}
      />
      <IconButton 
      className={classes.iconButton} 
      aria-label="search">
        <SearchIcon />
      </IconButton>     
    </Paper>
  );
}