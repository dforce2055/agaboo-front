import React from 'react';
import {MuiThemeProvider, createMuiTheme, makeStyles} from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const ButtonStyle = color => {
  var outlineColor = '#fff';
  var borderPx = '0px';
  var boderStyle = 'solid';

  var buttonStyle={
    color: outlineColor,
    borderTopColor:outlineColor,
    borderTopWidth: borderPx,
    borderRightColor: outlineColor,
    borderRightWidth: borderPx,
    borderBottomColor: outlineColor,
    borderBottomStyle: boderStyle,
    borderBottomWidth: borderPx,
    borderLeftColor:outlineColor,
    borderLeftStyle: boderStyle,
    borderLeftWidth: borderPx,
    backgroundColor:color
  }

    return buttonStyle;
  }

const ButtonColorStatus = props =>{
  const {status} = props;
  var colors = {
    INICIAL:'#e65100',
    PAGADO:'#33691e',
    ADEUDA:'#d50000',
    'EN CAMINO':'#fbc02d',
    'ENTREGADO':'#2962ff',
  };
  var colordefault = '';
  for (const pos in colors) {
    if (pos === status) {
      colordefault = colors[pos]
    }
  }
  return(
    <Button disabled={true} style={ButtonStyle(colordefault)} type='reset'>
        {status}
    </Button>    
  );
}

export default ButtonColorStatus;