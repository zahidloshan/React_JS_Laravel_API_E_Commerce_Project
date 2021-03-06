import About from "../Components/frontend/About";
import BuyProduct from "../Components/frontend/BuyProduct";
import Cart from "../Components/frontend/Cart";
import ProductDetails from "../Components/frontend/collections/ProductDetails";
import ViewCategory from "../Components/frontend/collections/ViewCategory";
import ViewProduct from "../Components/frontend/collections/ViewProduct";
import Contact from "../Components/frontend/Contact";
import Home from "../Components/frontend/Home";

const PublicRouteList = [
     { path: "/", exact: true, name: "Home", component: Home },
     { path: "/about", exact: true, name: "About", component: About },
     { path: "/contact", exact: true, name: "Contact", component: Contact },
     { path: "/collection", exact: true, name: "ViewCategory", component: ViewCategory },
     { path: "/collection/:slug", exact: true, name: "ViewProduct", component: ViewProduct },
     { path: "/collection/:category/:product", exact: true, name: "ProductDetails", component: ProductDetails },
     { path: "/cart", exact: true, name: "CartView", component: Cart },
     { path: "/buyproduct", exact: true, name: "BuyProduct", component: BuyProduct },
];

export default PublicRouteList;
