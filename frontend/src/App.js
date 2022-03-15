import React from "react";

import { BrowserRouter as Router, Routes, Route ,Switch } from "react-router-dom";

import MainLayout from "./layouts/admin/MainLayout";
import Home from "./Components/frontend/Home";
import Registration from "./Components/frontend/auth/Registration";
import Login from "./Components/frontend/auth/Login";
import axios from "axios";

axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials=true;


function App() {
  return (
    <div className="App">

               <Router>

                 <Switch>


                   <Route exact path="/" component={Home}/>         
                   <Route  path="/registration" component={Registration}/>         
                   <Route  path="/login" component={Login}/>         
                   <Route path="/admin" name='Admin' render={(props) => <MainLayout {...props}/> }/>

                 </Switch>

               </Router>

    </div>
  );
}

export default App;
