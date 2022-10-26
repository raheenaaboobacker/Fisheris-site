import React from 'react'
import './payment.css'

export default function Payment() {
  return (
    <div>
      <div>
        <button type="button" className="btn btn-primary launch" data-toggle="modal" data-target="#staticBackdrop"> <i className="fa fa-rocket" /> Pay Now
        </button>
        {/* Modal */}
        <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-right">
                                <i className="fa fa-close close" data-dismiss="modal" />
                            </div>
                            <div className="tabs mt-3">
                                
                                <div className="tab-content" id="myTabContent">
                               <div className="row">
                                    <div className="col-md-12">
                                      <div className="card p-3">
                                        <h6 className="text-uppercase">Payment details</h6>
                                        <div className="inputbox mt-3"> <input type="text" name="name" className="form-control" required="required" /> <span>Name on card</span> </div>
                                        <div className="row">
                                          <div className="col-md-6">
                                            <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <i className="fa fa-credit-card" /> <span>Card Number</span> 
                                            </div>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="d-flex flex-row">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>Expiry</span> </div>
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>CVV</span> </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="mt-4 mb-4">
                                          <h6 className="text-uppercase">Billing Address</h6>
                                          <div className="row mt-3">
                                            <div className="col-md-6">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>Street Address</span> </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>City</span> </div>
                                            </div>
                                          </div>
                                          <div className="row mt-2">
                                            <div className="col-md-6">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>State/Province</span> </div>
                                            </div>
                                            <div className="col-md-6">
                                              <div className="inputbox mt-3 mr-2"> <input type="text" name="name" className="form-control" required="required" /> <span>Zip code</span> </div>
                                            </div>
                                          </div>
                                          <button className="btn btn-success px-3">Pay $840</button>

                                        </div>
                                      </div>
                                     
                                    </div>
                                   
                                  </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>

    </div>
  )
}
