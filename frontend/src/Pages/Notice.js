import React, { useState } from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import 'react-best-tabs/dist/index.css';
import AllNotice from '../components/Notices/AllNotice';
import AddNotice from '../components/Notices/AddNotice';
import { ChatState } from '../Context/ChatProvider';

const Notice = () => {
    const [fetchAgain, setFetchAgain] = useState(false);
    const {user} = ChatState();
  return (
    <div>
        {
            user && (user.role === "admin") ? 
            <Tabs
            activeTab="1"
            className="my-3 mx-5"
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
                <div className="container my-5">

                    <AllNotice endpoint="user/notice" showTrash={false} fetchAgain={fetchAgain} />
                </div>
        }
    
    </div>
  )
}

export default Notice
