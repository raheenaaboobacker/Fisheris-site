import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Button } from 'semantic-ui-react';
import { Dimmer, Loader} from 'semantic-ui-react'
import moment from 'moment'
import './weatheralert.css'

export default function WheatherAlert() {
	var dateObj = new Date();
	var month = dateObj.getUTCMonth() + 1;
	var day = dateObj.getUTCDate();
	var year = dateObj.getUTCFullYear();
	if(month<10){
		var currentdate = year + "-0" + month + "-" + day;
	}else if(day<10){
		var currentdate = year+ "-" + month + "-0" + day;
	}
	else{
		var currentdate = year+ "-" + month + "-" + day;
	}
	
	const [lat, setLat] = useState([]);
	const [long, setLong] = useState([]);
	const [data, setData] = useState([]);
    const [troll,setTroll]=useState([])
    useEffect(() => {
		
		navigator.geolocation.getCurrentPosition(function(position) {
			setLat(position.coords.latitude);
			setLong(position.coords.longitude);
		});
	
		console.log("latitude",lat);
		console.log(long);
			
		axios.get("https://api.openweathermap.org/data/2.5/weather?lat=10.8423&lon=76.0299&appid=3ef9508ade9f84ce48b23a883f7d96c6")
		.then(result => {
			setData(result.data)
			console.log(result.data);
			console.log(data);
		});

		axios.get("http://localhost:5000/admin/view-trollalert")
		.then((response)=>{
		   if (response.data.success == true) {
			   console.log("troll alert",response.data.data);
			 
				console.log(currentdate);
				setTroll(response.data.data.filter((item) =>  currentdate>= item.start_date && currentdate<=  item.end_date))
			//    setData(response.data.data)
			   console.log("folter date",troll);
			 }
		   })
		   .catch((error) => {
			 console.log(error);
   
		   });
		}, [lat, long])


	const refresh = () => {
		window.location.reload();
	  }



    
  return (
	<>
	
    <main className="site-main page-spacing" id='weatheralert'>
		<div className="page-banner faq-banner container-fluid no-padding">
			<div className="page-banner-content">
				<div className="container">
					<h3>ജാഗ്രതാനിർദേശം</h3>
					<p>കാലാവസ്ഥ,പ്രകൃതിക്ഷോപo,ട്രോളിങ് നിരോധനം</p>
				</div>
			</div>
		</div>
		<div id="whychooseus" className="container-fluid no-padding whychoose-section">
	<div className="section-padding">
	{Math.floor(data?.wind?.speed*3.6) < 62||data?.wheather?.id===502||data?.weather?.id===503||data?.weather?.id===504||
	data?.weather?.id===202||data?.weather?.id===232?
	<marquee style={{color:"#f51105",fontSize:"25px"}} className=" marquee" >Sea condition will be rough during next 12 hours. So fisherman are advised not venture into sea </marquee>:null}
	{troll&&troll.map(item=>(<marquee style={{color:"#f51105",fontSize:"25px"}} className=" marquee" >{item.message}{console.log("dxfcgvhbjn",item.message)};</marquee>))}

	</div>
	<div className="container">
	 {(typeof data.main != 'undefined') ? (
		<>
		 {/* <div className="weathermain">
		<div className="wtop">
		<p className="wheader">{data?.name}</p>
        <button className="btn btn-primary"  color='blue'  onClick={refresh} >
			<i class="fa fa-refresh" aria-hidden="true"></i>
		</button>
      </div>
	  <div className="wflex">
        <p className="wday">{moment().format('dddd')}</p>
		<p className="wday">wind:{Math.floor(data?.wind?.speed*3.6)} km/hr</p>
		<span> <img src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`} alt="WeatherImage" /><p className="wdescription">{data?.weather[0]?.main}</p></span>
      </div>
	  <div className="wflex">
        <p className="wtemp">Temprature: {Math.floor(data?.main?.temp-273.15)} &deg;C</p>
        <p className="wtemp">Humidity: {data?.main?.humidity} %</p>
      </div>
	  <div className="wflex">
        <p className="wsunrise-sunset">Sunrise: {new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-IN')}</p>
        <p className="wsunrise-sunset">Sunset: {new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-IN')}</p>
      </div>
  </div> */}
  <section className="vh-100" style={{backgroundColor: '#f5f6f7'}}>
  <div className="container py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-10 col-lg-8 col-xl-9">
        <div className="card bg-dark text-white" style={{borderRadius: 40}}>
          <div className="bg-image" style={{borderRadius: 35}}>
            <img src="https://images.unsplash.com/photo-1468581264429-2548ef9eb732?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2VhfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" className="card-img" alt="weather" />
            <div className="mask" style={{backgroundColor: 'rgba(190, 216, 232, .5)'}} />
          </div>
		  
		  <div className='row'>
		  <div className="col card-img-overlay text-dark p-5">
            <h2 className="mb-0">{data?.name}</h2>
			<h4 className="mb-0">{moment().format('dddd')}</h4>
            <p className="display-2 my-3">{Math.floor(data?.main?.temp-273.15)} &deg;C</p>
			<p className="mb-2">Sun Rise: <strong>{new Date(data?.sys?.sunrise * 1000).toLocaleTimeString('en-IN')}</strong></p>
            <p className="mb-2">Sun Set: <strong>{new Date(data?.sys?.sunset * 1000).toLocaleTimeString('en-IN')}</strong></p>
            <p className="mb-2">Humidity: <strong>{data?.main?.humidity} %</strong></p>
			<p>wind:<strong>{Math.floor(data?.wind?.speed*3.6)} km/hr</strong></p>

		    <h5><img src={`http://openweathermap.org/img/wn/${data?.weather[0]?.icon}.png`} alt="WeatherImage" />{data?.weather[0]?.main}</h5>
          </div>
		  </div>
       
        </div>
      </div>
    </div>
  </div>
</section>
		</>
	 ):(
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
       </div>
     )}
	 </div>
  </div>
	</main>


	</>
  )
}
