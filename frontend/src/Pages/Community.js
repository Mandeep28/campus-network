import React from 'react'
import Sidebar from '../components/mainApp/Sidebar'
import {
    Box,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
  } from "@chakra-ui/react";
import AllQuestion from '../components/community/AllQuestion';
import MyQuestion from '../components/community/MyQuestion';
import AddQuestion from '../components/community/AddQuestion';

const Community = () => {
  return (
    <div className='background'>
    <Sidebar/>
    <div className="container my-4 py-3 bg-light text-dark" style={{borderRadius: "13px"}}>
    <Box  p={4} borderRadius="lg" >
        <Tabs  variant="soft-rounded" colorScheme="teal"  >
          <TabList mb="1em">
            <Tab fontWeight="bold">All Questions</Tab>
            <Tab fontWeight="bold">My Questions</Tab>
            <Tab fontWeight="bold">Add Question</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
                <AllQuestion/>
            </TabPanel>
            <TabPanel>
         <MyQuestion/>
            </TabPanel>
            <TabPanel>
             <AddQuestion/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
    </div>
  )
}

export default Community
