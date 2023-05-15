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

  const [formValues, setFormValues] = useState({
    name: "",
    maxStudent: "",
    department : "",
    degreeType : "",
    inputValues : []
    // add more fields as needed
  });
  
  
const [touched, setTouched] = useState({
  name: false, 
  maxStudent: false, 
  department : false, 
  degreeType : false, 
  inputValues :false, 
});


const handleInputChange = (index, event) => {
  const newInputValues = [...formValues.inputValues];
  newInputValues[index] = event.target.value;
  setFormValues({inputValues : newInputValues});
};


  useEffect(() => {
    fetchCourseData();
    // console.log(depData);
  }, []);

  const [department, setDepartment] = useState();
  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/department`, config);
      //   console.log("department is ",data);
      setDepartment(data.departments);
      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };


  const fetchCourseData = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/course`, config);
      console.log(data.course);
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
  const handleOnChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: [e.target.value] });

    setTouched({...touched , [e.target.name]: true});
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
          label: "Degree Type",
          field: "semester",
        },
        {
          label: "Max Student ",
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
          department:(<p id={item.department._id}>{item.department.name}</p>),
          semester: item.degreeType,
          totalstudent: item.maxStudent,
          rollseries: (
            <ul className="d-flex flex-column">
           { item.rollnoSeries.map((item,index) =>{
              return (
                <li key={index}> {item}</li>
              )
           })}
            </ul>
          ),
          createdby: item.createdBy.name,
          actions: (
            <>
              <div>
                <i
                  className="fa fa-pencil fs-5 text-teal mx-1 cursor-pointer"
                  data-itemid={item._id}
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={handleEditClick}
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



  const handleEditClick = (e)=>{
    const Userdata = e.target.parentElement.parentElement.parentElement.children;
  //   console.log(Userdata[2].children[0].id);
    // setUserid(e.target.dataset.itemid);
    console.log(Userdata);

    
 
    
    setFormValues({
      name : Userdata[0].innerText,
      department : Userdata[1].children[0].id,
      degreeType : Userdata[2].innerText,
      maxStudent : Userdata[3].innerText,
      inputValues :  Userdata[4].innerText.split("\n")
      
    
      // department : Userdata[2].children[0].id,
     
    })
  }

  const saveChanges = async (e) => {
    e.preventDefault();

    const updatedValues = {};
    Object.keys(formValues).forEach((key) => {
      if (touched[key]) {
        updatedValues[key] = formValues[key][0];
      } else {
        updatedValues[key] = formValues[key];
      }
    });
    console.log("update values is ", updatedValues);
    console.log("name is ", formValues.name);
    console.log("name is(2) ", formValues.name[0]);
    
    
    

    // if (!name || !dept || !selectedOption || !maxStudent || (inputValues.length !== inputCount)) {
    //   toast.warn("please fill all values", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: 0,
    //     theme: "colored",
    //   });
    //   setLoading(false);
    //   return;
    // }
    let token = localStorage.getItem("userToken");
    // try {
    //   const config = {
    //     headers: { "Content-type": "application/json", "auth-token": token },
    //   };

    //   const { data } = await axios.post(`/api/v1/admin/course`, {
    //     name : name.toUpperCase(), department : dept, maxStudent, degreeType : selectedOption , rollno: inputValues
    //   }, config);
    //   // console.log(data);
    //   toast.success(data.msg, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: 0,
    //     theme: "colored",
    //   });
    //   setLoading(false);
    // } catch (error) {
    //   console.log(error.response);
    //   toast.error(error.response.data.msg, {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: 0,
    //     theme: "colored",
    //   });
    //   setLoading(false);
    // }
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

        {/*  Edit modal start here */}
     <>
        
        {/* Modal */}
        <div
          className="modal fade"
          id="editModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          // tabindex="-1"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="editModalLabel">
                  Edit Course
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
              <form >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter course name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter name ..."
              value={formValues.name}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="maxStudent" className="form-label">
              Enter Maximum student limit 
            </label>
            <input
              type="number"
              className="form-control"
              required
              onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
              id="maxStudent"
              name="maxStudent"
              placeholder="Enter Maximum student limit  ..."
              value={formValues.maxStudent}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="department"
              value={formValues.department}
            onChange={handleOnChange}
            >
              <option>Choose department ....</option>
              {department &&
                department.map((item) => {
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
            <select
           
              name="degreeType"
              className="form-select"
              value={formValues.degreeType}
            onChange={handleOnChange}
            >
              <option>Choose Depree Type ....</option>
              <option value="ug_3">under graduate(3 year)</option>
              <option value="ug_4">under graduate(4 year)</option>
              <option value="pg_2">post graduate(2 year)</option>
              <option value="pg_3">post graduate(3year)</option>
            </select>
          </div>
           <div className="mb-3">
            {
              formValues.inputValues.map((item , index) =>{
                return (
                  <input
                  key={index}
                  type="number"
                  name="inputValues[]"
                  className="form-control my-2"
                  onInput={(e) => e.target.value = e.target.value.slice(0, 7)}
                  placeholder={`Enter roll number series for ${index + 1} year`}
                  value={formValues.inputValues[index] || ""}
                  onChange={(event) => handleInputChange(index, event)}
                />
              )
              })
            }
           </div>
         
        </form>
              </div>
              <div className="modal-footer ">
              <button
            type="submit"
            className="btn btn-teal my-2 mx-1"
            onClick={saveChanges}
            disabled={loading}
          >
            <span
              className={loading ? "spinner-border spinner-border-sm" : ""}
            ></span>{" "}
            Save Changes
          </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={closeRef2}
                >
                  Close
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
