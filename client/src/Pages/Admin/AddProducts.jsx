import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'

export default function AddProducts() {
    const navigate=useNavigate()
    const [product,setProduct]=useState([])
    const [file,setFile]=useState("")

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setProduct({
            ...product,
            [name]:value
        })
        console.log(product);
    }

    const addItem=(e)=>{
        e.preventDefault()
        console.log(product);
        if(file){
            const data=new FormData();
            const filename=file.name
            data.append("name",filename)
            data.append("file",file)
            axios.post("http://localhost:5000/admin/upload",data)
            .then((response)=>{
                console.log(response)
            })
        }
     axios.post("http://localhost:5000/products/add-products",product)
    .then((result)=>{
      console.log(result.data);
      if(result.data.success==true){
        swal(result.data.message)
        // navigate('/ProductsView')
      }
    
    })
    
    } 
  return (
    <div className="app sidebar-mini">
    <AdminHeader/>
    <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
    <AdminSidebar/>
    <main className="app-content">
    <div className="app-title">
      <div>
        <h1><i className="fa fa-edit"></i> Add Product</h1>
        <p>Add Product</p>
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
        {/* <li className="breadcrumb-item">Forms</li> */}
        <li className="breadcrumb-item"><a href="#">Add Product</a></li>
      </ul>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="tile">
          <div className="row">
            <div className="col-lg-7 offset-lg-2">
              <form onSubmit={addItem}>
                <div className="form-group">
                  <label for="exampleInputEmail1">Product Name</label>
                  <input className="form-control" id="exampleInputText" type="text"  placeholder="Product name" name="pname" value={product.pname} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Description</label>
                  <input className="form-control" id="exampleInputText" type="text" placeholder="Description" name="desc" value={product.desc} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Price</label>
                  <input className="form-control" id="exampleInputText" type="number" placeholder="price" name="pprice" value={product.pprice} onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">image</label>
                  <input  id="exampleInputText" type="file" placeholder="Palce" name="image"  
                  required  onChange={(e)=>{setFile(e.target.files[0]); setProduct({...product,image:e.target.files[0].name})}} />
                </div>
                <div className="form-submit">
                <input type="submit" style={{width:"200px"}} name="submit" id="submit" className="submit" value="Add" />
            </div>
              </form>
            </div>
            </div>
           
        </div>
      </div>
    </div>
  </main>
    </div>
  )
}
