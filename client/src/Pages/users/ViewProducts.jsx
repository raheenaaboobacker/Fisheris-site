import React,{useEffect,useState} from 'react'
import Footer from '../../Components/Footer'
import UserNav from '../../Components/UserNav'
import axios from 'axios'
import swal from'sweetalert'
import { useNavigate } from 'react-router-dom'

export default function ViewProducts() {
    const navigate=useNavigate()
    const [data,setData]=useState([])
    const [token,setToken]=useState(localStorage.getItem("token"))
  
    useEffect(() => {
      if(!token){
        navigate("/login")
      }
    }, [])
    
    useEffect(() => {
		axios.get("http://localhost:5000/products/view-products")
		.then((response)=>{
		   if (response.data.success == true) {
			   console.log(response.data.data);
			   
			   setData(response.data.data)
			   console.log(data);
			 }
		   })
		   .catch((error) => {
			 console.log(error);
   
		   });
	   }, [])
 

       const addToCart=(id,price)=>{
		console.log(id);
		console.log(price);
		const cdata={
			p_id:id,
			price:price,
            qty:1
		}
		
		fetch('http://localhost:5000/cart/addCartItem', {
        method: 'POST',
        body: JSON.stringify(cdata),
        headers: {
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+token
        },
    })
    .then(res => res.json())
    .then((data) => {
        console.log("Result========",data)
        if(data.success==true)
        {
          
            swal(data.message)
            
            navigate('/cart')
        }else{
			const el = document.createElement('div')
            el.innerHTML = " <a href='/login'>login here</a>"

            swal({
				title:data.message,
				content: el,
			  })
        }
 })
	

	}
  return (
    <div>
        <UserNav/>
        <div className="container-fluid no-padding product-section">
              {/* <!-- Container -->	 */}
              <div className="container">
                  <div className="section-padding"></div>
                  {/* <!-- Section Header --> */}
                  <div className="section-header">
                      <h3>Fishing products from our shop</h3>
                      <p>Explore Our Latest Products For Your Fine Fishing</p>
                  </div>
                  <div className="row">
                      {/* <!-- Product Carousel --> */}
                      <div >
                        {data&&data.map(item=>(
                            <div className="col-md-3">
                                
                            <div className="product-block">
                                 <div className="product-img-box">
                                    <img style={{width:"500px",height:"160px"}} src={`./upload/${item?.image}`} alt="product1"/></div>
                                <div className="product-info">
                                    <h4>{item.pname}</h4>
                                    <p>{item.desc}</p>
                                    <h4>{item.pprice} ₹</h4>
                                </div>
                                <div className="product-hoverinfo">
                                    <span>{item.pprice} ₹</span>
                                    <a onClick={()=>{addToCart(item._id,item.pprice)}} title="Add to cart"> Add to cart </a>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                            </div>
                        ))}
                         
                         
                      </div>
                  </div>
                  {/* <a href="#" title="View All Products">View all products</a> */}
                  <div className="section-padding"></div>
              </div>
          </div>
          <Footer/>
    </div>
  )
}
