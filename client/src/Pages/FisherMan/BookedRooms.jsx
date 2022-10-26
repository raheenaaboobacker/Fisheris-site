import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer';
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom'

export default function BookedRooms() {
  const navigate=useNavigate();
  const [booking, bookingData] = useState([])
  const id = localStorage.getItem("loginId");

  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])

  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/view-room-booking/${id}`)
    .then(result => {
        bookingData(result.data.data)			
    });
},[])



const cancel=(id)=>{
    console.log(id);
    axios.delete(`http://localhost:5000/admin/delete-room-booking/${id}`)
     .then(response=>{
      if(response.data.success==true){
       alert(response.data.message)
       window.location.reload()              
      }
    })
   
  }


  return (
    <div>
      <FishermanNav />
      <main className="site-main page-spacing">
        {/* Page Banner */}
        <div className="page-banner contact-banner container-fluid no-padding">
          <div className="page-banner-content">
            <div className="container">
              <h3>Booking Details</h3>
              {/* <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p> */}
            </div>
          </div>
          <div className="banner-content container-fluid no-padding">
            <div className="container">
              <h4 className="pull-left">Booking Details</h4>
              <ol className="breadcrumb pull-right">
                <li><a href="#">Home</a></li>
                <li className="active">Booking Details</li>
              </ol>
            </div>
          </div>
        </div>
      </main>
      <div className="container-fluid no-padding team-section">
        <div className="section-padding"></div>
        {/* <!-- Container -->	 */}
        <div className="container">
          {/* <!-- Section Header --> */}
          <div className="section-header">
            <h3>Booking Details</h3>
            <p></p>
          </div>

        { booking.map((item)=>
             <div className="row" style={{marginBottom:"15px"}}>
             <div className="col-md-12 col-sm-12 col-xs-12">
               <div className="team-box">
                 <div className="team-content">
                   <span>Room Name : {item.room_name} <br />
                   Room Place : {item.room_place} <br />
                   From Date : {item.from_date} <br />
                   To Date : {item.to_date} <br />
                   No of Person : {item.no_of_person} <br />
                   Contact : {item.room_mobile} <br />  
                   Status : { item.status==1 ? (<>Booking Confirmed</>) : item.status==0 ? (<>Waiting for confirmation</>) : (<></>) } <br />
            
                   </span><br />
                   {item.status==1 ?  <button className='btn btn-danger' onClick={()=>{cancel(item._id)}} disabled>Calcel booking</button>
                   :  <button className='btn btn-danger' onClick={()=>{cancel(item._id)}}>Calcel booking</button>}
                  
                 </div>
               </div>
             </div>
           </div>
        )}
           
          

        </div>
        <div className="section-padding"></div>
      </div>
      <Footer />
     
    </div>
  )
}
