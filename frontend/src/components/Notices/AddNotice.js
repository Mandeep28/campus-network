import axios from "axios";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import UploadWidget from "../mainApp/UploadWidget";


const AddNotice = ({setFetchAgain}) => {
  const fileTypes = ["JPG", "JPEG"];
  const [File, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noticefor, setNoticefor] = useState("");
  const [btnLabel, setBtnLabel] = useState("Add Notice");
  const [loading, setLoading] = useState(false);
  const [url, updateUrl] = useState();




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
    if (!title || !body  || !noticefor) {
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
    console.log(url, title, body, noticefor);
    
    let token = localStorage.getItem("userToken");
    setLoading(true);

    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        "/api/v1/admin/notice",
        { title, body, url , noticefor},
        config
      );
      console.log(data);
      toast.success("Notice Added successfully", {
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
      setNoticefor("");
      setBody("");
      setLoading(false);
      setFetchAgain(true);
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
      setTitle("");
      updateUrl("");
      setNoticefor("");
      setBody("");
      setLoading(false);
    
    }
  };





  return (
    <div>
      <div className="container">
       
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
            <label htmlFor="body" className="form-label">
              Enter description
            </label>
            <textarea
              className="form-control"
              id="body"
              name="body"
              rows={3}
              value={body}
              placeholder="Type something ...."
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
          <div className="mb-3">
          <label htmlFor="noticeFor" className="form-label">
              Notice For <span className="text-danger mx-1">*</span>
            </label>
            <select
              className="form-select"
              name="noticeFor"
              value={noticefor}
              onChange={(e)=> setNoticefor(e.target.value)}
            >
              <option >Choose Notice For ....</option>
              <option   value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="both">Both</option>
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

export default AddNotice;
