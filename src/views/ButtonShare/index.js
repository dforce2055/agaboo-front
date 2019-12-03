import React from 'react';
import { 
  FacebookShareButton, 
  FacebookIcon, 
  WhatsappShareButton,
  WhatsappIcon
} from 'react-share'
import { Grid } from '@material-ui/core';

const Facebook = () =>{
  const data = {
    url:String(window.location.href),
    title:'Agaboo.com.ar'
  }
  
  return(
    <div>
    <Grid container direction="row" justify="center" alignItems="center">

      <FacebookShareButton
        url={"https://agaboodforce.web.app/" /*data.url*/} //Necesito una url valida. Y en localhost no se puede probar
        title={data.title}>        
      <FacebookIcon/>
      </FacebookShareButton>

      <WhatsappShareButton
        url={"https://agaboodforce.web.app/" /*data.url*/} //Necesito una url valida. Y en localhost no se puede probar
        title={data.title}>        
      <WhatsappIcon/>
      </WhatsappShareButton>
    
    </Grid>
    </div>
  );
}

export default Facebook;