import React from 'react'

function Footer() {
  return (
   <> <footer className="footer-main container-fluid no-padding">
   {/* <!-- Container --> */}
   <div className="container">
       <div className="row">				
           {/* <!-- Footer Location Widget --> */}
           <div className="col-md-3 col-sm-6 col-xs-6">
               <aside className="ftr-widget location-widget">
                   <h3 className="widget-title"><i><img src="assets/images/ftr-location.png" alt="Location" /></i><span>Address</span></h3>
                   <p>ccsit kuttippuram</p>
               </aside>
           </div>
           {/* <!-- Footer Phone Widget --> */}
           <div className="col-md-3 col-sm-6 col-xs-6">
               <aside className="ftr-widget phone-widget">
                   <h3 className="widget-title"><i><img src="assets/images/ftr-phone.png" alt="Location" /></i><span>Call Us</span></h3>
                   <p><a href="tel:+9112345678" title="+9112345678">Mobile : +91 123 456 78</a>
                   <a href="tel:+9112345688" title="+9112345688">Toll free : +91 123 456 88</a></p>
               </aside>
           </div>
           {/* <!-- Footer Mail Widget --> */}
           <div className="col-md-3 col-sm-6 col-xs-6">
               <aside className="ftr-widget mail-widget">
                   <h3 className="widget-title"><i><img src="assets/images/ftr-email.png" alt="Location" /></i><span>email us</span></h3>
                   <p><a href="mailto:info@ourdomain.com" title="Info@OurDomain.Com" >.Com</a>
                   <a href="mailto:support@ourdomain.com" title="Support@OurDomain.Com">Support@OurDomain.Com</a></p>
               </aside>
           </div>
           {/* <!-- Footer Hours Widget --> */}
           <div className="col-md-3 col-sm-6 col-xs-6">
               <aside className="ftr-widget hours-widget">
                   <h3 className="widget-title"><i><img src="assets/images/ftr-hours.png" alt="Location" /></i><span>working hours</span></h3>
                   <p><span>Mon-Sat : 9:00 AM To 5:00 PM</span><span>Sun : 9:00 AM To 2:00 PM</span></p>
               </aside>
           </div>		
       </div>
       {/* <!-- Footer About Widget --> */}
       <aside className="col-md-8 col-sm-6 col-xs-12 ftr-widget about-widget">
           <h3 className="widget-title">we are fishing</h3>
           <p>Beats all you've ever saw been in trouble with the law since the day they was born. Believe it or not I'm walking on air. I never thought I could feel so free.</p>
       </aside>
       {/* <!-- Footer Newsleater Widget --> */}
       <aside className="col-md-4 col-sm-6 col-xs-12 ftr-widget newsleater-widget">
           <h3 className="widget-title">subscribe newsletter</h3>
           {/* <!-- Search Box --> */}
           <div className="search-box">
               <div className="input-group">
                   <input type="text" className="form-control" placeholder="Email Address"/>
                   <span className="input-group-btn">
                       <button className="btn btn-default" type="button" title="Go">Go</button>
                   </span>
               </div>
           </div>
       </aside>
       
       
       {/* <!-- Footer Bottom --> */}
       <div className="footer-bottom col-md-12 col-sm-12 col-xs-12 no-padding">
           <div className="row">
               <div className="col-md-5 col-sm-5 col-xs-6 copyright">
                   <p>&copy; Copyright 2022. All Rights Reserved</p>
               </div>
               <div className="col-md-7 col-sm-7 col-xs-6">
                   <ul>
                       <li><a href="#" title="Facebook"><i className="fa fa-facebook"></i></a></li>
                       <li><a href="#" title="Twitter"><i className="fa fa-twitter"></i></a></li>
                       <li><a href="#" title="Google Plus"><i className="fa fa-google-plus"></i></a></li>
                       <li><a href="#" title="Linked In"><i className="fa fa-linkedin"></i></a></li>
                   </ul>
               </div>
           </div>
       </div>
   </div>
</footer></>
  )
}

export default Footer