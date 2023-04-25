import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const AllSubject = () => {
const [subject ,setSubject] = useState();
useEffect(()=>{
  fetchSubject();
},[])



  const fetchSubject = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/user/subject`, config);
      console.log(data);
      setSubject(data.data)
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };



  return (
    <div className="container" style={{minHeight:"60vh"}}>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 justify-content-center p-3">
            {/* single item */}

          {
            subject && subject.map((item)=>{
              return (
                <div className="col mx-2 my-3 " key={item._id}>
                <div className="card text-center bg-teal py-3">
                    <div className="card-body ">
                        <div className="text-light"><Link to={`/notes/allnotes?id=${item._id}`} className='text-light fs-5'> {item.name}</Link></div>
                    </div>
                </div>
               </div>
              )
            })
          }

         
           {/* end of single item  */}
          
        </div>
    </div>
  )
}

export default AllSubject
