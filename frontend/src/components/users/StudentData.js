import axios from "axios";
import React, { useEffect , useState } from "react";
import { MDBDataTable } from "mdbreact";

const StudentData = () => {
  const [studentdata, setStudentData] = useState();
  useEffect(() => {
    fetchUsers();
    console.log("student data",studentdata);
    // console.log("data row ", )
    
  }, []);

  const fetchUsers = async () => {
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.get(
        `/api/v1/admin/user?type=student`,
        config
      );
      console.log(data.data);
       setStudentData(data.data);

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
        label: "Roll No",
        field: "rollno",
        sort: "asc",
      },
      {
        label: "Course",
        field: "course",
        sort: "asc",
        
      },
      {
        label: "Semester",
        field: "semester",
        sort: "asc",
        
      },
      {
        label: "Department Name",
        field: "departmentname",
        sort: "asc",
        
      },
      {
        label: "degree Type",
        field: "degreetype",
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
  studentdata && studentdata.forEach((item)=>{
      data.rows.push({
        name: item.name, 
        email: item.email,
        rollno: item.rollno,
        course: item.course,
        semester: item.semester,
        degreetype: item.degreeType,
        createdby : item.createdBy.name,
        departmentname: item.department.name,
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

export default StudentData;
