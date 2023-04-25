import React from 'react'
import Tabs, {Tab} from 'react-best-tabs';
import AllSubject from '../components/notes/AllSubject';
import AllNotes from '../components/notes/AllNotes';
import AddNotes from '../components/notes/AddNotes';
import Mynotes from '../components/notes/Mynotes';
import { ChatState } from '../Context/ChatProvider';

const Notes = () => {
  const {user} = ChatState();
  return (
    <div>
     {user && (user.role ==="student") ? 
     <div className="container">
      <h2 className='mt-5 mb-2 text-teal text-center'>All Subject </h2>
       <AllSubject/>
     </div>

          : 
          
     <Tabs
            activeTab="1"
            className="my-3 mx-5"
            ulClassName=""
            activityClassName="bg-teal"
            // onClick={(event, tab) => console.log(event, tab)}
          >
          <Tab title="My Notes" className="mr-3">
                  <div className="mt-3">
                <Mynotes/>
                  </div>
              </Tab>
              <Tab title="Add notes" className="mr-3">
                  <div className="mt-3">
                    <AddNotes/>
                  </div>
              </Tab>
          </Tabs>}
    </div>
  )
}

export default Notes
