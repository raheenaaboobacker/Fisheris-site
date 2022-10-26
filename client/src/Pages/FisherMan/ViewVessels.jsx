import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer';
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';

export default function ViewVessels() {
  const navigate=useNavigate()
    const [data,setData]=useState([])
    const [vid,setVid]=useState("")
    const [arrdata,setArrdata]=useState([])
    const token=localStorage.getItem("token")
    
    useEffect(() => {
      if(!token){
        navigate("/login")
      }
    }, [])

    useEffect(() => {
		axios.get("http://localhost:5000/vessels/view-vessels")
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
         const id=localStorage.getItem("loginId")
         const data={
            vid:vid,
            id:id
         }
         console.log(data);
        axios.post('http://localhost:5000/vessels/request-vessels',data)
        .then((result)=>{
            console.log(result.data);
            if(result.data.success==true){
              swal(result.data.message)
              navigate("/viewBookedVessels")
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
          <h3>Buy Vessals Here</h3>
          {/* <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p> */}
        </div>
      </div>
      <div className="banner-content container-fluid no-padding">
        <div className="container">
          <h4 className="pull-left">vessels</h4>
          <ol className="breadcrumb pull-right">
            <li><a href="#">Home</a></li>							
            <li className="active">vessels</li>
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
                      <h3>Vessels</h3>
                      <p></p>
                  </div>
                  <div className="row">		
                      {data&&data.map(item=>(
                        <div className="col-md-3 col-sm-3 col-xs-6">
                          <div className="team-box">
                              <img style={{height:"250px"}} src={`./upload/${item?.image}`} alt="team1"/>
                              <div className="team-content">
                                  <ul>
                                      <li><a data-toggle="modal" onClick={() => { console.log("id" + item._id);setVid(item._id)}} data-target="#staticBackdrop" title="Facebook">Request</a></li>
                                      {/* <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                                      <li><a href="#" title="Google-Pluse"><i className="fa fa-google-plus"></i></a></li> */}
                                  </ul>
                                  <h3>{item.vname}</h3>
                                  <span>{item.desc}</span><br/>
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
                        <div className="modal-body" style={{height:"200px"}}>
                            <div className="text-right">
                                <i className="fa fa-close close" data-dismiss="modal" />
                            </div>
                            <div className="tabs mt-3">
                                
                                <div className="tab-content" id="myTabContent">
                               <div className="row">
                                    <div className="col-md-12">
                                        <form onSubmit={requestVessel}>
                                      {/* <div className="card p-3">
                                        <h4 className="text-uppercase"> details</h4>
                                        
                                        
                                          <div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" >Amound  </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="number" name="amount" className="form-control" value={arrdata.amount} onChange={handleInputChange} required="required" /> <span>Amound</span> </div>
                                            </div>
                                          </div>
                                          <div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" > Register Place </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="place" className="form-control" required="required" value={arrdata.place} onChange={handleInputChange} /> <span>Place</span> </div>
                                            </div>
                                          </div>
                                          <div className="row mt-3">
                                            <div className="col-md-4">
                                               <label   required="required" > Time Period </label>
                                            </div>
                                            <div className="col-md-8">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="period" className="form-control" required="required"  value={arrdata.period} onChange={handleInputChange} /> <span>Time Period</span> </div>
                                            </div>
                                          </div>
                                          <div className="mt-4 mb-4">
                                          <button type='submit' style={{width:"200px",height:"50px"}} onClick={requestVessel} className="btn btn-warning px-3" data-dismiss="modal">request Vessel</button>
                                            </div>
                                      </div> */}
                                     <div>
                                     <div className="card p-3">
                                        <h4 className="text-uppercase"> Request Vessel Here</h4>
                                        
                                        
                                          <div className="mt-4 mb-4">
                                          <button type='submit' style={{width:"200px",height:"50px"}} onClick={requestVessel} className="btn btn-warning px-3" data-dismiss="modal">request Vessel</button>
                                            </div>
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
