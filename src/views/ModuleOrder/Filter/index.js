import React from 'react';
import { 
  Button,
  makeStyles  } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import NativeSelects from './Filters';

const useStyles = makeStyles(theme => ({
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}));

const Filter = () =>{
  const classes = useStyles();
  
  return(
    <div>
      {/* <Button style={{backgroundColor:'#fff'}} variant="outlined" color='primary'>
      <FilterListIcon className={classes.leftIcon} fontSize='large'/>
      </Button> */}
      <NativeSelects/>
    </div>
  );
}

export default Filter;