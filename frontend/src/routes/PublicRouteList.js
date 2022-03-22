import About from "../Components/frontend/About";
import ViewCategory from "../Components/frontend/collections/ViewCategory";
import Contact from "../Components/frontend/Contact";
import Home from "../Components/frontend/Home";

const PublicRouteList = [
     { path: "/", exact: true, name: "Home", component: Home },
     { path: "/about", exact: true, name: "About", component: About },
     { path: "/contact", exact: true, name: "Contact", component: Contact },
     { path: "/collection", exact: true, name: "ViewCategory", component: ViewCategory },
];

export default PublicRouteList;
