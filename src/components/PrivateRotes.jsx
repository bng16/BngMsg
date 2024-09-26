import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage';
import { useAuth } from '../utils/AuthContext';

function PrivateRotes() {
  const {user}=useAuth()
  return (
    <>
      {user ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}

export default PrivateRotes