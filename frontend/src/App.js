import React from "react";

import { BrowserRouter as Router, Route ,Switch } from "react-router-dom";

import Home from "./Components/frontend/Home";
import Registration from "./Components/frontend/auth/Registration";
import Login from "./Components/frontend/auth/Login";
import axios from "axios";
import { Redirect } from "react-router-dom";
import AdminPrivateRoute from "./routes/AdminPrivateRoute";
import Page403 from "./Components/errors/Page403";
import Page404 from "./Components/errors/Page404";

axios.defaults.baseURL="http://localhost:8000/";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';
axios.defaults.withCredentials=true;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config){

const token =localStorage.getItem('auth_token');
config.headers. Authorization=token ? `Bearer ${token}`: ''; 
return config;

});

function App() {
  return (
    <div className="App">

               <Router>

                 <Switch>


                   <Route exact path="/" component={Home}/>   
                   <Route path="/403" component={Page403}/>
                   <Route path="/404" component={Page404}/>
                   <Route path="/login">
                     {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Login/> }
                   </Route>

                   <Route path="/registration">
                     {localStorage.getItem('auth_token') ? <Redirect to='/'/> : <Registration/> }
                   </Route>
                 
                   <AdminPrivateRoute path="/admin" name='Admin'/>

                 </Switch>

               </Router>

    </div>
  );
}

export default App;
