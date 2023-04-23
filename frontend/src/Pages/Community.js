import React, { useEffect, useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import axios  from 'axios';
import AllQuestion from '../components/community/AllQuestion'
import AddQuestion from '../components/community/AddQuestion';

const Community = () => {
    const [fetchagain, setFetchAgain] = useState(false);


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

export default Community
