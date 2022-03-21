import React from "react";
import { Route } from "react-router-dom";
import FrontendLayout from "./Components/frontend/FrontendLayout";

function PublicRoute({ ...rest }) {
     return (
          <div>
               <Route {...rest} render={(props) => <FrontendLayout {...props} />} />
          </div>
     );
}

export default PublicRoute;
