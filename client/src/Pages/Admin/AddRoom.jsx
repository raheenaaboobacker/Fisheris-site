import React, { useState } from 'react'
import Adminform from '../../Components/Adminform'
import AdminHeader from '../../Components/AdminHeader'
import AdminSidebar from '../../Components/AdminSidebar'
import swal from 'sweetalert'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function AddRoom() {
  const navigate=useNavigate()
  const [file,setFile]=useState("")
  const [rooms, setRooms] = useState({
    name: '',
    place: '',
    no_of_person: '',
    amount: '',
    mobile: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRooms({
      ...rooms,
      [name]: value
    })
    console.log(rooms);
  }

  const addRoom = (e) => {
    e.preventDefault()
    console.log(rooms);
    if(file){
      const data=new FormData();
      const filename=file.name
      data.append("name",filename)
      data.append("file",file)
      axios.post("http://localhost:5000/admin/upload",data)
      .then((response)=>{
          console.log(response)
      })
  }
    axios.post("http://localhost:5000/admin/add-rooms", rooms)
      .then((result) => {
        console.log(result.data);
        if (result.data.success == true) {
          swal(result.data.message)
          navigate('/admindashboard')
        }

      })

  }

  return (
    <div className="app sidebar-mini">
      <AdminHeader />
      <div className="adminapp-sidebar__overlay" data-toggle="sidebar"></div>
      <AdminSidebar />
      <main className="app-content">
        <div className="app-title">
          <div>
            <h1><i className="fa fa-edit"></i> Add Room</h1>
            <p>Add Room</p>
          </div>
          <ul className="app-breadcrumb breadcrumb">
            <li className="breadcrumb-item"><i className="fa fa-home fa-lg"></i></li>
            <li className="breadcrumb-item">Rooms</li>
            {/* <li className="breadcrumb-item"><a href="#">Form Components</a></li> */}
          </ul>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="tile">
              <div className="row">
                <div className="col-lg-7 offset-lg-2">
                  <form onSubmit={addRoom}>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Room Name</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Enter Room Name Here" name="name" value={rooms.name} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Accomodating persons</label>
                      <input className="form-control" id="exampleInputText" type="number" placeholder="Accomodating persons" name="no_of_person" value={rooms.no_of_person} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Place</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Palce" name="place" value={rooms.place} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Contact number</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Contact number" name="mobile" value={rooms.mobile} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputPassword1">Amount</label>
                      <input className="form-control" id="exampleInputText" type="text" placeholder="Amount" name="amount" value={rooms.amount} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                  <label for="exampleInputPassword1">image</label>
                  <input  id="exampleInputText" type="file" placeholder="room image" name="image"  
                  required  onChange={(e)=>{setFile(e.target.files[0]); setRooms({...rooms,image:e.target.files[0].name})}} />
                </div>
                    <div className="form-submit">
                      <input type="submit" style={{ width: "200px" }} name="submit" id="submit" className="submit" value="Add" />
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
