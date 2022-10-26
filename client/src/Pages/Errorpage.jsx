import React from 'react'
import Footer from '../Components/Footer';
import Nav from '../Components/Nav';
import { Link, useNavigate } from 'react-router-dom';

export default function Errorpage() {
    const navigate=useNavigate()
  return (
  <>
  <Nav/>
    <main classname="site-main page-spacing">
    <div classname="page-banner error-banner container-fluid no-padding">
        <div classname="page-banner-content">
            <div classname="container">
                <h3>Page Not Found</h3>
                <p>You wanna be where you can see our troubles are all the same you wanna be where everybody knows Your name days are all share them with me oh baby are the voyages of the Starship Enterprise</p>
            </div>
        </div>
        <div classname="banner-content container-fluid no-padding">
            <div classname="container">
                <h4 classname="pull-left">404 - Error</h4>
                <ol classname="breadcrumb pull-right">
                    <li><a href="#">Home</a></li>							
                    <li><a href="#">Pages</a></li>							
                    <li classname="active">404</li>
                </ol>
            </div>
        </div>
    </div>
    <div classname="error-page container-fluid no-padding">
        <div classname="container">
            <div classname="section-padding"></div>
            <div classname="error-code">
                <img src="assets/images/icon/404-ic.png" alt="404-ic" />
                <h5>4<span>0</span>4</h5>
                <h3><span>Sorry,</span> The Page You are searching was not found</h3>
            </div>
            
            <div classname="error-page-content">
            <Link to="/"><a  classname="btn btn-default" title="Go to Home">Go To Home</a></Link> 
                <a onClick={()=>{ window.history.back()}}  classname="btn btn-default bg" title="Previous Page">Previous Page</a>
            </div>
        </div>
        <div classname="section-padding"></div>
    </div>
</main>
<Footer/>
</>
  )
}
