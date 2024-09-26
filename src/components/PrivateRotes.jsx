import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage';

function PrivateRotes() {
  const user=true;
  return (
    <>
      {user ? <Outlet/> : <Navigate to='/login'/>}
    </>
  )
}

export default PrivateRotes