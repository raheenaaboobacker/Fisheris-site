import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer';
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';

export default function Insurance() {
  const [arrdata, setArrdata] = useState({
    login_id: localStorage.getItem("loginId"),
    age: '',
    // valid_from: '',
    // valid_to: '',
    // amount: '',
    // boat_no: ''
  })
  const [insurance, setInsurance] = useState(null)
  const [user,setUser]=useState(null)
  const login = localStorage.getItem("loginId");


  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])

  const requestVessel = (e) => {
    e.preventDefault()
    console.log(arrdata);
    let data;
    if(arrdata.age<55)
    {
       data={
        login_id:arrdata.login_id,
        age:arrdata.age,
        type:"Insurance"
      }
    }
    else
     {
       data={
        login_id:arrdata.login_id,
        age:arrdata.age,
        type:"Pension"
      }
     }

    
    console.log(data);

    axios.post('http://localhost:5000/admin/apply-insurance', data)
      .then((result) => {
        console.log(result.data);
        if (result.data.success == true) {
          swal(result.data.message)
          window.location.reload(false);
        }

      })
  }

  useEffect(() => {
  axios.get(`http://localhost:5000/admin/view-fisherman/${login}`, arrdata)
  .then((result) => {
    console.log(result.data.data);
    if (result.data.success == true) {
      setUser(result.data.data)
      // console.log("userdta================>",result.data.data);
    }

  })
    axios.get(`http://localhost:5000/admin/view-insurance/${login}`, arrdata)
      .then((result) => {
        if (result.data.success == true) {
          setInsurance(result.data.data)
        }

      })
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setArrdata({
      ...arrdata,
      [name]: value
    })
    console.log(arrdata);
  }

  return (
    <div>
      <FishermanNav />
      <main className="site-main page-spacing">
        {/* Page Banner */}
        <div className="page-banner contact-banner container-fluid no-padding">
          <div className="page-banner-content">
            <div className="container">
              <h3>Insurance</h3>
              {/* <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p> */}
            </div>
          </div>
          <div className="banner-content container-fluid no-padding">
            <div className="container">
              <h4 className="pull-left">Insurance</h4>
              <ol className="breadcrumb pull-right">
                <li><a href="#">Home</a></li>
                <li className="active">Insurance</li>
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
            <h3>Insurance</h3>
            <p></p>
          </div>{console.log("insurance=========>",insurance)}
          {insurance != null ?
          
          <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12">
            <div className="team-box">
              <div className="team-content">
                <span>Requested for  {insurance[0].type} <br />
                  Name : {user[0].name}  <br />
                
                  Status : { insurance[0].status==="1" ? (<>Active</>) : insurance[0].status==="0" ? (<>Waiting for approval</>) : (<>Application rejected</>) } <br />

                </span><br />
              </div>
            </div>
          </div>
        </div>
             :
             <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="team-box">
                  <div className="team-content">
                    <span>You dont have an active insurance plan, click below button to apply <br />
                      <button className='btn btn-success' data-toggle="modal" onClick={() => { console.log("id"); }} data-target="#staticBackdrop" title="Facebook">Apply</button>
                    </span><br />
                  </div>
                </div>
              </div>
            </div>
          }

        </div>
        <div className="section-padding"></div>
      </div>
      <Footer />
      <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body" style={{ height: "50%" }}>
              <div className="text-right">
                <i className="fa fa-close close" data-dismiss="modal" />
              </div>
              <div className="tabs mt-3">

                <div className="tab-content" id="myTabContent">
                  <div className="row">
                    <div className="col-md-12">
                      <form onSubmit={requestVessel}>
                        <div className="card p-3">
                          <h4 className="text-uppercase" style={{ marginLeft: "30%" }}> Application form</h4>
                          <div className="inputbox mt-3">

                          </div>

                          <div className="row mt-3">
                            <div className="col-md-4">
                              <label required="required" >Enter Your Age  </label>
                            </div>
                            <div className="col-md-8">
                              <div className="inputbox mt-3 mr-2"> <input  type='number'  maxLength={2} name="age" className="form-control"
                               value={arrdata.age} onChange={handleInputChange} required="required" /> <span>Age</span> </div>
                            </div>
                          </div>
                         {arrdata.age>=18?<>{arrdata.age<55?
                          <><h4>You Are Eligible For insurance</h4>
                          <div className="mt-4 mb-4">
                            <button type='submit' onClick={requestVessel} style={{ width: "200px", height: "50px", marginLeft: "28%" }} 
                            className="btn btn-warning px-3" data-dismiss="modal">Apply For Insurance</button>
                          </div></>:
                          arrdata.age<=100?<><h4>You Are Eligible For pension</h4>
                          <div className="mt-4 mb-4">
                            <button type='submit' onClick={requestVessel} style={{ width: "200px", height: "50px", marginLeft: "28%" }} 
                            className="btn btn-warning px-3" data-dismiss="modal">Apply For Pension</button>
                          </div></>
                          :<h4>Enter valid age</h4>}
                          
                        </>:""}
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
