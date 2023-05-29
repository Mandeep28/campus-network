import React, { useEffect, useRef, useState } from "react";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import { toast } from "react-toastify";
import moment from 'moment'

const RegisterUser = () => {
  const [depData, setDepdata] = useState();
  const [deptName, setDeptName] = useState("");
  const [loading, setLoading] = useState(false);
  const [deptId, setDeptId] = useState();
  const closeRef = useRef();
  const closeRef2 = useRef();
  useEffect(() => {
    fetchDepartmentData();
    // console.log(depData);
  }, []);

  const fetchDepartmentData = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(`/api/v1/admin/registeruser`, config);
      console.log(data);
      setDepdata(data);
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
          label: "Email",
          field: "email",
        },
        {
          label: "Role",
          field: "role",
        },
        {
          label: "Verified At",
          field: "verified",
        },
        {
          label: "Image",
          field: "image",
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
          email : item.email,
          role : item.role,
          verified : moment(item.verified).format("LLL"),
          image : (<img style={{width: "40px", height : "40px"}} src= {item.image} alt ="user phone"/>),
       
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
    console.log("data row ", data.rows);

    return data;
  };

  const handleDelete = async (e) => {
    // console.log(" I am handle delete");
    const id = e.target.dataset.itemid;
    // console.log(deptId);
    
    const token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.delete(
        `/api/v1/admin/registeruser/${id}`,
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
    fetchDepartmentData();
  };


  return (
    <>
      <div className="" style={{ minHeight: "50vh" }}>
       
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
    

  
    </>
  );
};

export default RegisterUser;
