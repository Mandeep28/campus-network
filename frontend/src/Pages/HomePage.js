import React , {useEffect} from "react";
import { Link } from "react-router-dom";
import '../assets/css/homepage.css'
import logo from '../assets/images/logo.png'
import img1 from '../assets/images/img1.png'
import img2 from '../assets/images/img2.png'

const HomePage = ({setShow}) => {
  useEffect(() => {
    setShow(false);
  }, []);
  return (
    <>
    
   <section id="main-section">
    <header>
        <div className="logo">
            <img src={logo} alt="" />
            <p>Campus Network</p>
        </div>
        <ul>
            <li>Home</li>
            <li>Features</li>
            <li>About Us</li>
            <li>Contact Us</li>
        </ul>
      
    </header>
    <div className="content">
       <h3>
         Make your  college <span className="text-danger">life</span>  easy and maintainable.
   
       </h3 >
       <Link to="/dashboard" className="btn btn-danger my-4">Join Us</Link>
    </div>
   </section>
   <section id="features">
    <h2 className="heading">Features</h2>
    <div className="underline"></div>
   <div className="row row-cols-1 row-cols-md-3 justify-content-center my-5 align-items-center gap-5 px-5">
  <div className="col ">
    <img src={img1} className="img-fluid" alt="" />
  </div>
  <div className="col">
    <h4>Easy to manage all your college events through the application</h4>
    <p>
      Post the college event and sit back. Campus Network manages all the
      aspects events of college
    </p>
  </div>
  </div>
   <div className="row row-cols-1 row-cols-md-3 justify-content-center my-5 align-items-center gap-5 px-5">
 
  <div className="col">
    <h4>Easy to view and download college notes/news</h4>
    <p>
    Campus Network makes college  super simple by providing a platform to have access, register and download notes and college news/notices. No more  sending screenshots of news repeatvely on whatsapp
    </p>
  </div>
  <div className="col">
    <img src={img2} className="img-fluid" alt="" />
  </div>
  </div>
   
   </section>
   <section id="footer">

   </section>
   </>
  );
};

export default HomePage;
