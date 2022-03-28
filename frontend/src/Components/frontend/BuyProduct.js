import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import emailjs from "@emailjs/browser";

function BuyProduct() {
     const history = useHistory();
     const form = useRef();
     const [cart, setCart] = useState([]);
     const [error, setErrors] = useState([]);
     const [loading, setLoading] = useState(true);
     var totalPrice = 0;
     const [buyingInput, setBuyingInput] = useState({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          state: "",
          zipcode: "",
     });

     const handleInputBuy = (e) => {
          e.persist();
          setBuyingInput({ ...buyingInput, [e.target.name]: e.target.value });
     };

     const submitOrder = (e) => {
          e.preventDefault();
          const data = {
               firstname: buyingInput.firstname,
               lastname: buyingInput.lastname,
               phone: buyingInput.phone,
               email: buyingInput.email,
               address: buyingInput.address,
               city: buyingInput.city,
               state: buyingInput.state,
               zipcode: buyingInput.zipcode,
          };
          emailjs.sendForm("service_iqag6kpdd", "template_ff66kwb", form.current, "uF5qK1esHgCY7AZe8").then(
               (result) => {
                    console.log(result.text);
               },
               (error) => {
                    console.log(error.text);
               }
          );

          axios.post(`/api/buyproduct`, data).then((res) => {
               if (res.data.status === 200) {
                    swal("Placed Order Successfully", res.data.message, "success");
                    setErrors([]);

                    history.push("/thank_you");
               } else if (res.data.status === 422) {
                    swal("Fill Up all fields", "", "error");
                    setErrors(res.data.errors);
               }
          });
     };

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
     var cartListAvaiCheckOutInfo = "";
     if (cart.length > 0) {
          cartListAvaiCheckOutInfo = (
               <div>
                    <div className="card-header">
                         <h1>Information</h1>
                    </div>
                    <form ref={form} onSubmit={submitOrder}>
                         <div className="card-body">
                              <div className="row">
                                   <div className="col-md-7">
                                        <div className="container">
                                             <div className="row">
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label>First Name</label>
                                                       <input
                                                            type="text"
                                                            className="form-control md-3"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.firstname}
                                                            name="firstname"
                                                       />
                                                       <small className="text-danger">{error.firstname}</small>
                                                  </div>
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label>Last Name</label>
                                                       <input
                                                            type="text"
                                                            className="form-control md-3"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.lastname}
                                                            name="lastname"
                                                       />
                                                       <small className="text-danger">{error.lastname}</small>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="container">
                                             <div className="row">
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label>Phone</label>
                                                       <input
                                                            type="text"
                                                            className="form-control md-3"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.phone}
                                                            name="phone"
                                                       />
                                                       <small className="text-danger">{error.phone}</small>
                                                  </div>
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label for="">Email</label>
                                                       <input
                                                            type="email"
                                                            className="form-control md-3"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.email}
                                                            name="email"
                                                       />
                                                       <small className="text-danger">{error.email}</small>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="container">
                                             <div className="row">
                                                  <div className="form-group mb-6">
                                                       <label for="inputAddress">Address</label>
                                                       <textarea
                                                            type="textarea"
                                                            className="form-control md-6"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.address}
                                                            name="address"
                                                       ></textarea>
                                                       <small className="text-danger">{error.address}</small>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="container">
                                             <div className="row">
                                                  <div className="form-group col-md-5">
                                                       <label for="inputCity">City</label>
                                                       <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.city}
                                                            name="city"
                                                       />
                                                       <small className="text-danger">{error.city}</small>
                                                  </div>
                                                  <div className="form-group col-md-5">
                                                       <label for="inputState">State</label>
                                                       <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.state}
                                                            name="state"
                                                       />
                                                       <small className="text-danger">{error.state}</small>
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                       <label for="inputZip">Zip</label>
                                                       <input
                                                            type="text"
                                                            className="form-control"
                                                            onChange={handleInputBuy}
                                                            value={buyingInput.zipcode}
                                                            name="zipcode"
                                                       />
                                                       <small className="text-danger">{error.zipcode}</small>
                                                  </div>

                                                  <hr />
                                                  <button type="submit" onClick={submitOrder} className="btn btn-primary">
                                                       Place Order
                                                  </button>
                                             </div>
                                        </div>
                                   </div>

                                   <div className="form-group col-md-5">
                                        <div className="row align-items-end">
                                             <table className="table table-bordered">
                                                  <thead>
                                                       <tr>
                                                            <th>Product</th>

                                                            <th>price</th>

                                                            <th>Qty</th>

                                                            <th>Total</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {cart.map((item) => {
                                                            totalPrice += item.product.selling_price * item.product_qty;
                                                            return (
                                                                 <tr key={item.name}>
                                                                      <td>
                                                                           <input
                                                                                name="productname"
                                                                                value={item.product.name}
                                                                                readonly
                                                                           ></input>
                                                                      </td>
                                                                      <td>{item.product.selling_price}</td>
                                                                      <td>{item.product_qty}</td>
                                                                      <td>{item.product.selling_price * item.product_qty}</td>
                                                                 </tr>
                                                            );
                                                       })}
                                                       <tr>
                                                            <td colSpan="3" className="text-end">
                                                                 Grand Total
                                                            </td>
                                                            <td colSpan="2">
                                                                 <input name="totalprice" value={totalPrice} readonly></input>
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </form>
               </div>
          );
     } else {
          cartListAvaiCheckOutInfo = (
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
                         <h2>Home / Buy Product</h2>
                    </div>
               </div>
               <div className="py-4">
                    <div className="container">{cartListAvaiCheckOutInfo}</div>
               </div>
          </div>
     );
}

export default BuyProduct;
