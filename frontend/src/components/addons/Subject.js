import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { toast } from "react-toastify";

const Subject = () => {
  const [subject, setSubject] = useState();
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);
  const closeRef = useRef();
  const closeRef2 = useRef();
  const [course, SetCourse] = useState();
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [semester , setSemester ] = useState("")
  
  useEffect(() => {
    fetchSubjectData();
    fetchCourse();
    // console.log(depData);
  }, []);

  const fetchCourse = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/course`, config);
      //   console.log("department is ",data);
      SetCourse(data.course);
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchSubjectData = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/user/subject`, config);
      console.log(data.data);
      setSubject(data.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const departmentData = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Course",
          field: "course",
        },
        {
          label: "Semester",
          field: "sem",
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
    subject &&
      subject.forEach((item) => {
        data.rows.push({
          name: item.name,
        //   course: item.course.name,
          sem: item.semester,
          createdby: item.createdBy.name,
          actions: (
            <>
              <div>
                <i
                  className="fa fa-trash fs-5 text-danger mx-1 cursor-pointer"
                  data-itemid={item._id}
                 
                  onClick={handleDelete}
                ></i>
              </div>
            </>
          ),
        });
      });
    // console.log("data row ", data.rows);

    return data;
  };

  const handleDelete = async (e) => {
    // console.log(" I am handle delete");
    // const id = e.target.dataset.itemid;
    // console.log(deptId);

    const token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        `/api/v1/user/subject/${e.target.dataset.itemid}`,
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
    }
    closeRef2.current.click();
    fetchSubjectData();
  };

  const handleSubmit = async () => {
    // console.log(deptName);

    if (!name || !department || !semester) {
      toast.warn("Depatment Name is required", {
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
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(
        `/api/v1/user/subject`,
        { name , course : department, semester },
        config
      );
      console.log(data);
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
    closeRef.current.click();
    // fetchDepartmentData();
    setLoading(false);
   setName("")
   setDepartment("")
   setSemester("")
   fetchSubjectData();
  };

  return (
    <>
      <div className="" style={{ minHeight: "50vh" }}>
        <div className="container text-end">
          <button
            className="btn btn-teal"
            data-bs-toggle="modal"
            data-bs-target="#addDepartmentModal"
          >
            Add Subject
          </button>
        </div>
        <MDBDataTable
          striped
          bordered
          hover
          data={departmentData()}
          className="px-3"
          responsive
          paging={true}
        />
      </div>
      {/* add department modal */}
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="addDepartmentModal"
          // tabIndex="-1"
          aria-labelledby="addDepartmentModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="addDepartmentModalLabel">
                  Add Subject
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
                <div className="mb-3">
                  <label htmlFor="deptName" className="form-label">
                    Enter Subject Name{" "}
                    <span className="text-danger mx-1">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="subject Name ...."
                      name="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div className="mb-3">
            <select
              className="form-select"
              name="course"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option>Choose Course ....</option>
              {course &&
                course.map((item) => {
                  // console.log(item)
                  return (
                    <option value={item._id} key={item._id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
                <div className="mb-3">
                  <label htmlFor="semester" className="form-label">
                    {" "}
                    Enter Semester{" "}
                  </label>
                  <input
                    type="number"
                    name="semester"
                    className="form-control"
                    placeholder="1"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-teal my-2 mx-1 shadow shadow-lg"
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  Add Subject   
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      {/*  add department modal end here */}

      {/*  delte modal start here */}
      <>
        {/* Modal */}
        <div
          className="modal fade"
          id="deleteDeptModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // tabindex="-1"
          aria-labelledby="deleteDeptModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteDeptModalLabel">
                  Delete Department
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <h5>Are you sure to delete the department ?</h5>
                <p
                  className="text-danger text-justify"
                  style={{ fontSize: "13px" }}
                >
                  It will permamently delete all the record of student , teacher
                  and courses of that department{" "}
                </p>
              </div>
              <div className="modal-footer ">
                <button
                  className="btn btn-teal my-2 mx-1 "
                  onClick={handleDelete}
                  disabled={loading}
                >
                  <span
                    className={
                      loading ? "spinner-border spinner-border-sm" : ""
                    }
                  ></span>{" "}
                  yes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeRef2}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      {/*  delet modal end here */}
    </>
  );
};

export default Subject;
