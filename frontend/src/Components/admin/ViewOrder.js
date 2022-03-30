import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewOrder() {
     const [loading, setLoading] = useState(true);
     const [orderlist, setOrderList] = useState({});
     useEffect(() => {
          axios.get(`/api/view_order_list`).then((res) => {
               if (res.status === 200) {
                    setOrderList(res.data.order);
               }
               setLoading(false);
          });
     }, []);
     var viewOrder_Table_Data = "";
     if (loading) {
          return (
               <div className="container py-10">
                    <div className="row justify-content-center">
                         <div className="col-md-6">
                              <div class="spinner-grow text-success" role="status">
                                   <span class="sr-only"></span>
                              </div>
                         </div>
                    </div>
               </div>
          );
     } else {
          viewOrder_Table_Data = orderlist.map((item) => {
               return (
                    <tr key={item.id}>
                         <td>{item.id}</td>
                         <td>{item.tracking_no}</td>
                         <td>{item.phone}</td>
                         <td>{item.email}</td>

                         <td>
                              <Link to={`view_order/${item.id}`} className="btn btn-success btn-sm">
                                   View
                              </Link>
                         </td>
                    </tr>
               );
          });
     }
     return (
          <div className="container px-4">
               <div className="card mt-4">
                    <div className="card-header">
                         <h1>
                              Order List
                              <Link className="btn btn-primary btn-sm float-end" to="/admin/category">
                                   Add Catergory
                              </Link>
                         </h1>
                    </div>
                    <div className="card-body">
                         <table table className="table table-bordered table-striped">
                              <thead>
                                   <tr>
                                        <th>ID</th>

                                        <th>Tracking No</th>

                                        <th>Phone Number</th>

                                        <th>Email</th>

                                        <th>Action</th>
                                   </tr>
                              </thead>
                              <tbody>{viewOrder_Table_Data}</tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}

export default ViewOrder;
