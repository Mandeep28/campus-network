import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {  toast } from "react-toastify";
import axios from "axios";


const AddQuestion = ({setFetchAgain}) => {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [ 4, 5, 6, false] }],

    [{ font: [] }],
    [{ align: [] }],
     
  ];
  AddQuestion.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  AddQuestion.formats = [
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

  const submitHandler = async ()=>{
    console.log("hello world");
    console.log(title, body );
    setLoading(true);
    
    
    if(!title || !body ) {
      toast.warn("Please fill all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setLoading(false);
      return
    }
  
   let token = localStorage.getItem("userToken");
   
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        "/api/v1/user/community",
        {title, body },
        config
      );
      console.log(data);

      toast.success("Question added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });


      setLoading(false);
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
      setLoading(false);
    }
    setTitle("");
    setBody("");
    setFetchAgain(true);
    
  }






  return (

      <div className="container" style={{minHeight : "100vh"}}>
  <div className="mb-3 ">
    <label htmlFor="title" className="form-label">
      Enter Your Question
    </label>
    <input
      type="email"
      className="form-control"
      id="title"
      placeholder="I want to know ..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  </div>
  <div className="mb-3">
    <label htmlFor="exampleFormControlTextarea1" className="form-label">
    Enter the details of your question
    </label>
    <div style={{height: "50vh" }}>
    <ReactQuill
            // value={body}
            onChange={handleQuill}
            modules={AddQuestion.modules}
            // formats={AddQuestion.formats}
            placeholder="Type something here..."
            style={{height : "100%"}}
          />
    </div>
   
  </div>
  <div className="mt-5">

  <button
                  type="submit"
                  className="btn btn-teal mt-5 shadow shadow-lg"
                  onClick={submitHandler}
                  disabled={loading}
                  
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  Add Question
                </button>
  </div>
  </div>

  )
}




export default AddQuestion
