import React from 'react'
import WheatherAlert from './WeatherAlert'

export default function HomeSlier() {
  return (
    <div>
           <div className="photo-slider container-fluid no-padding">
              {/* <!-- Main Carousel --> */}
              <div id="main-carousel" className="carousel slide carousel-fade col-offset-2" data-ride="carousel">
                  <div className="carousel-inner" role="listbox">
                      <div className="item active">
                          <div className="slider-image">
                              <img width="100%"   src="assets/images/slider/slider-1.jpg" alt="slider-1"/>
                              <div className="carousel-caption">
                                  <div className="container">
                                     
                                      </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="slider-image">
                              <img width="100%"    src="assets/images/slider/slider-3.jpg" alt="slider-2"/>
                              <div className="carousel-caption">
                                  <div className="container">
                                  
                                       </div>
                              </div>
                          </div>
                      </div>
                      <div className="item">
                          <div className="slider-image">
                              <img width="100%"    src="assets/images/slider/slider-2.jpg" alt="slider-3"/>
                              <div className="carousel-caption">
                                  <div className="container">
                                      <h5>Welcome to MatsyaBhavan</h5>
                                      {/* <h3>Nothing makes a fish bigger than<span>almost being caught</span></h3>
                                      <p>You would see the biggest gift would be from me and the card attached would say thank you for being a friend and if you threw a party  invited everyone you knew</p> */}
                                      <a href="#" title="Learn More" className="btn btn-default">Learn More</a>
                                      <a href="#" title="Contact Us" className="btn btn-default bg">Contact Us</a>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <a className="left carousel-control" href="#main-carousel" role="button" data-slide="prev">
                      <i className="fa fa-angle-left"></i>
                      <span className="sr-only">Previous</span>
                  </a>
                  <a className="right carousel-control" href="#main-carousel" role="button" data-slide="next">
                      <i className="fa fa-angle-right"></i>
                      <span className="sr-only">Next</span>
                  </a>
              </div>
          </div>
          
          
          {/* <!-- Why Choose Us --> */}
          <div className="intro-section tr-border container-fluid no-padding">
              <div className="container">
                  <div className="row">
                      <div className="col-md-4 col-sm-6 col-xs-6">
                          <div className="intro-content">
                              <i><img src="assets/images/intro/choose-1.jpg" alt="choose-1"/></i>
                              <h3>ശ്രീ പിണറായി വിജയൻ</h3>
                              <p>മുഖ്യമന്ത്രി</p>
                            
                          </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6">
                          <div className="intro-content">
                              <i><img src="assets/images/intro/choose-2.jpg" alt="choose-2"/></i>
                              <h3>ശ്രീ. വി.അബ്ദുറഹിമാൻ</h3>
                              <p>മത്സ്യബന്ധന വകുപ്പ് മന്ത്രി</p>
                          </div>
                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6">
                          <div className="intro-content">
                              <i><img src="assets/images/intro/choose-3.jpg" alt="choose-3"/></i>
                              <h3>ഡോ. അദീല അബ്ദുള്ള, ഐ.എ.എസ്</h3>
                              <p>ഫിഷറീസ് ഡയറക്ടർ</p>
                              
                          </div>
                      </div>
                  </div>
              </div>
              <div className="section-padding"></div>
          </div>
      <WheatherAlert/>
    </div>
  )
}
