import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

export default function ViewTrolling() {
  const [alert,setAlert]=useState([])
  const [message, setMessage] = useState([])
  const navigate=useNavigate()

  useEffect(() => {
   axios.get("http://localhost:5000/admin/view-trollalert")
   .then(response=>{
    if(response.data.success==true){
        setAlert(response.data.data)
      console.log(response.data.data);
    }
  })
},[ ])

const edit=(id)=>{
 navigate(`/edittrollingalert/${id}`)
}

const deletealert=(id)=>{
  console.log(id);
  axios.delete(`http://localhost:5000/admin/delete-alert/${id}`)
   .then(response=>{
    if(response.data.success==true){
     swal(response.data.message)
     setMessage(response.data.message)
     navigate('/viewtrollingalert')
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
  <h1><i className="fa fa-dashboard" /> Troll Alert</h1>
  
</div>
<ul className="app-breadcrumb breadcrumb">
  <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
  <li className="breadcrumb-item"><a href="#">Troll Alert</a></li>
</ul>
</div>
{alert.map(item=>(
<div className="col-lg-16" style={{marginBottom:"10px"}}>
<div className="bs-component">
<div className="card">
{/* <img style={{height: 170, width: '100%', display: 'block'}} src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" alt="Card image" /> */}
 <div className="card-body">
 <h3 className="card-title">{item?.dist}</h3>
   <p className="card-text">Start date: {item?.start_date}</p>
   <p className="card-text">End date: {item?.end_date}</p>
   <p className="card-text">Message: {item?.message}</p>
   <div class="row">
   <input type="submit" style={{width:"100px",marginLeft:"15px", marginTop:"10px"}} onClick={()=>{edit(item._id)}} className="submit" value="Edit" />
   <input type="submit" style={{width:"100px",marginLeft:"15px",marginTop:"10px"}} onClick={()=>{deletealert(item._id)}}  className="submit btn-danger" value="Delete" />
   </div>
   
  
   {/* {item?.status === 0 ?
   
   :null}
   <input type="submit" style={{width:"150px" ,marginTop:"10px"}}  className="submit" onClick={()=>deletefisherman(item._id)} value="Delete" /> */}

 </div>
</div>
</div>
</div>
))}

</main>
</div>  )
}
