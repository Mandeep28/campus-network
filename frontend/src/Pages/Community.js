import React from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllQuestion from '../components/community/AllQuestion'

const Community = () => {
  return (
    <div >
       <Tabs
          activeTab="1"
          className="d-flex "
          ulClassName=""
          activityClassName="bg-success"
          onClick={(event, tab) => console.log(event, tab)}
        >
            <Tab title="All Question" className="mr-3">
                <div className="mt-3">
                    <AllQuestion/>
                </div>
            </Tab>
            <Tab title="My Questions" className="mr-3">
                <div className="mt-3">
                    Tab 2 content
                </div>
            </Tab>
            <Tab title="Ask Question" className="mr-3">
                <div className="mt-3">
                    Tab 3 content
                </div>
            </Tab>
        </Tabs>
    </div>
  )
}

export default Community
