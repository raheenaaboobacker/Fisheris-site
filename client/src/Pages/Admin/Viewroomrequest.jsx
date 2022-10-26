import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function Viewroomrequest() {
  const [room,setroom]=useState([])
  const [message, setMessage] = useState([])

  useEffect(() => {
   axios.get("http://localhost:5000/admin/view-room-booking")
   .then(response=>{
    if(response.data.success==true){
      setroom(response.data.data)
      console.log(response.data.data);
    }
  })
},[ message])

const approveroom=(id)=>{
 console.log(id);
  axios.post(`http://localhost:5000/admin/approve-room-booking/${id}`)
   .then(response=>{
    if(response.data.success==true){
     swal(response.data.message)
     setMessage(response.data.message)
    }
  })
}

const deleteroom=(id)=>{
  console.log(id);
  axios.delete(`http://localhost:5000/admin/delete-room-booking/${id}`)
   .then(response=>{
    if(response.data.success==true){
     swal(response.data.message)
     setMessage(response.data.message)
    }
  })
}

  return (
    <div>
    <AdminHeader/>
    <AdminSidebar/>
    <main className="app-content">
<div className="app-title">
<div>
  <h1><i className="fa fa-dashboard" /> Room Booking</h1>
 
</div>
<ul className="app-breadcrumb breadcrumb">
  <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
  <li className="breadcrumb-item"><a href="#">Room Booking</a></li>
</ul>
</div>
{room&&room.map(item=>(
<div className="col-lg-4">
<div className="bs-component">
<div className="card">
{/* <img style={{height: 170, width: '100%', display: 'block'}} src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" alt="Card image" /> */}
 <div className="card-body">
 <h3 className="card-title">{item?.name}</h3>
   <p className="card-text">Room Name: {item?.room_name}</p>
   <p className="card-text">Room Place: {item?.room_place}</p>
   <p className="card-text">User Email: {item?.user_email}</p>
   <p className="card-text">License No: {item?.user_license}</p>
   <p className="card-text">Mobile: {item?.user_mobile}</p>
   <p className="card-text">From date: {item?.from_date}</p>
   <p className="card-text">To date No: {item?.to_date}</p>
   <p className="card-text">No of Person: {item?.no_of_person}</p>
   {item?.status == 0 ?
   <input type="submit" style={{width:"150px",marginTop:"20px"}} onClick={()=>approveroom(item._id)} className="submit" value="Approve" />
   :null}
   <input type="submit" style={{width:"150px" ,marginTop:"20px"}}  className="submit" onClick={()=>deleteroom(item._id)} value="Delete" />

 </div>
</div>
</div>
</div>
))}

</main>
</div>  )
}
