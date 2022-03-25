import React from "react";

function BuyProduct() {
     return (
          <div>
               <div className="py-3 bg-warning">
                    <div className="container">
                         <h2>Home / Buy Product</h2>
                    </div>
               </div>
               <div className="py-4">
                    <div className="container">
                         <form>
                              <div className="row">
                                   <div className="col-md-7">
                                        <div className="container">
                                             <div className="row">
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label for="inputEmail4">First Name</label>
                                                       <input type="text" className="form-control md-3" name="firstname" />
                                                  </div>
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label for="inputEmail4">Last Name</label>
                                                       <input type="email" className="form-control md-3" id="inputEmail4" />
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="container">
                                             <div className="row">
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label for="inputEmail4">Phone</label>
                                                       <input type="email" className="form-control md-3" id="inputEmail4" />
                                                  </div>
                                                  <div className="col-md-6 form-group mb-3">
                                                       <label for="inputPassword4">Email</label>
                                                       <input type="password" className="form-control md-3" id="inputPassword4" />
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
                                                            id="inputAddress"
                                                            placeholder="1234 Main St"
                                                       ></textarea>
                                                  </div>
                                             </div>
                                        </div>

                                        <div className="container">
                                             <div className="row">
                                                  <div className="form-group col-md-5">
                                                       <label for="inputCity">City</label>
                                                       <input type="text" className="form-control" id="inputCity" />
                                                  </div>
                                                  <div className="form-group col-md-5">
                                                       <label for="inputState">State</label>
                                                       <input type="text" className="form-control" id="inputCity" />
                                                  </div>
                                                  <div className="form-group col-md-2">
                                                       <label for="inputZip">Zip</label>
                                                       <input type="text" className="form-control" id="inputZip" />
                                                  </div>
                                                  <hr />
                                                  <button type="submit" className="btn btn-primary">
                                                       Place Order
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </form>
                    </div>
               </div>
          </div>
     );
}

export default BuyProduct;
