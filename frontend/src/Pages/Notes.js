import React from "react";
import Tabs, { Tab } from "react-best-tabs";
import AllSubject from "../components/notes/AllSubject";
import AddNotes from "../components/notes/AddNotes";
import Mynotes from "../components/notes/Mynotes";
import { ChatState } from "../Context/ChatProvider";
import WithAuth from "../components/Authentication/WithAuth";
import { Link, Routes , Route } from "react-router-dom";

const Notes = () => {
  const { user } = ChatState();
  const updateActive = (e)=>{
    console.log(e.target);
    const id = e.target.dataset.id;
    let links = document.querySelectorAll(".link");
    links.forEach((link)=>{
      console.log(link);
      
      if(link.dataset.id === id) {
        link.classList.add("active");
      }
      else {
        link.classList.remove("active");

      }
    })
    
  }

  return (
    <>
      {user && (user.role !== "student") ? (
        <>
       
       
          <ul className="my-2 pt-2 fs-4 ">
            <li><Link to="/notes/mynotes" className="link  text-teal active" data-id="1" onClick={updateActive}>All Notes</Link> </li>
            <li> <Link to="/notes/addnotes" className="link text-teal " data-id="2" onClick={updateActive}> Add Notes</Link></li>
          </ul>
          
        

          <div className="my-2 pb-3">
    
     <Routes>
          <Route path="/"  element={<Mynotes/>} />
          <Route path="/mynotes"  element={<Mynotes/>} />
          <Route path="/addnotes"  element={<AddNotes/>} />
        </Routes>
    
        </div>
        </>
     
      ) :

      <div className="container">
          <h2 className="pt-3 pb-1 text-teal text-center  text-uppercase"> Subject </h2>
          <div className="underline-1"></div>
          <AllSubject />
        </div>
      
     }

    </>
  );
};

export default WithAuth(Notes);
