import React, { useEffect, useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllQuestion from '../components/community/AllQuestion'
import axios  from 'axios';
import AddQuestion from '../components/community/AddQuestion';
import MyQuestion from '../components/community/MyQuestion';
// import { Toast } from 'react-toastify/dist/components';

const Community = () => {


  return (
    <div >
       <Tabs
          activeTab="1"
          className="my-3 mx-5"
          ulClassName=""
          activityClassName="bg-teal"
          // onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="All Question" className="mr-3">
                <div className="mt-3">
                    <AllQuestion/>
                </div>
            </Tab>
            <Tab title="My Questions" className="mr-3">
                <div className="mt-3">
                    <MyQuestion/>
                </div>
            </Tab>
            <Tab title="Ask Question" className="mr-3">
                <div className="mt-3">
                    <AddQuestion/>
                </div>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Community
