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
        axios.get(`/api/checkingAuthenticated`).then(res=> {
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

            if(err.response.status === 403) // Access Denied ===
        
            {
            
                swal("Forbedden", err.response.data.message, "warning"); 
                history.push('/403');
            
            }
            
            else if(err.response.status === 404) //Page Not Found
            
            {
            
                swal("404 Error","Url/Page Not Found","warning"); 
                history.push('/404');
            
            }
        
       });

       

     {/*axios.interceptors.response.use(function (response) {

        return response;
        
        }, function (error) {
        
        if(error.response.status === 403) // Access Denied ===
        
        {
        
            swal("Forbedden", error.response.data.message, "warning"); 
            history.push('/Page403');
        
        }
        
        else if(error.response.status === 404) //Page Not Found
        
        {
        
            swal("404 Error","Url/Page Not Found","warning"); 
            history.push('/Page404');
        
        }
        
        return Promise.reject(error);
    }
);*/}

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