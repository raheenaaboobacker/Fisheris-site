import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer'
import HomeSlier from '../../Components/HomeSlier'

export default function FishermanDashboard() {
  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])
  
  return  (
    <div>
        <FishermanNav/>
        <HomeSlier/>
        <Footer/>
    </div>
  )
}
