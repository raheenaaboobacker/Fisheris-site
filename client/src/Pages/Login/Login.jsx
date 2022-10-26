import React, { useState } from 'react'
import Footer from '../../Components/Footer'
import Nav from '../../Components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default function Login() {
    const navigate=useNavigate();
    const [contacts,setContacts]=useState([])

    const handleInputChange=(e)=>{
        const {name,value}=e.target
        setContacts({
            ...contacts,
            [name]:value
        })
        console.log(contacts);
    }

    const validation=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/login",contacts)
        .then((response)=>{
          console.log(response);
          if(response.data.success===true){
            if(response.data.role===1){
            localStorage.setItem("name",response.data.name)
            localStorage.setItem("loginId",response.data.loginId)
            localStorage.setItem("role",response.data.role)
            localStorage.setItem("token",response.data.token)
            sessionStorage.setItem("currentloggedin",response.data.name);
            navigate("/admindashboard")
            }
            else if(response.data.role===3){
                localStorage.setItem("name",response.data.name)
                localStorage.setItem("loginId",response.data.loginId)
                localStorage.setItem("role",response.data.role)
                localStorage.setItem("token",response.data.token)
                localStorage.setItem("licence",response.data.licence)
                sessionStorage.setItem("currentloggedin",response.data.name);
                navigate("/fishermaDashboard")
                }
                else if(response.data.role===2){
                    localStorage.setItem("name",response.data.name)
                    localStorage.setItem("loginId",response.data.loginId)
                    localStorage.setItem("role",response.data.role)
                    localStorage.setItem("token",response.data.token)
                    sessionStorage.setItem("currentloggedin",response.data.name);
                    navigate("/userDashboard")
                    }
          }
        })
        .catch(err=>{
            swal(err.response.data.message)
        })
      }


  return (<>
  <Nav/>
    <div className='loginpage'>
    <div className="loginmain">

    <div className="logincontainer">
        <form onSubmit={validation} className="appointment-form" id="appointment-form">
            <h2>Login</h2>
            <div className="form-group-1">
                {/* <div className="select-list">
                    <select name="usertype" value={contacts.usertype} onChange={handleInputChange} id="course_type">
                        <option  value="">User type</option>
                        <option value="society">User</option>
                        <option value="language">Fisher man</option>
                    </select>
                </div> */}
                <input type="text" name="name" value={contacts.name} onChange={handleInputChange} id="title" placeholder="Your Name" required />
                <input type="password" name="password" value={contacts.password} onChange={handleInputChange} id="password" placeholder="Password" required />
            </div>
            <div className="form-check">
                <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                <label htmlFor="agree-term" className="label-agree-term">Don't have an account?  <a href="register" className="term-service">Click here to register </a></label>
            </div>
            <div className="form-submit">
                <input type="submit" name="submit" id="submit" className="submit" value="Login" />
            </div>
        </form>
    </div>
    </div>
</div>
<Footer/>
</>


  )
}
