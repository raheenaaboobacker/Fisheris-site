import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert'

export default function Edittrolling() {
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
    fetch('http://localhost:5000/admin/update-trollalert', {
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
    navigate('/viewtrollingalert')
  }

})

} 
useEffect(() => {
    const aid=id.id
    axios.get(`http://localhost:5000/admin/view-trollalert/${aid}`)
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
        <h1><i className="fa fa-edit"></i> Edit Trolling Alert</h1>
        <p>Alert can sent to Fisher Man</p>
      </div>
      <ul className="app-breadcrumb breadcrumb">
        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
        <li className="breadcrumb-item">Edit Troll</li>
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
                  <label for="exampleInputEmail1">District</label>
                  <input className="form-control" id="exampleInputText" type="text"  placeholder="Enter District" name="dist" value={data.dist} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Trolling start date</label>
                  <input className="form-control" id="exampleInputText" type="date" placeholder="Start date" min={newdate} name="start_date" value={data.start_date} onChange={handleInputChange}/>
                </div>
                <div className="form-group">
                  <label for="exampleInputPassword1">Trolling end date</label>
                  <input className="form-control" id="exampleInputText" type="date" placeholder="End date" min={newdate} name="end_date" value={data.end_date} onChange={handleInputChange}/>
                  <input className="form-control" id="exampleInputText" type="date" placeholder="End date" min={newdate} name="_id" value={id.id} hidden/>
                </div>

                <div className="form-group">
                  <label for="exampleInputEmail1">Alert Message</label>
                  <textarea className="form-control" id="exampleInputText" type="text"  placeholder="Message" name="message" value={data.message} onChange={handleInputChange}/>
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
