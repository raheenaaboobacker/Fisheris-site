import React, { useEffect, useState } from 'react'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'
import axios from 'axios'

export default function AddVessals() {
    const navigate = useNavigate()
    const [item, setItem] = useState({});
    const [file, setFile] = useState([" "])
    const id = useParams()
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setItem({
            ...item,
            [name]: value
        })
        console.log(item);
    }

    const addItem = (e) => {
        e.preventDefault()
        console.log(item);
        axios.post("http://localhost:5000/vessels/update-vessels", item)
            .then((result) => {
                console.log(result.data);
                if (result.data.success == true) {
                    swal(result.data.message)
                    // navigate('/admindashboard')
                    window.location.reload(false);
                }

            })

    }
    useEffect(() => {
        const aid = id.id
        axios.get(`http://localhost:5000/vessels/view-vessels/${aid}`)
            .then(response => {
                console.log(response);
                if (response.data.success == true) {
                    setItem(response.data.data[0])
                    console.log(response.data.data[0]);
                }
            })
    }, []);
    return (
        <div className="app sidebar-mini">
            <AdminHeader />
            <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
            <AdminSidebar />
            <main className="app-content">
                <div className="app-title">
                    <div>
                        <h1><i className="fa fa-edit"></i> Edit Vessel</h1>
                        {/* <p>Add Room</p> */}
                    </div>
                    <ul className="app-breadcrumb breadcrumb">
                        <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
                        <li className="breadcrumb-item">Vessels</li>
                        <li className="breadcrumb-item"><a href="#">Edit Vessel</a></li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="tile">
                            <div className="row">
                                <div className="col-lg-7 offset-lg-2">
                                    <form onSubmit={addItem}>
                                        <div className="form-group">
                                            <label for="exampleInputEmail1">Vessel Name</label>
                                            <input className="form-control" id="exampleInputText" type="text" placeholder="Vessel Name" name="vname" value={item.vname} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Description</label>
                                            <input className="form-control" id="exampleInputText" type="text" placeholder="Description" name="desc" value={item.desc} onChange={handleInputChange} required />
                                            {/* <input className="form-control" id="exampleInputText" type="text" placeholder="Description" name="_id" value={item._id} onChange={handleInputChange} required /> */}
                                        </div>
                                        <div className="form-group">
                                            <label for="exampleInputPassword1">Price Of Vessal</label>
                                            <input className="form-control" id="exampleInputText" type="number" placeholder="price" name="vprice" value={item.vprice} onChange={handleInputChange} />
                                        </div>

                                        <div className="form-submit">
                                            <input type="submit" style={{ width: "200px" }} name="submit" id="submit" className="submit" value="Update" />
                                        </div>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
