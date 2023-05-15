import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { toast } from "react-toastify";

const Department = () => {
  const [depData, setDepdata] = useState();
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deptId, setDeptId] = useState();
  const closeRef = useRef();
  const closeRef2 = useRef();
  useEffect(() => {
    fetchDepartmentData();
    console.log(depData);
  }, []);

  const fetchDepartmentData = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/department`, config);
      console.log(data.departments);
      setDepdata(data.departments);
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
    depData &&
      depData.forEach((item) => {
        data.rows.push({
          name: item.name,
          createdby: item.createdBy.name,
          actions: (
            <>
              <div>
                <i
                  className="fa fa-trash fs-5 text-danger mx-1 cursor-pointer"
                  data-itemid={item._id}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteDeptModal"
                  onClick={(e)=>{setDeptId(e.target.dataset.itemid)}}
                  // onClick={handleDelete}
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
    console.log(deptId);
    
    const token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        `/api/v1/admin/department/${deptId}`,
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
  };

  const handleSubmit = async () => {
    console.log(deptName);

    if (!deptName) {
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
        `/api/v1/admin/department`,
        { name: deptName.toUpperCase() },
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
    fetchDepartmentData();
    setLoading(false);
    setDeptName("");
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
            Add department
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
                  Add Department
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
                <label htmlFor="deptName" className="form-label">
                  Enter Department Name{" "}
                  <span className="text-danger mx-1">*</span>
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Department Name ...."
                    aria-label="Department Name"
                    name="deptName"
                    value={deptName}
                    onChange={(e) => {
                      setDeptName(e.target.value);
                    }}
                    aria-describedby="basic-addon1"
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
                  Add Department
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
                  It will permamently delete all the record of student , teacher and
                  courses of that department{" "}
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

export default Department;
