import React, { useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllNotice from '../components/Notices/AllNotice';
import AddNotice from '../components/Notices/AddNotice';
import { ChatState } from '../Context/ChatProvider';
import WithAuth from '../components/Authentication/WithAuth';
import { Link, Routes, Route } from 'react-router-dom';

const Notice = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const {user} = ChatState();
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

      <ul className="my-2 pt-2 fs-4 ">
        <Link to="/notice" className="link  text-teal mx-2 active" data-id="1" onClick={updateActive}>All Notice</Link>
        
       { (user && user.role === "admin") ? <>
       <Link to="/notice/mynotice" className="link  text-teal mx-2" data-id="2" onClick={updateActive}>My Notice</Link>
        <Link to="/notice/addnotice" className="link  text-teal mx-2" data-id="3" onClick={updateActive}>Add Notice</Link>
        </>
        : 
        ""
        }
      </ul>

      <div className="my-5 pb-3">
        <Routes>
          <Route path="/" element={<AllNotice endpoint="user/notice" showTrash={false} fetchAgain={fetchAgain} />} />
          <Route path="/mynotice" element={ <AllNotice endpoint="admin/mynotice" showTrash={true} fetchAgain={fetchAgain} />}/>
          <Route path="/addnotice" element={<AddNotice setFetchAgain={setFetchAgain}/>}/>
        </Routes>
      </div>
 
        {/* { user && (user.role === "admin") ? 
            <Tabs
            activeTab="1"
            className=""
            ulClassName=""
            activityClassName="bg-teal"
            // onClick={(event, tab) => console.log(event, tab)}
          >
              <Tab title="Notice" className="mr-3">
                  <div className="mt-3">
                    <AllNotice endpoint="user/notice" showTrash={false} fetchAgain={fetchAgain} />
                  </div>
              </Tab>
          <Tab title="My Notice" className="mr-3">
                  <div className="mt-3">
                <AllNotice endpoint="admin/mynotice" showTrash={true} fetchAgain={fetchAgain} />
                  </div>
              </Tab>
              <Tab title="Add notice" className="mr-3">
                  <div className="mt-3">
                      <AddNotice setFetchAgain={setFetchAgain}/>
                  </div>
              </Tab>
          </Tabs>


            : 
                <div className="pt-4 my-3">

                    <AllNotice endpoint="user/notice" showTrash={false} fetchAgain={fetchAgain} />
                </div>
        } */}
    
    </>
  )
}

export default WithAuth(Notice)
