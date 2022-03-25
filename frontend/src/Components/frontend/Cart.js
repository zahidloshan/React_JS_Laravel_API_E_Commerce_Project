import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function Cart() {
     const history = useHistory();

     const [cart, setCart] = useState([]);
     const [loading, setLoading] = useState(true);
     var totalPrice = 0;

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
     const handleDecrement = (cart_id) => {
          setCart((cart) =>
               cart.map((item) =>
                    cart_id === item.id ? { ...item, product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0) } : item
               )
          );
          cartQuantityUpdate(cart_id, "decrement");
     };

     const handleIncrement = (cart_id) => {
          setCart((cart) =>
               cart.map((item) =>
                    cart_id === item.id ? { ...item, product_qty: item.product_qty + (item.product_qty < 15 ? 1 : 0) } : item
               )
          );
          cartQuantityUpdate(cart_id, "increment");
     };
     function cartQuantityUpdate(cart_id, manage_qty) {
          axios.put(`/api/cart_quantiy_update/${cart_id}/${manage_qty}`).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
               }
          });
     }
     const deleteCartItem = (e, id) => {
          e.preventDefault();
          const thisClicked = e.currentTarget;
          thisClicked.innerText = "Removing";
          axios.delete(`/api/delete_cart_item/${id}`).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    thisClicked.closest("tr").remove(); //delete from table using JS
               } else if (res.data.status === 404) {
                    swal("Success", res.data.message, "success");
                    thisClicked.innerText = "Remove";
               }
          });
     };
     if (loading) {
          return <h1>Cart Data loading.....</h1>;
     }
     var cartListAvai = "";
     if (cart.length > 0) {
          cartListAvai = cart.map((item) => {
               totalPrice += item.product.selling_price * item.product_qty;
               return (
                    <tr>
                         <td>
                              <img
                                   src={`http://localhost:8000/${item.product.image}`}
                                   className="img-thumbnail"
                                   width="40px"
                                   alt={item.product.image}
                              ></img>
                         </td>
                         <td>{item.product.name}</td>
                         <td>{item.product.selling_price}</td>
                         <td>
                              <div className="input-group">
                                   <button type="button" onClick={() => handleDecrement(item.id)} className="input-group-text">
                                        -
                                   </button>
                                   <div className="form-control text-center">{item.product_qty}</div>
                                   <button type="button" onClick={() => handleIncrement(item.id)} className="input-group-text">
                                        +
                                   </button>
                              </div>
                         </td>
                         <td>{item.product.selling_price * item.product_qty} </td>

                         <td>
                              <button onClick={(e) => deleteCartItem(e, item.id)} className="btn btn-danger btn-sm">
                                   Remove
                              </button>
                         </td>
                    </tr>
               );
          });
     } else {
          cartListAvai = (
               <div className="py-3">
                    <div className="container">
                         <div className="card">
                              <h1 className="text text-center">Cart List Not Available</h1>
                         </div>
                    </div>
               </div>
          );
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
                                        <tbody>{cartListAvai}</tbody>
                                   </table>
                                   <div class="col-md-4">
                                        <div class="card">
                                             <div class="card-body">
                                                  {/*<h5 class="card-title">
                                                       Price Item:
                                                       <span className="float-end">00</span>
     </h5>*/}

                                                  <h5 class="card-title">
                                                       Total Price:
                                                       <span className="float-end">{totalPrice}</span>
                                                  </h5>
                                                  <hr />

                                                  <Link to="/buyproduct" class="btn btn-primary">
                                                       Buy Porduct
                                                  </Link>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default Cart;
