import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserNav from '../../Components/UserNav';
import Footer from '../../Components/Footer';

export default function Cart() {
    const navigate=useNavigate();
    const [paymentdata,setPaymentdata]=useState({})
    const [message, setMessage] = useState(true)
    const [cartdata, setCartdata] = useState([])
    const [total,setTotal]=useState([])
    const [token, setToken] = useState(localStorage.getItem("token"))

    useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])
  
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
                    if(data.data.length>0){
                    setCartdata(data.data)
                    console.log(cartdata);
                    const newTotal = cartdata.reduce((total, cartItem) => {
                        return total + cartItem.qty * cartItem.price;
                      }, 0);
                      setTotal(newTotal);
                      console.log(total);
                    }
               }
                
            })
    }, [message])
   

    const deleteItem=(pid)=>{
        let id=pid;
        console.log(id);
        fetch(`http://localhost:5000/cart/deletecartitem/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log("Result========", data)
                if (data.success == true) {
                    swal(data.message)
                    setMessage(!message)
                  window.location.reload()
                }
                else {

                    swal(data.message)
                }
            })
    }

    const handleInputChange=(e)=>{
      const {name,value}=e.target
      setPaymentdata({
          ...paymentdata,
          [name]:value
      })
      console.log(paymentdata);
  }


const submitForm=(e)=>{
  console.log("hai");
  e.preventDefault();
  
  
    fetch("http://localhost:5000/order/orderbook", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log("Result========", data)
        if (data.success == true) {

          alert(data.message)
          window.location.reload(false);        }
        else {

          alert(data.message)
          window.location.reload(false);
        }
      })
  
}


  return (
    <div>
        <UserNav/>
       <section className="ftco-section">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-6 text-center mb-4">
        <h2 className="heading-section">Cart</h2>
      </div>
    </div>
    <div className="row">
      <div className="col-md-12">
        <div className="table-wrap">
          <table className="table">
            <thead className="thead-primary">
              <tr>
                <th>&nbsp;</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
            {cartdata && cartdata.map((data, i) => (
                
              <tr className="alert" role="alert">
              
              <td>
                <img className="img" src={`./upload/${data?.cartData?.image}`} />
              </td>
              <td>
                <div className="email">
                  <span>{data?.cartData?.pname} </span>
                  <span>{data?.cartData?.desc}</span>
                </div>
              </td>
              <td>₹ {data?.cartData?.pprice}</td>
              <td className="quantity">
                <div className="input-group">
                  <input type="text" name="quantity" className="quantity form-control input-number" value="1"  disabled />
                </div>
              </td>
            
              <td>
                <button type="button" className="close" onClick={()=>{deleteItem(data._id)}}>
                  <span aria-hidden="true"><i className="fa fa-close" /></span>
                </button>
                
              </td>
            </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      </div>
      <button style={{width:"100px",height:"50px"}} type="button" className="btn btn-primary launch" data-toggle="modal" data-target="#staticBackdrop">
      ₹ {cartdata?.reduce((total, cartItem) => total + cartItem.qty * cartItem.price , 0)} Pay Now
        </button>
    </div>
    
  </div>
</section>
<div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="text-right">
                                <i className="fa fa-close close" data-dismiss="modal" />
                            </div>
                            <div className="tabs mt-3">
                                
                                <div className="tab-content" id="myTabContent">
                                <form onSubmit={submitForm}>
                               <div className="row">
                                    <div className="col-md-12">
                                      <div className="card p-3">
                                        <h6 className="text-uppercase">Payment details</h6>
                                        <div className="inputbox mt-3">
                                           <input type="text"  className="form-control" required name="name"
                                        onChange={handleInputChange} value={paymentdata.name}/> <span>Name on card</span>
                                         </div>
                                          <div className="inputbox mt-3">
                                          <input type="text"  className="form-control" required 
                                            name="c_no"
                                            onChange={handleInputChange} value={paymentdata.c_no}/> <i className="fa fa-credit-card" /> <span>Card Number</span> 
                                         </div> 
                                         <div className="inputbox mt-3">
                                         <input type="text"  className="form-control" required name="exp_date"
                                        onChange={handleInputChange} value={paymentdata.exp_date} /> <span>Expiry</span>
                                         </div>
                                         <div className="inputbox mt-3">
                                         <input type="text"  className="form-control" required name="cvv"
                                        onChange={handleInputChange} value={paymentdata.cvv} /> <span>CVV</span>
                                         </div>


                                        </div>
                                      </div>
                                      <br/>
                                      
                                      <button type='submit' style={{width:"200px",height:"50px"}} className="btn btn-warning px-3" >₹ {cartdata?.reduce((total, cartItem) => total + cartItem.qty * cartItem.price , 0)}</button>

                                   
                                   
                                  </div>
                                  </form>

                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
    </div>
  )
}
