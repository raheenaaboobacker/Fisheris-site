import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'


export default function Viewvessels() {
    const [user,setUser]=useState([])
    const [message, setMessage] = useState([])
    const navigate=useNavigate()

    useEffect(() => {
     axios.get("http://localhost:5000/vessels/view-vessels")
     .then(response=>{
      if(response.data.success==true){
        setUser(response.data.data)
        console.log(response.data.data);
      }
    })
},[])

const edit=(id)=>{
    navigate(`/editvessel/${id}`)
   }

const approveuser=(id)=>{
  console.log(id);
   axios.post(`http://localhost:5000/admin/approve-user/${id}`)
    .then(response=>{
     if(response.data.success==true){
      swal(response.data.message)
      setMessage(response.data.message)
     }
   })
 }
 
 const deletev=(id)=>{
   console.log(id);
   axios.delete(`http://localhost:5000/vessels/delete-vessel/${id}`)
    .then(response=>{
     if(response.data.success==true){
      swal(response.data.message)
      setMessage(response.data.message)
      navigate('/admindashboard')
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
      <h1><i className="fa fa-ship" /> Vessels</h1>
      {/* <p>A free and open source Bootstrap 4 admin template</p> */}
    </div>
    <ul className="app-breadcrumb breadcrumb">
      <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
      <li className="breadcrumb-item"><a href="#">Vessels</a></li>
    </ul>
  </div>
  {user&&user.map(item=>(
 <div className="col-lg-3">
 <div className="bs-component">
   <div className="card">
    <img style={{height: 170, width: '100%', display: 'block'}} src={`upload/${item.image}`} alt="Card image" />
     <div className="card-body">
     <h3 className="card-title">Vessel Name: {item?.vname}</h3>
     <p className="card-text">Desc: {item?.desc}</p>
     <p className="card-text">Price: {item?.vprice}</p>
     <div class="row">
     <input type="submit" style={{width:"70px",marginTop:"10px",marginLeft:"30px"}} onClick={()=>{edit(item._id)}} className="submit" value="Edit" />
     <input type="submit" style={{width:"70px",marginTop:"10px",marginLeft:"20px"}} onClick={()=>deletev(item._id)} className="submit" value="Delete" />
     </div>
     {/* {item?.status === 0 ?
   
   :null}
   <input type="submit" style={{width:"150px" ,marginTop:"10px"}}  className="submit" onClick={()=>deleteuser(item._id)} value="Delete" /> */}

   </div>
   </div>
 </div>
</div>
  ))}


    </main>
    </div>
   
  )
}
