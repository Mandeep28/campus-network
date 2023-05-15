import React, { useState } from 'react';

const AddCourse = () => {
 const [array, setArray] = useState([]);

  const handleAddElement = () => {
    setArray([...array ,'']); // Add an empty element to the array
  };

  const handleElementChange = (index, value) => {
    const updatedArray = [...array];
    updatedArray[index] = value;
    setArray(updatedArray);
  };

  const handleRemoveElement = (index) => {
    const updatedArray = [...array];
    updatedArray.splice(index, 1); // Remove the element at the specified index
    setArray(updatedArray);
  };

  // return (
  //   <div>
  //     <button onClick={handleAddElement}>Add Element</button>
  //     {array.map((element, index) => (
  //       <div key={index}>
  //         <input
  //           type="text"
  //           value={element}
  //           onChange={(e) => handleElementChange(index, e.target.value)}
  //         />
  //         <button onClick={() => handleRemoveElement(index)}>Remove</button>
  //       </div>
  //     ))}


  //     <div>
  //       <button onClick={()=>{
  //         console.log("array is ", array)
  //       }}>submit</button>
  //     </div>
  //   </div>
  // );




  const [name, setName] = useState('');
  const [type, setType] = useState('UG');
  const [duration, setDuration] = useState(0);
  const [inputTags, setInputTags] = useState([]);




  const handleSubmit = async (event) => {
    event.preventDefault();

    const courseData = {
      name,
      type,
      duration,
      inputTags,
    };

    // Send the course data to the backend for saving
    try {
      const response = await fetch('/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        // Course added successfully
        console.log('Course added successfully');
        // Clear the form for the next entry
        setName('');
        setDuration(0);
        setInputTags([]);
      } else {
        // Handle the error if course addition fails
        console.error('Failed to add course');
      }
    } catch (error) {
      // Handle network or server errors
      console.error(error);
    }
  }; 

  return (
    <form>
      <label htmlFor="name">Course Name:</label>
      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

      <label htmlFor="type">Degree Type:</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value) } required>
        <option >Choose degree type ....</option>

        <option value="ug_3">Undergraduate (3 years)</option>
        <option value="ug_4">Undergraduate (4 years)</option>
        <option value="pg_2">Undergraduate (2 years)</option>
        <option value="pg_3">Undergraduate (3 years)</option>
      </select>

      <div className={(type ==="ug_3" || type ==="pg_3") ?`d-block` : "d-none"}>
      <input
            type="text"
            value={array[0]}
            onChange={(e) => handleElementChange( 0, e.target.value)}
          />
      <input
            type="text"
            value={array[1]}
            onChange={(e) => handleElementChange( 1, e.target.value)}
          />
      <input
            type="text"
            value={array[2]}
            onChange={(e) => handleElementChange( 2, e.target.value)}
          />
        
      </div>
      <div className={( type ==="ug_4") ?`d-block` : "d-none"}>
        I am ug_4
      </div>
      
      <div className={( type ==="pg_2") ?`d-block` : "d-none"}>
        I am pg_2
      </div>

      

      <button type="submit" onClick={()=>{
        console.log("Array is ", array)
      }}>Add Course</button>
    </form>
  );
};

export default AddCourse;
