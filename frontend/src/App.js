import React from "react";

import { BrowserRouter as Router, Routes, Route ,Switch } from "react-router-dom";

import MainLayout from "./layouts/admin/MainLayout";
import Home from "./layouts/frontend/Home";


function App() {
  return (
    <div className="App">

               <Router>

                 <Switch>


                   <Route exact path="/" component={Home}/>         
                   <Route path="/admin" name='Admin' render={(props) => <MainLayout {...props}/> }/>

                 </Switch>

               </Router>

    </div>
  );
}

export default App;
