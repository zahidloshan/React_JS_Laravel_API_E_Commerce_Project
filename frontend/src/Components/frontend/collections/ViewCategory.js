import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewCategory() {
     const [categoyList, setCategoyList] = useState([]);
     const [loading, setLoading] = useState(true);
     useEffect(() => {
          axios.get(`/api/getCategory`).then((res) => {
               if (res.data.status === 200) {
                    console.log(res.data.category);
                    setCategoyList(res.data.category);
                    setLoading(false);
               }
          });
     }, []);
     if (loading) {
          return <h1>Category is loading....</h1>;
     } else {
          var showCategoryList = "";
          showCategoryList = categoyList.map((item) => {
               return (
                    <div className="col-md-4" key={item.id}>
                         <div className="card">
                              <div className="card-body">
                                   <Link to={`collection/${item.name}`}>
                                        <img src="" className="w-100" alt={item.name}></img>
                                   </Link>
                                   <Link to={`collection/${item.slug}`}>
                                        <h5>{item.name}</h5>
                                   </Link>
                              </div>
                         </div>
                    </div>
               );
          });
     }

     return (
          <div>
               <div className="py-3 bg-warning">
                    <div className="container">
                         <h2>Category Page</h2>
                    </div>
               </div>
               <div className="py-3">
                    <div className="container">
                         <div className="row">{showCategoryList}</div>
                    </div>
               </div>
          </div>
     );
}

export default ViewCategory;
