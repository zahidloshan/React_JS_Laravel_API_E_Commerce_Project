import React,{useState , useEffect} from 'react';

import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../layouts/admin/MainLayout';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';

function AdminPrivateRoute({...rest}) {
    const history= useHistory();
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

      axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) 
      { 
          if(err.response.status === 401)

            { 
                swal("Unauthorized",err.response.data.message, "warning"); 
                history.push('/');
            
            return Promise.reject(err);
            }
        
       });

      if(loading)
      {
          return <h1>Loading.....</h1>
      }

    
    return (
        <Route {...rest}
            
            render={ ({props,location})=>
            Authenticated ? 
            (<MainLayout {...props}/> ):
            ( <Redirect to={{pathname:"/login",state:{from: location}}}/>)

            } 
        />
    );
}

export default AdminPrivateRoute;