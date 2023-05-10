import React , {useState} from 'react'
import 'react-best-tabs/dist/index.css';
import StudentData from './StudentData';
// import TeacherData from './TeacherData';
import { Link, Route, Routes } from 'react-router-dom';

const AllUser = () => {
  const [tabIndex, setTabIndex] = useState(1);
  const updateActive = (e)=>{
    // console.log(e.target);
    const id = e.target.dataset.id;
    setTabIndex(parseInt(id));
    let links = document.querySelectorAll(".link1");
    links.forEach((link)=>{
      // console.log(link);
      
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
      <ul className="my-2 py-2 pb-3 fs-5 mx-2">
        <li className="link1 active" data-id="1" onClick={updateActive}> Student</li>
        <li className="link1 " data-id="2" onClick={updateActive}> Teacher</li>
      </ul>


      {/* <div>
        <Routes> 
            <Route path = "/" element={<StudentData info="student"/>} />
            <Route exact path="/student" element={<StudentData info="student"/>}/>
            <Route exact path="/teacher" element={<StudentData info="teacher"/>}/>
        </Routes>
        </div> */}

        <div>
          <div className={(tabIndex === 1 ? "" : "d-none")}>
            <h3 className='text-teal text-center'>Students Data</h3>
            <div className="underline-1"></div>
            <div className="text-end mx-5">
              <Link to="/user/student/addnew" className="btn btn-teal">Add Student</Link>
            </div>
            <StudentData info="student"/>
          </div>
          <div  className={(tabIndex === 2 ? "d-block" : "d-none")}>
          <h3 className='text-teal text-center'>Teacher Data</h3>
            <div className="underline-1"></div>
            <div className="text-end mx-5 my-2">
              <Link to='/user/teacher/addnew' className="btn btn-teal">Add Teacher</Link>
            </div>
            <StudentData info="teacher"/>
         
          </div>
        </div>
      
    </div>
  )
}

export default AllUser
