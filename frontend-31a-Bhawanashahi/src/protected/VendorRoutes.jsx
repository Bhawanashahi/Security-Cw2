import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const VendorRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
  return user != null 
  && user.isVendor ? 
  <Outlet/> 
  : navigate('/login')

 


}

export default VendorRoutes