import React from 'react'
import { Link , Routes, Route } from 'react-router-dom';

const Addons = () => {
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
    <div>
         <ul className="my-2 pt-2 fs-4 ">
            <li><Link to="/addons/department" className="link  text-teal active" data-id="1" onClick={updateActive}>Department</Link> </li>
            <li> <Link to="/addons/course" className="link text-teal " data-id="2" onClick={updateActive}> Course</Link></li>
          </ul>


          <div className="my-4 pb-3">
    
    <Routes>
         <Route path="/"  element={<div> I am department</div>} />
         <Route path="/department"  element={<div> I am department</div>} />
         <Route path="/course"  element={<div> I am course</div>} />
       </Routes>
   
       </div>
          
    </div>
  )
}

export default Addons
