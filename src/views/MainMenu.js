import React, {Component} from 'react';
import Navbar from './Navigation';
import ButtonClient from './ButtonClient';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './MainMenu.css';



class MainMenu extends Component
{
    render()
    {
        return(
            <div>
                 <Navbar/>
                 <div  className = {"Button"}><ButtonClient/></div>
                 

            </div>
           
            
            
            )
    }
}

export default MainMenu;