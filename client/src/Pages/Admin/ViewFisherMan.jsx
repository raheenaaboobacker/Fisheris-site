import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function ViewFisherMan() {
  const [fisherman,setFisherman]=useState([])
  const [message, setMessage] = useState([])

  useEffect(() => {
   axios.get("http://localhost:5000/admin/view-fisherman")
   .then(response=>{
    if(response.data.success==true){
      setFisherman(response.data.data)
      console.log(response.data.data);
    }
  })
},[ message])

const approvefisherman=(id)=>{
 console.log(id);
  axios.post(`http://localhost:5000/admin/approve-user/${id}`)
   .then(response=>{
    if(response.data.success==true){
     swal(response.data.message)
     setMessage(response.data.message)
    }
  })
}

const deletefisherman=(id)=>{
  console.log(id);
  axios.delete(`http://localhost:5000/admin/delete-fisherman/${id}`)
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
  <h1><i className="fa fa-Fisherman" /> Fisherman</h1>
  {/* <p>A free and open source Bootstrap 4 admin template</p> */}
</div>
<ul className="app-breadcrumb breadcrumb">
  <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
  <li className="breadcrumb-item"><a href="#">Fisherman</a></li>
</ul>
</div>
{fisherman&&fisherman.map(item=>(
<div className="col-lg-3">
<div className="bs-component">
<div className="card">
<img style={{height: 170, width: '100%', display: 'block'}} src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" alt="Card image" />
 <div className="card-body">
 <h3 className="card-title">{item?.name}</h3>
   <p className="card-text">Phone no: {item?.registerdetails[0]?.mobile}</p>
   <p className="card-text">Address: {item?.registerdetails[0]?.address}</p>
   <p className="card-text">Location: {item?.registerdetails[0]?.location}</p>
   <p className="card-text">Email: {item?.registerdetails[0]?.email}</p>
   <p className="card-text">License No: {item?.registerdetails[0]?.license}</p>
   <p className="card-text">Monthly Income: {item?.registerdetails[0]?.monthlyinc}</p>
   {item?.status === 0 ?
   <input type="submit" style={{width:"150px",marginTop:"10px"}} onClick={()=>approvefisherman(item._id)} className="submit" value="Approve" />
   :null}
   <input type="submit" style={{width:"150px" ,marginTop:"10px"}}  className="submit" onClick={()=>deletefisherman(item._id)} value="Delete" />

 </div>
</div>
</div>
</div>
))}

</main>
</div>  )
}
