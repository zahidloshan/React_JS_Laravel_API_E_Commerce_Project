import React, { useState } from 'react';

import axios from 'axios';
import swal from 'sweetalert';


function Category() {

    const [categoryInput ,setCategory]=useState({
        slug:'',
        name:'',
        description:'',
        status:'',
        metatitle:'',
        metakeywords:'',
        metadescription:'',
        errors_list:[],

    });

    const handleInput =(e)=>
    {
        e.persist();
        setCategory({...categoryInput,[e.target.name]:e.target.value});
    }
    const categorySubmit =(e)=>
    {
        e.preventDefault();

        const data ={
            slug: categoryInput.slug,
            name: categoryInput.name,
            description: categoryInput.description,
            status: categoryInput.status,
            metatitle: categoryInput.metatitle,
            metakeywords: categoryInput.metakeywords,
            metadescription: categoryInput.metadescription,
        }

        axios.post(`/api/add_category`,data).then(res =>{
            if(res.data.status === 200)
            {

                swal("Success",res.data.message,"success");

                document.getElementById('Category_Form').reset();

            }
            else if(res.data.status === 400)
            {
                setCategory({...categoryInput,errors_list:res.data.errors});
            }
        });
    }

    {/*var display_errors = []; 
    if(categoryInput.errors_list)

        {

        display_errors = [

        categoryInput.errors_list.slug,

        categoryInput.errors_list.name,

        categoryInput.errors_list.metatitle,
        ]

    }*/}
    return (
        <div className="container py-10">
            <h1 className='mt-4'>Add Category</h1>
            {/*
                display_errors.map((item)=>{
                    return (<p>{item}</p>)
                })
            */}
            <form onSubmit={categorySubmit} id="Category_Form">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">SEO Tag</button>
                    </li>
                    
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane card-body border fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <div className="form-group mb-3">
                            <label>Slug</label>
                            <input type="" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                            <span> {categoryInput.errors_list.slug}</span>
                        </div>
                        <div className="form-group mb-3">   
                            <label>Name</label>
                            <input type="" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                        </div>
                        <div className="form-group mb-3">   
                            <label>Description</label>
                            <textarea type="" name="description" onChange={handleInput} value={categoryInput.description} className="form-control" />
                        </div>
                        <div className="form-group mb-3">   
                            <label>Status</label> 
                            <input type="checkbox" name="status" onChange={handleInput} value={categoryInput.status} /> Status 1=yes and 0=no
                        </div>

                    </div>

                    <div className="tab-pane card-body border fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                        <div className="form-group mb-3">   
                            <label>Meta Title</label>
                            <input type="" name="metatitle" onChange={handleInput} value={categoryInput.metatitle} className="form-control" />
                        </div>
                        <div className="form-group mb-3">   
                            <label>Meta Keywords</label>
                            <textarea type="" name="metakeywords" onChange={handleInput} value={categoryInput.metakeywords} className="form-control" />
                        </div>
                        <div className="form-group mb-3">   
                            <label>Meta Description</label>
                            <textarea type="" name="metadescription" onChange={handleInput} value={categoryInput.metadescription} className="form-control" />
                        </div>
                    </div>
                
                </div>
                <button type="submit" className="btn btn-primary px-4 float-end">Submit</button>
            </form>   
        </div>
    );
}

export default Category;