import Category from "../Components/admin/Category";
import Dashboard from "../Components/admin/Dashboard";
import Profile from "../Components/admin/Profile";
import ViewCategory from "../Components/admin/ViewCategory";
import EditCategory from "../Components/admin/EditCategory";
import AddProduct from "../Components/admin/AddProduct";
import ViewProduct from "../Components/admin/ViewProduct";
import EditProduct from "../Components/admin/EditProduct";

const routes = [
     { path: "/admin", exact: true, name: "Admin" },
     { path: "/admin/dashboard", exact: true, name: "Dashboard", component: Dashboard },
     { path: "/admin/category", exact: true, name: "Category", component: Category },
     { path: "/admin/view_category", exact: true, name: "ViewCategory", component: ViewCategory },
     { path: "/admin/edit_category/:id", exact: true, name: "EditCategory", component: EditCategory },
     { path: "/admin/add_product", exact: true, name: "AddProduct", component: AddProduct },
     { path: "/admin/view_product", exact: true, name: "ViewProduct", component: ViewProduct },
     { path: "/admin/edit_product/:id", exact: true, name: "EditProduct", component: EditProduct },
     { path: "/admin/profile", exact: true, name: "Profile", component: Profile },
];

export default routes;
