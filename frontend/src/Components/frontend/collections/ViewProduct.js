import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function ViewProduct(props) {
     const history = useHistory();

     const [categoyList, setCategoyList] = useState([]);
     const [productList, setProductList] = useState([]);
     const [loading, setLoading] = useState(true);
     const productListCount = productList.length;
     useEffect(() => {
          const product_slug = props.match.params.slug;
          axios.get(`/api/fetchproducts/${product_slug}`).then((res) => {
               if (res.data.status === 200) {
                    setProductList(res.data.product_data.product);
                    setCategoyList(res.data.product_data.category);
                    setLoading(false);
               } else if (res.data.status === 404) {
                    swal("Warning", res.data.message, "error");
                    history.push("/collection");
               } else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "error");
                    history.push("/collection");
               }
          });
     }, [props.match.params.slug, history]);
     if (loading) {
          return <h1>ProductList is loading....</h1>;
     } else {
          var showProductList = "";
          if (productListCount) {
               showProductList = productList.map((item) => {
                    return (
                         <div className="col-md-4" key={item.id}>
                              <div className="card">
                                   <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                        <img src={`http://localhost:8000/${item.image}`} className="img-thumbnail" alt={item.image}></img>
                                   </Link>
                                   <div className="card-body">
                                        <h5>Selling Price : {item.selling_price}</h5>
                                        <h5>
                                             Original Price :<strike>{item.original_price}</strike>
                                        </h5>

                                        <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                                             <h5>{item.name}</h5>
                                        </Link>
                                   </div>
                              </div>
                         </div>
                    );
               });
          } else {
               showProductList = (
                    <div className="col-md-12">
                         <h1>No Product Available</h1>
                    </div>
               );
          }
     }
     return (
          <div>
               <div className="py-3 bg-warning">
                    <div className="container">
                         <h2>
                              <Link to="/collection"> Category List /</Link>
                              {categoyList.name}
                         </h2>
                    </div>
               </div>
               <div className="py-3">
                    <div className="container">
                         <div className="row">{showProductList}</div>
                    </div>
               </div>
          </div>
     );
}

export default ViewProduct;
