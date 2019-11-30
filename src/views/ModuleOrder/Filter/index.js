import React from 'react';
import { 
  //Button,
  makeStyles  } from '@material-ui/core';
//import FilterListIcon from '@material-ui/icons/FilterList';
import Filters from './Filters';

// const useStyles = makeStyles(theme => ({
//   rightIcon: {
//     marginLeft: theme.spacing(1),
//   },
//   iconSmall: {
//     fontSize: 20,
//   },
// }));

const Filter = (props) =>{
  //const classes = useStyles();
  const {state,handleChangeFilter} = props;

  return(
    <div>
      {/* <Button style={{backgroundColor:'#fff'}} variant="outlined" color='primary'>
      <FilterListIcon className={classes.leftIcon} fontSize='large'/>
      </Button> */}
      <Filters
        state={state}
        handleChangeFilter={handleChangeFilter}
      />
    </div>
  );
}

export default Filter;