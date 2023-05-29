import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [inputCount, setInputCount] = useState(0);
  const [inputValues, setInputValues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [dept, setDept] = useState("");
  const [maxStudent, setMaxStudent] = useState("");
  
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

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Determine the number of input tags based on the selected option
    if (selectedValue === "ug_3") {
      setInputCount(3);
    } else if (selectedValue === "ug_4") {
      setInputCount(4);
    } else if (selectedValue === "pg_2") {
      setInputCount(2);
    } else if (selectedValue === "pg_3") {
      setInputCount(3);
    }
  };

  const handleInputChange = (index, event) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = event.target.value;
    setInputValues(newInputValues);
  };

  const saveChanges = async (e) => {
    e.preventDefault();
    console.log(inputValues);
    console.log("input count is ", inputCount);

    if (!name || !dept || !selectedOption || !maxStudent || (inputValues.length !== inputCount)) {
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
      return;
    }
    let token = localStorage.getItem("userToken");
    try {
      const config = {
        headers: { "Content-type": "application/json", "auth-token": token },
      };

      const { data } = await axios.post(`/api/v1/admin/course`, {
        name : name.toUpperCase(), department : dept, maxStudent, degreeType : selectedOption , rollno: inputValues
      }, config);
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
      setMaxStudent("")
      setDepartment("")
      setName("")
      setSelectedOption("")
      setInputValues([])
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
      setMaxStudent("")
      setDepartment("")
      setName("")
      setSelectedOption("")
      setInputValues([])
    }
  };

  const renderInputTags = () => {
    const inputTags = [];
    for (let i = 0; i < inputCount; i++) {
      inputTags.push(
        <input
          key={i}
          type="number"
          className="form-control my-2"
          onInput={(e) => e.target.value = e.target.value.slice(0, 7)}
          placeholder={`Enter roll number series for ${i + 1} year`}
          value={inputValues[i] || ""}
          onChange={(event) => handleInputChange(i, event)}
        />
      );
    }
    return inputTags;
  };

  return (
    <div>
      {/* <h1>Dynamic Input Tags</h1> */}
      <h3 className="text-teal text-center text-capitalize">Add Course</h3>
      <div className="underline-1"></div>
      <div className="container">
        <form >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter course name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter name ..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              placeholder="Enter Maximum student limit  ..."
              value={maxStudent}
              onChange={(e) => {
                setMaxStudent(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              name="department"
              value={dept}
              onChange={(e) => {
                setDept(e.target.value);
              }}
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
              value={selectedOption}
              name="semesterType"
              className="form-select"
              onChange={handleOptionChange}
            >
              <option>Choose Depree Type ....</option>
              <option value="ug_3">under graduate(3 year)</option>
              <option value="ug_4">under graduate(4 year)</option>
              <option value="pg_2">post graduate(2 year)</option>
              <option value="pg_3">post graduate(3year)</option>
            </select>
          </div>
          <div className="mb-3">{renderInputTags()}</div>
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
        </form>
      </div>
    </div>
  );
};

export default App;
