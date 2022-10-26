import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'

export default function Editrooms() {
  var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var newdate = year + "-0" + month + "-" + day;
    
  const [data,setData]=useState({})
  console.log("dd",data);
  const navigate=useNavigate()
  const id =useParams()
  const handleInputChange=(e)=>{
      const {name,value}=e.target
      setData({
          ...data,
          [name]:value
      })
     
  }

  const addItem=(e)=>{
    e.preventDefault()
    console.log(data);
    const token=localStorage.getItem("token")
    console.log(token);
    fetch('http://localhost:5000/admin/update-room', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token,
        },
      
}).then(res => res.json())

.then((result)=>{
  console.log(result);
  if(result.success==true){
    swal(result.message)
    navigate('/admindashboard')
  }

})

} 
useEffect(() => {
    const aid=id.id
    axios.get(`http://localhost:5000/admin/view-rooms/${aid}`)
   .then(response=>{
    console.log(response);
    if(response.data.success==true){
        setData(response.data.data[0])
      console.log(response.data.data[0]);
    }
  })
}, []);
console.log(data);

  return (
    <div className="app sidebar-mini">
    <AdminHeader/>
    <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
    <AdminSidebar/>
    <main className="app-content">
    <div className="app-title">
      <div>
        <h1><i className="fa fa-edit"></i> Edit Rooms </h1>
        
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
        <li className="breadcrumb-item">Edit Rooms</li>
        {/* <li className="breadcrumb-item"><a href="#">Form Components</a></li> */}
      </ul>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="tile">
          <div className="row">
            <div className="col-lg-7 offset-lg-2">
           
              <form onSubmit={addItem}>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Room Name</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Enter Room Name Here" name="name" value={data.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Accomodating persons</label>
                      <input className="form-control" id="exampleInputText" type="number" placeholder="Accomodating persons" name="no_of_person" value={data.no_of_person} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Place</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Palce" name="place" value={data.place} onChange={handleInputChange} />
                      <input className="form-control" id="exampleInputText" type="text" placeholder="_id" name="place" value={data._id} hidden/>
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Contact number</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Contact number" name="place" value={data.mobile} onChange={handleInputChange} />
                    
                    </div>
                    <div className="form-submit">
                      <input type="submit" style={{ width: "200px" }} name="submit" id="submit" className="submit" value="Update" />
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
