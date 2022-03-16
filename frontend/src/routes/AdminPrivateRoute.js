import React from 'react';

import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import MainLayout from '../layouts/admin/MainLayout';

function AdminPrivateRoute({...rest}) {
    {/*
    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading]= useState(true);
    
    useEffect(() => {
        axios.get(`/api/checkingAuthenticated`).then(res => {
            if(res.status === 200)
                {
                    setAuthenticated(true);
                }
                setLoading(false);
        
        });
       
        return ()=>
        {
            setAuthenticated(false);
        };
      }, []); 

      

      if(loading)
      {
          return <h1>Loading.....</h1>
      }
    */}
    return (
        <Route {...rest}
            render={ ({props,location})=>
            localStorage.getItem('auth_token') ? 
            (<MainLayout {...props}/> ):
            ( <Redirect to={{pathname:"/login",state:{from: location}}}/>)

            } 
        />
    );
}

export default AdminPrivateRoute;