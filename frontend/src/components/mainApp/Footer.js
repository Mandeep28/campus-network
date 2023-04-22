import React from 'react'

const Footer = () => {
  return (
    <>
    {/* Footer */}
    <footer className="text-center text-lg-start bg-white text-muted ">
      {/* Section: Social media */}
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom ">
        {/* Left */}
        <div className="me-5 d-none d-lg-block text-teal">
          <span>Get connected with us on social networks:</span>
        </div>
        {/* Left */}
        {/* Right */}
        <div>
          <a href="https://facebook.com" className="me-4 text-teal text-decoration-none">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://twitter.com" className="me-4 text-teal text-decoration-none">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://google.com" className="me-4 text-teal text-decoration-none">
            <i className="fab fa-google" />
          </a>
          <a href="https://instagram.com" className="me-4 text-teal text-decoration-none">
            <i className="fab fa-instagram" />
          </a>
          <a href="https://linkedin.com" className="me-4 text-teal text-decoration-none" >
            <i className="fab fa-linkedin"  />
          </a>
          <a href="https://github.com/mandeep28" className="me-4 text-teal text-decoration-none">
            <i className="fab fa-github" />
          </a>
        </div>
        {/* Right */}
      </section>
      {/* Section: Social media */}
      {/* Section: Links  */}
      <section className="">
        <div className="container text-center text-md-start mt-5">
          {/* Grid row */}
          <div className="row mt-3">
            {/* Grid column */}
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              {/* Content */}
              <h6 className="text-uppercase fw-bold mb-4 text-teal">
                <i className="fas fa-globe me-3 " />
                Campus Network
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4 text-teal">Useful links</h6>
              <p>
                <a href="#!" className="text-decoration-none text-dark">
                  Community
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-dark">
                  Notices
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-dark">
                  Notes
                </a>
              </p>
              <p>
                <a href="#!" className="text-decoration-none text-dark">
                  Contact Us
                </a>
              </p>
            </div>
            {/* Grid column */}
            {/* Grid column */}
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              {/* Links */}
              <h6 className="text-uppercase fw-bold mb-4 text-teal">Contact</h6>
              <p>
                <i className="fas fa-home me-3 text-teal" /> Amritsar , Punjab.
              </p>
              <p >
                <i className="fas fa-envelope me-3 text-teal" />
                info@campusnetwork.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-teal" /> +91 12345-12345
              </p>
              <p>
                <i className="fas fa-print me-3 text-teal" /> +91 12345-12345
              </p>
            </div>
            {/* Grid column */}
          </div>
          {/* Grid row */}
        </div>
      </section>
      {/* Section: Links  */}
      {/* Copyright */}
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
        
      >
        © 2023 Copyright:
        <a className="text-decoration-none text-teal fw-bold" href="/">
          campusnetwork.com
        </a>
      </div>
      {/* Copyright */}
    </footer>
    {/* Footer */}
  </>
  
  )
}

export default Footer
