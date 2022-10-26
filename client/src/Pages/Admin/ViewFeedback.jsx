import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';


export default function ViewFeedback() {
  const [user, setUser] = useState([])
  console.log(user);
  useEffect(() => {
    axios.get("http://localhost:5000/register/view-feed")
      .then(response => {
        if (response.data.success == true) {
          setUser(response.data.data)
          console.log(response.data.data);
        }
      })
  }, [])




  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <main className="app-content">
        <div className="app-title">
          <div>
            <h1><i className="fa fa-comments" /> Feedback</h1>

          </div>
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
            <li className="breadcrumb-item"><a href="#">Feedback</a></li>
          </ul>
        </div>
        {user.map(item => (
          <div className="col-lg-16" style={{ marginBottom: "10px" }}>
            <div className="bs-component">
              <div className="card">
                {/* <img style={{height: 170, width: '100%', display: 'block'}} src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" alt="Card image" /> */}
                <div className="card-body">
                  <h3 className="card-title">{item?.name}</h3>
                  <p className="card-text">Subject : {item?.subject}</p>
                  <p className="card-text">Email : {item?.email}</p>
                  <p className="card-text">Phone : {item?.phone}</p>
                  <p className="card-text">Feedback: {item?.message}</p>




                </div>
              </div>
            </div>
          </div>
        ))}

      </main>
    </div>

  )
}
