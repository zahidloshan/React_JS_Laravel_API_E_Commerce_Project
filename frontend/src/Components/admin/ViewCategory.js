import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function ViewCategory() {
     const [loading, setLoading] = useState(true);
     const [categorylist, setCategoryList] = useState({});
     useEffect(() => {
          axios.get(`/api/view_category`).then((res) => {
               console.log(res.data.category);
               if (res.status === 200) {
                    setCategoryList(res.data.category);
               }
               setLoading(false);
          });
     }, []);

     const deleteCategory = (e, id) => {
          e.preventDefault();
          const thisClicked = e.currentTarget;
          thisClicked.innerText = "Deleting";
          axios.delete(`/api/delete_category/${id}`).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    thisClicked.closest("tr").remove(); //delete from table using JS
               } else if (res.data.status === 404) {
                    swal("Success", res.data.message, "success");
                    thisClicked.innerText = "Delete";
               }
          });
     };

     var viewCategory_Table_Data = "";
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
          viewCategory_Table_Data = categorylist.map((item) => {
               return (
                    <tr key={item.id}>
                         <td>{item.id}</td>
                         <td>{item.name}</td>
                         <td>{item.slug}</td>
                         <td>{item.status}</td>

                         <td>
                              <Link to={`edit_category/${item.id}`} className="btn btn-success btn-sm">
                                   Edit
                              </Link>
                         </td>
                         <td>
                              <button type="button" onClick={(e) => deleteCategory(e, item.id)} className="btn btn-danger btn-sm">
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
                              Catergory List
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

                                        <th>Name</th>

                                        <th>Slug</th>

                                        <th>Status</th>

                                        <th>Edit</th>

                                        <th>Delete</th>
                                   </tr>
                              </thead>
                              <tbody>{viewCategory_Table_Data}</tbody>
                         </table>
                    </div>
               </div>
          </div>
     );
}

export default ViewCategory;
