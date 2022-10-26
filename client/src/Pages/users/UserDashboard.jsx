import React from 'react'
import FishermanNav from '../../Components/FishermanNav'
import Footer from '../../Components/Footer'
import HomeSlier from '../../Components/HomeSlier'
import UserNav from '../../Components/UserNav'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function UserDashboard() {
  const navigate=useNavigate()
  const token=localStorage.getItem("token")
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
  }, [])
  return (
    <div>
        <UserNav/>
        <HomeSlier/>
        <Footer/>
    </div>
  )
}
