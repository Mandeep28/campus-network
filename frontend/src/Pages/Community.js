import React, {  useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllQuestion from '../components/community/AllQuestion'
import AddQuestion from '../components/community/AddQuestion';
import WithAuth from '../components/Authentication/WithAuth';
import { Link, Routes , Route } from 'react-router-dom';
import SingleQuestion from '../components/community/SingleQuestion';

const Community = () => {
    const [fetchagain, setFetchAgain] = useState(false);
    const updateActive = (e)=>{
        // console.log(e.target);
        const id = e.target.dataset.id;
        let links = document.querySelectorAll(".link");
        links.forEach((link)=>{
        //   console.log(link);
          
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
    {/* <ul className="my-2 py-2 pb-3 fs-5">
        <li>
            <Link onClick={updateActive} to="/community/" className='link mx-2 active' data-id="1" >All Questions</Link>
            <Link onClick={updateActive} to="/community/myquestion" className='link mx-2 ' data-id="2" >My Questions</Link>
            <Link onClick={updateActive} to="/community/addquestion" className='link mx-2 ' data-id="3" >Ask Questions</Link>
        </li>
    </ul>
    <div className='my-4 pb-2'> 
        <Routes>
            <Route path="/" element={<AllQuestion endpoint="community" showTrash={false}  fetchAgain={fetchagain} />}/>
            <Route path="/myquestion" element={ <AllQuestion endpoint="community/my/question" showTrash={true} fetchAgain={fetchagain} />}/>
            <Route path="/addquestion" element={<AddQuestion fetchagain={fetchagain} setFetchAgain={setFetchAgain}/>}/>
          
        </Routes>
    </div> */}

       <Tabs
          activeTab="1"
          className=""
          ulClassName=""
          activityClassName="bg-teal"
          // onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="All Question" className="mr-3">
                <div className="mt-3">
                    <AllQuestion endpoint="community" showTrash={false}  fetchAgain={fetchagain} />
                </div>
            </Tab>
            <Tab title="My Questions" className="mr-3">
                <div className="mt-3">
                <AllQuestion endpoint="community/my/question" showTrash={true} fetchAgain={fetchagain} />
                </div>
            </Tab>
            <Tab title="Ask Question" className="mr-3">
                <div className="mt-3">
                    <AddQuestion fetchagain={fetchagain} setFetchAgain={setFetchAgain}/>
                </div>
            </Tab>
        </Tabs>
    
    </>
  )
}

export default WithAuth(Community)
