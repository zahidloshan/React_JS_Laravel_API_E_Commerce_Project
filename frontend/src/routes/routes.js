import Category from "../Components/admin/Category";
import Dashboard from "../Components/admin/Dashboard";
import Profile from "../Components/admin/Profile";
import ViewCategory from "../Components/admin/ViewCategory";

const routes = [
     { path: "/admin", exact: true, name: "Admin" },
     { path: "/admin/dashboard", exact: true, name: "Dashboard", component: Dashboard },
     { path: "/admin/category", exact: true, name: "Category", component: Category },
     { path: "/admin/view_category", exact: true, name: "ViewCategory", component: ViewCategory },
     { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
];

export default routes;
