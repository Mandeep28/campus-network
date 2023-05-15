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
    <div className='py-2 my-1'>
 

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
    
    </div>
  )
}

export default WithAuth(Community)
