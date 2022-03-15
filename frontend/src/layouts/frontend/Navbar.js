import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {

    var AuthButtons ='';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons =(
            <ul className='navbar-nav'>

                <li className="nav-item">
                <Link className="nav-link" to="/registration">Registration</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
                </li>

            </ul>
        );
  
    }
    else{
        AuthButtons =(
            <li className="nav-item">
            <button type="button" className="nav-link btn btn-danger btn-sm text-white" >Logout!</button>
            </li>
        );
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow stick-top">
        <div className="container">
            <Link className="navbar-brand" to="#">Navbar</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="#">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/collection">Collection</Link>
                </li>
                
                {AuthButtons}
            </ul>
           
            </div>
        </div>
        </nav>
    );
}

export default Navbar;