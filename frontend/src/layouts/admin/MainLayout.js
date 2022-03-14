import React from 'react';

import '../../assets/admin/css/styles.css';
import '../../assets/admin/js/scripts';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import TestLink from './TestLink';


const MainLayout = () =>{

    return  (
        <div className="sb-nav-fixed">
            <Navbar/>
            <div id="layoutSidenav"> 
            
                <div id="layoutSidenav_nav">
                    <Sidebar/>
                </div>

                <div id="layoutSidenav_content">

                    <main>
                       
                    </main>
                    <Footer/>
                </div>
            </div>
        </div>
    );

}


export default MainLayout;