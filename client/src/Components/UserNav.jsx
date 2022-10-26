import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

export default function UserNav() {
    const navigate=useNavigate()
    const [isActive, setIsActive] = useState(false);
    const [data, setData] = useState([]);
	const [lat, setLat] = useState([]);
	const [long, setLong] = useState([]);
	const [count,setCount]=useState("")

    const [token, setToken] = useState(localStorage.getItem("token"))


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


        useEffect(() => {
            fetch('http://localhost:5000/cart/viewCartItem', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
            })
                .then(res => res.json())
                .then((data) => {
                    console.log("Result========", data)
                    if (data.success == true) {
                        setCount(data.data.length)
                        console.log("lenggh====================>",data.data.length);
                        
                   }
                    
                })
        }, [])
 
        const showAlert=()=>{
            swal({
                customClass: 'sweetalert-lg',
                title: "Calamity Alert",
                text:"Sea condition will be rough during next 12 hours. So fisherman are advised not venture into sea ",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                width: '800px'
              })
        }

        const logout=()=>
        {
          localStorage.clear();
          window.sessionStorage.clear();
         navigate('/')
        }
  return (
    <><header className="header-main container-fluid no-padding">	
    {/* <!-- Top Header  --> */}
    <div className="top-header container-fluid no-padding">
        {/* <!-- Container --> */}
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-4 col-xs-6 social">
                    <ul>
                        <li><a href="#" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                        <li><a href="#" title="Google Plus"><i className="fa fa-google-plus"></i></a></li>
                        <li><a href="#" title="Linked In"><i className="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-6 add-to-cart">
                    <ul>
                        <li><a href="/cart" title="Cart"><i className="fa fa-shopping-cart"></i><span>{!count?0:count}</span></a></li>
                        {/* <li><a href="/cart" title="My Account"><i className="fa fa-user"></i></a></li> */}
                        {Math.floor(data?.wind?.speed*3.6) > 62||data?.wheather?.id===502||data?.weather?.id===503||data?.weather?.id===504||
                        data?.weather?.id===202||data?.weather?.id===232?
                        <li><a onClick={showAlert} title="My Account"><i class="fa fa-exclamation-triangle text-danger" ></i><i class="fa fa-envelope fa-5x fa-border icon-grey badge"></i></a></li>:null}
                    </ul>
                </div>
                <div className="col-md-4 col-sm-4 col-xs-12 logo-block">
                    <a href="/userDashboard" title="Logo"><img width="150px" src="assets/images/fish/fiqua.png" alt="Logo" /></a>
                </div>
                {/* <div className="col-md-4 col-sm-4 col-xs-12 logo-block">
                    <a href="/userDashboard" title="Logo"><img src="assets/images/fish/fiqua.png" alt="Logo" /></a>
                </div> */}
            </div>
        </div>
    </div>
    
    {/* <!-- Menu Block --> */}
    <div className="menu-block container-fluid no-pdding">
        {/* <!-- Container --> */}
        <div className="container">
            {/* <!-- Search Box --> */}
            <div className="search-box">
                <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search Here . . . "/>
                    <span className="input-group-btn">
                        <button className="btn btn-default" type="button"><i className="fa fa-search"></i></button>
                    </span>
                </div>
            </div>
            {/* <!-- Navigation --> */}
            <nav className="navbar ow-navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/userDashboard" title="Logo">Bovile</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                        <li className={isActive ? 'active' : ''}  ><a href="/userDashboard" title="Home">Home</a></li>
                        {/* <li   className={isActive ? 'active' : ''}><a href="/" title="About Us">About Us</a></li> */}
                        {/* <li className="dropdown">
                            <a href="#" title="Pages" className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">Pages</a>
                            <i className="ddl-switch fa fa-angle-down"></i>
                            <ul className="dropdown-menu">	
                                <li><a href="/gallery" title="Gallery">Gallery</a></li>
                                <li><a href="#" title="Pricing">Pricing</a></li>
                                <li><a href="#" title="Faq">FAQ</a></li>
                                <li><a href="#" title="404">404</a></li>
                            </ul>
                        </li> */}
                        <li><a href="/viewProducts" title="Products">Products</a></li>
                         <li><a href="/register" title="Register">Register</a></li>
                          							
                         <li><a href="/userContact" title="Contact Us">Contact Us</a></li>
                         <li><a href="/cart" title="Cart">Cart</a></li>

                         <li><a onClick={logout} title="Contact Us">Logout</a></li>
                    </ul>						
                </div>
            </nav>
        </div>
    </div>
</header></>
  )
}
