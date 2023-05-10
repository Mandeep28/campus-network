import axios from "axios";
import React, { useEffect, useState } from "react";
import {  toast } from "react-toastify";

const AddTeacher = () => {
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState();
  const [formValues, setFormValues] = useState({
    Uname: "",
    email: "",
    department: "",
   
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
    if(!formValues.Uname || !formValues.email  || !formValues.department) {
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
        hidden: "teacher",
        name: formValues.Uname[0],
        email: formValues.email[0],
        department: formValues.department[0],
       
      }, config);
      console.log(data);
      toast.success("Teacher Added successfully", {
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
      toast.error(error, {
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
       
        department: "",
       })
  };

  const fetchDepartment = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/department`, config);
      console.log(data);
      setDepartment(data.departments);
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
      <h3 className="text-teal text-center">Add Teacher Details  </h3>
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
     
        <div className="col my-1">
            <label htmlFor="" className="form-label">
              {" "}
              Select Department
            </label>
            <select
              className="form-select"
              name="department"
              value={formValues.department}
              onChange={handleOnChange}
            >
                <option >Choose Department ....</option>
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
        <button
          type="submit"
          className="btn btn-teal my-2 mx-1 shadow shadow-lg"
          onClick={submitHandler}
          disabled={loading}
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
          ></span>{" "}
          Add Teacher
        </button>
      </form>
    </div>
  );
};

export default AddTeacher;
