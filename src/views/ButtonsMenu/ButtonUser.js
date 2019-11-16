import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";


function CustomizedMenus(props) {

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={() => history.push('/usuarios')}>
      >
        Usuarios
      </Button>
    </div>
  );
}

export default withRouter(CustomizedMenus);