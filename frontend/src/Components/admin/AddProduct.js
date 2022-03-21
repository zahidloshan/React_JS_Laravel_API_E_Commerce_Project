import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function AddProduct() {
     const [categorylist, setCategoryList] = useState([]);
     const [image, setImage] = useState([]);
     const [errorslist, setError] = useState([]);
     const [productInput, setProductInput] = useState({
          categoryid: "",
          slug: "",
          name: "",
          description: "",
          status: "",

          metatitle: "",
          metakeywords: "",
          metadescription: "",

          selling_price: "",
          original_price: "",
          qty: "",
          brand: "",
          featured: "",
          popular: "",
     });

     const handleInput = (e) => {
          e.persist();
          setProductInput({ ...productInput, [e.target.name]: e.target.value });
     };

     const handleImage = (e) => {
          setImage({ image: e.target.files[0] });
     };

     useEffect(() => {
          axios.get(`/api/all_category`).then((res) => {
               if (res.data.status === 200) {
                    setCategoryList(res.data.category);
               }
          });
     }, []);

     const productSubmit = (e) => {
          e.preventDefault();
          const formData = new FormData();

          formData.append("image", image.image);

          formData.append("categoryid", productInput.categoryid);
          formData.append("metatitle", productInput.metatitle);
          formData.append("metakeywords", productInput.metakeywords);
          formData.append("metadescription", productInput.metadescription);

          formData.append("slug", productInput.slug);
          formData.append("name", productInput.name);
          formData.append("selling_price", productInput.selling_price);
          formData.append("original_price", productInput.original_price);
          formData.append("qty", productInput.qty);
          formData.append("brand", productInput.brand);
          formData.append("description", productInput.description);

          formData.append("featured", productInput.featured);
          formData.append("popular", productInput.popular);
          formData.append("status", productInput.status);

          axios.post(`/api/add_product`, formData).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    setProductInput({
                         categoryid: "",
                         slug: "",
                         name: "",
                         description: "",
                         status: "",

                         metatitle: "",
                         metakeywords: "",
                         metadescription: "",

                         selling_price: "",
                         original_price: "",
                         qty: "",
                         brand: "",
                         featured: "",
                         popular: "",
                    });
               } else if (res.data.status === 422) {
                    swal("Product not added", "Fileds are required", "error");
                    setError(res.data.errors);
               }
          });
     };
     return (
          <div className="container py-10">
               <div className="card mt-4">
                    <div className="card-header">
                         <h2 className="mt-4">
                              <Link className="btn btn-primary btn-sm float-end" to="/admin/view_category">
                                   View Catergory
                              </Link>
                              Add Product
                         </h2>
                    </div>
               </div>

               <form onSubmit={productSubmit} encType="multipart/from-data">
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
                         <li className="nav-item" role="presentation">
                              <button
                                   className="nav-link"
                                   id="other-tab"
                                   data-bs-toggle="tab"
                                   data-bs-target="#other"
                                   type="button"
                                   role="tab"
                                   aria-controls="other"
                                   aria-selected="false"
                              >
                                   Other Details
                              </button>
                         </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                         <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                              <div className="dropdown">
                                   <div className="form-group mb-3">
                                        <label>Select Category</label>
                                        <select
                                             name="categoryid"
                                             onChange={handleInput}
                                             value={productInput.categoryid}
                                             class="form-control"
                                        >
                                             <option>Select Category</option>
                                             {categorylist.map((item) => {
                                                  return (
                                                       <option value={item.id} key={item.id}>
                                                            {item.name}
                                                       </option>
                                                  );
                                             })}
                                        </select>
                                        <small className="text-danger">{errorslist.categoryid}</small>
                                   </div>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Company Name</label>
                                   <input type="" name="slug" onChange={handleInput} value={productInput.slug} className="form-control" />
                                   <small className="text-danger">{errorslist.slug}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Name</label>
                                   <input type="" name="name" onChange={handleInput} value={productInput.name} className="form-control" />
                                   <small className="text-danger">{errorslist.name}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Description</label>
                                   <textarea
                                        type=""
                                        name="description"
                                        onChange={handleInput}
                                        value={productInput.description}
                                        className="form-control"
                                   />
                                   <small className="text-danger">{errorslist.description}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Status</label>
                                   <input type="checkbox" onChange={handleInput} value={productInput.status} name="status" /> Status 1=yes
                                   and 0=no
                              </div>
                         </div>

                         <div className="tab-pane card-body border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <div className="form-group mb-3">
                                   <label>Meta Title</label>
                                   <input
                                        type=""
                                        name="metatitle"
                                        onChange={handleInput}
                                        value={productInput.metatitle}
                                        className="form-control"
                                   />
                                   <small className="text-danger">{errorslist.metatitle}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Keywords</label>
                                   <textarea
                                        type=""
                                        name="metakeywords"
                                        onChange={handleInput}
                                        value={productInput.metakeywords}
                                        className="form-control"
                                   />
                                   <small className="text-danger">{errorslist.metakeywords}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Description</label>
                                   <textarea
                                        type=""
                                        name="metadescription"
                                        onChange={handleInput}
                                        value={productInput.metadescription}
                                        className="form-control"
                                   />
                                   <small className="text-danger">{errorslist.metadescription}</small>
                              </div>
                         </div>

                         <div className="tab-pane card-body border fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                              <div className="row">
                                   <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input
                                             type="text"
                                             name="selling_price"
                                             onChange={handleInput}
                                             value={productInput.selling_price}
                                             className="form-control"
                                        />
                                        <small className="text-danger">{errorslist.selling_price}</small>
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Original Price</label>

                                        <input
                                             type="text"
                                             name="original_price"
                                             onChange={handleInput}
                                             value={productInput.original_price}
                                             className="form-control"
                                        />
                                        <small className="text-danger">{errorslist.original_price}</small>
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input
                                             type="text"
                                             name="qty"
                                             onChange={handleInput}
                                             value={productInput.qty}
                                             className="form-control"
                                        />
                                        <small className="text-danger">{errorslist.qty}</small>
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>

                                        <input
                                             type="text"
                                             name="brand"
                                             onChange={handleInput}
                                             value={productInput.brand}
                                             className="form-control"
                                        />
                                        <small className="text-danger">{errorslist.brand}</small>
                                   </div>

                                   <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>

                                        <input type="file" name="image" onChange={handleImage} className="form-control" />
                                        <small className="text-danger">{errorslist.image}</small>
                                   </div>
                                   <div className="col-md-4 form-group mb-3">
                                        <label>Featured (checked=shown)</label>

                                        <input
                                             type="checkbox"
                                             name="featured"
                                             onChange={handleInput}
                                             value={productInput.featured}
                                             className="w-50 h-50"
                                        />
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Popular (checked=shown)</label>

                                        <input
                                             type="checkbox"
                                             name="popular"
                                             onChange={handleInput}
                                             value={productInput.popular}
                                             className="w-50 h-50"
                                        />
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Status (checked-Hidden)</label>

                                        <input
                                             type="checkbox"
                                             name="status"
                                             onChange={handleInput}
                                             value={productInput.status}
                                             className="w-50 h-50"
                                        />
                                   </div>
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

export default AddProduct;
