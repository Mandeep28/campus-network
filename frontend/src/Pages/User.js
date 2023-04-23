import React, { useEffect, useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import axios  from 'axios';
import AllUser from '../components/users/AllUser';
import AddStudent from '../components/users/AddStudent';
import AddTeacher from '../components/users/AddTeacher';

const User = () => {
  return (
    <div >
       <Tabs
          activeTab="1"
          className="my-3 px-2"
          ulClassName=""
          activityClassName="bg-teal"
          // onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="All User" className="mr-3">
                <div className="mt-3">
                    <AllUser/>
                </div>
            </Tab>
        
            <Tab title="Add student" className="mr-3">
                <div className="mt-3">
                    <AddStudent/>
                </div>
            </Tab>
            <Tab title="Add Teacher" className="mr-3">
                <div className="mt-3">
                   <AddTeacher/>
                </div>
            </Tab>
           
        </Tabs>
    </div>

  )
}

export default User
