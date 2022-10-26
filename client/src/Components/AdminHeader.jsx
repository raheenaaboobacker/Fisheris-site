import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import swal from 'sweetalert'

export default function AdminHeader() {
  const navigate=useNavigate()

  const [data, setData] = useState([]);
	const [lat, setLat] = useState([]);
	const [long, setLong] = useState([]); 


  useEffect(() => {
  navigator.geolocation.getCurrentPosition(function(position) {
    setLat(position.coords.latitude);
    setLong(position.coords.longitude);
  });

  console.log("latitude",lat);
  console.log(long);
    
  axios.get("https://api.openweathermap.org/data/2.5/weather?lat=11.2445487&lon=75.7838951&appid=3ef9508ade9f84ce48b23a883f7d96c6")
  .then(result => {
    setData(result.data)
    console.log(result.data);
    console.log(data);
          // console.log(alerdata);
    
  });
  }, [lat, long])

  const logout=()=>
  {
    localStorage.clear();
    window.sessionStorage.clear();
   navigate('/')
  }
  return (
    <header className="app-header">
      <a href="/admindashboard" className="app-header__logo" title="Logo"><img style={{width:"70px"}} src="/assets/images/logo.png" alt="Logo" /></a>

     <a className="adminapp-sidebar__toggle" href="#" data-toggle="sidebar" aria-label="Hide Sidebar"></a>
      <ul className="app-nav">
       
        
        <li className="dropdown"><a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu"><i className="fa fa-user fa-lg"></i></a>
          <ul className="dropdown-menu settings-menu dropdown-menu-right">
            <li><a className="dropdown-item" onClick={logout}><i className="fa fa-sign-out fa-lg"></i> Logout</a></li>
          </ul>
        </li>
      </ul>
    </header>
  )
}
