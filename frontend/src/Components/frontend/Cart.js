import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Cart() {
     const history = useHistory();

     const [cart, setCart] = useState([]);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
          axios.get(`/api/cart_view`).then((res) => {
               if (res.data.status === 200) {
                    setCart(res.data.cart);
                    setLoading(false);
               } else if (res.data.status === 404) {
                    //Login First To View Cart
                    swal("Warning", res.data.message, "error");
                    history.push("/login");
               }
          });
     }, [history]);
     if (loading) {
          return <h1>Cart Data loading.....</h1>;
     }
     return (
          <div>
               <div className="py-3 bg-warning">
                    <div className="container">
                         <h2>Home / Cart</h2>
                    </div>
               </div>
               <div className="py-3">
                    <div className="container">
                         <div className="card">
                              <h1>Cart Data</h1>
                              <div className="card-body">
                                   <table table className="table table-bordered table-striped">
                                        <thead>
                                             <tr>
                                                  <th>Image</th>

                                                  <th>product Name</th>

                                                  <th>Product Price</th>

                                                  <th> Quantiy</th>

                                                  <th>total Price</th>

                                                  <th>Remove</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {cart.map((item) => {
                                                  return (
                                                       <tr>
                                                            <td>{item.image}</td>
                                                            <td>{item.product_id}</td>
                                                            <td>price</td>
                                                            <td>
                                                                 <div className="input-group">
                                                                      <button type="button" className="input-group-text">
                                                                           -
                                                                      </button>
                                                                      <div className="form-control text-center">1</div>
                                                                      <button type="button" className="input-group-text">
                                                                           +
                                                                      </button>
                                                                 </div>{" "}
                                                            </td>
                                                            <td>total Pirce</td>

                                                            <td>
                                                                 <button className="btn btn-danger btn-sm">Remove</button>
                                                            </td>
                                                       </tr>
                                                  );
                                             })}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Cart;
