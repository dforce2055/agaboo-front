import React from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";

function BotonIngresar(props){
    const {history} = props;
    return(
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick ={ () => history.push('/mainMenu')}
        >
            Ingresar a la Aplicación
        </Button>
    )
}
export default withRouter(BotonIngresar);