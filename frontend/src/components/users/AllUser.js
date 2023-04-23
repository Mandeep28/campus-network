import React from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import axios  from 'axios';
import StudentData from './StudentData';
import TeacherData from './TeacherData';

const AllUser = () => {
  return (
    <div>
        <Tabs
          activeTab="1"
          className="my-3 px-2"
          ulClassName=""
          activityClassName="bg-teal"
          // onClick={(event, tab) => console.log(event, tab)}
        >
          
        
            <Tab title="student" className="mr-3">
                <div className="mt-3">
                    <StudentData/>
                </div>
            </Tab>
            <Tab title="Teacher" className="mr-3">
                <div className="mt-3">
                   <TeacherData/>
                </div>
            </Tab>
           
        </Tabs>
    </div>
  )
}

export default AllUser
