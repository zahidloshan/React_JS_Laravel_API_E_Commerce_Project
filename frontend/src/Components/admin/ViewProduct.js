import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ViewProduct() {
     const [loading, setLoading] = useState(true);
     const [productList, setProductList] = useState([]);
     useEffect(() => {
          axios.get(`/api/view_product`).then((res) => {
               console.log(res.data.product);
               if (res.data.status === 200) {
                    setProductList(res.data.product);
               }
               setLoading(false);
          });
     }, []);
     var viewProduct_Table_Data = "";
     if (loading) {
          return <h1>Loading Product</h1>;
     } else {
          viewProduct_Table_Data = productList.map((item) => {
               return (
                    <tr key={item.id}>
                         <td>{item.id}</td>
                         <td>{item.category.name}</td>
                         <td>{item.name}</td>
                         <td>{item.selling_price}</td>
                         <td>
                              <img src={`http://localhost:8000/${item.image}`} width="40px" alt={item.image}></img>
                         </td>

                         <td>
                              <Link to={`edit_product/${item.id}`} className="btn btn-success btn-sm">
                                   Edit
                              </Link>
                         </td>
                         <td>
                              <button type="button" className="btn btn-danger btn-sm">
                                   Delete
                              </button>
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
                              Product List
                              <Link className="btn btn-primary btn-sm float-end" to="/admin/add_product">
                                   Add Product
                              </Link>
                         </h1>
                    </div>
                    <div className="card-body">
                         <table table className="table table-bordered table-striped">
                              <thead>
                                   <tr>
                                        <th>ID</th>

                                        <th>Category Name</th>

                                        <th>Product Name</th>

                                        <th>Selling Price</th>

                                        <th>Image</th>

                                        <th>Edit</th>

                                        <th>Delete</th>
                                   </tr>
                              </thead>
                              <tbody>{viewProduct_Table_Data}</tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}

export default ViewProduct;
