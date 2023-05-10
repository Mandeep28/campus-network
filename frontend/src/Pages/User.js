import React from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllUser from '../components/users/AllUser';
import AddStudent from '../components/users/AddStudent';
import AddTeacher from '../components/users/AddTeacher';
import WithAuth from '../components/Authentication/WithAuth';
import { Link , Routes, Route } from 'react-router-dom';

const User = () => {

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
        <ul className="my-2 py-2 pb-3 fs-5">
            <li>
                <Link to="/user" onClick={updateActive} className="link mx-2 active" data-id="1"> AllUser</Link>
                <Link to="/user/registeruser" onClick={updateActive} className="link mx-2 " data-id="2"> Register User</Link>
                <Link to="/user/alumini" onClick={updateActive} className="link mx-2 " data-id="3"> Alumini</Link>
            </li>
        </ul>

        <div>
        <Routes>
            <Route path = "/*" element={<AllUser/>} />
            <Route exact path="/student/addnew" element={<AddStudent/>}/>
            <Route exact path="/teacher/addnew" element={<AddTeacher/>}/>
        </Routes>
        </div>

        </>


    //    <Tabs
    //       activeTab="1"
    //       className="my-3 px-2"
    //       ulClassName=""
    //       activityClassName="bg-teal"
    //       // onClick={(event, tab) => console.log(event, tab)}
    //     >
    //         <Tab title="All User" className="mr-3">
    //             <div className="mt-3">
    //                 <AllUser/>
    //             </div>
    //         </Tab>
        
    //         <Tab title="Add student" className="mr-3">
    //             <div className="mt-3">
    //                 <AddStudent/>
    //             </div>
    //         </Tab>
    //         <Tab title="Add Teacher" className="mr-3">
    //             <div className="mt-3">
    //                <AddTeacher/>
    //             </div>
    //         </Tab>
           
    //     </Tabs>
   

  )
}

export default WithAuth(User)
