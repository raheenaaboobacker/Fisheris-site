import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import axios from 'axios';
import swal from 'sweetalert';


export default function ManageInsurance() {
    const [user, setUser] = useState([])
    const [message, setMessage] = useState([])
    console.log(user);
    useEffect(() => {
        axios.get("http://localhost:5000/admin/view-insurance")
            .then(response => {
                if (response.data.success == true) {
                    setUser(response.data.data)
                    console.log(response.data.data);
                }
            })
    }, [])

    const approve = (id) => {
        console.log(id);
        axios.post(`http://localhost:5000/admin/approve-insurance/${id}`)
            .then(response => {
                if (response.data.success == true) {
                    swal(response.data.message)
                    setMessage(response.data.message)
                    window.location.reload(false);
                }
            })
    }
    const reject = (id) => {
        console.log(id);
        axios.post(`http://localhost:5000/admin/reject-insurance/${id}`)
            .then(response => {
                if (response.data.success == true) {
                    swal(response.data.message)
                    setMessage(response.data.message)
                    window.location.reload(false);
                }
            })
    }


    return (
        <div>
            <AdminHeader />
            <AdminSidebar />
            <main className="app-content">
                <div className="app-title">
                    <div>
                        <h1><i className="fa fa-dashboard" /> Manage Insurance</h1>

                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item"><i className="fa fa-home fa-lg" /></li>
                        <li className="breadcrumb-item"><a href="#">Insurance</a></li>
                    </ul>
                </div>
                {user.map(item => (
                    <div className="col-lg-6" style={{ marginBottom: "10px" }}>
                        <div className="bs-component">
                            <div className="card">
                                {/* <img style={{height: 170, width: '100%', display: 'block'}} src="https://www.kindpng.com/picc/m/269-2697881_computer-icons-user-clip-art-transparent-png-icon.png" alt="Card image" /> */}
                                <div className="card-body" style={{ textAlign: "center" }}>
                                    <h3 className="card-title">Name : {item?.logindetails?.name}</h3>
                                    <p className="card-text">Request for : {item?.type}</p>
                                    <p className="card-text">Licence Number : {item?.registerdetails?.license}</p>
                                    <p className="card-text">Monthly Income : {item?.registerdetails?.monthlyinc}</p>
                                    <p className="card-text">Phone Number: {item?.registerdetails?.mobile}</p>
                                    <p className="card-text">Email: {item?.registerdetails?.email}</p>
                                    <p className="card-text">Location: {item?.registerdetails?.location}</p>
                                    {item?.status == 0 ?<>
                                        <input type="submit" style={{ width: "150px", marginTop: "30px",marginLeft:"200px" }} onClick={() => approve(item._id)} className="submit" value="Approve" />
                                        <input type="submit" style={{ backgroundColor:"red", width: "150px", marginTop: "30px",marginLeft:"200px" }} className="submit" onClick={() => reject(item._id)} value="Reject" /></>
                                        : item?.status == 1 ?
                                          <input type="submit" style={{ backgroundColor:"red", width: "150px", marginTop: "30px",marginLeft:"200px" }} className="submit" onClick={() => reject(item._id)} value="Reject" />
                                        :
                                        <input type="submit" style={{ backgroundColor:"red", width: "150px", marginTop: "30px",marginLeft:"200px" }} onClick={() => approve(item._id)} className="submit" value="Rejected" disabled/>}
                                    

                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </main>
        </div>

    )
}
