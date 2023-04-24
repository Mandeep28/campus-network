import React , {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {  toast } from "react-toastify";
import moment from 'moment'
import { Link } from "react-router-dom";

const AllQuestion = ({endpoint , showTrash , fetchAgain}) => {

  const [question , setQuestion] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(()=>{
      fetchQuestion();
  },[fetchAgain])


    //  fetch latest notice
    const fetchQuestion = async () => {
      let token = localStorage.getItem("userToken");
      try {
        const config = {
          headers: { "Content-type": "application/json", "auth-token": token },
        };
  
        const { data } = await axios.get(`/api/v1/user/${endpoint}`, config);
        // console.log(data);
        setQuestion(data.questions);
  
        // setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    function setLocalTime(utcTimeString) {
      const utcTime = new Date(utcTimeString);
      const now = new Date();
      const differenceInMs = now.getTime() - utcTime.getTime();
      const hours = Math.floor(differenceInMs / 3600000);
      const minutes = Math.floor((differenceInMs % 3600000) / 60000);
      // console.log("hours is ", hours, "minutes is :", minutes);
  
      if (hours > 0 && minutes > 0) {
        let returnVal = `${hours} hrs ${minutes} min ago`;
        // console.log(returnVal);
  
        return returnVal;
      } else if (hours > 0 && minutes <= 0) {
        let returnVal = `${hours} hrs  ago`;
        // console.log(returnVal);
        return returnVal;
      } else if (hours <= 0 && minutes > 0) {
        let returnVal = ` ${minutes} min ago`;
        // console.log(returnVal);
        return returnVal;
      }
    }

    const filteredItems = question.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.body.toLowerCase().includes(searchQuery.toLowerCase()) 
        //  || item.uploadBy.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //  pagination logic start
    const [currentPage, setCurrentPage] = useState(0);

const itemsPerPage = 5;
const pageCount = Math.ceil(question.length / itemsPerPage);

const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
 const itemsToDisplay = filteredItems.slice(startIndex, endIndex);



 const handleSearch = e => {
  setSearchQuery(e.target.value);
  setCurrentPage(0); // reset to first page when search query changes
};

//  handle delete 

const handleDelete = async (e)=>{
  // console.log("delted", e.target.id);
  const answerId = e.target.id;
  let token = localStorage.getItem("userToken");
  try {
    const config = {
      headers: { "Content-type": "application/json", "auth-token": token },
    };

    const { data } = await axios.delete("/api/v1/user/community/question/"+answerId, config);
    // console.log(data);
    toast.success("Question deleted successfully", {
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
    console.log(error.response.data);
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
  fetchQuestion();

  
}


// if(question.length > 0 ) {
//   return (
//     <div className="container d-flex align-items-center justify-content-center" style={{minHeight : "60vh"} }>
//       <h5>No question to show ... You can add question anytime.</h5>
//     </div>
//   )
// }


  return (
    <>
      <div className="container" style={{minHeight : "60vh"}}>
      <form className="d-flex" role="search">
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search Something ...."
    aria-label="Search"
    value={searchQuery} onChange={handleSearch}
  />
  {/* <button className="btn btn-outline-teal mx-3" onClick={handleSearch} type="submit">
    Search
  </button> */}
</form>

        {/* single item start */}
       { itemsToDisplay && itemsToDisplay.map ((item , index)=>{

   return (
    

       
          <div className="card my-3" key={item._id}>
            <div className="card-body">
              <h5 className="card-title my-2">
              <Link to={`/community/singlequestion/${item._id}`} className="text-decoration-none text-dark ">
               {item.title}
              </Link>
              </h5>
              {/* <p>{parse(item.body.slice(0, 150))}...</p> */}
              

              <div className="d-flex justify-content-between px-2">
               <div>
               <img src={item.uploadBy.image} alt="" className="rounded-circle image-fluid" style={{width: "30px" , height: "30px"}} />
                  <a href="#!" className="text-decoration-none d-inline-block mx-3 text-secondary">
                  <p className="card-text">
                      By {item.uploadBy.name}
                   
                  </p>
                  </a>
               </div>
               <div>
               <p className="card-text  d-inline-block">
                    <small className="text-body-secondary">
                      {" "}
                      {moment(new Date(item.createdAt).toLocaleString()).fromNow()} 
                    </small>
                  </p>
                 { showTrash &&  <i className="fa fa-trash mx-3 fs-5 text-danger" id={item._id} onClick={handleDelete} style={{cursor: "pointer"}}></i>}
               </div>
                  
                 
              
               
              </div>
            </div>
          </div>
             )

})
      
    }
    {/* single item end */}
      </div>
    { (question.length > 0) && 
     <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={5}
      marginPagesDisplayed={2}
      onPageChange={({ selected }) => setCurrentPage(selected)}
      containerClassName={'pagination'}
      activeClassName={'active'}
      breakLabel="..."
        nextLabel="next >"
        previousLabel="< previous"
    />
   
  }
    </>
  );
};

export default AllQuestion;
