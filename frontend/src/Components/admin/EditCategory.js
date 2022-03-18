import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function EditCategory(props) {
     const history = useHistory();
     const [loading, setLoading] = useState(true);
     const [categoryInput, setCategory] = useState([]);
     const [error, setError] = useState([]);

     useEffect(() => {
          const category_id = props.match.params.id;
          axios.get(`/api/edit_category/${category_id}`).then((res) => {
               if (res.data.status === 200) {
                    setCategory(res.data.category);
               } else {
                    swal("Data not Found by this id", res.data.message, "warning");
                    history.push("/admin/view_category");
               }
               setLoading(false);
          });
     }, [props.match.params.id, history]);

     const handleInput = (e) => {
          e.persist();
          setCategory({ ...categoryInput, [e.target.name]: e.target.value });
     };

     const updateSubmit = (e) => {
          e.preventDefault();
          const data = categoryInput;
          const category_id = props.match.params.id;
          axios.put(`/api/update_category/${category_id}`, data).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    history.push("/admin/view_category");
                    setError([]);
               } else if (res.data.status === 422) {
                    setError(res.data.errors);
               } else {
                    swal("Warning", res.data.message, "error");
                    history.push("/admin/view_category");
               }
          });
     };

     if (loading) {
          return <h1>Loading Edit category</h1>;
     }
     return (
          <div className="container py-10">
               <div className="card mt-4">
                    <div className="card-header">
                         <h2 className="mt-4">Edit Category</h2>
                         <Link className="btn btn-primary btn-sm float-end" to="/admin/view_category">
                              Back
                         </Link>
                    </div>
               </div>

               <form onSubmit={updateSubmit}>
                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                         <li className="nav-item" role="presentation">
                              <button
                                   className="nav-link active"
                                   id="home-tab"
                                   data-bs-toggle="tab"
                                   data-bs-target="#home"
                                   type="button"
                                   role="tab"
                                   aria-controls="home"
                                   aria-selected="true"
                              >
                                   Home
                              </button>
                         </li>
                         <li className="nav-item" role="presentation">
                              <button
                                   className="nav-link"
                                   id="profile-tab"
                                   data-bs-toggle="tab"
                                   data-bs-target="#profile"
                                   type="button"
                                   role="tab"
                                   aria-controls="profile"
                                   aria-selected="false"
                              >
                                   SEO Tag
                              </button>
                         </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                         <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                              <div className="form-group mb-3">
                                   <label>Slug</label>
                                   <input
                                        type="text"
                                        name="slug"
                                        onChange={handleInput}
                                        value={categoryInput.slug}
                                        className="form-control"
                                   />
                                   <span> {error.slug}</span>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Name</label>
                                   <input
                                        type="text"
                                        name="name"
                                        onChange={handleInput}
                                        value={categoryInput.name}
                                        className="form-control"
                                   />
                                   <span> {error.name}</span>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Description</label>
                                   <textarea
                                        name="description"
                                        onChange={handleInput}
                                        value={categoryInput.description}
                                        className="form-control"
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Status</label>
                                   <input type="checkbox" name="status" /> Status 1=yes and 0=no
                              </div>
                         </div>

                         <div className="tab-pane card-body border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <div className="form-group mb-3">
                                   <label>Meta Title</label>
                                   <input
                                        type="text"
                                        name="metatitle"
                                        onChange={handleInput}
                                        value={categoryInput.metatitle}
                                        className="form-control"
                                   />
                                   <span> {error.metatitle}</span>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Keywords</label>
                                   <textarea
                                        name="metakeywords"
                                        onChange={handleInput}
                                        value={categoryInput.metakeywords}
                                        className="form-control"
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Description</label>
                                   <textarea
                                        name="metadescription"
                                        onChange={handleInput}
                                        value={categoryInput.metadescription}
                                        className="form-control"
                                   />
                              </div>
                         </div>
                    </div>
                    <button type="submit" className="btn btn-primary px-4 float-end">
                         Submit
                    </button>
               </form>
          </div>
     );
}

export default EditCategory;
