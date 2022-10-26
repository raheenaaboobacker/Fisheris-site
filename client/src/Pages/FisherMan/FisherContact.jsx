import React,{useState} from 'react'
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from "sweetalert"
import { useEffect } from 'react'

export default function FisherContact() {
    const navigate=useNavigate();
    const [contacts,setContacts]=useState({
        name:"",
        email:"",
        phone:"",
        subject:"",
        message:""
        })
  
        const handleInputChange=(e)=>{
          const {name,value}=e.target
          setContacts({
              ...contacts,
              [name]:value
          })
          console.log(contacts);
      }

  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])
  
      const vaidation=(e)=>{
        e.preventDefault();
        console.log(contacts);
        // var phoneno = /^[6-9]\d{9}$/;
  
        axios.post("http://localhost:5000/register/add-feedback",contacts)
        .then((response) => {
          console.log("Result========",response)
          if(response.data.success==true)
          {          
            swal(response.data.message); 
            navigate("/") 
            // window.location.reload()
          }
          else{
              swal(response.data.message);
          }
   }).catch((err)=>{
    swal(err.response.data.message);
   })
  
  
      
    }
    return (
    <>
    <FishermanNav/>
    <div>
    <main className="site-main page-spacing">
      {/* Page Banner */}
      <div className="page-banner contact-banner container-fluid no-padding">
        <div className="page-banner-content">
          <div className="container">
            <h3>Keep in Touch</h3>
            <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p>
          </div>
        </div>
        <div className="banner-content container-fluid no-padding">
          <div className="container">
            <h4 className="pull-left">Contact</h4>
            <ol className="breadcrumb pull-right">
              <li><a href="#">Home</a></li>							
              <li className="active">Contact Us</li>
            </ol>
          </div>
        </div>
      </div>{/* Page Banner /- */}
      {/* Contact Us */}
      <div className="contact-us container-fluid no-padding">
        {/* Map */}
        <div className="map container-fluid no-padding">		
         
        </div>{/* Map /- */}
        <div className="section-padding" />
        <div className="container">
          <div className="section-header">
            <h3>Send Your Message</h3>
            {/* <p>Our Great Skilled Workers</p> */}
          </div>
          <form className="contact-form" onSubmit={vaidation}>
            <div className="row">
              <div className="form-group col-md-6">
                <input type="text" name="name" className="form-control" id="input_name" onChange={handleInputChange} placeholder="Your Name *" required />
              </div>
              <div className="form-group col-md-6">
                <input type="email" name="email" className="form-control" id="input_email" onChange={handleInputChange} placeholder="Your E-mail *" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" name="phone"  className="form-control" id="input_phone" maxlength="10" onChange={handleInputChange} placeholder="Phone" required />
              </div>
              <div className="form-group col-md-6">
                <input type="text" name="subject" className="form-control" id="subject" onChange={handleInputChange} placeholder="Subject" required />
              </div>
              <div className="form-group col-md-12">
                <textarea className="form-control" rows={5} name="message" id="message" onChange={handleInputChange} placeholder="Message" required />
              </div>
              <div className="form-group">
                <input type="submit" title="Send Message" defaultValue="Send Message" id="btn_submit" name="post" />
              </div>
              <div id="alert-msg" className="alert-msg" />
            </div>
          </form>
        </div>{/* Container /- */}
        <div className="section-padding" />
      </div>{/* Contact Us /- */}
    </main>
  </div>
  <Footer/>
  </>
    )
  }
  
