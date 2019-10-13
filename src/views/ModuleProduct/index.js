import React from 'react';
import NavBar from '../Navigation';
import CustomizedTables from './TableProducts';
import SimpleBottomNavigation from '../Footer/Footer';

export default function indexProduct() {

    return (
        <div>
            <NavBar elemento1 = {CustomizedTables} >    </NavBar>
            
                <footer>
                    <SimpleBottomNavigation/>
                </footer>
        </div>
    )
}