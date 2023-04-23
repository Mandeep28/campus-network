import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import {  toast } from "react-toastify";
import axios from "axios";
import { ChatState } from "../../Context/ChatProvider";

const SingleQuestion = () => {
    const params = useParams();
    const [question, setQuestion] = useState({});
    const [answer , setAnswer] = useState([]);
    const [name, setName] = useState("");
    const [pic, setPic] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] =useState("");

    const {user} = ChatState();
    useEffect(()=>{
        const questionId = params.id;
        console.log("id is :",questionId);
        
        fetchQuestion(questionId);
        fetchAnswer(questionId);
        
    },[]);

  //  fetch single question 
  const fetchQuestion = async (questionId) => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get("/api/v1/user/community/question/"+questionId, config);
      console.log(data.uploadBy);
      setQuestion(data);
      setName(data.uploadBy.name);
      setPic(data.uploadBy.image);
      

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //  fetch single question answers
  const fetchAnswer = async (questionId) => {
    console.log("id is from fetch answer", questionId);
    
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get("/api/v1/user/community/answer?id="+questionId, config);
      console.log(data);
      setAnswer(data.data);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
    setUserId(user._id)
  };



    
  const [body, setBody] = useState("");
    var toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
    
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }], // superscript/subscript
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
    
        [{ font: [] }],
        [{ align: [] }],
         
      ];
      SingleQuestion.modules = {
        syntax: false,
        toolbar: toolbarOptions,
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      };
    
      SingleQuestion.formats = [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
      ];
    
      const handleQuill = (value) => {
        setBody(value);
      };
//  post answer
const postAnswer = async ()=>{
    const questionId = params.id;
    let token = localStorage.getItem("userToken");
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post("/api/v1/user/community/answer",{answer:body , questionId}, config);
      console.log(data);
      toast.success("Answer posted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setBody("");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setBody("");
    }
   fetchAnswer(questionId);
    setLoading(false);
}




function setLocalTime(utcTimeString) {
    const utcTime = new Date(utcTimeString);
    const now = new Date();
    const differenceInMs = now.getTime() - utcTime.getTime();
    const hours = Math.floor(differenceInMs / 3600000);
    const minutes = Math.floor((differenceInMs % 3600000) / 60000);
    // console.log("hours is ", hours, "minutes is :", minutes);

    if (hours >= 0 && minutes >= 0) {
      let returnVal = `${hours} hrs ${minutes} min ago`;
      // console.log(returnVal);

      return returnVal;
    } else if (hours >= 0 && minutes <= 0) {
      let returnVal = `${hours} hrs  ago`;
      // console.log(returnVal);
      return returnVal;
    } else if (hours <= 0 && minutes >= 0) {
      let returnVal = ` ${minutes} min ago`;
      // console.log(returnVal);
      return returnVal;
    }
  }

  const handleDelete = async (e)=>{
    const questionId = params.id;
    console.log("delted", e.target.id);
    const answerId = e.target.id;
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete("/api/v1/user/community/answer/"+answerId, config);
      console.log(data);
      toast.success("Answer deleted successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setBody("");
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setBody("");
    }
   fetchAnswer(questionId);

    
  }













  return (
    <>
 {question && <div className="container my-3 py-3">
    <h4>{question ? question.title : ""}</h4>
    <div>
        <p>Asked <span className="text-secondary me-3">{question ?  new Date(question.createdAt).toLocaleString() : ""}</span> </p>
    </div>
    <div>{question ? parse(`${question.body}`): ""}</div>   
    <div className='text-end'>
        <img src={pic} alt="" className='img-thumbnail rounded' style={{width: "45px" , height: "50px", objectFit: "cover"}} />
    <p className='d-inline '><a href="#!" className='text-dark'>{name}</a></p>
    {/* <p>12 min ago</p> */}
    </div>
    
 </div> }
 <hr  style={{width: "80%" , margin: "auto"}}/>

{/* answers start */}
<div className="container my-4 ">
    <p className='fs-5 py-2'>{answer.length} Answer</p>
    {/* single answer item */}
   {answer &&  answer.map((item)=>{
        
    return (
        <div key={item._id} style={{borderBottom: "1px solid #80808090", paddingBottom: "8px"}} className="my-2">
        <div>{parse(item.answer)}</div>
        <div className='text-end'>
        <img src={item.uploadBy.image} alt="" className='img-thumbnail rounded' style={{width: "45px" , height: "50px", objectFit: "cover"}} />
    <p className='d-inline '><a href="#!" className='text-dark'>{item.uploadBy.name}</a></p>
    <p>{setLocalTime(item.createdAt)} </p>
    {(user._id === item.uploadBy._id) ? <i className="fa fa-trash text-danger fs-5" id={item._id} onClick={handleDelete}></i> : ""}
    </div>
    </div>
    )
   })}
    
    {/* end of single item */}
</div>

{/*  post answer  */}
<div className="container my-3">
<h5>Your Answer</h5>
<ReactQuill
            value={body}
            onChange={handleQuill}
            modules={SingleQuestion.modules}
            // formats={SingleQuestion.formats}
            placeholder="Type something here..."
          />
          <button
                  type="submit"
                  className="btn btn-teal mt-5 shadow shadow-lg"
                  onClick={postAnswer}
                  disabled={loading}
                  
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  Post Answer
                </button>
</div>

 </>
  )
}

export default SingleQuestion
