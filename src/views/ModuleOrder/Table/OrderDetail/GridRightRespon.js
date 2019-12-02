import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {Typography,TextField} from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';
// import ButtonOption from './ButtonOption.js';
// import ButtonColorStatus from './ButtonColorStatus.js';
import Box from '@material-ui/core/Box';

export default function GridRightResponsive(props) {
  const {data} = props;
  const {i} = props;  
  const {addIdForIndex} = props;

  return (
    <div>
      <Grid 
      container 
      direction="row" 
      justify="space-around" 
      alignItems="center"
      >
        <Grid item>
          <Typography gutterBottom variant="subtitle1" >
            <Box fontSize="h5.fontSize" m={1}>
              {data.producto}
            </Box>
          </Typography>
        </Grid>

        <Grid item>
          <Typography gutterBottom variant="subtitle1" >
            <Box fontSize="h5.fontSize" m={1}>
              { (data.modelo == "")? "---" : data.modelo }
            </Box>
          </Typography>
        </Grid>

        <Grid item>
          <TextField 
          style={{width:'100px'}} 
          variant="outlined" 
          label="Codigo" 
          multiline 
          rowsMax="4" 
          onChange={addIdForIndex(i)}
                  />
        </Grid>
      </Grid>
    </div>
  );
}
