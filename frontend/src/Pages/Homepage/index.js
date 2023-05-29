import React , {useEffect , useState} from "react";
import { Link } from "react-router-dom";
// import '../assets/css/homepage.css'
import './index.css'
import logo from '../../assets/images/logo.png'
import about from "../../assets/images/about-us.png";
import contact from "../../assets/images/image.jpg";
import features from "../../assets/images/features.png";
import learn from "../../assets/images/learn.png";
const HomePage = ({setShow}) => {

  useEffect(() => {
    setShow(false);
    window.addEventListener('scroll', stickNavbar);

    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);



  const stickNavbar = () => {
    if (window !== undefined) {
      const navToggle = document.querySelector(".nav-toggle");
      const linksContainer = document.querySelector(".links-container");
      const links = document.querySelector(".links");
      
      navToggle.addEventListener("click", function () {
        // linksContainer.classList.toggle("show-links");
      
        const linksHeight = links.getBoundingClientRect().height;
        const containerHeight = linksContainer.getBoundingClientRect().height;
        if (containerHeight === 0) {
          linksContainer.style.height = `${linksHeight}px`;
        } else {
          linksContainer.style.height = 0;
        }
        // console.log(linksContainer.getBoundingClientRect());
      });
      
      // ********** fixed navbar ************
      
      const navbar = document.getElementById("nav");
      const topLink = document.querySelector(".top-link");
      
      window.addEventListener("scroll", function () {
        const scrollHeight = window.pageYOffset;
        const navHeight = navbar.getBoundingClientRect().height;
        if (scrollHeight > navHeight) {
          navbar.classList.add("fixed-nav");
        } else {
          navbar.classList.remove("fixed-nav");
        }
        // setup back to top link
      
        if (scrollHeight > 500) {
          // console.log("helo");
      
          topLink.classList.add("show-link");
        } else {
          topLink.classList.remove("show-link");
        }
      });
      
      // ********** smooth scroll ************
      // select links
      const scrollLinks = document.querySelectorAll(".scroll-link");
      scrollLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          // prevent default
          e.preventDefault();
          // navigate to specific spot
          const id = e.currentTarget.getAttribute("href").slice(1);
          const element = document.getElementById(id);
      
          const navHeight = navbar.getBoundingClientRect().height;
          const containerHeight = linksContainer.getBoundingClientRect().height;
          const fixedNav = navbar.classList.contains("fixed-nav");
          let position = element.offsetTop - navHeight;
      
          if (!fixedNav) {
            position = position - navHeight;
          }
          if (navHeight > 82) {
            position = position + containerHeight;
          }
      
          window.scrollTo({
            left: 0,
            top: position,
          });
          // close
          linksContainer.style.height = 0;
        });
      });
  };
}

  return (
    <>
    
    <>
  <section id="home" className="header">
    {/* navbar */}
    <nav id="nav">
      <div className="nav-center">
        {/* nav header */}
        <div className="nav-header">
          <img src={logo} className="logo" alt="logo" />
          <button className="nav-toggle">
            <i className="fas fa-bars" />
          </button>
        </div>
        {/* links */}
        <div className="links-container">
          <ul className="links">
            <li>
              <a href="#home" className="scroll-link">
                home
              </a>
            </li>
            <li>
              <a href="#about" className="scroll-link">
                about
              </a>
            </li>
            <li>
              <a href="#features" className="scroll-link">
                Features
              </a>
            </li>
            <li>
              <a href="#contactus" className="scroll-link">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {/* banner */}
    <div className="banner">
      <div className="container">
        <h1>Campus Network</h1>
        <p>
          Empowering Education, Connecting Minds: Your Campus Network Hub
        </p>
        <Link to="/dashboard" className=" btn btn-white">Join Now</Link>
      </div>
    </div>
  </section>
  {/* about */}
  <section id="about" className="section">
    <div className="title">
      <h2>
        about <span>us</span>
      </h2>
      <div className="content1">
        <img src={contact} className="aboutimg"/>
        <p>
        Welcome to Campus Network, your premier online platform designed exclusively for our campus community, where students and teachers come together to foster knowledge exchange and seamless communication.&nbsp;
        <br/>
        <br/>
        With a user-friendly interface and robust features, Campus Network aims to streamline the learning experience for both teachers and students, enabling them to connect, collaborate, and thrive academically.&nbsp;
        <br/>
        <br/>
        We prioritize your privacy and security. Rest assured that we have implemented stringent measures to protect your personal information, creating a safe and trusted online environment for our entire campus community.
        </p>
      </div>
    </div>
  </section>
  {/* services */}
  <section id="features" className="section">
    <div className="title">
      <h2>
       Advance <span>Features</span>
      </h2>
      <div className="content2">
        <img src={features} className="featureimg"/>
        <p>
        • Effortless Note Management&nbsp;
        <br/>
        • Seamless Communication.&nbsp;
        <br/>
        • Centralized Resource Hub.&nbsp;
        <br/>
        • Real-time Notifications.&nbsp;
        <br/>
        • User-Friendly Interface.&nbsp;
        <br/>
        • Quick and Easy Access&nbsp;
        <br/>
        • Customized Notifications.&nbsp;
        </p>
      </div>
    </div>
  </section>
  {/* contact */}
  <section id="contactus" className="section">
    <div className="title">
      <h2>
        Learning made <span>more Easier</span>
      </h2>
      <div className="content3"> 
        <img src={learn} className="learnimg"/>
        <p>
        • Easy to Upload Notes as well as Delete notes.&nbsp;
        <br/>
        • Easy to access the Notices circulated by the college.&nbsp;
        <br/>
        • Easy to ask a Question and can also Answer anyone's question as well.&nbsp;
        <br/>
        • Easy to chat with teachers and users in the Chats section.&nbsp;
        <br/>
        • Can create Group Chats as well and can also chat with a single User.&nbsp;
        </p>
      </div>
      <i className="fa-solid fa-notes"></i>
    </div>
  </section>
  {/* footer */}
  <footer className="section home-footer">
    <p>
      copyright &copy; campus network {new Date().getFullYear()} . all rights reserved
    </p>
  </footer >
  <a className="scroll-link top-link" href="#home">
    <i className="fas fa-arrow-up" />
  </a>
  {/* javascript */}
</>

   </>
  );
};

export default HomePage;
