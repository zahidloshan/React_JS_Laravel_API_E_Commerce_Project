import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/admin/MainLayout";


function App() {
  return (
    <div className="App">

<BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          
        
          
        </Route>
      </Routes>
    </BrowserRouter>



    
     
     
    </div>
  );
}

export default App;
