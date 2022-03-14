import { Outlet, Link } from "react-router-dom";

const TestLink = () => {
  return (

    <div>
      
        <h1>Homepage </h1>
        <Link to='/about'>Go to Aboutpage</Link>
        <Outlet />
    </div>

  )
};

export default TestLink;