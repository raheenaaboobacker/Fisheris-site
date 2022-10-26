import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer';
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom'

export default function FisherManViewRooms() {
  const navigate=useNavigate();
    const [data,setData]=useState([])
    const [room_id,setRoom_id]=useState('')
    const [arrdata,setArrdata]=useState({
      login_id:localStorage.getItem("loginId"),
      room_id:room_id,
      from_date:'',
      to_date:'',
      no_of_person:''
    })
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1;
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
	if(month < 10)
	month = '0' + month.toString();
    var newdate = year + "-" + month + "-" + day;
    // console.log(newdate);


    if(arrdata.from_date){
      console.log(arrdata.from_date);
      var dateObj1 = new Date(arrdata.from_date);
    var month1 = dateObj1.getUTCMonth() + 1;
    var day1 = dateObj1.getUTCDate();
    var year1 = dateObj1.getUTCFullYear();
    if(month1 < 10)
    month1 = '0' + month1.toString();
    var newdate1 = year1 + "-" + month1 + "-" + day1;
    console.log("dateeee",newdate1);
    }


  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])

    useEffect(() => {
		axios.get("http://localhost:5000/admin/view-rooms")
		.then((response)=>{
		   if (response.data.success == true) {
			   console.log(response.data.data);
			   
			   setData(response.data.data)
			   console.log(data);
			 }
		   })
		   .catch((error) => {
			 console.log(error);
   
		   });
	   }, [])

       const requestVessel=(e)=>{
       e.preventDefault()  
        const data = {room_id:room_id,
          login_id:localStorage.getItem("loginId"),
      room_id:room_id,
      from_date:arrdata.from_date,
      to_date:arrdata.to_date,
      no_of_person:arrdata.no_of_person}
        console.log("data",data);
        axios.post('http://localhost:5000/admin/book-rooms',data)
        .then((result)=>{
            console.log(result.data);
            if(result.data.success==true){
              alert(result.data.message)

              navigate('/viewBookedRooms')
              window.location.reload()              

            }
          
          })
          
    }

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setArrdata({
            ...arrdata,
            [name]:value
        })
        console.log(arrdata);
    }

  return (
    <div>
        <FishermanNav/>
        <main className="site-main page-spacing">
    {/* Page Banner */}
    <div className="page-banner contact-banner container-fluid no-padding">
      <div className="page-banner-content">
        <div className="container">
          <h3>Rooms</h3>
          {/* <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p> */}
        </div>
      </div>
      <div className="banner-content container-fluid no-padding">
        <div className="container">
          <h4 className="pull-left">Rooms</h4>
          <ol className="breadcrumb pull-right">
            <li><a href="#">Home</a></li>							
            <li className="active">Rooms</li>
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
                      <h3>Rooms</h3>
                      <p></p>
                  </div>
                  <div className="row">		
                      {data&&data.map(item=>(
                        <div className="col-md-3 col-sm-3 col-xs-6">
                          <div className="team-box">
                              <img style={{height:"250px"}} src={`upload/${item.image}`} alt="team1"/>
                              <div className="team-content">
                                  <ul>
                                      <li><a data-toggle="modal" onClick={() => { setRoom_id( item._id);}} data-target="#staticBackdrop" title="Facebook">Request</a></li>
                                      {/* <li><a data-toggle="modal" title="Facebook">{item.name}</a></li> */}
                                      {/* <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                                      <li><a href="#" title="Google-Pluse"><i className="fa fa-google-plus"></i></a></li> */}
                                  </ul>
                                  
                                  <span>Room name : {item.name}</span><br/>
                                  <span>No of persons : {item.no_of_person}</span><br/>
                                  <span>Contact no : {item.mobile}</span><br/>
                                  <span>Amount : {item.amount}</span><br/>
                                  <span>Place : {item.place}</span><br/>
                                  {/* <span>{item.vprice} ₹</span> */}

                              </div>
                              <div className="team-shape"></div>
                          </div>
                      </div>
                      ))}				
                     
                  </div>
              </div>
              <div className="section-padding"></div>
          </div>
    <Footer/>
    <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-right">
                                <i className="fa fa-close close" data-dismiss="modal" />
                            </div>
                            <div className="tabs mt-3">
                                
                                <div className="tab-content" id="myTabContent">
                               <div className="row">
                                    <div className="col-md-12">
                                        <form onSubmit={requestVessel} >
                                      <div className="card p-3">
                                        <h4 className="text-uppercase"> Booking Form</h4>
                                        <div className="inputbox mt-3"> 
                                        
                                        </div>
                                        
                                          <div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" >From Date </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="date" name="from_date" className="form-control" min={newdate} value={arrdata.from_date} onChange={handleInputChange} required="required" /> <span></span> </div>
                                            </div>
                                          </div>
                                          {arrdata.from_date?<div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" >To Date </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="date" name="to_date" className="form-control" min={newdate1} value={arrdata.to_date} onChange={handleInputChange} required="required" />
                                              </div>
                                            </div>
                                          </div>:""}
                                          
                                          <div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" > No of person </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="no_of_person" className="form-control" required value={arrdata.no_of_person} onChange={handleInputChange}   maxLength="3" /> <span></span> </div>
                                            </div>
                                          </div>
                                         
                                          <div className="mt-4 mb-4">
                                          <button style={{width:"200px",height:"50px"}}  className="btn btn-warning px-3">Book</button>
                                            </div>
                                      </div>
                                      </form>
                                    </div>
                                   
                                  </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}
