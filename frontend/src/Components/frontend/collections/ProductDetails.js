import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";

function ProductDetails(props) {
     const history = useHistory();

     const [productList, setProductList] = useState([]);
     const [loading, setLoading] = useState(true);
     const [ProductQuantity, setProductQuantity] = useState(1);
     useEffect(() => {
          const category_slug = props.match.params.category;
          const product_slug = props.match.params.product;
          axios.get(`/api/product_details/${category_slug}/${product_slug}`).then((res) => {
               if (res.data.status === 200) {
                    setProductList(res.data.product);
                    setLoading(false);
               } else if (res.data.status === 404) {
                    swal("Warning", res.data.message, "error");
                    history.push("/collection");
               } else if (res.data.status === 400) {
                    swal("Warning", res.data.message, "error");
                    history.push("/collection");
               }
          });
     }, [props.match.params.category, props.match.params.product, history]);
     const handleIncrement = (e) => {
          if (ProductQuantity < 15) {
               setProductQuantity((prevCount) => prevCount + 1);
          }
     };
     const handleDecrement = (e) => {
          if (ProductQuantity > 1) {
               setProductQuantity((prevCount) => prevCount - 1);
          }
     };
     const submitForAddCart = (e) => {
          e.preventDefault();
          const data = {
               product_id: productList.id,
               product_quantity: ProductQuantity,
          };

          axios.post(`/api/add_to_cart`, data).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
               } else if (res.data.status === 404) {
                    //Login needed for  Add to Cart
                    history.push("/login");
                    swal("Warning", res.data.message, "error");
               } else if (res.data.status === 401) {
                    //Product Not Found
                    swal("Warning", res.data.message, "error");
               } else if (res.data.status === 409) {
                    //Already In Cart
                    swal("Success", res.data.message, "success");
               }
          });
     };
     if (loading) {
          return <h1>Product Details is loading....</h1>;
     } else {
          var productAvailable = "";
          if (productList.qty > 0) {
               productAvailable = (
                    <div>
                         <label className="btn-sm btn-success px-4 mt-2">In stock</label>
                         <div className="row">
                              <div className="col-md-3 mt-3">
                                   <div className="input-group">
                                        <button type="button" onClick={handleDecrement} className="input-group-text">
                                             -
                                        </button>
                                        <div className="form-control text-center">{ProductQuantity}</div>
                                        <button type="button" onClick={handleIncrement} className="input-group-text">
                                             +
                                        </button>
                                   </div>
                              </div>

                              <div className="col-md-3 mt-3">
                                   <button type="button" onClick={submitForAddCart} className="btn btn-primary w-100">
                                        Add to Cart
                                   </button>
                              </div>
                         </div>
                    </div>
               );
          } else {
               productAvailable = (
                    <div>
                         <label className="btn-sm btn-danger px-4 mt-2">Out of stock</label>
                    </div>
               );
          }
     }

     return (
          <div>
               <div className="py-3 bg-warning">
                    <div className="container">
                         <h2>
                              <Link to="/collection">
                                   Category / <Link to={"/collection/" + productList.slug}> Product List /</Link>
                              </Link>
                              {productList.name}
                         </h2>
                    </div>
               </div>
               <div className="py-3">
                    <div className="container">
                         <div className="row">
                              <div className="col-md-4 border-end">
                                   <img src={`http://localhost:8000/${productList.image}`} alt={productList.name} className="w-100" />
                              </div>

                              <div className="col-md-8">
                                   <h4>
                                        {productList.name}
                                        <span className="float-end badge btn-sm btn-danger badge-pil"> {productList.brand}</span>
                                   </h4>

                                   <p> {productList.description} </p>

                                   <h4 className="mb-1">
                                        BDT: {productList.selling_price}
                                        <s className="ms-2"> BDT: {productList.original_price} </s>
                                   </h4>

                                   <div>{productAvailable}</div>

                                   <button type="button" className="btn btn-danger mt-3">
                                        Add to Wishlist
                                   </button>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default ProductDetails;
