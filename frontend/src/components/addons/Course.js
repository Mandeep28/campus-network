import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Course = () => {
  const [courseData, setCourseData] = useState();
  const [courseId, setCourseId] = useState();
  const [loading, setLoading] = useState(false)
  const closeRef2 = useRef();

  useEffect(() => {
    fetchCourseData();
    // console.log(depData);
  }, []);

  const fetchCourseData = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/course`, config);
      // console.log(data.course);
      setCourseData(data.course);
    } catch (error) {
      // console.log(error.response.data);
      toast.error(error.response.msg, {
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
  };

  const CourseData = () => {
    const data = {
      columns: [
        {
          label: "Name",
          field: "name",
        },
        {
          label: "Department Name",
          field: "department",
        },

        {
          label: "Semester Type",
          field: "semester",
        },
        {
          label: "Total Student ",
          field: "totalstudent",
        },
        {
          label: "Roll Series",
          field: "rollseries",
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
    courseData &&
      courseData.forEach((item) => {
        data.rows.push({
          name: item.name,
          department: item.department.name,
          semester: "ug_3",
          totalstudent: "120",
          rollseries: (
            <ul className="d-flex flex-column">
              <li> 4330</li> 
              <li> 7330</li> 
              <li> 10301</li>
            </ul>
          ),
          createdby: item.createdBy.name,
          actions: (
            <>
              <div>
                <i
                  className="fa fa-pencil fs-5 text-teal mx-1 cursor-pointer"
                  data-itemid={item._id}
                ></i>
                <i
                  className="fa fa-trash fs-5 text-danger mx-1 cursor-pointer"
                  data-itemid={item._id}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteDeptModal"
                  // onClick={handleDelete}
                  onClick={(e)=> setCourseId(e.target.dataset.itemid)}
                ></i>
              </div>
            </>
          ),
        });
      });
    // console.log("data row ", data.rows);

    return data;
  };

  const handleDelete = async() => {
    // console.log(" I am handle delete");
    // console.log(deptId);
    
    const token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        `/api/v1/admin/course/${courseId}`,
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
    fetchCourseData();
  };

  return (
    <>
    <div className="" style={{ minHeight: "50vh" }}>
      <div className="text-end container">
        <Link to="/addons/addcourse" className="btn btn-teal">Add Course</Link>
      </div>
      <MDBDataTable
        striped
        bordered
        hover
        data={CourseData()}
        className="px-3"
        responsive
        paging={true}
      />
    </div>

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
                <h5>Are you sure to delete the Course ?</h5>
                <p
                  className="text-danger text-justify"
                  style={{ fontSize: "13px" }}
                >
                  It will permamently delete all the record of student of that particular course.{" "}
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

export default Course;
