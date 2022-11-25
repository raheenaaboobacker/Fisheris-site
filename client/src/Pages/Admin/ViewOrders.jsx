import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';

export default function ViewOrders() {
    const [data,setData]=useState([])
  const [message, setMessage] = useState([])

  useEffect(() => {
   axios.get("http://localhost:5000/order/viewOrderItems")
   .then(response=>{
    if(response.data.success==true){
      setData(response.data.data)
      console.log(response.data.data);
    }
  })
},[ message])

const shiped=(id)=>{
 console.log(id);
  axios.post(`http://localhost:5000/order/shipped/${id}`)
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
<h1><i className="fa fa-shopping-basket" /> Orders</h1>
{/* <p>A free and open source Bootstrap 4 admin template</p> */}
</div>
<ul className="app-breadcrumb breadcrumb">
<li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
<li className="breadcrumb-item"><a href="#">Orders</a></li>
</ul>
</div>
{data&&data.map(item=>(
<div className="col-lg-3">
<div className="bs-component">
<div className="card">
<img style={{height: 170, width: '100%', display: 'block'}} src={`./upload/${item?.orderBookData.image}`} alt="Card image" />
<div className="card-body">
<h3 className="card-title">{item?.orderBookData.pname}   <span style={{marginLeft:"20px"}}>{item?.orderBookData.pprice}₹</span>   </h3>
<h5 className="card-text">Quantity: {item?.productdata[0]?.qty}</h5>
<h5 className="card-text">User Details</h5>
<p className="card-text">Name: {item?.userData?.email}</p>
<p className="card-text">Address: {item?.userData?.address}</p>
<p className="card-text">Location: {item?.userData?.mobile}</p>
{/* <p className="card-text">Email: {item?.userdata?.email}</p>
<p className="card-text">License No: {item?.userdata?.license}</p>
<p className="card-text">Monthly Income: {item?.userdata?.monthlyinc}</p> */}
{/* {console.log(item?.userData?ordersa)} */}
{item?.orderstatus == "ordered" ?
   <input type="submit" style={{width:"150px",marginTop:"10px"}} onClick={()=>shiped(item._id)} className="submit" value="Shipped" />
   :<p>Shipped</p>}
</div>
</div>
</div>
</div>
))}

</main>
</div>
  )
}
