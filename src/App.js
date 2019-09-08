import React, {Component} from 'react';
import logo from './logo.svg';
import FormPage from './views/Login';
import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import MainMenu from "./views/MainMenu";
import Navbar from "./views/Navigation";


class App extends Component 
  {  

  render(){ 
    
    return (
     
        <BrowserRouter>
          <React.Fragment>
            <Route path= "/login" component={FormPage}/>
            <Route path= "/mainMenu" component={MainMenu}/>
            <Route path= "/nav" component={Navbar}/>

           
          </React.Fragment>
        </BrowserRouter>
   
    );  
}
}

export default App;
