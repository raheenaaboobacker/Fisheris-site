import React, { useEffect } from 'react'
import { useState } from 'react'
import "./Login/Login.css"
import axios from 'axios'
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav'
import Footer from '../Components/Footer'

function Register() {
    const navigate=useNavigate();
    const [contacts,setContacts]=useState({
        name:"",
        email:"",
        mobile:"",
        address:"",
        role:"2",
        password:"",
        repassword:"",
        location:"" , 
        license:"",
        monthlyinc:""

    })

    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);


    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setContacts({
            ...contacts,
            [name]:value
        })
        console.log(contacts);
    }
    useEffect(() => {
      console.log(formErrors);
      if (Object.keys(formErrors).length === 0 && isSubmit) {
        console.log(contacts);
      }
    }, [formErrors]);
    const validate = (values) => {
      const errors = {};
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      var phoneno = /^[6-9]\d{9}$/;
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
       
      if (!values.role) {
        errors.role = "User Type is required!";
      }
      if (!values.name) {
        errors.name = "User Name is required!";
      }
      if (!values.email) {
        errors.email = "Email is required!";
      } 
      if (!values.mobile) {
        errors.mobile = "Contact Number is required!";
      }else if(!phoneno.test(values.mobile)){
        errors.mobile = "Enter valid Contact Number !";
      }
      if (!values.address) {
        errors.address = "Address is required!";
      }
      if(values.role===3)
      {
        if(!values.location){
        errors.location = "Location is required!";
        }
        if(!values.license){
        errors.license = "License is required!";
        }
        if(!values.monthlyinc){
        errors.monthlyinc = "Monthly Income is required!";
        }
     }
      if (!values.address) {
        errors.address = "Address is required!";
      }
      if (!values.email) {
        errors.email = "email is required!";
      }
       else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      if (!values.repassword) {
        errors.repassword = "Confirmation Password is required";
      }
       else if (!strongPassword.test(values.password)){
        errors.password = "Password must contain alphabet, digit,special Charecters";
      }
      if(values.password!==values.repassword){
        errors.repassword = "Enter same password";
      }
      return errors;
    };

    const vaidation=(e)=>{
        e.preventDefault();
        setFormErrors(validate(contacts));
        setIsSubmit(true);
        if(Object.keys(formErrors).length === 0 && isSubmit){
        console.log(contacts);
        axios.post("http://localhost:5000/register/user-register",contacts)
      .then((response) => {
          console.log("Result========",response)
          if(response.data.success==true)
          {
            
            swal(response.data.message);
            navigate('/login')
          }
          else{
              swal(response.data.message);
          }
   }).catch((err)=>{
    swal(err.response.data.message);
   })
  
  
      }
    }
  return (<>
    <Nav/>
    <div className='loginpage'>
    <div className="loginmain">

    <div className="logincontainer">
        <form onSubmit={vaidation} className="appointment-form" id="appointment-form">
            <h2>Register Here</h2>
            <div className="form-group-1">
                
                <div className="select-list">
                    <select  name="role" value="2" onChange={handleInputChange} id="course_type" hidden>
                        <option slected value="">User type</option>
                        <option value="2">User</option>
                        
                    </select>
                </div>
                <span className='errormsg'>{formErrors.role}</span>

                <input type="text" name="name" value={contacts.name} onChange={handleInputChange} id="title" placeholder="Your Name"  />
                <span className='errormsg'>{formErrors.name}</span>
                <input type="email" name="email" value={contacts.email} onChange={handleInputChange} id="name" placeholder="Your Email"  />
                <span className='errormsg'>{formErrors.email}</span>

                <input type="number" name="mobile" value={contacts.mobile} onChange={handleInputChange} id="email" placeholder="Phone Number"  />
                <span className='errormsg'>{formErrors.mobile}</span>

                <textarea type="text" name="address" value={contacts.address} onChange={handleInputChange} id="phone_number" placeholder="Address"  />
                <span className='errormsg'>{formErrors.address}</span>
                {contacts.role==3?<>
                <input type="text" name="location" value={contacts.location} onChange={handleInputChange} id="location" placeholder="Your Location"  />
                <span className='errormsg'>{formErrors.location}</span>

                <input type="text" name="license" value={contacts.license} onChange={handleInputChange} id="license" placeholder="Your License"  />
                <span className='errormsg'>{formErrors.license}</span>

                <input type="number" name="monthlyinc" value={contacts.monthlyinc} onChange={handleInputChange} id="monthlyinc" placeholder="Monthly Income"  />
                <span className='errormsg'>{formErrors.monthlyinc}</span>
                </>:null}
                <input type="password" name="password" value={contacts.password} onChange={handleInputChange} id="password" placeholder="Password"  />
                <span className='errormsg'>{formErrors.password}</span>

                <input type="password" name="repassword" value={contacts.repassword} onChange={handleInputChange} id="pawwsord" placeholder="Repeat Password"  />
                <span className='errormsg'>{formErrors.repassword}</span>

            </div>
            <div className="form-check">
                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                <label htmlFor="agree-term" className="label-agree-term"> Already have an account?   <a href="/login" className="term-service"> Click here to sign in</a></label>
            </div>
            <div className="form-submit">
                <input type="submit" style={{width:"200px"}} name="submit" id="submit" className="submit" value="Register" />
            </div>
           <p> Already have an account? Click here to sign in</p>
        </form>
    </div>
    </div>
</div>
<Footer/>
</>
  )
}

export default Register