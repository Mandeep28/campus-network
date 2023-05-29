import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useParams } from "react-router-dom";
import moment from 'moment'
import NotFound from '../../Pages/NotFound';
import { saveAs } from 'file-saver'
import WithAuth from '../Authentication/WithAuth';


const SingleNotice = () => {
    const params = useParams();
    const [notice , setNotice] = useState();
    const [found, setFound] = useState(true);
    useEffect(()=>{
        const noticeId = params.id;
        fetchSingleNotice(noticeId);
          // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const fetchSingleNotice = async (noticeId)=>{
        let token = localStorage.getItem("userToken");
        try {
          const config = {
            headers: { "Content-type": "application/json", "auth-token": token },
          };
    
          const { data } = await axios.get("/api/v1/user/notice/"+noticeId, config);
          console.log(data);
          setNotice(data);
        //   setQuestion(data);
        //   setName(data.uploadBy.name);
        //   setPic(data.uploadBy.image);
          
    
          // setLoading(false);
        } catch (error) {
          console.log(error.response.data);
          setFound(false);
        }
    }

    if(!found) {
        return (
            <NotFound/>
        )
    }




  return (
   <div className="container my-5">
    <div>
        <img src={notice && notice.uploadBy.image} alt=""style={{width: "35px"}} className='img-thumbnail'/>
        <p className="d-inline-block mx-2"> By <a href="#!" className='text-dark'> {notice && notice.uploadBy.name}</a></p>
        <p className="d-inline-block mx-2"> At {notice &&  moment(new Date(notice.createdAt).toDateString()).fromNow()}</p>

    </div>
    <h4 className='text-uppercase text-teal my-2'>Title</h4>
    <h5 className='mb-3'>{notice && notice.title}</h5>
    <h4 className='text-uppercase text-teal my-2'>Description</h4>
    <p className='mb-3'>{notice && notice.body} </p>
    <img src={ notice?.attachment_url} alt="" className="img-thumbnail" />
    <div>

    {/* <a href={notice && notice.attachment_url} download={notice && notice.attachment_url}  className="btn btn-teal d-inline-block my-3 mx-2">Download <i className="fa fa-download mx-1 fs-5"></i></a> */}
    <button className="btn btn-teal d-inline-block my-3 mx-2"  onClick={()=>{ saveAs(notice.attachment_url, notice.attachment_url)}}>Downlaod<i className="fa fa-download mx-1 fs-5"></i></button>
    </div>
   </div>
  ) 
}

export default WithAuth(SingleNotice)
