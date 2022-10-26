import React from 'react'
import Footer from '../Components/Footer'
import Nav from '../Components/Nav'

export default function Gallery() {
  return (
    <div>
        <Nav/>
        <main className="site-main page-spacing">
  {/* Page Banner */}
  <div className="page-banner gallery-banner container-fluid no-padding">
    <div className="page-banner-content">
      <div className="container">
        <h3>വികസനപദ്ധതികൾ</h3>
        <p>   .വിദ്യാഭ്യാസം, ആരോഗ്യം സോഷ്യല്‍ സ്റ്റാറ്റസ് സാമ്പത്തിക പുരോഗതി എന്നീ മേഖലകളിലെ സമഗ്രവികസനമാണ് മത്സ്യത്തൊഴിലാളി വികസനം എന്നതിലൂടെ ലക്ഷ്യമിടുന്നത്. </p>
      </div>
    </div>
    <div className="banner-content container-fluid no-padding">
      <div className="container">
        <h4 className="pull-left">schemes</h4>
        <ol className="breadcrumb pull-right">
          <li><a href="#">Home</a></li>
          <li><a href="#">Pages</a></li>
          <li className="active">schemes</li>
        </ol>
      </div>
    </div>
  </div>{/* Page Banner /- */}
  {/* Gallery */}
  <div className="gallery container-fluid no-padding">
    <div className="section-padding" />
    {/* Container */}
    <div className="container">
      {/* Section Header */}
      <div className="section-header">
        <h3></h3>
        <p>പദ്ധതികൾ</p>
      </div>{/* Section Header /- */}
      <div className="row">
        <div className="col-md-4 col-sm-6 col-xs-6">
          <div className="gallery-box">
            <img height="300px" src="assets/images/gallery/gallery-2.jpg" alt="gallery-1" />
            <div className="gallery-box-hover">
              <h5>Insurance Scheme For Fishermen</h5>
              <p> the  insurance scheme is implemented at a premium of 50 per person and other scheme is for fishermen against accidental death, heart attach (while fishing at sea), missing, permanent and partial disability the compensation for death/missing/total disability is Rs 1 lakh and for partial disability is Rs 50,000 the annual insurance premium is shared equally by the central and state governments</p>
              <a href="#test-modal-1" title="search" />            
            </div>
            <div>
               <b>Insurance scheme for fisherman</b> 
              </div>

          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-6">
          <div className="gallery-box">
            <img height="300px" src="assets/images/gallery/gallery-4.jpg" alt="gallery-2" />
            <div className="gallery-box-hover">
              <h5 >rehabilitation</h5>
              <p>The programme is meant for rehabilitating fishermen families residing within 50m from the High Tide Line to safer dwelling places in the coastal area</p>
              <a href="#test-modal-2" title="search" />
            </div>
            <div>
               <b>Rehabilitation</b> 
              </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-6">
          <div className="gallery-box">
            <img src="assets/images/gallery/gallery-3.jpg" alt="gallery-3" />
            <div className="gallery-box-hover">
              <h5>vessel registration</h5>
              <p>Application for the registration of the fishing craft or vessel</p>
              <a href="#test-modal-3" title="search" />
            </div>
            <div>
               <b>vessel registration</b> 
              </div>
          </div>
          
        </div>
      </div>
   
    </div>{/* Container / */}
   
  </div>{/* Gallery / */}
</main>
<Footer/>
    </div>
  )
}
