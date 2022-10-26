import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'


export default function ProductView() {
    const [user,setUser]=useState([])
    const [message, setMessage] = useState([])
    const navigate=useNavigate()

    useEffect(() => {
     axios.get("http://localhost:5000/products/view-products")
     .then(response=>{
      if(response.data.success==true){
        setUser(response.data.data)
        console.log(response.data.data);
      }
    })
},[])

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

 const edit=(id)=>{
  navigate(`/editproduct/${id}`)
 }
 
 const deletp=(id)=>{
   console.log(id);
   axios.delete(`http://localhost:5000/products/delete-product/${id}`)
    .then(response=>{
     if(response.data.success==true){    
      window.location.reload(false);
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
      <h1><i className="fa fa-fish" /> Fish Product</h1>
      {/* <p>A free and open source Bootstrap 4 admin template</p> */}
    </div>
    <ul className="app-breadcrumb breadcrumb">
      <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
      <li className="breadcrumb-item"><a href="#">Fish Product</a></li>
    </ul>
  </div>
  {user&&user.map(item=>(
 <div className="col-lg-3">
 <div className="bs-component">
   <div className="card">
    <img style={{height: 170, width: '100%', display: 'block'}} src={`upload/${item.image}`} alt="Card image" />
     <div className="card-body">
     <h3 className="card-title">{item?.pname}</h3>
     <p className="card-text">Quantity : {item?.desc}</p>
     <p className="card-text">Price : {item?.pprice}</p>
     <div className="row">
     <input type="submit" style={{width:"69px",height:"45px" ,marginTop:"10px",marginLeft:"30px"}}  className="submit" onClick={()=>edit(item._id)} value="Edit" />
     <input type="submit" style={{width:"69px" ,height:"45px",marginTop:"10px",marginLeft:"30px"}}  className="submit" onClick={()=>deletp(item._id)} value="Delete" />
     </div>
  

   </div>
   </div>
 </div>
</div>
  ))}


    </main>
    </div>
   
  )
}
