import axios from "axios";
import React, { useEffect, useState } from "react";
import {  toast } from "react-toastify";

const AddStudent = () => {
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState();
  const [formValues, setFormValues] = useState({
    Uname: "",
    email: "",
    rollno: "",
    semester: "",
    course: "",

    // add more fields as needed
  });

  useEffect(() => {
    fetchDepartment();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log(e);
    setLoading(true);
    console.log(formValues);
    if(!formValues.Uname || !formValues.rollno || !formValues.course || !formValues.email || !formValues.semester  ) {
        toast.warn("please fill all values", {
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
          return ;
          
    }




    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json",
         "auth-token": token },
      };

      const { data } = await axios.post(`/api/v1/admin/user/`,{
        hidden: "student",
        name: formValues.Uname[0],
        rollno: formValues.rollno[0],
        email: formValues.email[0],
        semester: formValues.semester[0],
        course: formValues.course[0],
      }, config);
      console.log(data);
      toast.success("Student added successfully", {
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
      console.log(error);
      toast.error("something went wrong", {
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

    setFormValues({
        Uname: "",
        email: "",
        rollno: "",
        semester: "",
        course: "",
     
       })
  };

  const fetchDepartment = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/course`, config);
      console.log(data);
      setDepartment(data.course);
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: [e.target.value] });
  };

  return (
    <div className="container pb-2">
      <h3 className="text-teal text-center">Add Student Details  </h3>
      <div className="underline-1"></div>
      <form>
        <div className="mb-3">
          <label htmlFor="Uname" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="Uname"
            placeholder="Rohan Joshi"
            value={formValues.Uname}
            onChange={handleOnChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Enter Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="example@gmail.com"
            value={formValues.email}
            onChange={handleOnChange}
          />
        </div>
        
          <div className=" col mb-3">
            <label htmlFor="semester" className="form-label">
              Enter Semester
            </label>
            <input
              type="number"
              className="form-control"
              id="semester"
              name="semester"
              placeholder="6th"
              value={formValues.semester}
              onChange={handleOnChange}
            />
          </div>
        <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2">
          <div className="col">
            <label htmlFor="course" className="form-label">
              {" "}
              Select Course
            </label>
            <select
              className="form-select"
              name="course"
              value={formValues.course}
              onChange={handleOnChange}
            >
                <option >Choose Course ....</option>
              {department &&
                department.map((item , index) => {
                    // console.log(index)
                  return (
                    <option value={item._id} key={item._id} >
                      {item.name}
                     
                      
                    </option>
                  );
                })}
            </select>
          </div>
          <div className=" col mb-3">
            <label htmlFor="rollno" className="form-label">
              Enter roll no
            </label>
            <input
              type="number"
              className="form-control"
              id="rollno"
              name="rollno"
              placeholder="12345"
              value={formValues.rollno}
              onChange={handleOnChange}
            />
          </div>

        </div>
        <button
          type="submit"
          className="btn btn-teal my-2 mx-1 shadow shadow-lg"
          onClick={submitHandler}
          disabled={loading}
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
          ></span>{" "}
          Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
