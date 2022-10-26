import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'

export default function EditProduct() {
    const navigate=useNavigate()
    const [product,setProduct]=useState([])
    const [file,setFile]=useState("")
    const id =useParams()
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
     axios.post("http://localhost:5000/products/update-product",product)
    .then((result)=>{
      console.log(result.data);
      if(result.data.success==true){
        swal(result.data.message)
        navigate('/ProductsView')
      }
    
    })
    
    } 
    useEffect(() => {
        const aid=id.id
        axios.get(`http://localhost:5000/products/view-products/${aid}`)
       .then(response=>{
        console.log(response);
        if(response.data.success==true){
            setProduct(response.data.data[0])
          console.log(response.data.data[0]);
        }
      })
    }, []);
  return (
    <div className="app sidebar-mini">
    <AdminHeader/>
    <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
    <AdminSidebar/>
    <main className="app-content">
    <div className="app-title">
      <div>
        <h1><i className="fa fa-edit"></i> Edit Products</h1>
        <p>Edit Products</p>
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
        <li className="breadcrumb-item">Fish Products</li>
        <li className="breadcrumb-item"><a href="#">Edit Products</a></li>
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
                  <input className="form-control" id="exampleInputText" type="text" placeholder="Description" name="_id" value={product._id}  hidden/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Price</label>
                  <input className="form-control" id="exampleInputText" type="number" placeholder="price" name="pprice" value={product.pprice} onChange={handleInputChange} required/>
                </div>
                
                <div className="form-submit">
                <input type="submit" style={{width:"200px"}} name="submit" id="submit" className="submit" value="Update" />
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
