import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../../layouts/frontend/Navbar";
import PublicRouteList from "../../routes/PublicRouteList";

const FrontendLayout = () => {
     return (
          <div>
               <Navbar />
               <div>
                    <Switch>
                         {PublicRouteList.map((route, idx) => {
                              return (
                                   route.component && (
                                        <Route
                                             key={idx}
                                             path={route.path}
                                             exact={route.exact}
                                             name={route.name}
                                             render={(props) => <route.component {...props} />}
                                        />
                                   )
                              );
                         })}
                    </Switch>
               </div>
          </div>
     );
};

export default FrontendLayout;
