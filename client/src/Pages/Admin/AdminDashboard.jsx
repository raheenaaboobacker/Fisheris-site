import React, { useEffect, useState } from 'react'
import {  ProgressBar } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Adminform from '../../Components/Adminform';
import AdminHeader from '../../Components/AdminHeader';
import AdminSidebar from '../../Components/AdminSidebar';
import Nav from '../../Components/Nav';
import {BrowserRouter,Routes,Route, Link} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

 function AdminDashboard() {
  const navigate=useNavigate()
  const [user,setUser]=useState([])
  const [fisherman,setFisherman]=useState([])
  const [vessels,setVessels]=useState([])
  const [product,setProduct]=useState([])
  let count=0
  
  
  useEffect(() => {
   axios.get("http://localhost:5000/admin/view-users")
   .then(response=>{
    if(response.data.success==true){
      setUser(response.data.data)
      console.log(user);
    }
  })
  axios.get("http://localhost:5000/admin/view-fisherman")
   .then(response=>{
    if(response.data.success==true){
      setFisherman(response.data.data)
      console.log(fisherman);
    }
  })
  axios.get("http://localhost:5000/vessels/view-vessels")
     .then(response=>{
      if(response.data.success==true){
        setVessels(response.data.data)
        console.log(response.data.data);
      }
    })
    axios.get("http://localhost:5000/products/view-products")
    .then(response=>{
     if(response.data.success==true){
      setProduct(response.data.data)
       console.log(response.data.data);
     }
   })
  }, [])
  
  return (
              <div className="app sidebar-mini">
    <AdminHeader/>
    <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
    <AdminSidebar/>
   <main className="app-content">
  <div className="app-title">
    <div>
      <h1><i className="fa fa-dashboard" /> Dashboard</h1>
      {/* <p>A free and open source Bootstrap 4 admin template</p> */}
    </div>
    <ul className="app-breadcrumb breadcrumb">
      <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
      <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
    </ul>
  </div>  

  <div className="row">
    
    <div className="col-md-6 col-lg-3" onClick={()=>{navigate("/viewUsers")}}>
      <div className="widget-small primary coloured-icon"><i className="icon fa fa-users fa-3x" />
        <div className="info">
          <h4>Users</h4>
        <p><b>{user.length}</b></p>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3 "  onClick={()=>{navigate("/viewVessel")}}>
      <div className="widget-small danger coloured-icon"><i className="icon fa fa-ship fa-3x" />
        <div className="info">
          <h4>Vessels</h4>
          <p>{vessels.length}</p>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3"  onClick={()=>{navigate("/viewFisherman")}}>
      <div className="widget-small primary coloured-icon"><i className="icon fa fa-users fa-3x" />
        <div className="info">
          <h4>FisherMan</h4>
          <p><b>{fisherman.length}</b></p>
        </div>
      </div>
    </div>
    <div className="col-md-6 col-lg-3" onClick={()=>{navigate("/ProductsView")}}>
      <div className="widget-small warning coloured-icon"><i className="icon fa fa-shopping-basket fa-3x" />
        <div className="info">
          <h4>Products</h4>
          <p><b>{product.length}</b></p>
        </div>
      </div>
    </div>
   
  </div>

  <div className="row" >
    <div className="col-md-12" >
      <img  className="d-block w-100" src="assets/images/slider/slider-2.jpg"/>
        {/* <h3 className="tile-title">Monthly Sales</h3> */}
        
    </div>
   
  </div>
  
</main>

    </div>
    
      
  )
}


export default AdminDashboard;
