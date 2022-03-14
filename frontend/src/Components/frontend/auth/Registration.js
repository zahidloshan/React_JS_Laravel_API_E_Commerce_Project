import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar';

function Registration() {

    const [registerInput,setRegister]=useState({

        name: '',
        email: '',
        password: '',
    });
    
    const handleInput=(e)=>{
        e.presist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data ={
            name : registerInput.name,
            email : registerInput.email,
            password : registerInput.password,
        }
    }


    return (
        <div>

            <Navbar/>
            
                    <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Register</h4>
                                </div>
                            <div className="card-body">
                                <form onSubmit={registerSubmit}>
                                    <div className="form-group mb-3" >
                                    <label>Full Name</label>
                                    <input type="" name="name" onChange={handleInput} value={registerInput.name} className="form-control"  /> 
                                    </div>

                                    <div className="form-group mb-3">
                                    <label>Email ID</label>
                                    <input type="" name="email" onChange={handleInput} value={registerInput.email} className="form-control"  /> 
                                    </div>

                                    <div className="form-group mb-3">   
                                    <label>Password</label>
                                    <input type="" name="password" onChange={handleInput} value={registerInput.email} className="form-control"  />
                                    </div>

                                    <div className="form-group mb-3"> 
                                    <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                            </form>
                    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>
    );
}

export default Registration;