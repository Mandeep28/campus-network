import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import { toast } from "react-toastify";

const Userdata = ({info}) => {
  const [Userdata, setUserdata] = useState();
  const [loading, setLoading] = useState(false);
  const [department, setDepartment] = useState();
  const [Userid, setUserid] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    rollno: "",
    semester: "",
    course: "",
    degreeType: "",
    department : "",
    // add more fields as needed
  });
  
  
const [touched, setTouched] = useState({
  name: false,
  email: false,
  rollno: false,
  semester: false,
  course: false,
  degreeType: false,
  department : false,
});
const closeRef = useRef();

  const fetchDepartment = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/course`, config);
      // console.log(data);
      setDepartment(data.course);
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchDepartment();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: [e.target.value] });

    setTouched({...touched , [e.target.name]: true});
  };

  const fetchUsers = async () => {
    let token = localStorage.getItem("userToken");
    try { 
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(
        `/api/v1/admin/user?type=${info}`,
        config
      );
      console.log(data.data);
      setUserdata(data.data);
 
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const userData = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Roll No",
          field: "rollno",
          sort: "asc",
        },
        {
          label: "Course",
          field: "course",
        },
        {
          label: "Semester",
          field: "semester",
          sort: "asc",
          
        },
        {
          label: "Department Name",
          field: "departmentname",
        },
        {
          label: "degree Type",
          field: "degreetype",
        },
        {
          label: "CreatedBy",
          field: "createdby",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };
    Userdata &&
      Userdata.forEach((item) => {
        data.rows.push({
          name: item.name,
          email: item.email,
          rollno: item.rollno,
          course: (<p id={item.course._id}>{item.course.name}</p>),
          semester: item.semester,
          degreetype: item.degreeType,
          createdby: item.createdBy.name,
          departmentname: item.course.department.name,
          actions: (
            <>
              <div>
                <i
                  className="fa fa-pencil text-teal fs-5 mx-1 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  data-itemid={item._id}
                  onClick={handleEditClick}
                > </i>
                <i className="fa fa-trash fs-5 text-danger mx-1 cursor-pointer"  data-itemid={item._id} onClick={handleDelete}></i>
              </div>
            </>
          ),
        });
      });
    // console.log("data row ", data.rows);

    return data;
  };


  //  if info == 'teacher'
  const userData2 = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Email",
          field: "email",
        },
        
        {
          label: "Department Name",
          field: "departmentname",
        },
       
        {
          label: "CreatedBy",
          field: "createdby",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],

      rows: [],
    };
    Userdata &&
      Userdata.forEach((item) => {
        data.rows.push({
          name: item.name,
          email: item.email,
          departmentname:(<p id={item.department._id}>{item.department.name}</p>),
          createdby: item.createdBy.name,
         
          actions: (
            <>
              <div>
                <i
                  className="fa fa-pencil text-teal fs-5 mx-1 cursor-pointer"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal2"
                  data-itemid={item._id}
                  onClick={handleEditClick}
                > </i>
                <i className="fa fa-trash fs-5 text-danger mx-1 cursor-pointer"  data-itemid={item._id} onClick={handleDelete}></i>
              </div>
            </>
          ),
        });
      });
    // console.log("data row ", data.rows);

    return data;
  };

  const handleEditClick = (e)=>{
      const Userdata = e.target.parentElement.parentElement.parentElement.children;
      // console.log(Userdata[3]);
      setUserid(e.target.dataset.itemid);
      
      setFormValues({
        name : Userdata[0].innerText,
        email : Userdata[1].innerText,
        rollno : Userdata[2].innerText,
        course : Userdata[3].children[0].id,
        semester : Userdata[4].innerText,
        degreeType : Userdata[6].innerText,
      })

      // console.log(formValues.course);
      
      
  }

  //  edit the student
  const saveChanges = async ()=>{
    // e.preventDefault();
    // // console.log(e);
    setLoading(true);
    const updatedValues = {};
  Object.keys(formValues).forEach((key) => {
    if (touched[key]) {
      updatedValues[key] = formValues[key][0];
    } else {
      updatedValues[key] = formValues[key];
    }
  });
  console.log(updatedValues);
  
    
    // if(!formValues.name || !formValues.rollno || !formValues.course || !formValues.email || !formValues.semester || !formValues.degreeType ) {
    //     toast.warn("please fill all values", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: 0,
    //         theme: "colored",
    //       });
    //       setLoading(false);
    //       return ;
          
    // }
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json",
         "auth-token": token },
      };

      const { data } = await axios.put(`/api/v1/admin/${info}/${Userid}`,updatedValues, config);
      // console.log(data);
      toast.success(data.msg, {
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
      setLoading(false);
    }

    setFormValues({
        name: "",
        email: "",
        rollno: "",
        semester: "",
        course: "",
        department: "",
        degreeType: "",})
    setTouched({
        name: "",
        email: "",
        rollno: "",
        semester: "",
        course: "",
        department: "",
        degreeType: "",})
        setLoading(false);
        closeRef.current.click();
        fetchUsers();
  }


  //  delte student 
  const handleDelete = async (e) => {
    // console.log("delted", e.target.id);
    const id = e.target.dataset.itemid;
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        `api/v1/admin/${info}/${id}`,
        config
      );
      // console.log(data);
      toast.success(data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "colored",
      });
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
    }
      fetchUsers();
  };



  return (
    <>
      <div className="" style={{ minHeight: "50vh" }}>
        <MDBDataTable
          striped
          bordered
          hover
          data={info=== "student" ? userData() : userData2()}
          className="px-3"
          responsive
          paging={true}
        />
      </div>

      {/*  edit modal start here */}
      <>
       
        {/* Modal */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex={-1}
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editModalLabel">
                  Edit Student Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeRef}
                />
              </div>
              <div className="modal-body">
              <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Rohan Joshi"
            value={formValues.name}
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
                department.map((item) => {
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
          <div className="col">
            <label htmlFor="degreeType" className="form-label">
              {" "}
              Degree Type
            </label>
            <select
              className="form-select"
              name="degreeType"
              value={formValues.degreeType}
              onChange={handleOnChange}
            >
              <option >Choose Depree Type ....</option>
              <option value="ug_3">under graduate(3 year)</option>
              <option value="ug_4">under graduate(4 year)</option>
              <option value="pg_2">post graduate(2 year)</option>
              <option value="pg_3">post graduate(3year)</option>
            </select>
          </div>
        </div>
        {/* <button
          type="submit"
          className="btn btn-teal my-2 mx-1 shadow shadow-lg"
          onClick={submitHandler}
          disabled={loading}
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
          ></span>{" "}
          Add Student
        </button> */}
      </form>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
          type="submit"
          className="btn btn-teal my-2 mx-1 shadow shadow-lg"
          onClick={saveChanges}
          disabled={loading}
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
          ></span>{" "}
          Save Changes
        </button>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* edit modal end here */}
      {/*  edit modal start here */}
      <>
       
        {/* Modal */}
        <div
          className="modal fade"
          id="editModal2"
          tabIndex={-1}
          aria-labelledby="editModal2Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editModal2Label">
                  Edit Teacher Details
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  ref={closeRef}
                />
              </div>
              <div className="modal-body">
              <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Enter Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Rohan Joshi"
            value={formValues.name}
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
                department.map((item) => {
                    // console.log(index)
                  return (
                    <option value={item._id} key={item._id} >
                      {item.name}
                      </option>
                  );
                })}
            </select>
          </div>
      
      </form>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
          type="submit"
          className="btn btn-teal my-2 mx-1 shadow shadow-lg"
          onClick={saveChanges}
          disabled={loading}
        >
          <span
            className={loading ? "spinner-border spinner-border-sm" : ""}
          ></span>{" "}
          Save Changes
        </button>
              </div>
            </div>
          </div>
        </div>
      </>

      {/* edit modal end here */}
    </>
  );
};

export default Userdata;
