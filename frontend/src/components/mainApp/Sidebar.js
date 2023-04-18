import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="navbar bg-body-tertiary positon-static px-5 shadow shadow-md" >
    <div className="container-fluid">
      <Link className="navbar-brand text-uppercase text-teal" to="#">
        Campus Network
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-uppercase text-teal" id="offcanvasNavbarLabel">
      Canpus Network
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 text-teal">
            <li className="nav-item">
              <Link className="nav-link text-teal  " aria-current="page" to="/">
              <i class="fa fa-home mx-1"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-teal" to="/">
              <i class="fa fa-flag mx-1"></i>  Notices
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-teal" to="/">
              <i class="fa fa-book mx-1"></i>   Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-teal" to="/community">
              <i class="fa fa-users mx-1"></i> Community
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-teal" to="/">
              <i class="fa fa-sign-out mx-1"></i> Logout
              </Link>
            </li>
          
          </ul>
        
        </div>
      </div>
    </div>
  </nav>
  
  )
}

export default Sidebar
