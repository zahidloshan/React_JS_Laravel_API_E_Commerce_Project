import Category from "../Components/admin/Category";
import Dashboard from "../Components/admin/Dashboard";
import Profile from "../Components/admin/Profile";


const routes=[

    {path: '/admin', exact: true, name:'Admin'},
    {path: '/admin/dashboard', exact: true, name:'Dashboard',component: Dashboard},
    {path: '/admin/category', exact: true, name:'Category',component: Category},
    {path: '/admin/profile', exact: true, name:'Profile',component: Profile},

];

export default routes;