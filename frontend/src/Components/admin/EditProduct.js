import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

//Need to update in category id and required

function EditProduct(props) {
     const [categorylist, setCategoryList] = useState([]);
     const history = useHistory();
     const [loading, setLoading] = useState(true);
     const [errorslist, setError] = useState([]);
     const [image, setImage] = useState([]);
     const [productInput, setProduct] = useState({
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

     useEffect(() => {
          axios.get(`/api/all_category`).then((res) => {
               if (res.data.status === 200) {
                    setCategoryList(res.data.category);
               }
          });

          const product_id = props.match.params.id;
          axios.get(`/api/edit_product/${product_id}`).then((res) => {
               if (res.data.status === 200) {
                    setProduct(res.data.product);
               } else {
                    swal("Data not Found by this id", res.data.message, "warning");
                    history.push("/admin/view_product");
               }
               setLoading(false);
          });
     }, [props.match.params.id, history]);
     const handleImage = (e) => {
          setImage({ image: e.target.files[0] });
     };

     const handleInput = (e) => {
          e.persist();
          setProduct({ ...productInput, [e.target.name]: e.target.value });
     };

     const updateSubmit = (e) => {
          e.preventDefault();
          const product_id = props.match.params.id;
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

          axios.post(`/api/update_product/${product_id}`, formData).then((res) => {
               if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setError([]);
                    setProduct({
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

     if (loading) {
          return <h1>Edit Product loading</h1>;
     }
     return (
          <div className="container py-10">
               <div className="card mt-4">
                    <div className="card-header">
                         <h2 className="mt-4">
                              <Link className="btn btn-primary btn-sm float-end" to="/admin/view_product">
                                   View Product
                              </Link>
                              Edit Product
                         </h2>
                    </div>
               </div>

               <form onSubmit={updateSubmit} encType="multipart/from-data">
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
                                   <label>Slug</label>
                                   <input type="" value={productInput.slug} onChange={handleInput} name="slug" className="form-control" />
                                   <small className="text-danger">{errorslist.slug}</small>
                              </div>
                              <div className="form-group mb-3">
                                   <label>Name</label>
                                   <input type="" name="name" value={productInput.name} onChange={handleInput} className="form-control" />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Description</label>
                                   <textarea
                                        type=""
                                        name="description"
                                        value={productInput.description}
                                        onChange={handleInput}
                                        className="form-control"
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Status</label>
                                   <input type="checkbox" value={productInput.status} onChange={handleInput} name="status" /> Status 1=yes
                                   and 0=no
                              </div>
                         </div>

                         <div className="tab-pane card-body border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                              <div className="form-group mb-3">
                                   <label>Meta Title</label>
                                   <input
                                        type=""
                                        name="metatitle"
                                        value={productInput.metatitle}
                                        onChange={handleInput}
                                        className="form-control"
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Keywords</label>
                                   <textarea
                                        type=""
                                        name="metakeywords"
                                        value={productInput.metakeywords}
                                        onChange={handleInput}
                                        className="form-control"
                                   />
                              </div>
                              <div className="form-group mb-3">
                                   <label>Meta Description</label>
                                   <textarea
                                        type=""
                                        name="metadescription"
                                        value={productInput.metadescription}
                                        onChange={handleInput}
                                        className="form-control"
                                   />
                              </div>
                         </div>

                         <div className="tab-pane card-body border fade" id="other" role="tabpanel" aria-labelledby="other-tab">
                              <div className="row">
                                   <div className="col-md-4 form-group mb-3">
                                        <label>Selling Price</label>
                                        <input
                                             type="text"
                                             name="selling_price"
                                             value={productInput.selling_price}
                                             onChange={handleInput}
                                             className="form-control"
                                        />
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Original Price</label>

                                        <input
                                             type="text"
                                             name="original_price"
                                             value={productInput.original_price}
                                             onChange={handleInput}
                                             className="form-control"
                                        />
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Quantity</label>
                                        <input
                                             type="text"
                                             name="qty"
                                             value={productInput.qty}
                                             onChange={handleInput}
                                             className="form-control"
                                        />
                                   </div>

                                   <div className="col-md-4 form-group mb-3">
                                        <label>Brand</label>

                                        <input
                                             type="text"
                                             name="brand"
                                             value={productInput.brand}
                                             onChange={handleInput}
                                             className="form-control"
                                        />
                                   </div>

                                   <div className="col-md-8 form-group mb-3">
                                        <label>Image</label>

                                        <input type="file" onChange={handleImage} name="image" className="form-control" />
                                        <img
                                             src={`http://localhost:8000/${productInput.image}`}
                                             width="40px"
                                             alt={productInput.image}
                                        ></img>
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

export default EditProduct;
