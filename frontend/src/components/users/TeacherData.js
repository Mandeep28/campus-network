import axios from "axios";
import React, { useEffect , useState } from "react";
import { MDBDataTable } from "mdbreact";

const TeacherData = () => {
  const [teacherdata, setTeacherdata] = useState();
  useEffect(() => {
    fetchUsers();
    console.log("student data",teacherdata);
    // console.log("data row ", )
    
  }, []);

  const fetchUsers = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(
        `/api/v1/admin/user?type=teacher`,
        config
      );
      console.log(data.data);
       setTeacherdata(data.data);

      // setLoading(false);
    } catch (error) {
      console.log(error.response.data);
    }
  };

const userData = ()=>{

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
      },
     
      {
        label: "Department Name",
        field: "departmentname",
        sort: "asc",
        
      },
     
      {
        label: "CreatedBy",
        field: "createdby",
        sort: "asc",
        
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc'
    }
    ],

    rows: [],
  }
  teacherdata && teacherdata.forEach((item)=>{
      data.rows.push({
        name: item.name, 
        email: item.email,
        departmentname: item.department.name,   
        createdby : item.createdBy.name,
        actions:
        <>
        <div>
          <i className="fa fa-pencil text-teal fs-5 mx-1"> </i>
        <i className="fa fa-trash fs-5 text-danger mx-1"></i>
        </div>
        </> 


      })
      
  })
  console.log("data row ",data.rows);
  
  return data;
}


  return (
    <div className="container" style={{minHeight: "50vh"}}>
      <MDBDataTable
        striped
        bordered
        hover
        data={userData()}
        className="px-3"    
        responsive
        paging={true}
      />
    </div>
  );
};

export default TeacherData;
