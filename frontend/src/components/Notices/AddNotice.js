import axios from "axios";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";


const AddNotice = ({setFetchAgain}) => {
  const fileTypes = ["JPG", "JPEG"];
  const [File, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noticefor, setNoticefor] = useState("");
  const [btnLabel, setBtnLabel] = useState("Add Notice");
  const [loading, setLoading] = useState(false);


  const handleChange = (file) => {
    console.log("inside on change");
    console.log(file);

    setLoading(true);
    setBtnLabel("file uplaoding ...");
    const data = new FormData();
    data.append("file", file[0]);
    data.append("upload_preset", "campus_Network");
    data.append("cloud_name", "dyk8ixmrn");
    fetch("https://api.cloudinary.com/v1_1/dyk8ixmrn/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFile(data.secure_url);
        setBtnLabel("Add Notice");
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBtnLabel("Add Notice");
        setLoading(false);
      });
  };

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
    let token = localStorage.getItem("userToken");
    setLoading(true);
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        "/api/v1/admin/notice",
        { title, body, File , noticefor},
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
      setFile("");
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
      setFile("");
      setNoticefor("");
      setBody("");
      setLoading(false);
    
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
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              ondrop={handleChange}
              name="file"
              classes="drag_zone"
              types={fileTypes}
              hoverTitle={"drop here"}
            />
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
