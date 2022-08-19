import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'

export const Navigation = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-wrap'>
        <Link className='nav-link' to={'/'}>
          Home
        </Link>

        <Link to={'/login'} className='nav-link'>
          Login
        </Link>

        <Link to={'/register'} className='nav-link'>
          Register
        </Link>

        <Link to={'/'} className='nav-link'>
          Task
        </Link>
      </div>
    </nav>
  )
}
