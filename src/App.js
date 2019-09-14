import React, {Component} from 'react';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import Navbar from "./views/ModulsUserAdmin/Navigation";
import SignIn from './views/LogInScreen/Login';
import BMUsers from "./views/ModulsUserAdmin/indexUserAdm";
import * as serviceWorker from './serviceWorker';





class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path="/" component={SignIn} exact/>
            <Route path= "/mainMenu" component={MainMenu} />
            <Route path= "/nav" component={Navbar} />
            <Route path= "/bmUsers" component={BMUsers} />
           
          </React.Fragment>
        </BrowserRouter>
   
    );  
}
}

export default App;

serviceWorker.unregister();
