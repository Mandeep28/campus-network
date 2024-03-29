import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UploadWidget from "../mainApp/UploadWidget";


const AddNotes = ({setFetchAgain}) => {
  const abortController = new AbortController();

  const [url, updateUrl] = useState();
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [btnLabel, setBtnLabel] = useState("Add Notice");
  const [loading, setLoading] = useState(false);
  const [subject ,setSubject]= useState();

  useEffect(()=>{
        fetchSubject();
  },[])


  function handleOnUpload(error, result, widget) {
    if ( error ) {
      console.log(error);
      
      toast.error("something went wrong, try again later!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
          });
      widget.close({
        quiet: true
      });
      return;
    }
    updateUrl(result?.info?.secure_url);
  }

  const postNotice = async (e) => {
    e.preventDefault();
    if (!title   || !subjectId) {
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
      return;
    }
    let token = localStorage.getItem("userToken");
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        "/api/v1/user/notes",
        { title, url , subjectId},
        config
      );
      console.log(data);
      toast.success("Notes Added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
      setTitle("");
     updateUrl("");
     setSubject("");
      setLoading(false);
      setFetchAgain(true);
    } catch (error) {
      console.log(error.response);
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
      setTitle("");
     updateUrl("");
     setSubject("");
      setLoading(false);
    
    }
    return () => {
      abortController.abort();
    };
  };


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
    <div>
      <div className="container">
        <h5>Add Notice</h5>
        <form action="">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Enter title <span className="text-danger mx-1">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter something...."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
     
          <div className="mb-3">
          <label htmlFor="subjectId" className="form-label">
              Subject <span className="text-danger mx-1">*</span>
            </label>
            <select
              className="form-select"
              name="subjectId"
              value={subjectId}
              onChange={(e)=> setSubjectId(e.target.value)}
            >
              <option >Choose subject  ....</option>
              {subject &&
                subject.map((item ) => {
                    // console.log(index)
                  return (
                    <option value={item._id} key={item._id} >
                      {item.name}
                     
                      
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              choose attachment file <span className="text-danger mx-1">*</span>
            </label>
            <UploadWidget onUpload={handleOnUpload}>
          {({ open }) => {
            function handleOnClick(e) {
              e.preventDefault();
              open();
            }
            return (
              <button className="btn btn-teal btn-sm" onClick={handleOnClick}>
                Upload an Image
              </button>
            )
          }}
        </UploadWidget>
          </div>
        

          <button
            type="submit"
            className="btn btn-teal mt-5 shadow shadow-lg"
            onClick={postNotice}
            disabled={loading}
          >
            <span
              className={loading ? "spinner-border spinner-border-sm" : ""}
            ></span>{" "}
            {btnLabel}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
