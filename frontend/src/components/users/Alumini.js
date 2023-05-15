import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { toast } from "react-toastify";

const Alumini = () => {
  const [depData, setDepdata] = useState();
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deptId, setDeptId] = useState();
  const closeRef = useRef();
  const closeRef2 = useRef();
  useEffect(() => {
    // fetchDepartmentData();
    // console.log(depData);
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
   
  };

  return (
    <>
      <div className="" style={{ minHeight: "50vh" }}>
       
        <MDBDataTable
          striped
          bordered
          hover
        //   data={departmentData()}
          className="px-3"
          responsive
          paging={true}
        />
      </div>
    

  
    </>
  );
};

export default Alumini;
